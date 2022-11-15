import { Button, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
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

    const [isPlay, setIsPlay] = useState(false);

    const onSoundPlayClick = () => {
        if (!sound) return;
        sound.play();
        setIsPlay(true);
    };
    const onSoundStopClick = () => {
        if (sound) {
            sound.stop();
            setIsPlay(false);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadSound = e.target?.files?.[0];
        if (uploadSound) {
            const src = window.URL.createObjectURL(uploadSound);
            const data = object.get('data');
            const effects = data.effects.map((effect: EFFECTBASICFORM, i: number) => {
                if (i === index) return { ...effect, option: { ...(effect.option || {}), src, name: uploadSound.name } };
                return effect;
            });
            object.set('data', { ...data, effects });
            const audio = _sound(object.data.effects[index].option.src);
            setSound(audio);
            isPlay && sound?.stop();
            setUpdate(!update);
            setIsPlay(false);
            onChangeCommitted?.();
        }
    };

    return (
        <Grid sx={{ p: 1 }} container wrap='nowrap'>
            <Grid sx={{ mr: 2, width: '110px' }} item>
                <Button variant='outlined' component='label'>
                    Upload
                    <input hidden accept='audio/*' type='file' onChange={onChange} />
                </Button>
                <Typography className='dia-subtitle' sx={{ width: '100px', pt: 1 }}>
                    {object.data.effects?.[0]?.option?.name}
                </Typography>
            </Grid>
            {sound && !isPlay && (
                <IconButton onClick={() => onSoundPlayClick()}>
                    <PlayCircleIcon />
                </IconButton>
            )}
            {sound && isPlay && (
                <IconButton onClick={() => onSoundStopClick()}>
                    <StopCircleIcon />
                </IconButton>
            )}
        </Grid>
    );
}
