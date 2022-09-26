import { Select, MenuItem, SelectChangeEvent, Grid, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setCurrentTarget, setDialogType } from '../../../../../slices/intro';
import { drawBackdrop, removeBackDrop } from '../../View/Canvas/helper';

export default function SelectSceneType() {
    const { data, currentDialog, render } = useSelector(selectIntro);
    const dispatch = useDispatch();
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);

    const onChangeType = (e: SelectChangeEvent<any>) => {
        if (e.target.value === 'communication') removeBackDrop({ canvas: render[currentDialog] });
        if (e.target.value === 'popup') drawBackdrop({ canvas: render[currentDialog] });
        render[currentDialog].discardActiveObject();
        render[currentDialog].renderAll();
        dispatch(setDialogType(e.target.value));
        dispatch(setCurrentTarget({ type: '' }));
    };

    useEffect(() => {
        if (!targetData?.dialogType) dispatch(setDialogType('communication'));
    }, [targetData?.dialogType, dispatch]);
    return (
        <Grid sx={{ mt: 2 }} container alignItems='center'>
            <Grid sx={{ mr: 2, width: '110px' }} item>
                <Typography className='jei-intro-title'>SCENE TYPE</Typography>
            </Grid>
            <Grid item>
                <Select value={targetData?.dialogType || 'communication'} size='small' onChange={onChangeType}>
                    <MenuItem value='communication'>대화형</MenuItem>
                    <MenuItem value='popup'>popup형</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
}
