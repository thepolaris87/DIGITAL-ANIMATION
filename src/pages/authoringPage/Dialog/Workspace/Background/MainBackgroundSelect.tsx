import { Button, ButtonGroup, Grid } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETIMAGE } from '../../../../../apis/api';
import MetaModal from '../../../../../components/metaModal';
import { DATA, selectIntro, setBackground, setCharacters } from '../../../../../slices/intro';
import { v4 as uuidv4 } from 'uuid';
import { divisionCode as _divisionCode, drawBackground, drawImage } from '../../View/Canvas/helper';
import { ImageItem } from './Background.styles';

// 이미지 디비전 코드
// 04 : background
// 05 : character
export default function MainBackgroundSelect({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { data: originData, currentDialog, render } = useSelector(selectIntro);
    const queryClient = useQueryClient();
    const imageData = queryClient.getQueryData<GETIMAGE[]>(['intro', 'image']);
    const [divisionCode, setDivisionCode] = useState<'04' | '05'>('04');
    const [selectImage, setSelectImage] = useState<{ background?: DATA['background']; image?: DATA['images'] }>();
    const dispatch = useDispatch();

    const imageList = useMemo(
        () =>
            imageData &&
            imageData.filter((el) => (el.imageDivisionCode === _divisionCode.image.character || el.imageDivisionCode === _divisionCode.image.background) && el.extension),
        [imageData]
    );
    const filteredImageList = useMemo(() => imageList && imageList.filter((el) => el.imageDivisionCode === divisionCode), [imageList, divisionCode]);
    const isFocus = useCallback(
        (data: GETIMAGE) => {
            const id = data.imageId;
            return selectImage?.background?.src === id || selectImage?.image?.some((el) => el.src === id);
        },
        [selectImage?.image, selectImage?.background?.src]
    );

    const onSelectTypeButtonClick = (type: '04' | '05') => {
        setDivisionCode(type);
    };

    const onImageClick = (data: GETIMAGE) => {
        const { imageId, extension, width, height, imageDivisionCode } = data;
        const updateData = { id: uuidv4(), src: imageId, extension, width, height, imageDivisionCode };

        if (data.imageDivisionCode === '04') {
            if (selectImage && selectImage.background) {
                const isSelected = selectImage.background.src === data.imageId;
                if (isSelected) {
                    setSelectImage({ ...selectImage, background: undefined });
                    return;
                }
            }
            setSelectImage({ ...selectImage, background: updateData });
        }
        if (data.imageDivisionCode === '05') {
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
        const canvas = render[currentDialog];
        if (selectImage && selectImage.background) {
            await drawBackground({
                canvas,
                // src: `${process.env.REACT_APP_SOL}/images/D1/${selectImage.background.src}.${selectImage.background.extension}`
                src: `/assets/images/${selectImage.background.src}.${selectImage.background.extension}`,

            });
            dispatch(setBackground(selectImage.background));
        }

        if (selectImage && selectImage.image) {
            const targetData = originData.find(({ dialogId }) => dialogId === currentDialog)?.characters || [];
            const imagesData = selectImage.image.map((el) => {
                el.position = { top: 768 / 2, left: 1024 / 2 };
                el.transform = { angle: 0, scaleX: 1, scaleY: 1, flipX: false, flipY: false };
                return el;
            });
            await Promise.all(
                imagesData.map((el) =>
                    drawImage({
                        canvas,
                        // src: `${process.env.REACT_APP_SOL}/images/D1/${el.src}.${el.extension}`,
                        src: `/assets/images/${el.src}.${el.extension}`,
                        id: el.id,
                        attr: { ...el.position, ...el.transform, ...el.attr },
                        type: el.imageDivisionCode
                    })
                )
            );
            dispatch(setCharacters([...targetData, ...imagesData]));
        }
        setSelectImage(undefined);
        setDivisionCode('04');
        onClose();
    };

    if (!filteredImageList) return null;

    return (
        <MetaModal title='Background & Character' open={open} onClose={onClose} onSave={onSaveClick}>
            <Grid container wrap='nowrap'>
                <Grid sx={{ p: 1 }} item>
                    <ButtonGroup orientation='vertical'>
                        <Button onClick={() => onSelectTypeButtonClick('04')} variant={divisionCode === '04' ? 'contained' : 'outlined'}>
                            Background
                        </Button>
                        <Button onClick={() => onSelectTypeButtonClick('05')} variant={divisionCode === '05' ? 'contained' : 'outlined'}>
                            Chacter
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid sx={{ flex: 1 }} item>
                    <Grid container>
                        {filteredImageList.map((el) => (
                            <ImageItem key={el.imageId} image={el} focus={isFocus(el)} onClick={() => onImageClick(el)} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MetaModal>
    );
}
