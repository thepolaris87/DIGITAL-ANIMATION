import { Box, Button, Collapse, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import AddIcon from '@mui/icons-material/Add';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Selector from './Selector';
import TimelineOption from './TimelineOption';
import MoveOption from './MoveOption';
import ObjectTimeline from './ObjectTimeline';
import { createTimeline, requestAnimation } from '../../../View/Canvas/helper';
import BlinkOption from './BlinkOption';
import ScaleOption from './ScaleOption';
import { max } from '../../../Dialog';
import { EFFECTBASICFORM, effects, selectDialog, setEffectClip, setSnackbarMessage, totalFilters } from '../../../../../slices/dialog';
import SoundOption from './SoundOption';
import { useDispatch, useSelector } from 'react-redux';
import FilterOption from './FilterOption';
import RotateOption from './RotateOption';

export default function Effect({ object }: { object: fabric.Object }) {
    const { effectClip, currentTarget } = useSelector(selectDialog);
    const [collapse, setCollapse] = useState<boolean[]>(object.data?.effects?.map(() => false) || []);
    const [cancel, setCancel] = useState<Function | undefined>();
    const [time, setTime] = useState(0);
    const [timeline, setTimeline] = useState(createTimeline({ effects: object.data?.effects || [], object }));
    const dispatch = useDispatch();

    const onCollapseIconClick = (index: number) => {
        setCollapse(collapse.map((el, i) => (i === index ? !el : el)));
    };
    // ADD EFFECT
    const onAddEffectClick = () => {
        const effects = { type: 'fadeIn', timeline: [0, 0] };
        const data = object.get('data');
        if (!data.effects) {
            object.set('data', { ...data, effects: [effects] });
        } else {
            object.set('data', { ...data, effects: [...data.effects, effects] });
        }
        setCollapse([...collapse, false]);
        onTimelineCommitted();
    };

    // COPY EFFECT
    const onCopyEffectClick = (index: number) => {
        const data = object.get('data');
        if (!data.effects) return;
        const display = effects.find((el) => el.value === data.effects[index].type)?.display;
        dispatch(setEffectClip(data.effects[index]));
        dispatch(setSnackbarMessage(`COPY ${display} EFFECT`));
    };

    // COPY ALL EFFECT
    const onCopyAllEffectClick = () => {
        const data = object.get('data');
        if (!data.effects) return;
        dispatch(setEffectClip(data.effects));
        dispatch(setSnackbarMessage(`COPY OBJECT EFFECT`));
    };

    // PASTE ALL EFFECT
    const onPasteAllEffecClick = () => {
        if (!effectClip) return;
        const data = object.get('data');
        object.set('data', { ...data, effects: (data.effects || []).concat(effectClip) });
        onTimelineCommitted();
        if (Array.isArray(effectClip)) {
            dispatch(setSnackbarMessage('PASTE EFFECT'));
        } else {
            const display = effects.find((el) => el.value === effectClip.type)?.display;
            dispatch(setSnackbarMessage(`PASTE ${display} EFFECT`));
        }
    };

    // REMOVE EFFECT
    const onRemoveEffectClick = (index: number) => {
        const data = object.get('data');
        if (!data.effects) return;
        object.set('data', { ...data, effects: data.effects.filter((effect: EFFECTBASICFORM, i: number) => i !== index) });
        onTimelineCommitted();
        setCollapse(collapse.filter((el, i) => i !== index));
    };

    // CHANGE EFFECT
    const onEffectChange = (type: string, index: number) => {
        if (!object.data?.effects) return;
        const data = object.data.effects.map((effect: EFFECTBASICFORM, i: number) => {
            if (i === index) return { ...effect, type };
            return { ...effect };
        });
        object.set('data', { ...object.get('data'), effects: data });
        onTimelineCommitted();
    };
    // CREATE TIMELINE EVERY CHANGE
    const onTimelineCommitted = useCallback(() => {
        if (!object.data?.effects || !!cancel) return;
        const timeline = createTimeline({ effects: object.data?.effects, object });
        setTimeline(timeline);
    }, [object, cancel]);

    const onPlayClick = () => {
        if (!timeline) return;
        if (!!cancel) {
            cancel();
            return;
        }
        const onChange = (value: number) => {
            timeline.excute(value);
            setTime(value);
            if (value >= timeline.endTime) {
                animate.stop();
                timeline.init();
                setTime(0);
                setCancel(undefined);
            }
        };

        const animate = requestAnimation({
            duration: max * 1000,
            onChange,
            onComplete: () => {
                animate.stop();
                timeline.init();
                setTime(0);
                setCancel(undefined);
            }
        });
        animate.start();

        setCancel(() => () => {
            animate.stop();
            timeline.init();
            setTime(0);
            setCancel(undefined);
        });
    };

    // UPDATE COLLAPSE IN CHANGE EFFECT
    useEffect(() => {
        const effectLen = object.data?.effects?.length || 0;
        const collapseLen = collapse?.length || 0;
        const diff = effectLen - collapseLen;
        if (diff > 0) {
            setCollapse((prev) => {
                const col = [];
                for (let index = 0; index < diff; index++) {
                    col.push(false);
                }
                return [...prev, ...col];
            });
        }
    }, [object.data?.effects?.length, collapse?.length]);

    // CREATE TIMELINE EVERY TARGET
    useEffect(() => {
        onTimelineCommitted();
    }, [currentTarget, onTimelineCommitted]);

    return (
        <Box sx={{ p: 1, position: 'relative' }}>
            {object.data?.effects?.map((effect: EFFECTBASICFORM, i: number) => (
                <Box key={`effect-${effect.type}-${i}`}>
                    <Grid container alignItems='center'>
                        <Grid sx={{ pl: 1, width: '220px' }} item>
                            <Header
                                type={effect.type}
                                collapse={collapse[i]}
                                setCollapse={() => onCollapseIconClick(i)}
                                disabled={!!cancel}
                                onRemoveClick={() => onRemoveEffectClick(i)}
                                onCopyClick={() => onCopyEffectClick(i)}
                            />
                            <Collapse in={collapse[i]}>
                                <Selector type={effect.type} onChange={(type) => onEffectChange(type, i)} disabled={!!cancel} />
                                {effect.type === 'move' && <MoveOption object={object} index={i} disabled={!!cancel} onChangeCommitted={() => onTimelineCommitted()} />}
                                {effect.type === 'blink' && <BlinkOption object={object} index={i} disabled={!!cancel} onChangeCommitted={() => onTimelineCommitted()} />}
                                {effect.type === 'scale' && <ScaleOption object={object} index={i} disabled={!!cancel} onChangeCommitted={() => onTimelineCommitted()} />}
                                {effect.type === 'sound' && <SoundOption object={object} index={i} disabled={!!cancel} onChangeCommitted={() => onTimelineCommitted()} />}
                                {effect.type === 'rotate' && <RotateOption object={object} index={i} disabled={!!cancel} onChangeCommitted={() => onTimelineCommitted()} />}
                                {totalFilters.includes(effect.type) && (
                                    <FilterOption object={object} index={i} disabled={!!cancel} onChangeCommitted={() => onTimelineCommitted()} />
                                )}
                            </Collapse>
                        </Grid>
                        <Divider flexItem orientation='vertical' />
                        <Grid sx={{ flex: 1, pt: 0.5 }} item>
                            <TimelineOption object={object} index={i} disabled={!!cancel} onChangeCommitted={() => onTimelineCommitted()} />
                        </Grid>
                    </Grid>
                    <Divider sx={{ m: '4px 0' }} />
                </Box>
            ))}
            {!!cancel && (
                <Grid sx={{ position: 'absolute', p: 1, inset: '0', bottom: '115px' }} container>
                    <Grid sx={{ pl: 1, width: '221px' }} item></Grid>
                    <Grid sx={{ flex: 1, p: '0 16px' }} item>
                        <LinearProgress sx={{ height: '100%' }} variant='determinate' value={(time / (max * 1000)) * 100} />
                    </Grid>
                </Grid>
            )}
            {!!object.data?.effects && object.data.effects.length !== 0 && timeline && (
                <React.Fragment>
                    <ObjectTimeline timeline={timeline} disabled={!!cancel} />
                    <Divider sx={{ m: '4px 0' }} />
                </React.Fragment>
            )}
            <Grid container>
                <Button sx={{ m: 1 }} size='small' startIcon={<AddIcon />} variant='outlined' onClick={onAddEffectClick} disabled={!!cancel}>
                    ADD EFFECT
                </Button>
                {!!object.data?.effects && object.data.effects.length !== 0 && (
                    <Button sx={{ m: 1 }} size='small' startIcon={<ContentPasteIcon />} variant='outlined' onClick={onCopyAllEffectClick} disabled={!!cancel}>
                        COPY ALL EFFECT
                    </Button>
                )}
                {!!effectClip && (
                    <Button sx={{ m: 1 }} size='small' startIcon={<ContentPasteGoIcon />} variant='outlined' onClick={onPasteAllEffecClick} disabled={!!cancel}>
                        PASTE ALL EFFECT
                    </Button>
                )}
            </Grid>
            {!!object.data?.effects && object.data.effects.length !== 0 && (
                <React.Fragment>
                    <Divider sx={{ m: '4px 0' }} />
                    <Grid container alignItems='center'>
                        <Button sx={{ m: 1, borderRadius: '8px' }} size='small' color='warning' variant='contained' onClick={onPlayClick}>
                            {!!cancel ? 'STOP' : 'PLAY'}
                        </Button>
                        <Typography sx={{ ml: 1 }} className='dia-subtitle'>
                            {(time / 1000).toFixed(2)}s
                        </Typography>
                    </Grid>
                </React.Fragment>
            )}
        </Box>
    );
}
