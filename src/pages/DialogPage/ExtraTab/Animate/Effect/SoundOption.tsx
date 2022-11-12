import { Grid, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { GETSOUND } from '../../../../../apis/api';
import { divisionCode } from '../../../View/Canvas/helper';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { EFFECTBASICFORM } from '../../../../../slices/dialog';
import { sound as _sound } from '../../../../../utils/util';

export default function SoundOption({ object, index, disabled, onChangeCommitted }: { object: fabric.Object; index: number; disabled?: boolean; onChangeCommitted?: () => void }) {
    const [update, setUpdate] = useState(false);
    const [sound, setSound] = useState<undefined | ReturnType<typeof _sound>>();
    const queryClient = useQueryClient();
    const soundData = queryClient.getQueryData<GETSOUND[]>(['dialog', 'sound']);
    const soundList = useMemo(() => soundData && soundData.filter((el) => el.soundDivisionCode === divisionCode.sound.basic || el.extension), [soundData]);

    const [isPlay, setIsPlay] = useState(false);

    const onSoundPlayClick = () => {
        if (!sound) {
            const audio = _sound(`https://sol-api.esls.io/sounds/A1/${object.data.effects[index].option.src}.${object.data.effects[index].option.extension}`);
            setSound(audio);
            audio.play();
        } else {
            sound.play();
        }
        setIsPlay(true);
    };
    const onSoundStopClick = () => {
        if (sound) {
            sound.stop();
            setIsPlay(false);
        }
    };

    const onChange = (e: SelectChangeEvent<any>) => {
        const target = soundList?.find((sound) => sound.soundId === e.target.value);
        if (target) {
            const data = object.get('data');
            const effects = data.effects.map((effect: EFFECTBASICFORM, i: number) => {
                if (i === index) return { ...effect, option: { ...(effect.option || {}), src: target.soundId, extension: target.extension } };
                return effect;
            });
            object.set('data', { ...data, effects });
            isPlay && sound?.stop();
            setUpdate(!update);
            setIsPlay(false);
            onChangeCommitted?.();
        }
        setSound(undefined);
    };

    useEffect(() => {
        if (!object.data.effects[index].option && soundList && soundList.length !== 0) {
            const data = object.get('data');
            const effects = data.effects.map((effect: EFFECTBASICFORM, i: number) => {
                if (i === index) return { ...effect, option: { ...(effect.option || {}), src: soundList[0].soundId, extension: soundList[0].extension } };
                return effect;
            });
            object.set('data', { ...data, effects });
        }
    }, [object, index, soundList]);

    if (!soundList || soundList.length === 0) return null;

    return (
        <Grid sx={{ p: 1 }} container wrap='nowrap'>
            <Select value={object.data?.effects[index]?.option?.src || soundList[0].soundId} size='small' onChange={(e) => onChange(e)} disabled={disabled}>
                {soundList.map((el) => (
                    <MenuItem key={el.soundId} value={el.soundId}>
                        {el.soundId}
                    </MenuItem>
                ))}
            </Select>
            {!isPlay && (
                <IconButton onClick={() => onSoundPlayClick()}>
                    <PlayCircleIcon />
                </IconButton>
            )}
            {isPlay && (
                <IconButton onClick={() => onSoundStopClick()}>
                    <StopCircleIcon />
                </IconButton>
            )}
        </Grid>
    );
}
