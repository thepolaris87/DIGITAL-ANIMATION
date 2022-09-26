import { Box, Button, SelectChangeEvent, Divider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EFFECT, selectIntro, setEffects as _setEffects } from '../../../../../slices/intro';
import AddIcon from '@mui/icons-material/Add';

import { EffectDuration, EffectHeader, EffectSelector } from './AnimatingTab.styles';
import { animation } from '../../View/Canvas/helper';

export default function Effect() {
    const { data, currentTarget, currentDialog } = useSelector(selectIntro);
    const [effects, setEffects] = useState<{ type: EFFECT; duration: number }[]>();
    const [effectPlayList, setEffectPlayList] = useState<{ start: () => void; stop: () => void }[]>();
    const currentData = useMemo(() => data && data.find(({ dialogId }) => dialogId === currentDialog), [data, currentDialog]);
    const effectList = useMemo(() => {
        if (currentData) {
            const images = currentData?.images?.find((el) => el.id === currentTarget.object.data.id);
            const characters = currentData?.characters?.find((el) => el.id === currentTarget.object.data.id);
            if (images?.effects) return images?.effects;
            if (characters?.effects) return characters?.effects;
        }
        return [];
    }, [currentData, currentTarget]);

    const dispatch = useDispatch();

    const onAddEffectClick = () => {
        if (effects) dispatch(_setEffects([...effects, { type: 'fadeIn', duration: 10 }]));
        else dispatch(_setEffects([{ type: 'fadeIn', duration: 10 }]));
    };

    const onRemoveEffectClick = (index: number) => {
        if (effects) {
            const data = effects.filter((el, i) => i !== index);
            dispatch(_setEffects(data));
        }
    };

    const onEffectChange = (e: SelectChangeEvent<EFFECT>, index: number) => {
        if (effects) {
            const type = e.target.value as EFFECT;
            const data = effects.map((el, i) => {
                if (i === index) return { ...el, type };
                return el;
            });
            dispatch(_setEffects(data));
        }
    };

    const onDurationChange = (value: number | number[], index: number) => {
        if (effects && !Array.isArray(value)) {
            const data = effects.map((el, i) => {
                if (i === index) return { ...el, duration: value };
                return el;
            });
            setEffects(data);
        }
    };

    const onDurationChangeCommitted = (value: number | number[], index: number) => {
        if (effects && !Array.isArray(value)) {
            const data = effects.map((el, i) => {
                if (i === index) return { ...el, duration: value };
                return el;
            });
            dispatch(_setEffects(data));
        }
    };

    const onEffectPlayClick = () => {
        if (effects) {
            if (!effectPlayList) {
                const effectList = effects.map((el) => {
                    if (el.type === 'fadeIn') {
                        return animation.fadeIn({
                            object: currentTarget.object,
                            option: { duration: el.duration * 10 },
                            render: currentTarget.object.canvas
                        });
                    }
                    if (el.type === 'fadeOut') {
                        return animation.fadeOut({
                            object: currentTarget.object,
                            option: { duration: el.duration * 10 },
                            render: currentTarget.object.canvas
                        });
                    }
                    if (el.type === 'blink') {
                        return animation.blink({
                            object: currentTarget.object,
                            option: { duration: el.duration * 10 },
                            render: currentTarget.object.canvas
                        });
                    }
                    return { start: () => {}, stop: () => {} };
                });

                for (let index = 0; index < effectList.length; index++) {
                    const { start } = effectList[index];
                    start();
                }

                setEffectPlayList(effectList);
            }
            if (effectPlayList) {
                effectPlayList.forEach((el) => el.stop());
                setEffectPlayList(undefined);
            }
        }
    };

    useEffect(() => {
        setEffects(effectList);
    }, [effectList]);

    useEffect(() => {
        return () => {
            if (effectPlayList && currentTarget) {
                effectPlayList.forEach((el) => el.stop());
                setEffectPlayList(undefined);
            }
        };
    }, [effectPlayList, currentTarget]);

    return (
        <Box sx={{ p: 1 }}>
            {effects?.map((el, i) => (
                <Box key={`${el.type}-${i}`}>
                    <Divider />
                    <EffectHeader type={el.type} onRemoveIconClick={() => onRemoveEffectClick(i)} disabled={!!effectPlayList} />
                    <EffectSelector type={el.type} onEffectChange={(e) => onEffectChange(e, i)} disabled={!!effectPlayList} />
                    <EffectDuration
                        duration={el.duration}
                        onChange={(value) => onDurationChange(value, i)}
                        onChangeCommitted={(value) => onDurationChangeCommitted(value, i)}
                        disabled={!!effectPlayList}
                    />
                    <Divider sx={{ m: '4px 0' }} />
                </Box>
            ))}
            <Button sx={{ m: 1 }} size='small' startIcon={<AddIcon />} variant='outlined' onClick={onAddEffectClick} disabled={!!effectPlayList}>
                ADD EFFECT
            </Button>
            {effects && effects.length !== 0 && (
                <>
                    <Divider />
                    {/* @ts-ignore */}
                    <Button sx={{ m: 1, borderRadius: '8px', color: '#fff' }} size='small' color='effect' variant='contained' onClick={onEffectPlayClick}>
                        {!!effectPlayList ? 'STOP' : 'PLAY'}
                    </Button>
                </>
            )}
        </Box>
    );
}
