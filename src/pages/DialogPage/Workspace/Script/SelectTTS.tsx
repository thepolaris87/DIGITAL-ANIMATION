import { Grid, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { GETSOUND } from '../../../../apis/api';
import { sound } from '../../../../utils/util';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { divisionCode } from '../../View/Canvas/helper';

export default function SelectTTS({ object }: { object: fabric.Textbox }) {
    const queryClient = useQueryClient();
    const soundData = queryClient.getQueryData<GETSOUND[]>(['dialog', 'sound']);
    // const soundList = useMemo(() => soundData && soundData.filter((el) => el.soundDivisionCode === divisionCode.sound.tts && el.extension), [soundData]);
    const soundList = useMemo(() => soundData && soundData.filter((el) => el.extension), [soundData]);
    const [tts, setTTS] = useState<{ ko: ReturnType<typeof sound> | undefined; en: ReturnType<typeof sound> | undefined }>();
    const [isPlay, setIsPlay] = useState<'ko' | 'en' | 'none'>('none');

    const onTTSChange = (e: SelectChangeEvent<any>, locale: string) => {
        if (!soundList || !tts) return;
        const target = soundList.find((el) => el.soundId === e.target.value);
        const data = object.get('data');
        if (target) {
            const _sound = sound(`https://sol-api.esls.io/sounds/A1/${target.soundId}.${target.extension}`);
            const _tts = { src: target.soundId, soundDivisionCode: target.soundDivisionCode, extension: target.extension };
            if (locale === 'ko') {
                object.set('data', { ...data, koTTS: _tts });
                setTTS({ ...tts, ko: _sound });
            }
            if (locale === 'en') {
                object.set('data', { ...data, enTTS: _tts });
                setTTS({ ...tts, en: _sound });
            }
        } else {
            object.set('data', { ...data, koTTS: { src: 'none' } });
        }        
        tts.ko && tts.ko.stop();
        tts.en && tts.en.stop();
        setIsPlay('none');
    };

    const onSoundPlayClick = (locale: 'ko' | 'en') => {
        if (!tts) return;
        if (locale === 'ko') {
            if (tts.en) tts.en.stop();
            if (tts.ko) {
                tts.ko.play();
                tts.ko.audio.onended = () => setIsPlay('none');
                setIsPlay('ko');
            }
        }
        if (locale === 'en') {
            if (tts.ko) tts.ko.stop();
            if (tts.en) {
                tts.en.play();
                tts.en.audio.onended = () => setIsPlay('none');
                setIsPlay('en');
            }
        }
    };

    const onSoundStopClick = () => {
        if (!tts) return;
        tts.ko && tts.ko.stop();
        tts.en && tts.en.stop();
        setIsPlay('none');
    };

    useEffect(() => {
        if (!tts) {
            const ko = object.data.koTTS.src !== 'none' ? sound(`https://sol-api.esls.io/sounds/A1/${object.data.koTTS.src}.${object.data.koTTS.extension}`) : undefined;
            const en = object.data.enTTS.src !== 'none' ? sound(`https://sol-api.esls.io/sounds/A1/${object.data.enTTS.src}.${object.data.enTTS.extension}`) : undefined;
            setTTS({ ko, en });
        }
    }, [tts, object]);

    if (!soundList || soundList.length === 0) return null;

    return (
        <Grid sx={{ mb: 1 }} container>
            <Grid sx={{ flex: 1 }} container alignItems='center' wrap='nowrap'>
                <Grid sx={{ minWidth: '60px', mr: 2 }} item>
                    <Typography className='jei-title'>KO TTS</Typography>
                </Grid>
                <Grid container wrap='nowrap'>
                    <Select sx={{ mr: 1 }} value={object.data.koTTS.src} size='small' onChange={(e) => onTTSChange(e, 'ko')}>
                        <MenuItem value={'none'}>NONE</MenuItem>
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
            <Grid sx={{ flex: 1 }} container alignItems='center' wrap='nowrap'>
                <Grid sx={{ minWidth: '60px', mr: 2 }} item>
                    <Typography className='jei-title'>EN TTS</Typography>
                </Grid>
                <Grid container wrap='nowrap'>
                    <Select sx={{ mr: 1 }} value={object.data.enTTS.src} size='small' onChange={(e) => onTTSChange(e, 'en')}>
                        <MenuItem value={'none'}>NONE</MenuItem>
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
