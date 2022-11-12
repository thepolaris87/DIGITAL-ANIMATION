import { Slider } from '@mui/material';
import { useState } from 'react';
import { EFFECTBASICFORM } from '../../../../../slices/dialog';
import { max, step } from '../../../Dialog';

export default function TimelineOption({ object, timeline, type, index }: { object: fabric.Object; timeline: number[]; type: string; index?: number }) {
    const [value, setValue] = useState<number[]>(timeline);

    const onTimelineChange = (value: number | number[]) => {
        setValue(value as number[]);
    };
    const onTimelineChangeCommitted = (value: number | number[]) => {
        const data = object.get('data');
        if (['script'].includes(type)) {
            object.set('data', { ...data, effect: { ...data.effect, appearance: value } });
        }
        if (['basic', 'character', 'text'].includes(type)) {
            const effects = data.effects.map((effect: EFFECTBASICFORM, i: number) => (i === index ? { ...effect, timeline: value } : { ...effect }));
            object.set('data', { ...data, effects });
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
}
