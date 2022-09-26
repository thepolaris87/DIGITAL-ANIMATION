import { Button, ButtonGroup, Grid } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETIMAGE } from '../../../../../apis/api';
import MetaModal from '../../../../../components/metaModal';
import { DATA, selectIntro, setImages } from '../../../../../slices/intro';
import { v4 as uuidv4 } from 'uuid';
import { ImageItem } from './Background.styles';
import { animation, drawImage, divisionCode as _divisionCode } from '../../View/Canvas/helper';
// 이미지 디비전 코드
// 01 : basic
// 02 : sprite
export default function DecoBackgroundSelect({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { data: originData, currentDialog, render } = useSelector(selectIntro);
    const queryClient = useQueryClient();
    const imageData = queryClient.getQueryData<GETIMAGE[]>(['intro', 'image']);
    const [divisionCode, setDivisionCode] = useState<'01' | '02'>('01');
    const [selectImage, setSelectImage] = useState<DATA['images']>();
    const dispatch = useDispatch();
    const imageList = useMemo(
        () => imageData && imageData.filter((el) => (el.imageDivisionCode === _divisionCode.image.basic || el.imageDivisionCode === _divisionCode.image.sprite) && el.extension),
        [imageData]
    );
    const filteredImageList = useMemo(() => imageList && imageList.filter((el) => el.imageDivisionCode === divisionCode), [imageList, divisionCode]);

    const isFocus = useCallback(
        (data: GETIMAGE) => {
            const id = data.imageId;
            return selectImage?.some((el) => el.src === id);
        },
        [selectImage]
    );

    const onSelectTypeButtonClick = (type: '01' | '02') => {
        setDivisionCode(type);
    };

    const onImageClick = (data: GETIMAGE) => {
        const { imageId, extension, width, height, reference, imageDivisionCode } = data;
        const updateData = { id: uuidv4(), src: imageId, extension, width, height, frame: reference, imageDivisionCode };

        if (selectImage) {
            const isSelected = selectImage.some((el) => el.src === data.imageId);
            if (isSelected) setSelectImage(selectImage.filter((el) => el.src !== data.imageId));
            else setSelectImage([...selectImage, updateData]);
        } else {
            setSelectImage([updateData]);
        }
    };

    const onSaveClick = async () => {
        const canvas = render[currentDialog];
        if (selectImage) {
            const targetData = originData.find(({ dialogId }) => dialogId === currentDialog)?.images || [];
            const imagesData = selectImage.map((el) => {
                el.position = { top: 768 / 2, left: 1024 / 2 };
                el.transform = { angle: 0, scaleX: 1, scaleY: 1, flipX: false, flipY: false };
                return el;
            });

            await Promise.all(
                imagesData.map((el) =>
                    drawImage({
                        canvas,
                        src: `${process.env.REACT_APP_SOL}/images/D1/${el.src}.${el.extension}`,
                        id: el.id,
                        attr: { ...el.position, ...el.transform, ...el.attr },
                        type: el.imageDivisionCode
                    })
                )
            );
            const objects = canvas.getObjects();
            imagesData.forEach((image, i) => {
                const target = objects.find((object) => object.data.id === image.id);
                if (target) {
                    if (image.imageDivisionCode === '02' && !target.data.sprite) {
                        target.data.sprite = animation.sprite({ object: target, frameCount: Number(image.frame) });
                    }
                }
            });
            dispatch(setImages([...targetData, ...imagesData]));
        }
        setSelectImage(undefined);
        setDivisionCode('01');
        onClose();
    };

    if (!filteredImageList) return null;

    return (
        <MetaModal title='Deco Image' open={open} onClose={onClose} onSave={onSaveClick}>
            <Grid container wrap='nowrap'>
                <Grid sx={{ p: 1 }} item>
                    <ButtonGroup orientation='vertical'>
                        <Button onClick={() => onSelectTypeButtonClick('01')} variant={divisionCode === '01' ? 'contained' : 'outlined'}>
                            BASIC
                        </Button>
                        <Button onClick={() => onSelectTypeButtonClick('02')} variant={divisionCode === '02' ? 'contained' : 'outlined'}>
                            SPRITE
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
