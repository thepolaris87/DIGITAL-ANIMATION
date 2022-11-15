import { Box, Divider, Grid, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { createTimeline } from '../../../View/Canvas/helper';
import { max, step } from '../../../Dialog';

export default function ObjectTimeline({ timeline, disabled }: { timeline: ReturnType<typeof createTimeline>; disabled: boolean }) {
    const [value, setValue] = useState(0);

    const onTimeValueChange = (value: number | number[]) => {
        const currentValue = (value as number) * 1000;
        timeline.excute(currentValue);
        setValue(value as number);
    };

    useEffect(() => {
        if (disabled) setValue(0);
    }, [disabled]);

    return (
        <Grid container alignItems='center'>
            <Grid sx={{ pl: 1, width: '220px' }} item>
                <Typography className='dia-title' align='center'>
                    {disabled ? 'PROGRESS' : 'TIME LINE'}
                </Typography>
            </Grid>
            <Divider flexItem orientation='vertical' />
            <Grid sx={{ flex: 1 }} item>
                <Box sx={{ p: '0 16px' }}>
                    <Slider
                        size='small'
                        valueLabelDisplay='auto'
                        value={value}
                        min={0}
                        max={max}
                        step={step}
                        onChange={(e, value) => onTimeValueChange(value)}
                        disabled={disabled}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
