import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../../slices/intro';
import Appearance from './Appearance';
import SelectType from './SelectType';

import { converToEffectTimelineFromAppearance, createTimeline, requestAnimation } from '../../../View/Canvas/helper';
import { max } from '../../../Dialog';

export default function ScriptEffect() {
    const { data, currentDialog, render } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const [time, setTime] = useState('0');
    const [cancel, setCancel] = useState<Function | undefined>();

    const onPlayClick = () => {        
        if (targetData?.scripts?.[0]) {
            const objects = render[currentDialog].getObjects();
            const { effect, id } = targetData?.scripts?.[0];
            const targets = objects.filter((object) => object.data.id === id);
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

            if (targets && effect?.appearance) {
                const effects = converToEffectTimelineFromAppearance(effect.appearance);
                const timelines = targets.map((target) => createTimeline({ effects, object: target }));
                const cancel = requestAnimation({
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
                });
                setCancel(() => cancel);
            }
        }
    };

    return (
        <Box sx={{ p: 1 }}>
            <SelectType />
            <Appearance progress={((Number(time) * 1000) / (max * 1000)) * 100} disabled={!!cancel} />
            <Divider sx={{ m: '4px 0' }} />
            <Grid container alignItems='center'>
                <Button sx={{ m: 1, borderRadius: '8px' }} size='small' color='warning' variant='contained' onClick={onPlayClick}>
                    {!!cancel ? 'STOP' : 'PLAY'}
                </Button>
                <Typography sx={{ ml: 1 }} className='jei-intro-subtitle'>
                    {time}s
                </Typography>
            </Grid>
        </Box>
    );
}
