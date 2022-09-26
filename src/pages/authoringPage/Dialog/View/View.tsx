import { Box, Grid, Paper, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setCurrentDialog } from '../../../../slices/intro';
import Canvas from './Canvas';
import Tags from './Tags/Tags';
import useKeyboardEvent from './useKeyboardEvent';
import { fabric } from 'fabric';

import { textAnimation } from './Canvas/helper';
import { useEffect, useState } from 'react';
import Thumbnail from './Thumbnail';

export default function Dialog({ scale }: { scale: number }) {
    const { data, currentDialog, locale, render, viewType } = useSelector(selectIntro);
    const { message, setMessage } = useKeyboardEvent();
    const [complete, onComplete] = useState(data.map((el) => ({ id: el.dialogId, complete: false })));
    const dispatch = useDispatch();

    const onSnackbarClose = (e: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setMessage('');
    };

    const onClick = async () => {
        // 텍스트 애니메이션
        const text = render[currentDialog].getObjects().find((el) => el.data.type === 'text') as fabric.Textbox;
        textAnimation.terminal({ object: text, interval: 100 });
    };

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
            dispatch(setCurrentDialog(data[0].dialogId));
        }
    }, [complete, dispatch, data, currentDialog]);

    return (
        <>
            <Box sx={{ position: 'absolute', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                {data.map((el) => (
                    <Grid
                        key={el.dialogId}
                        sx={{ position: 'relative', display: viewType === 'multi' ? 'flex' : currentDialog === el.dialogId ? 'flex' : 'none' }}
                        container
                        wrap='nowrap'>
                        <Grid sx={{ zIndex: 10 }} item>
                            <Paper
                                sx={{
                                    m: 1,
                                    p: 1,
                                    borderRadius: '16px',
                                    border: `6px solid ${viewType === 'single' ? 'transparent' : currentDialog === el.dialogId ? 'red' : 'transparent'}`
                                }}>
                                <Canvas
                                    id={el.dialogId}
                                    locale={locale}
                                    sceneType={el.dialogType}
                                    background={el.background}
                                    images={el.images}
                                    characters={el.characters}
                                    scripts={el.scripts}
                                    onComplete={() => onCanvasComplete(el.dialogId)}
                                />
                            </Paper>
                        </Grid>
                        <Grid sx={{ position: 'absolute', top: '24px', right: '-65px' }} item>
                            <Tags id={el.dialogId} />
                        </Grid>
                    </Grid>
                ))}
            </Box>
            {complete.every((el) => el.complete) && <Thumbnail />}
            <Box>
                <div style={{ position: 'fixed', bottom: '0' }} onClick={onClick}>
                    TEXT ANIMATION TEST
                </div>
            </Box>
            <Snackbar open={!!message} autoHideDuration={3000} onClose={onSnackbarClose} message={message} />
        </>
    );
}
