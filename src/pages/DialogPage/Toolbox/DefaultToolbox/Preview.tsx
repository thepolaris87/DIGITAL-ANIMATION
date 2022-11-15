import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import MetaModal from '../../../../components/MetaModal';
import { useRef, useState } from 'react';
import LearningPage from '../../../LearningPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import useCanvasSync from '../../hooks/useCanvasSync';
import { setData } from '../../../../slices/learning';
import CloseIcon from '@mui/icons-material/Close';

export default function Preview() {
    const { frameType, data } = useSelector(selectDialog);
    const [open, setOpen] = useState(false);
    const { getSyncData } = useCanvasSync();
    const key = useRef(0);
    const dispatch = useDispatch();

    const onClose = () => {
        setOpen(!open);
    };

    const onPreviewClick = () => {
        key.current += 1;
        setOpen(!open);
        const syncData = getSyncData();
        dispatch(setData({ ...data, dialog: syncData }));
    };

    return (
        <>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='preview' placement='bottom-end'>
                <span>
                    <IconButton onClick={onPreviewClick} disabled={frameType === 'M'}>
                        <PreviewIcon />
                    </IconButton>
                </span>
            </Tooltip>
            {open && (
                <Grid
                    key={key.current}
                    sx={{ height: '100vh', width: '100vw', position: 'fixed', zIndex: 1000, top: 0, left: 0, background: '#fff' }}
                    container
                    direction='column'
                    wrap='nowrap'>
                    <Grid sx={{ p: 1 }} item>
                        <Grid container alignItems='center' justifyContent='space-between'>
                            <Typography className='dia-title'>PREVIEW</Typography>
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid sx={{ flex: 1, border: '1px solid #757575', m: 1 }} item>
                        <LearningPage />
                    </Grid>
                </Grid>
            )}

            {/* <MetaModal key={key.current} title='Preview' open={open} onClose={onClose} save={false}>
                <Grid sx={{ height: '100%', width: '100%' }} container alignItems='center' justifyContent='center'>
                    <LearningPage />
                </Grid>
            </MetaModal> */}
        </>
    );
}
