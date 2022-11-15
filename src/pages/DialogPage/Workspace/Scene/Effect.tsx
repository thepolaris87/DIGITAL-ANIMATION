import {  Box, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DATADIALOG, selectDialog, setSceneEffect } from '../../../../slices/dialog';

const transitionList = [
    { value: 'disappear', display: 'DISAPPEAR' },
    { value: 'fadeOut', display: 'FADE OUT' },
    { value: 'flyOutLeft', display: 'FLY OUT LEFT' },
    { value: 'flyOutRight', display: 'FLY OUT RIGHT' },
    { value: 'flyOutTop', display: 'FLY OUT TOP' },
    { value: 'flyOutBottom', display: 'FLY OUT BOTTOM' }
];

export default function Effect() {
    const { currentDialog, data } = useSelector(selectDialog);
    const [value, setValue] = useState<number>(3000);
    const dispatch = useDispatch();

    const currentEffect = data.dialog.find((el: DATADIALOG) => el.id === currentDialog)?.scene.effect || { type: 'disappear', duration: 1000 };

    const onBlurDuration = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(
            setSceneEffect({
                ...currentEffect,
                duration: Number(e.target.value)
            })
        );
    };

    const onChangeDuration = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(Number(e.target.value));
    };

    const onChangeType = (type: string) => {
        dispatch(setSceneEffect({ ...currentEffect, type: type }));
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container alignItems='center'>
                <Grid sx={{ mr: 2, width: '110px' }} item>
                    <Typography className='dia-title'>Transition</Typography>
                </Grid>
                <Grid item>
                    <Select sx={{ background: '#fff', mr: 1 }} inputProps={{ sx: { py: 1 } }} value={currentEffect.type} onChange={(e) => onChangeType(e.target.value)}>
                        {transitionList.map((transition) => (
                            <MenuItem key={transition.value} value={transition.value}>
                                {transition.display}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        sx={{ background: '#fff', width: '120px' }}
                        variant='outlined'
                        label='duration'
                        size='small'
                        type='number'
                        value={value}
                        onChange={onChangeDuration}
                        onBlur={onBlurDuration}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
