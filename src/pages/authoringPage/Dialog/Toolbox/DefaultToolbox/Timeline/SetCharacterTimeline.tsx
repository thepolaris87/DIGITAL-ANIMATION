import { Divider, Grid, Slider, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EFFECTBASICFORM, effects, selectIntro, setCurrentTarget, setEffects } from '../../../../../../slices/intro';
import { max, step } from '../../../Dialog';

export const TimelineOption = ({ timeline, effects, index, object }: { timeline: number[]; effects: EFFECTBASICFORM[]; index: number; object?: fabric.Object }) => {
    const [value, setValue] = useState<number[]>(timeline);
    const dispatch = useDispatch();

    const onTimelineChange = (value: number | number[]) => {
        setValue(value as number[]);
    };
    const onTimelineChangeCommitted = (value: number | number[]) => {
        if (effects) {
            const data = effects.map((el, i) => {
                if (i === index) return { ...el, timeline: value as number[] };
                return el;
            });
            if (object) {
                dispatch(setCurrentTarget({ type: 'character', object }));
                setTimeout(() => dispatch(setEffects(data)));
            }
        }
    };

    return (
        <Slider
            sx={{ zIndex: 1 }}
            size='small'
            valueLabelDisplay='auto'
            value={value}
            min={0}
            max={max}
            step={step}
            onChange={(e, value) => onTimelineChange(value as number[])}
            onChangeCommitted={(e, value) => onTimelineChangeCommitted(value)}
        />
    );
};

export default function SetCharacterTimeline() {
    const { data, currentDialog, render } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const getDisplayName = (type: string) => effects.find((el) => el.value === type)?.display || '';
    const objects = useMemo(() => (render[currentDialog] ? render[currentDialog].getObjects() : []), [render, currentDialog]);

    return (
        <Grid sx={{ border: '1px solid #7575', mt: 1 }} container alignItems='center'>
            <Grid sx={{ p: 1, width: '175px' }} item>
                <Typography variant='h5'>CHARACTER</Typography>
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid sx={{ flex: 1 }} item>
                {targetData?.characters?.map((character, i) => (
                    <React.Fragment key={character.id}>
                        {i !== 0 && <Divider />}
                        <Grid sx={{ p: 1 }} container alignItems='center'>
                            <Grid sx={{ p: 1, pr: 2 }} item>
                                <Grid sx={{ width: '50px', height: '50px', m: 'auto' }} container justifyContent='center'>
                                    <img
                                        style={{ width: '50px', height: '50px' }}
                                        // src={`${process.env.REACT_APP_SOL}/images/D1/${character.src}.${character.extension}`}
                                        src={`/assets/images/${character.src}.${character.extension}`}
                                        alt={character.src}></img>
                                </Grid>
                            </Grid>
                            <Divider orientation='vertical' flexItem />
                            <Grid sx={{ p: 1, flex: 1 }} item>
                                {character?.effects?.map((effect, i) => (
                                    <Grid key={effect.type + '-' + i} container alignItems='center'>
                                        <Grid sx={{ width: '92px' }} item>
                                            <Typography className='jei-intro-subtitle' sx={{ color: '#F8B00C !important' }}>
                                                {getDisplayName(effect.type)}
                                            </Typography>
                                        </Grid>
                                        <Grid sx={{ flex: 1 }} item>
                                            <TimelineOption
                                                timeline={effect.timeline}
                                                effects={character.effects!}
                                                index={i}
                                                object={objects.find((el) => el.data.id === character.id)}
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Grid>
    );
}
