import { Box, Slider } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EFFECTBASICFORM, setEffects } from '../../../../../../slices/intro';
import { max, step } from '../../../Dialog';

export default function TimelineOption({ timeline, effectList, index, disabled }: { timeline: number[]; effectList: EFFECTBASICFORM[]; index: number; disabled?: boolean }) {
    const [value, setValue] = useState(timeline);
    const dispatch = useDispatch();
    const onTimelineChange = (value: number | number[]) => {
        setValue(value as number[]);
    };
    const onTimelineChangeCommitted = (value: number | number[]) => {
        if (effectList) {
            const data = effectList.map((el, i) => {
                if (i === index) return { ...el, timeline: value as number[] };
                return el;
            });
            dispatch(setEffects(data));
        }
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
