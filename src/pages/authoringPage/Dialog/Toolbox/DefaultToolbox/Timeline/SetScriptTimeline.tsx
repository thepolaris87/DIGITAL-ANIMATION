import { Divider, Grid, Slider, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setScripts } from '../../../../../../slices/intro';
import { max, step } from '../../../Dialog';

export default function SetScriptTimeline() {
    const { data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const [value, setValue] = useState<number[]>(targetData?.scripts?.[0]?.effect?.appearance || [0, 15]);
    const dispatch = useDispatch();

    // const onTextEffectTypeChange = (e: React.ChangeEvent<HTMLInputElement>, id?: string) => {
    //     if (targetData && id) {
    //         const value = e.target.value as TEXTEFFECT;
    //         if (value === 'basic') dispatch(setScripts({ id, key: 'effect', data: { type: value, appearance: targetData.scripts![0].effect?.appearance } }));
    //         if (value === 'typing') dispatch(setScripts({ id, key: 'effect', data: { ...targetData.scripts![0].effect!, type: value, option: { interval: 0 } } }));
    //     }
    // };

    const onChange = (value: number | number[]) => {
        setValue(value as number[]);
    };
    const onChangeCommitted = (value: number | number[], id?: string) => {
        if (targetData && id) {
            dispatch(setScripts({ id, key: 'effect', data: { ...targetData.scripts![0].effect!, appearance: value as number[] } }));
        }
    };

    if (!targetData?.scripts || targetData?.scripts?.length === 0) return null;

    return (
        <Grid sx={{ border: '1px solid #7575' }} container alignItems='center'>
            <Grid sx={{ p: 1, width: '175px' }} item>
                <Typography variant='h5'>SCRIPT</Typography>
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid sx={{ p: 1, flex: 1 }} item>
                {/* TYPE */}
                {/* <Grid container alignItems='center' wrap='nowrap'>
                    <Grid sx={{ width: '150px', mr: 2 }} item>
                        <Typography className='jei-intro-title'>TYPE</Typography>
                    </Grid>
                    <Grid item>
                        <RadioGroup row value={targetData?.scripts?.[0]?.effect?.type} onChange={(e) => onTextEffectTypeChange(e, targetData?.scripts?.[0].id)}>
                            <FormControlLabel value='basic' control={<Radio />} label='BASIC' />
                            <FormControlLabel value='typing' control={<Radio />} label='TYPING' />
                        </RadioGroup>
                    </Grid>
                </Grid> */}
                {/* APPEARANCE */}
                <Grid container alignItems='center' wrap='nowrap'>
                    <Grid sx={{ width: '150px', mr: 2 }} item>
                        <Typography className='jei-intro-title'>APPEARANCE</Typography>
                    </Grid>
                    <Grid sx={{ p: 1, pt: 2, flex: 1 }} item>
                        <Slider
                            size='small'
                            valueLabelDisplay='auto'
                            value={value}
                            min={0}
                            max={max}
                            step={step}
                            onChange={(e, value) => onChange(value)}
                            onChangeCommitted={(e, value) => onChangeCommitted(value, targetData?.scripts?.[0].id)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
