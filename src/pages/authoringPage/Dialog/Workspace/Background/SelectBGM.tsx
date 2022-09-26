import { Grid, Select, SelectChangeEvent, Typography, MenuItem, IconButton } from '@mui/material';

import type { GETSOUND } from '../../../../../apis/api';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setBGM } from '../../../../../slices/intro';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import { sound } from '../../../../../utils/utils';

// 사운드 디비전 코드
// 04 : background
export default function SelectBGM({ data }: { data: GETSOUND[] }) {
    const { data: _data, currentDialog } = useSelector(selectIntro);
    const dispatch = useDispatch();
    const soundList = useMemo(() => data.filter((el) => el.soundDivisionCode === '04'), [data]);
    const targetData = useMemo(() => _data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, _data]);
    const soundBGM = useMemo(() => targetData?.bgm && sound(`${process.env.REACT_APP_SOL}/sounds/D1/${targetData?.bgm?.src}.${targetData?.bgm?.extension}`), [targetData?.bgm]);
    const [isPlay, setIsPlay] = useState(false);

    const onBGMChange = (e: SelectChangeEvent<any>) => {
        const target = soundList.find((el) => el.soundId === e.target.value);
        target && dispatch(setBGM({ src: target.soundId, extension: target.extension, soundDivisionCode: target.soundDivisionCode }));
    };

    const onSoundPlayClick = () => {
        if (soundBGM) {
            soundBGM.play();
            soundBGM.audio.onended = () => setIsPlay(false);
            setIsPlay(true);
        }
    };

    const onSoundStopClick = () => {
        soundBGM?.stop();
    };

    useEffect(() => {
        if (!targetData?.bgm && soundList) dispatch(setBGM({ src: soundList[0].soundId, extension: soundList[0].extension, soundDivisionCode: soundList[0].soundDivisionCode }));
    }, [targetData?.bgm, soundList, dispatch]);

    return (
        <Grid sx={{ mt: 2 }} container alignItems='center'>
            <Grid sx={{ mr: 2, width: '110px' }} item>
                <Typography className='jei-intro-title'>BGM</Typography>
            </Grid>
            <Select value={targetData?.bgm?.src || soundList[0].soundId} size='small' onChange={onBGMChange}>
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
    );
}
