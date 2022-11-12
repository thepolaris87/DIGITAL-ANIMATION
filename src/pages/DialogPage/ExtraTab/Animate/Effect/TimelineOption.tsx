import { Box, Slider } from '@mui/material';
import { useState } from 'react';
import { EFFECTBASICFORM } from '../../../../../slices/dialog';
import { max, step } from '../../../Dialog';

export default function TimelineOption({
    object,
    index,
    disabled,
    onChangeCommitted
}: {
    object: fabric.Object;
    index: number;
    disabled?: boolean;
    onChangeCommitted?: () => void;
}) {
    const [value, setValue] = useState(object.data.effects[index].timeline);
    const onTimelineChange = (value: number | number[]) => {
        setValue(value as number[]);
    };
    const onTimelineChangeCommitted = (value: number | number[]) => {
        const data = object.get('data');
        const effects = data.effects.map((effect: EFFECTBASICFORM, i: number) => {
            if (i === index) return { ...effect, timeline: value as number[] };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
        onChangeCommitted?.();
    };

    return (
        <Box sx={{ p: '0 16px' }}>
            <Slider
                sx={{ zIndex: 1 }}
                size='small'
                valueLabelDisplay='auto'
                value={value}
                min={0}
                max={max}
                step={step}
                onChange={(e, value) => onTimelineChange(value)}
                onChangeCommitted={(e, value) => onTimelineChangeCommitted(value)}
                disabled={disabled}
            />
        </Box>
    );
}
