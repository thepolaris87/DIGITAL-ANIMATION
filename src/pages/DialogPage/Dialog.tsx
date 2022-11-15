import { Divider, Grid, Typography, Snackbar, Box } from '@mui/material';
import Toolbox from './Toolbox';
import View from './View';
import Workspace from './Workspace';
import ExtraTab from './ExtraTab';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setSnackbarMessage } from '../../slices/dialog';
import useKeyboardEvent from './hooks/useKeyboardEvent';
import { useEffect, useRef } from 'react';
import MasterView from './MasterView';
import useClipboard from './hooks/useClipboard';

export const scale = 0.6;
export const canvasWidth = 1024;
export const canvasHeight = 768;
export const [max, step] = [60, 0.1];

export default function Dialog() {
    const { data, navi, snackbarMessage, frameType } = useSelector(selectDialog);
    const { width: canvasWidth } = data.size;
    const dispatch = useDispatch();
    useKeyboardEvent();
    useClipboard();
    const ref = useRef(null);

    const onSnackbarClose = (e: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(setSnackbarMessage(''));
    };

    useEffect(() => {
        if (data && ref.current) {
            (ref.current as HTMLDivElement).addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowLeft':
                    case 'ArrowRight':
                    case 'ArrowUp':
                    case 'ArrowDown':
                        e.preventDefault();
                        break;
                }
            });
        }
    }, [data]);

    if (!data) return null;

    return (
        <Grid key={data.size.width + '/' + data.size.height} sx={{ width: '100%', height: '100vh', overflow: 'scroll' }} container direction='column' wrap='nowrap'>
            <Grid item>
                <Toolbox />
            </Grid>
            {data?.dialog?.length === 0 && (
                <Grid sx={{ width: '100%', flex: 1 }} container alignItems='center' justifyContent='center'>
                    <Typography className='dia-title' sx={{ pb: 20, fontSize: '65px' }}>
                        씬을 추가해주세요.
                    </Typography>
                </Grid>
            )}
            {data?.dialog?.length !== 0 && (
                <Grid sx={{ width: '100%', flex: 1, p: 1 }} container wrap='nowrap'>
                    <Grid
                        ref={ref}
                        sx={{
                            width: `${canvasWidth * scale + 98}px`,
                            minWidth: `${canvasWidth * scale + 98}px`,
                            height: 'calc(100vh - 120px)',
                            position: 'relative',
                            overflow: 'scroll'
                        }}
                        item>
                        <Box sx={{ display: navi === 'master' || frameType === 'M' ? 'none' : 'initial' }}>
                            <View />
                        </Box>
                        <Box sx={{ display: navi !== 'master' ? 'none' : 'initial' }}>
                            <MasterView />
                        </Box>
                    </Grid>
                    <Divider sx={{ borderWidth: '1px', mr: 2 }} orientation='vertical' flexItem />
                    <Grid sx={{ width: `calc(100vw - ${canvasWidth * scale + 132}px)`, minWidth: `calc(100vw - ${canvasWidth * scale + 132}px)` }} item>
                        <Workspace />
                    </Grid>
                    <Grid sx={{ height: '100%' }} item>
                        <ExtraTab />
                    </Grid>
                </Grid>
            )}
            <Snackbar open={!!snackbarMessage} autoHideDuration={1500} onClose={onSnackbarClose} message={snackbarMessage} />
        </Grid>
    );
}
