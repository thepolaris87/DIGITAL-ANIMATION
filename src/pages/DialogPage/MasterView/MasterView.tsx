import { Box, Grid, Paper } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMaster, selectDialog, setCurrentDialog, setData } from '../../../slices/dialog';
import { scale } from '../Dialog';
import MasterCanvas from './MasterCanvas';
import Tags from './Tag/Tag';

export default function MasterView() {
    const { data } = useSelector(selectDialog);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data.master) {
            dispatch(addMaster({ id: 'master', canvas: {} }));
        }
    }, [data, dispatch]);

    if (!data.master) return null;

    return (
        <Box sx={{ position: 'absolute', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <Grid sx={{ position: 'relative', display: 'flex' }} container wrap='nowrap'>
                <Grid sx={{ zIndex: 10 }} item>
                    <Paper
                        sx={{
                            m: 1,
                            p: 1,
                            pb: 4,
                            borderRadius: '16px',
                            border: `6px solid ${orange[900]}`
                        }}>
                        <MasterCanvas data={data.master} />
                    </Paper>
                </Grid>
                <Grid sx={{ position: 'absolute', top: '24px', right: '-65px' }} item>
                    {<Tags />}
                </Grid>
            </Grid>
        </Box>
    );
}
