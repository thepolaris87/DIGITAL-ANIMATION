import { Box, Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Canvas from './Canvas';
import Tags from './Tags/Tags';

import { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail';

import { scale } from '../Dialog';
import { selectDialog, setCurrentDialog } from '../../../slices/dialog';


export default function View() {
    const { data, currentDialog, viewType } = useSelector(selectDialog);
    const [complete, onComplete] = useState(data?.dialog?.map((el) => ({ id: el.id, complete: false })));
    const dispatch = useDispatch();

    const onCanvasComplete = (id: string) => {
        onComplete((prev) =>
            prev.map((pre) => {
                if (pre.id === id) return { ...pre, complete: true };
                else return pre;
            })
        );
    };

    useEffect(() => {
        if (complete.every((el) => el.complete) && !currentDialog) {
            dispatch(setCurrentDialog(data.dialog?.[0]?.id));
        }
    }, [complete, dispatch, data, currentDialog]);

    return (
        <>
            <Box sx={{ position: 'absolute', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                {data?.dialog?.map((el) => (
                    <Grid key={el.id} sx={{ position: 'relative', display: viewType === 'multi' ? 'flex' : currentDialog === el.id ? 'flex' : 'none' }} container wrap='nowrap'>
                        <Grid sx={{ zIndex: 10 }} item>
                            <Paper
                                sx={{
                                    m: 1,
                                    p: 1,
                                    pb: 4,
                                    borderRadius: '16px',
                                    border: `6px solid ${currentDialog === el.id ? 'gold' : 'transparent'}`
                                }}>
                                <Canvas data={el} onComplete={() => onCanvasComplete(el.id)} />
                            </Paper>
                        </Grid>
                        <Grid sx={{ position: 'absolute', top: '24px', right: '-65px' }} item>
                            {complete.every((el) => el.complete) && <Tags id={el.id} />}
                        </Grid>
                    </Grid>
                ))}
            </Box>
            {complete.every((el) => el.complete) && <Thumbnail />}
        </>
    );
}
