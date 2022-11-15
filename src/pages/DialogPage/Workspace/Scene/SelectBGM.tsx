import { Grid, Select, SelectChangeEvent, Typography, MenuItem, IconButton, Switch, Button } from '@mui/material';

import type { GETSOUND } from '../../../../apis/api';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import { sound } from '../../../../utils/util';
import { selectDialog, setBGM } from '../../../../slices/dialog';
import { useQueryClient } from 'react-query';

// 사운드 디비전 코드
// 04 : background
export default function SelectBGM() {
    const { data, currentDialog } = useSelector(selectDialog);
    const [isPlay, setIsPlay] = useState(false);
    const targetData = useMemo(() => data.dialog.find(({ id }) => id === currentDialog), [currentDialog, data]);
    const BGMSound = useMemo(() => targetData?.scene.bgm?.src && sound(targetData?.scene.bgm?.src), [targetData?.scene.bgm?.src]);
    const dispatch = useDispatch();

    const onUseBGMChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        dispatch(setBGM({ src: '', name: '' }));
    };

    const onBGMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadSound = e.target?.files?.[0];
        if (uploadSound) {
            const src = window.URL.createObjectURL(uploadSound);
            dispatch(setBGM({ src, name: uploadSound.name }));
        }
        onSoundStopClick();
    };

    const onSoundPlayClick = () => {
        if (BGMSound) {
            BGMSound.play();
            setIsPlay(true);
        }
    };

    const onSoundStopClick = () => {
        if (BGMSound) {
            BGMSound.stop();
            setIsPlay(false);
        }
    };

    return (
        <>
            <Grid sx={{ mt: 2 }} container item alignItems='center' wrap='nowrap'>
                <Grid sx={{ mr: 2, width: '110px' }} item>
                    <Typography className='dia-title'>USE BGM</Typography>
                </Grid>
                <Switch checked={!!targetData?.scene?.bgm} onChange={onUseBGMChange} />
            </Grid>
            {!!targetData?.scene?.bgm && (
                <Grid sx={{ mt: 2 }} container item alignItems='center' wrap='nowrap'>
                    <Grid sx={{ mr: 2, width: '110px' }} item>
                        <Button variant='outlined' component='label'>
                            Upload
                            <input hidden accept='audio/*' type='file' onChange={onBGMChange} />
                        </Button>
                    </Grid>
                    {targetData.scene.bgm.name && (
                        <Grid container alignItems='center'>
                            <Typography className='dia-subtitle'>{targetData.scene.bgm.name}</Typography>
                            {!isPlay && (
                                <IconButton onClick={onSoundPlayClick}>
                                    <PlayCircleIcon />
                                </IconButton>
                            )}
                            {isPlay && (
                                <IconButton onClick={onSoundStopClick}>
                                    <StopCircleIcon />
                                </IconButton>
                            )}
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
}
