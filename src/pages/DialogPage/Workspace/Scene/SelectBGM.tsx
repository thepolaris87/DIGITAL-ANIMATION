import { Grid, Select, SelectChangeEvent, Typography, MenuItem, IconButton, Switch } from '@mui/material';

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
    const queryClient = useQueryClient();
    const soundData = queryClient.getQueryData<GETSOUND[]>(['dialog', 'sound']);
    const [isPlay, setIsPlay] = useState(false);
    const soundList = useMemo(() => soundData?.filter((el) => el.soundDivisionCode === '04' || el.extension), [soundData]);
    const targetData = useMemo(() => data.dialog.find(({ id }) => id === currentDialog), [currentDialog, data]);
    const soundBGM = useMemo(
        () => targetData?.scene?.bgm && sound(`https://sol-api.esls.io/sounds/A1/${targetData?.scene?.bgm?.src}.${targetData?.scene?.bgm?.extension}`),
        [targetData?.scene?.bgm]
    );
    const dispatch = useDispatch();

    const onUseBGMChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (!soundList || soundList.length === 0) return;
        if (!checked) dispatch(setBGM({ src: '', extension: '', soundDivisionCode: '' }));
        else dispatch(setBGM({ src: soundList[0].soundId, extension: soundList[0].extension, soundDivisionCode: soundList[0].soundDivisionCode }));
    };

    const onBGMChange = (e: SelectChangeEvent<any>) => {
        if (soundList) {
            const target = soundList.find((el) => el.soundId === e.target.value);
            target && dispatch(setBGM({ src: target.soundId, extension: target.extension, soundDivisionCode: target.soundDivisionCode }));
            onSoundStopClick();
        }
    };

    const onSoundPlayClick = () => {
        if (soundBGM) {
            soundBGM.play();
            soundBGM.audio.onended = () => setIsPlay(false);
            setIsPlay(true);
        }
    };

    const onSoundStopClick = () => {
        if (soundBGM) {
            soundBGM?.stop();
            setIsPlay(false);
        }
    };

    if (!soundList) return null;

    return (
        <>
            <Grid sx={{ mt: 2 }} container item alignItems='center' wrap='nowrap'>
                <Grid sx={{ mr: 2, width: '110px' }} item>
                    <Typography className='jei-title'>USE BGM</Typography>
                </Grid>
                <Switch checked={!!targetData?.scene?.bgm} onChange={onUseBGMChange} />
            </Grid>
            {!!targetData?.scene?.bgm && (
                <Grid sx={{ mt: 2 }} container item alignItems='center' wrap='nowrap'>
                    <Grid sx={{ mr: 2, width: '110px' }} item>
                        <Typography className='jei-title'>BGM</Typography>
                    </Grid>
                    <Select value={targetData?.scene.bgm?.src || soundList[0].soundId} size='small' onChange={onBGMChange} sx={{ background: 'white' }}>
                        {soundList.map((el) => (
                            <MenuItem key={el.soundId} value={el.soundId}>
                                {el.soundId}
                            </MenuItem>
                        ))}
                    </Select>
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
        </>
    );
}
