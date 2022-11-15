import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setEffectClip, setSnackbarMessage } from '../../../../../slices/dialog';
import Appearance from './Appearance';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { converToEffectTimelineFromAppearance, createTimeline, requestAnimation } from '../../../View/Canvas/helper';
import { max } from '../../../Dialog';

export default function DialogEffect() {
    const { currentTarget } = useSelector(selectDialog);
    const [time, setTime] = useState('0');
    const [cancel, setCancel] = useState<Function | undefined>();
    const dispatch = useDispatch();

    const onCopyScriptEffect = () => {
        if (!currentTarget.object?.data?.effect) return;
        const effects = converToEffectTimelineFromAppearance(currentTarget.object.data.effect.appearance);
        dispatch(setEffectClip(effects));
        dispatch(setSnackbarMessage('COPY SCRIPT EFFECT'));
    };

    const onPlayClick = () => {
        if (!currentTarget.object.data?.effect) return;
        const objects = currentTarget.object.canvas?.getObjects() || [];
        const targets = objects.filter((object: fabric.Object) => object.data.id === currentTarget.object.data.id) as fabric.Object[];

        if (!!cancel) {
            cancel();
            setTime('0');
            setCancel(undefined);
            targets.forEach((target) => {
                target.set('opacity', 1);
                target.canvas?.renderAll();
            });
            return;
        }

        const effects = converToEffectTimelineFromAppearance(currentTarget.object.data.effect.appearance);
        const timelines = targets.map((target) => createTimeline({ effects, object: target }));
        const _cancel = requestAnimation({
            duration: timelines[0].endTime,
            onChange: (value) => {
                timelines.forEach((timeline) => timeline.excute(value));
                if (Math.abs(Number(time) - value) > 100) setTime((value / 1000).toFixed(2));
            },
            onComplete: () => {
                timelines.forEach((timeline) => timeline.init());
                setTime('0');
                setCancel(undefined);
            }
        }).start();
        setCancel(() => _cancel);
    };

    return (
        <Box sx={{ p: 1, position: 'relative', zIndex: 10 }}>
            <Appearance object={currentTarget.object} progress={((Number(time) * 1000) / (max * 1000)) * 100} disabled={!!cancel} />
            <Divider sx={{ m: '4px 0' }} />
            <Button sx={{ m: 1 }} size='small' startIcon={<ContentPasteIcon />} variant='outlined' onClick={onCopyScriptEffect} disabled={!!cancel}>
                COPY SCRIPT EFFECT
            </Button>
            {/* <Grid container alignItems='center'>
                <Button sx={{ m: 1, borderRadius: '8px' }} size='small' color='warning' variant='contained' onClick={onPlayClick}>
                    {!!cancel ? 'STOP' : 'PLAY'}
                </Button>
                <Typography sx={{ ml: 1 }} className='dia-subtitle'>
                    {time}s
                </Typography>
            </Grid> */}
        </Box>
    );
}
