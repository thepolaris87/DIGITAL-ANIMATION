import { alpha, Box, Button, ButtonGroup, Grid, IconButton, MenuItem, Pagination, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import { GETIMAGE } from '../../../../apis/api';
import MetaModal from '../../../../components/MetaModal';
import { IMAGEBASICFORM, selectDialog } from '../../../../slices/dialog';
import { animation, divisionCode as _divisionCode, drawBackground, drawImage, getImageCodeName } from '../../View/Canvas/helper';
import { ImageItem } from '../Workspace.styles';

import SearchIcon from '@mui/icons-material/Search';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

/*----- type -----*/
type ImageType = {
    imageId: string; // 이미지 id
    imageDivisionCode: string; // 이미지 분류 (01:basic, 02:sprite, 04: Background, 05: character)
    width: string; // 가로
    height: string; // 세로
    extension: string; // 확장자
    size: string; // 크기
    reference: string; //
    tags: string; // 태그
};

type ImageTypeColor = {
    type: string; // 이미지 확장자
    color: string; // 색상
};

export default function MasterSelect({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { currentDialog, render, data } = useSelector(selectDialog);
    const queryClient = useQueryClient();
    const imageData = queryClient.getQueryData<GETIMAGE[]>(['dialog', 'image']);
    const [divisionCode, setDivisionCode] = useState<string>('04');
    const [selectImage, setSelectImage] = useState<{ background?: IMAGEBASICFORM; image?: IMAGEBASICFORM[] }>();
    const { width: canvasWidth, height: canvasHeight } = data.size;

    const imageList = useMemo(() => imageData?.filter((el) => !!el.extension), [imageData]);
    const filteredImageList = useMemo(() => imageList?.filter((el) => el.imageDivisionCode === divisionCode), [imageList, divisionCode]);

    const isFocus = useCallback(
        (data: GETIMAGE) => {
            const id = data.imageId;
            return selectImage?.background?.src === id || selectImage?.image?.some((el) => el.src === id);
        },
        [selectImage?.image, selectImage?.background?.src]
    );

    const onSelectTypeButtonClick = (type: string) => {
        setDivisionCode(type);
    };

    const onImageClick = (data: GETIMAGE) => {
        const updateData = {
            id: uuidv4(),
            type: getImageCodeName(data.imageDivisionCode),
            src: data.imageId,
            extension: data.extension,
            imageDivisionCode: data.imageDivisionCode,
            frame: data.reference,
            width: data.width,
            height: data.height
        };
        if (data.imageDivisionCode === _divisionCode.image.background) {
            if (selectImage && selectImage.background) {
                const isSelected = selectImage.background.src === data.imageId;
                if (isSelected) {
                    setSelectImage({ ...selectImage, background: undefined });
                    return;
                }
            }
            setSelectImage({ ...selectImage, background: updateData });
        } else {
            if (selectImage && selectImage.image) {
                const isSelected = selectImage.image.some((el) => el.src === data.imageId);
                if (isSelected) setSelectImage({ ...selectImage, image: selectImage.image.filter((el) => el.src !== data.imageId) });
                else setSelectImage({ ...selectImage, image: selectImage.image.concat(updateData) });
            } else {
                setSelectImage({ ...selectImage, image: [updateData] });
            }
        }
    };

    const onSaveClick = async () => {
        if (!render) return;
        const canvas = render[currentDialog];

        if (selectImage && selectImage.background) {
            await drawBackground({
                canvas,
                src: `https://sol-api.esls.io/images/A1/${selectImage.background.src}.${selectImage.background.extension}`,
                data: { id: selectImage.background.id, type: 'background', imageDivisionCode: selectImage.background.imageDivisionCode, master: true }
            });
        }
        if (selectImage && selectImage.image) {
            await Promise.all(
                selectImage.image.map((el) =>
                    drawImage({
                        canvas,
                        src: `https://sol-api.esls.io/images/A1/${el.src}.${el.extension}`,
                        data: { id: el.id, type: el.type, imageDivisionCode: el.imageDivisionCode, frame: el.frame, master: true },
                        attr: { top: canvasHeight / 2, left: canvasWidth / 2 }
                    })?.then(({ object }) => {
                        if (el.imageDivisionCode === _divisionCode.image.sprite) {
                            const data = object.get('data');
                            object.set('data', { ...data, sprite: animation.sprite({ object, frameCount: Number(el.frame) }) });
                        }
                    })
                )
            );
        }
        setSelectImage(undefined);
        setDivisionCode('04');
        onClose();
    };

    /*----- 초기화 -----*/
    useEffect(() => {
        if (open) {
            setSearchTag(''); // 검색어 설정
            setSearchTagTemp(''); // 검색어(temp) 설정
            setSearchTagType('전체'); // 검색타입 설정
            setPage(1); // page 설정
        }
    }, [open]);

    /*----- page -----*/
    const pageMaxRow: number = 5; // 가로 img 최대 개수
    const pageMaxColumn: number = 5; // 세로 img 최대 개수
    const pageMaxImgCnt: number = pageMaxRow * pageMaxColumn; // 페이지 내 img 최대 개수
    const [page, setPage] = useState<number>(1); // 페이지

    // 페이지 번호 바뀔때
    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); // 페이지 번호 변경
        // setSelected([]); // 선택된 이미지 초기화
    };

    /*----- search -----*/
    const [searchTag, setSearchTag] = useState<string>('');
    const [searchTagTemp, setSearchTagTemp] = useState<string>('');
    const [searchTagType, setSearchTagType] = useState<string>('전체');
    const searchTagTypeList = useMemo<string[]>(() => {
        return ['전체', 'png', 'svg', 'jpg'];
    }, []);
    const tagTypeColorList = useMemo<ImageTypeColor[]>(() => {
        return [
            { type: 'png', color: 'orange' },
            { type: 'svg', color: 'green' },
            { type: 'jpg', color: 'yellow' }
        ];
    }, []);
    const getTagTypeColor = useCallback(
        (type: string): string => {
            return (
                tagTypeColorList.find((el: ImageTypeColor) => {
                    return el.type === type;
                })?.color ?? 'black'
            );
        },
        [tagTypeColorList]
    );

    // 입력창에서 검색어 입력시
    const onChangeSearchTag = useCallback((tag: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTagTemp(tag.target.value);
    }, []);
    // 검색버튼 눌렀을시
    const onSearchBtnClick = useCallback(() => {
        // setSearchTagType(searchTagTypeTemp); // type 설정
        setSearchTag(searchTagTemp); // tag 설정
        setPage(1); // page 설정
        // setSelected([]); // 선택된 이미지 초기화
    }, [searchTagTemp]);

    // 입력창에서 enter키를 눌렀을시
    const onSearchInputKeyDown = useCallback(
        (key: React.KeyboardEvent<HTMLDivElement>) => {
            if (key.key === 'Enter') onSearchBtnClick();
        },
        [onSearchBtnClick]
    );

    // type 변경시
    const onChangeSearchTagType = useCallback((e: SelectChangeEvent) => {
        setSearchTagType(e.target.value);
        setPage(1); // page 설정
    }, []);

    /*----- list ----*/
    // DB(imageList) -> Tag(applyTagImgList) -> Page(applyPageImgList)
    // Tag검색 적용된 리스트
    const applyTagImgList = useMemo<GETIMAGE[]>(() => {
        return (
            filteredImageList?.reduce((acc: GETIMAGE[], curr: GETIMAGE) => {
                return (searchTag === '' ? true : curr.tags.replaceAll(',', '').includes(searchTag.replaceAll(' ', ''))) &&
                    (searchTagType === '전체' ? true : curr.extension === searchTagType)
                    ? acc.concat(curr)
                    : acc;
            }, [] as GETIMAGE[]) ?? []
        );
    }, [filteredImageList, searchTag, searchTagType]);
    // 페이지 적용된 리스트
    const applyPageImgList = useMemo<GETIMAGE[]>(() => {
        return applyTagImgList.reduce((acc: GETIMAGE[], curr: GETIMAGE, i: number) => {
            return (page - 1) * pageMaxImgCnt <= i && i <= page * pageMaxImgCnt - 1 ? acc.concat(curr) : acc;
        }, [] as GETIMAGE[]);
    }, [applyTagImgList, page, pageMaxImgCnt]);
    // 총 img 수
    const totalImgCnt: number = useMemo(() => {
        // 검색어가 없는 경우
        if (searchTag === '') {
            return applyTagImgList?.length ?? 0;
        }
        // 검색어가 있는 경우
        else {
            return applyTagImgList?.length ?? 0;
        }
    }, [applyTagImgList?.length, searchTag]);

    // 마지막 pageNumber (최소 page 수: 1)
    const maxPageCnt: number = useMemo(() => (totalImgCnt > 0 ? Math.ceil(totalImgCnt / pageMaxImgCnt) : 1), [pageMaxImgCnt, totalImgCnt]);

    if (!filteredImageList) return null;

    return (
        <MetaModal title={'Master'} open={open} onClose={onClose} onSave={onSaveClick}>
            <Grid container wrap='nowrap'>
                {/* type 선택 영역 */}
                <Grid sx={{ mr: 1 }} item>
                    <Box sx={{ mt: 1, mb: 1, height: 30 }}></Box>
                    <ButtonGroup orientation='vertical'>
                        <Button
                            onClick={() => onSelectTypeButtonClick(_divisionCode.image.background)}
                            variant={divisionCode === _divisionCode.image.background ? 'contained' : 'outlined'}>
                            Background
                        </Button>
                        <Button
                            onClick={() => onSelectTypeButtonClick(_divisionCode.image.character)}
                            variant={divisionCode === _divisionCode.image.character ? 'contained' : 'outlined'}>
                            Character
                        </Button>
                        <Button onClick={() => onSelectTypeButtonClick(_divisionCode.image.basic)} variant={divisionCode === _divisionCode.image.basic ? 'contained' : 'outlined'}>
                            Basic
                        </Button>
                        <Button
                            onClick={() => onSelectTypeButtonClick(_divisionCode.image.sprite)}
                            variant={divisionCode === _divisionCode.image.sprite ? 'contained' : 'outlined'}>
                            Sprite
                        </Button>
                    </ButtonGroup>
                </Grid>

                {/* 검색, 이미지 영역 */}
                <Box>
                    {/* 검색 영역 */}
                    <Box
                        sx={{
                            mt: 1,
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 30
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                            <Select value={searchTagType} sx={{ width: 100, height: 30 }} onChange={onChangeSearchTagType}>
                                {searchTagTypeList.map((type: string) => {
                                    return (
                                        <MenuItem value={type} key={type}>
                                            {type}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <TextField InputProps={{ sx: { height: 30 } }} onChange={onChangeSearchTag} onKeyDown={onSearchInputKeyDown} placeholder='검색어를 입력해주세요' />
                            {/* 검색 버튼 */}
                            <IconButton onClick={onSearchBtnClick}>
                                <SearchIcon />
                            </IconButton>
                        </Box>

                        {/* 리스트 정보 */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: 'gray',
                                fontSize: 14
                            }}>
                            <Box>{`Total Img: ${applyTagImgList.length}`}</Box>
                        </Box>
                    </Box>

                    {/* 이미지 목록 Wrapper*/}
                    <Box
                        sx={{
                            width: '80vw',
                            height: '60vh',
                            overflow: 'scroll',
                            border: `1px solid ${alpha('#000', 0.2)}`,
                            borderRadius: 3
                        }}>
                        {/* 이미지 목록 */}
                        <Grid sx={{ flex: 1 }} item>
                            <Grid container>
                                {applyPageImgList.length > 0 ? (
                                    applyPageImgList.map((el: GETIMAGE) => (
                                        <Box
                                            sx={{
                                                position: 'relative'
                                            }}
                                            key={el.imageId}>
                                            {/* wrapper */}
                                            <ImageItem key={el.imageId} image={el} focus={isFocus(el)} onClick={() => onImageClick(el)} />
                                            {/* 타입 */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    top: 10,
                                                    width: 20,
                                                    height: 20,
                                                    bgcolor: getTagTypeColor(el.extension),
                                                    color: 'white',
                                                    fontSize: 10,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                {el.extension}
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 500,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <NotInterestedIcon />
                                        <Box>결과 없음</Box>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>

                    {/* 페이지 버튼 */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 1
                        }}>
                        <Stack spacing={2}>
                            <Pagination count={maxPageCnt} variant='outlined' shape='rounded' page={page} showFirstButton showLastButton onChange={onPageChange} />
                        </Stack>
                    </Box>
                </Box>
            </Grid>
        </MetaModal>
    );
}
