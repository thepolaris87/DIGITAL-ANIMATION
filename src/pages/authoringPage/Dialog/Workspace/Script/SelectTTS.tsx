import { Grid, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETSOUND } from '../../../../../apis/api';
import { selectIntro, setScripts, TTSBASICFORM } from '../../../../../slices/intro';
import { sound } from '../../../../../utils/utils';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

// 사운드 디비전 코드
// 04 : 대사
export default function SelectTTS() {
    const { data, currentDialog } = useSelector(selectIntro);
    const queryClient = useQueryClient();
    const soundData = queryClient.getQueryData<GETSOUND[]>(['intro', 'sound']);
    const soundList = useMemo(() => soundData && soundData.filter((el) => el.soundDivisionCode === '04' && el.extension), [soundData]);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const [isPlay, setIsPlay] = useState<'ko' | 'en' | 'none'>('none');
    const dispatch = useDispatch();

    const koTTS = useMemo(
        () => targetData?.scripts?.[0]?.tts?.ko && sound(`${process.env.REACT_APP_SOL}/sounds/D1/${targetData.scripts[0].tts.ko.src}.${targetData.scripts[0].tts.ko.extension}`),
        [targetData?.scripts]
    );
    const enTTS = useMemo(
        () => targetData?.scripts?.[0]?.tts?.en && sound(`${process.env.REACT_APP_SOL}/sounds/D1/${targetData.scripts[0].tts.en.src}.${targetData.scripts[0].tts.en.extension}`),
        [targetData?.scripts]
    );

    const onTTSChange = (e: SelectChangeEvent<any>, locale: 'ko' | 'en', id: string | undefined) => {
        if (soundList && id) {
            const target = soundList.find((el) => el.soundId === e.target.value);
            if (target) {
                const counterLocale = locale === 'ko' ? 'en' : 'ko';
                const ttsChangeData = { src: target.soundId, extension: target.extension, soundDivisionCode: target.soundDivisionCode };
                const ttsOriginData = (targetData?.scripts?.[0]?.tts && targetData.scripts[0].tts[counterLocale]) || {
                    src: soundList[0].soundId,
                    extension: soundList[0].extension,
                    soundDivisionCode: soundList[0].soundDivisionCode
                };
                const ttsData = { [locale]: ttsChangeData, [counterLocale]: ttsOriginData } as { ko: TTSBASICFORM; en: TTSBASICFORM };
                dispatch(setScripts({ id, key: 'tts', data: ttsData }));
            }
        }
    };

    const onSoundPlayClick = (locale: 'ko' | 'en') => {
        if (locale === 'ko' && koTTS) {
            enTTS?.stop();
            koTTS.play();
            koTTS.audio.onended = () => setIsPlay('none');
            setIsPlay('ko');
        }
        if (locale === 'en' && enTTS) {
            koTTS?.stop();
            enTTS.play();
            enTTS.audio.onended = () => setIsPlay('none');
            setIsPlay('en');
        }
    };

    const onSoundStopClick = () => {
        koTTS?.stop();
        enTTS?.stop();
        setIsPlay('none');
    };

    if (!soundList || soundList.length === 0) return null;

    return (
        <Grid sx={{ background: '#fff', mt: 4, p: '8px 16px', borderRadius: '12px', border: '1px solid #999999' }} container>
            <Grid sx={{ flex: 1, m: '8px 0' }} container alignItems='center' wrap='nowrap'>
                <Grid sx={{ minWidth: '60px', mr: 2 }} item>
                    <Typography className='jei-intro-title'>KO TTS</Typography>
                </Grid>
                <Grid container wrap='nowrap'>
                    <Select value={targetData?.scripts?.[0]?.tts?.ko.src || soundList[0].soundId} size='small' onChange={(e) => onTTSChange(e, 'ko', targetData?.scripts?.[0].id)}>
                        {soundList.map((el) => (
                            <MenuItem key={el.soundId} value={el.soundId}>
                                {el.soundId}
                            </MenuItem>
                        ))}
                    </Select>
                    {isPlay !== 'ko' && (
                        <IconButton onClick={() => onSoundPlayClick('ko')}>
                            <PlayCircleIcon />
                        </IconButton>
                    )}
                    {isPlay === 'ko' && (
                        <IconButton onClick={() => onSoundStopClick()}>
                            <StopCircleIcon />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
            <Grid sx={{ flex: 1, m: '8px 0' }} container alignItems='center' wrap='nowrap'>
                <Grid sx={{ minWidth: '60px', mr: 2 }} item>
                    <Typography className='jei-intro-title'>EN TTS</Typography>
                </Grid>
                <Grid container wrap='nowrap'>
                    <Select value={targetData?.scripts?.[0]?.tts?.en.src || soundList[0].soundId} size='small' onChange={(e) => onTTSChange(e, 'en', targetData?.scripts?.[0].id)}>
                        {soundList.map((el) => (
                            <MenuItem key={el.soundId} value={el.soundId}>
                                {el.soundId}
                            </MenuItem>
                        ))}
                    </Select>
                    {isPlay !== 'en' && (
                        <IconButton onClick={() => onSoundPlayClick('en')}>
                            <PlayCircleIcon />
                        </IconButton>
                    )}
                    {isPlay === 'en' && (
                        <IconButton onClick={() => onSoundStopClick()}>
                            <StopCircleIcon />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}
