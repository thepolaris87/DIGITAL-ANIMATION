import { Divider, Grid, IconButton, Typography, Tooltip } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import React, { useMemo, useState } from 'react';
import MetaModal from '../../../../../components/MetaModal';

import { useSelector } from 'react-redux';
import { EFFECTBASICFORM, effects, selectDialog } from '../../../../../slices/dialog';
import TimelineOption from './TimelineOption';
import { postMessage } from '../../../../../utils/util';
import { useQueryClient } from 'react-query';
import { GETSOUND } from '../../../../../apis/api';

const getDisplayName = (type: string) => effects.find((el) => el.value === type)?.display || '';

export default function Timeline() {
    const { render, currentDialog } = useSelector(selectDialog);
    const canvasObjects = render?.[currentDialog]?.getObjects();
    const dialogs = useMemo(() => canvasObjects?.filter((object) => ['script'].includes(object.data.type)) || [], [canvasObjects]);
    const queryClient = useQueryClient();
    const soundData = queryClient.getQueryData<GETSOUND[]>(['dialog', 'sound']);

    const objects = useMemo(
        () => canvasObjects?.filter((object) => ['character', 'basic', 'text'].includes(object.data.type) && !!object.data.effects && object.data.effects?.length !== 0) || [],
        [canvasObjects]
    );

    const [open, setOpen] = useState(false);
    const onTimelineClick = () => {
        setOpen(!open);
        postMessage({ code: 'open' });
    };
    const onClose = () => {
        setOpen(!open);
        postMessage({ code: 'close' });
    };

    return (
        <>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='timeline' placement='bottom-end'>
                <IconButton onClick={onTimelineClick}>
                    <TimelineIcon />
                </IconButton>
            </Tooltip>
            <MetaModal title='Timeline' open={open} onClose={onClose} save={false}>
                {/* DIALOGS */}
                <Grid sx={{ border: '1px solid #7575' }} container alignItems='center'>
                    <Grid sx={{ p: 1, width: '175px' }} item>
                        <Typography variant='h5'>DIALOGS</Typography>
                    </Grid>
                    <Divider flexItem orientation='vertical' />
                    <Grid sx={{ p: 1, flex: 1 }} item>
                        {dialogs.map((dialog, i) => {
                            const koTTS = soundData?.find((data) => data.soundId === dialog.data?.koTTS.src);
                            const enTTS = soundData?.find((data) => data.soundId === dialog.data?.enTTS.src);

                            return (
                                <React.Fragment key={dialog.data.id}>
                                    {i !== 0 && <Divider />}
                                    <Grid sx={{ p: 1 }} container alignItems='center'>
                                        <Grid sx={{ width: '150px', mr: 2 }} item>
                                            <Typography className='jei-title'>ID : {dialog.data.src}</Typography>
                                            <Grid container>
                                                <Typography sx={{ fontSize: '14px', whiteSpace: 'noWrap' }} className='jei-title'>{`${
                                                    koTTS && `KO : ${(Number(koTTS.duration || 0) / 1000).toFixed(2)} / `
                                                }${enTTS && `EN : ${(Number(enTTS.duration || 0) / 1000).toFixed(2)}`}`}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid sx={{ flex: 1 }} item>
                                            <TimelineOption object={dialog} timeline={dialog.data.effect.appearance} type={dialog.data.type} />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                </Grid>
                {/* OBJECTS */}
                <Grid sx={{ border: '1px solid #7575', mt: 2 }} container alignItems='center'>
                    <Grid sx={{ p: 1, width: '175px' }} item>
                        <Typography variant='h5'>OBJECTS</Typography>
                    </Grid>
                    <Divider flexItem orientation='vertical' />
                    <Grid sx={{ p: 1, flex: 1 }} item>
                        {objects.map((object, i) => (
                            <React.Fragment key={object.data.id}>
                                {i !== 0 && <Divider />}
                                <Grid sx={{ p: 1, flex: 1 }} container alignItems='center'>
                                    <Grid sx={{ width: '50px', height: '50px', pr: 2 }} container justifyContent='center'>
                                        {object.data.type === 'text' ? (
                                            <Grid sx={{ width: '50px', height: '50px', overflow: 'hidden', wordBreak: 'keep-all' }} container alignItems='center'>
                                                {(object as fabric.Textbox).text}
                                            </Grid>
                                        ) : (
                                            <img style={{ width: '50px', height: '50px' }} src={(object as fabric.Image).getSrc()} alt={object.data.type}></img>
                                        )}
                                    </Grid>
                                    <Divider orientation='vertical' flexItem />
                                    <Grid sx={{ flex: 1 }} item>
                                        {object.data.effects.map((effect: EFFECTBASICFORM, j: number) => (
                                            <Grid key={effect.type + '-' + j} container alignItems='center'>
                                                <Grid sx={{ width: '116px', p: 1 }} item>
                                                    <Typography className='jei-subtitle' sx={{ color: '#F8B00C !important' }}>
                                                        {getDisplayName(effect.type)}
                                                    </Typography>
                                                </Grid>
                                                <Grid sx={{ flex: 1 }} item>
                                                    <TimelineOption object={object} timeline={effect.timeline} type={object.data.type} index={j} />
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </MetaModal>
        </>
    );
}
