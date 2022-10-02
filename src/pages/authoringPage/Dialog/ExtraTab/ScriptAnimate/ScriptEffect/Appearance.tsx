import { Grid, LinearProgress, Slider, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setScripts } from '../../../../../../slices/intro';
import { max, step } from '../../../Dialog';

export default function Appearance({ progress, disabled }: { progress: number; disabled?: boolean }) {
    const { data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const [value, setValue] = useState<number[]>(targetData?.scripts?.[0]?.effect?.appearance || [0, 15]);

    const dispatch = useDispatch();
    const onChange = (value: number | number[]) => {
        setValue(value as number[]);
    };
    const onChangeCommitted = (value: number | number[], id?: string) => {
        if (targetData && id) {
            dispatch(setScripts({ id, key: 'effect', data: { ...targetData.scripts![0].effect!, appearance: value as number[] } }));
        }
    };

    return (
        <Grid sx={{ p: '0 8px', mt: 2 }} container alignItems='center' wrap='nowrap'>
            <Grid sx={{ width: '150px', mr: 2 }} item>
                <Typography className='jei-intro-title'>{!!disabled ? 'PROGRESS' : 'APPEARANCE'}</Typography>
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
                    onChangeCommitted={(e, value) => onChangeCommitted(value, targetData?.scripts?.[0].id)}
                    disabled={disabled}
                />
            </Grid>
        </Grid>
    );
}
