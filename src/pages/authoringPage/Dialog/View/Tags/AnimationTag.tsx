import { Tag, Tooltip } from './Tags.styles';
import { IconButton } from '@mui/material';
import AnimationIcon from '@mui/icons-material/Animation';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGEBASICFORM, selectIntro, setCurrentDialog } from '../../../../../slices/intro';
import { animation } from '../Canvas/helper';

export default function AnimationTag({ id }: { id: string }) {
    const { data, render } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find((el) => el.dialogId === id), [data, id]);
    const [isPlay, setIsPlay] = useState(false);
    const [effectList, setEffectList] = useState<{ start: () => void; stop: () => void }[][]>();
    const dispatch = useDispatch();

    const spriteHandler = (target: fabric.Object, image: IMAGEBASICFORM) => {
        if (image.imageDivisionCode === '02') {
            if (!isPlay) target.data.sprite.start();
            else target.data.sprite.stop();
        }
    };

    const effectHandler = (target: fabric.Object, image: IMAGEBASICFORM, _effectList: { start: () => void; stop: () => void }[][]) => {
        if (!isPlay) {
            const effects = image!.effects!.map((el) => {
                console.log(el);
                
                if (el.type === 'fadeIn') {
                    return animation.fadeIn({
                        object: target,
                        option: { duration: el.duration * 10 },
                        render: render[id]
                    });
                }
                if (el.type === 'fadeOut') {
                    return animation.fadeOut({
                        object: target,
                        option: { duration: el.duration * 10 },
                        render: render[id]
                    });
                }
                if (el.type === 'blink') {
                    return animation.blink({
                        object: target,
                        option: { duration: el.duration * 10 },
                        render: render[id]
                    });
                }
                return { start: () => {}, stop: () => {} };
            });
            _effectList.push(effects);
            _effectList.forEach((effects) => effects.forEach((effect) => effect.start()));
            setEffectList(_effectList);
        } else {
            effectList?.forEach((effects) => effects.forEach((effect) => effect.stop()));
            setEffectList(undefined);
        }
    };

    const onAnimationClick = () => {
        const objects = render[id].getObjects();
        let _effectList: { start: () => void; stop: () => void }[][] = [];
        targetData?.images?.forEach((image) => {
            const target = objects.find((object) => object.data.id === image.id);
            if (!target) return;
            // SPRITE
            if (image.imageDivisionCode === '02') spriteHandler(target, image);
            // EFFECT
            if (image.effects) effectHandler(target, image, _effectList);
        });
        setIsPlay(!isPlay);
        dispatch(setCurrentDialog(id));
    };

    return (
        <Tag sx={{ background: '#fff', boxShadow: '0 0 5px #ff0000', mt: 2 }} container alignItems='center' justifyContent='center'>
            <Tooltip title='ANIMATION'>
                <IconButton onClick={onAnimationClick}>
                    {!isPlay && <AnimationIcon color='primary' />}
                    {isPlay && <DoDisturbIcon color='error' />}
                </IconButton>
            </Tooltip>
        </Tag>
    );
}
