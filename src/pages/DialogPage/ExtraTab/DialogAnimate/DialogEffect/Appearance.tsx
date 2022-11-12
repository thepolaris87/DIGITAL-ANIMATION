import { Box, Grid, LinearProgress, Slider, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { GETSOUND } from '../../../../../apis/api';
import { max, step } from '../../../Dialog';

export default function Appearance({ object, progress, disabled }: { object: fabric.Object; progress: number; disabled?: boolean }) {
    const queryClient = useQueryClient();
    const soundData = queryClient.getQueryData(['dialog', 'sound']) as GETSOUND[];
    const [value, setValue] = useState<number[]>(object.data?.effect?.appearance || [0, 15]);
    const ttsDuration = useMemo(() => {
        if (!soundData) return { ko: 0, en: 0 };
        const ko = soundData.find((el) => el.soundId === object.data?.koTTS.src);
        const en = soundData.find((el) => el.soundId === object.data?.enTTS.src);
        return { ko: (Number(ko?.duration || 0) / 1000).toFixed(2), en: (Number(en?.duration || 0) / 1000).toFixed(2) };
    }, [soundData, object]);

    const onChange = (value: number | number[]) => {
        setValue(value as number[]);
    };
    const onChangeCommitted = (value: number | number[]) => {
        const data = object.get('data');
        object.set('data', { ...data, effect: { appearance: value } });
    };

    return (
        <Box>
            <Grid sx={{ p: '0 8px' }} container alignItems='center' wrap='nowrap'>
                <Grid sx={{ width: '150px', mr: 2 }} item>
                    <Typography className='jei-title'>{!!disabled ? 'PROGRESS' : 'APPEARANCE'}</Typography>
                </Grid>
                <Grid sx={{ flex: 1, position: 'relative' }} item>
                    {!!disabled && <LinearProgress sx={{ position: 'absolute', inset: '0', height: '85%' }} variant='determinate' value={progress} />}
                    <Slider
                        size='small'
                        valueLabelDisplay='auto'
                        value={value}
                        min={0}
                        max={max}
                        step={step}
                        onChange={(e, value) => onChange(value)}
                        onChangeCommitted={(e, value) => onChangeCommitted(value)}
                        disabled={disabled}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ p: '0 8px' }} container>
                <Typography sx={{ flex: 1 }} className='jei-title'>
                    KO: {ttsDuration.ko}s
                </Typography>
                <Typography sx={{ flex: 1 }} className='jei-title'>
                    EN: {ttsDuration.en}s
                </Typography>
            </Grid>
        </Box>
    );
}
