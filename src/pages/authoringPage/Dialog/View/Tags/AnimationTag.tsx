import { Tag, Tooltip } from './Tags.styles';
import { IconButton } from '@mui/material';
import AnimationIcon from '@mui/icons-material/Animation';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGEBASICFORM, selectIntro, setCurrentDialog } from '../../../../../slices/intro';

export default function AnimationTag({ id }: { id: string }) {
    const { data, render } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find((el) => el.dialogId === id), [data, id]);
    const [isPlay, setIsPlay] = useState(false);
    const dispatch = useDispatch();

    const spriteHandler = (target: fabric.Object, image: IMAGEBASICFORM) => {
        if (image.imageDivisionCode === '02') {
            if (!isPlay) target.data.sprite.start();
            else target.data.sprite.stop();
        }
    };

    const onAnimationClick = () => {
        const objects = render[id].getObjects();
        targetData?.images?.forEach((image) => {
            const target = objects.find((object) => object.data.id === image.id);
            if (!target) return;            
            if (image.imageDivisionCode === '02') spriteHandler(target, image);
        });
        setIsPlay(!isPlay);
        dispatch(setCurrentDialog(id));
    };

    return (
        <Tag sx={{ background: '#fff', boxShadow: '0 0 5px #ff0000', mt: 2 }} container alignItems='center' justifyContent='center'>
            <Tooltip title='SPRITE'>
                <IconButton onClick={onAnimationClick}>
                    {!isPlay && <AnimationIcon color='primary' />}
                    {isPlay && <DoDisturbIcon color='error' />}
                </IconButton>
            </Tooltip>
        </Tag>
    );
}
