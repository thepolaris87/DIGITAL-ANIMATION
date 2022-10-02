import { Box, Button, Collapse, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setEffects } from '../../../../../../slices/intro';
import Header from './Header';

import AddIcon from '@mui/icons-material/Add';
import Selector from './Selector';
import TimelineOption from './TimelineOption';
import MoveOption from './MoveOption';
import ObjectTimeline from './ObjectTimeline';
import { createTimeline, requestAnimation } from '../../../View/Canvas/helper';

import BlinkOption from './BlinkOption';
import ScaleOption from './ScaleOption';
import { max } from '../../../Dialog';

type EFFECT = { [key: string]: any; type: string; disabledAddEffect?: boolean; disabledPlay?: boolean; disabledTimeline?: boolean };

export default function Effect({ target: currentTarget }: { target: EFFECT }) {
    const { data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data && data.find(({ dialogId }) => dialogId === currentDialog), [data, currentDialog]);
    const effectList = useMemo(() => {
        if (targetData) {
            if (currentTarget.type === 'image') {
                const images = targetData?.images?.find((el) => el.id === currentTarget.object.data.id);
                if (images?.effects) return images?.effects;
            }
            if (currentTarget.type === 'character') {
                const characters = targetData?.characters?.find((el) => el.id === currentTarget.object.data.id);
                if (characters?.effects) return characters?.effects;
            }
        }
        return [];
    }, [targetData, currentTarget]);
    const [collapse, setCollapse] = useState<boolean[]>(effectList.map(() => false));
    const [cancel, setCancel] = useState<Function | undefined>();
    const [time, setTime] = useState('0');
    const timeline = useMemo(() => createTimeline({ effects: effectList, object: currentTarget.object }), [effectList, currentTarget]);
    const dispatch = useDispatch();

    const onCollapseIconClick = (index: number) => {
        setCollapse(collapse.map((el, i) => (i === index ? !el : el)));
    };

    const onAddEffectClick = () => {
        dispatch(setEffects([...effectList, { type: 'fadeIn', timeline: [0, 0] }]));
        setCollapse([...collapse, false]);
    };
    const onRemoveEffectClick = (index: number) => {
        setCollapse(collapse.filter((el, i) => i !== index));
    };

    const onPlayClick = () => {
        const init = () => {
            timeline.init();
            setTime('0');
            setCancel(undefined);
        };
        if (!!cancel) {
            cancel();
            init();
            return;
        }

        const onChange = (value: number) => {
            timeline.excute(value);
            if (Math.abs(Number(time) - value) > 100) setTime((value / 1000).toFixed(2));
            if (timeline.endTime < value) {
                //@ts-ignore
                cancelAnim();
                init();
            }
        };

        const cancelAnim = requestAnimation({ duration: max * 1000, onChange, onComplete: init });

        setCancel(() => cancelAnim);
    };

    return (
        <Box sx={{ p: 1, position: 'relative' }}>
            {effectList.map((el, i) => (
                <Box key={`effect-${i}`}>
                    <Grid container alignItems='center'>
                        <Grid sx={{ pl: 1, width: '200px' }} item>
                            <Header
                                effectList={effectList}
                                index={i}
                                collapse={collapse[i]}
                                setCollapse={() => onCollapseIconClick(i)}
                                disabled={!!cancel}
                                onRemoveClick={() => onRemoveEffectClick(i)}
                            />
                            <Collapse in={collapse[i]}>
                                <Selector effectList={effectList} index={i} disabled={!!cancel} />
                                {el.type === 'move' && <MoveOption effectList={effectList} index={i} disabled={!!cancel} />}
                                {el.type === 'blink' && <BlinkOption effectList={effectList} index={i} disabled={!!cancel} />}
                                {el.type === 'scale' && <ScaleOption effectList={effectList} index={i} disabled={!!cancel} />}
                            </Collapse>
                        </Grid>
                        <Divider flexItem orientation='vertical' />
                        <Grid sx={{ flex: 1 }} item>
                            <TimelineOption timeline={el.timeline} effectList={effectList} index={i} disabled={!!cancel} />
                        </Grid>
                    </Grid>
                    <Divider sx={{ m: '4px 0' }} />
                </Box>
            ))}
            {!!cancel && (
                <Grid sx={{ position: 'absolute', p: 1, inset: '0', bottom: '115px' }} container>
                    <Grid sx={{ pl: 1, width: '201px' }} item></Grid>
                    <Grid sx={{ flex: 1, p: '0 16px' }} item>
                        <LinearProgress sx={{ height: '100%' }} variant='determinate' value={((Number(time) * 1000) / (max * 1000)) * 100} />
                    </Grid>
                </Grid>
            )}
            {effectList.length !== 0 && !cancel && (
                <React.Fragment>
                    <ObjectTimeline timeline={timeline} disabled={!!cancel} />
                    <Divider sx={{ m: '4px 0' }} />
                </React.Fragment>
            )}
            <Button sx={{ m: 1 }} size='small' startIcon={<AddIcon />} variant='outlined' onClick={onAddEffectClick} disabled={!!cancel}>
                ADD EFFECT
            </Button>
            {effectList.length !== 0 && (
                <React.Fragment>
                    <Divider sx={{ m: '4px 0' }} />
                    <Grid container alignItems='center'>
                        <Button sx={{ m: 1, borderRadius: '8px' }} size='small' color='warning' variant='contained' onClick={onPlayClick}>
                            {!!cancel ? 'STOP' : 'PLAY'}
                        </Button>
                        <Typography sx={{ ml: 1 }} className='jei-intro-subtitle'>
                            {time}s
                        </Typography>
                    </Grid>
                </React.Fragment>
            )}
        </Box>
    );
}
