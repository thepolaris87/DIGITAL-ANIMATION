import { FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setScripts, TEXTEFFECT } from '../../../../../../slices/intro';

export default function SelectType() {
    const { data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const dispatch = useDispatch();

    const onTextEffectTypeChange = (e: React.ChangeEvent<HTMLInputElement>, id?: string) => {
        if (targetData && id) {
            const value = e.target.value as TEXTEFFECT;
            if (value === 'basic') dispatch(setScripts({ id, key: 'effect', data: { type: value, appearance: targetData.scripts![0].effect?.appearance } }));
            if (value === 'typing') dispatch(setScripts({ id, key: 'effect', data: { ...targetData.scripts![0].effect!, type: value, option: { interval: 0 } } }));
        }
    };

    const onIntervalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id?: string) => {
        if (targetData && id) {
            dispatch(setScripts({ id, key: 'effect', data: { ...targetData.scripts![0].effect!, option: { interval: Number(e.target.value) } } }));
        }
    };

    return (
        <>
            <Grid sx={{ p: '0 8px' }} container alignItems='center' wrap='nowrap'>
                <Grid sx={{ width: '150px', mr: 2 }} item>
                    <Typography className='jei-intro-title'>TYPE</Typography>
                </Grid>
                <Grid item>
                    <RadioGroup row value={targetData?.scripts?.[0]?.effect?.type} onChange={(e) => onTextEffectTypeChange(e, targetData?.scripts?.[0].id)}>
                        <FormControlLabel value='basic' control={<Radio />} label='BASIC' />
                        <FormControlLabel value='typing' control={<Radio />} label='TYPING' />
                    </RadioGroup>
                </Grid>
            </Grid>
            {targetData?.scripts?.[0]?.effect?.type === 'typing' && (
                <Grid sx={{ p: '0 8px' }} container alignItems='center' wrap='nowrap'>
                    <Grid sx={{ width: '150px', mr: 2 }} item>
                        <Typography className='jei-intro-title'>INTERVAL</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant='standard'
                            label='INTERVAL'
                            name='interval'
                            value={targetData?.scripts?.[0]?.effect.option?.interval || 0}
                            size='small'
                            type='number'
                            sx={{ backgroundColor: '#fff' }}
                            onChange={(e) => onIntervalChange(e, targetData?.scripts?.[0].id)}
                        />
                    </Grid>
                </Grid>
            )}
        </>
    );
}
