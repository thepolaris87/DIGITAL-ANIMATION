import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { IconButton, LinearProgress } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { sound } from '../../../../utils/util';
import { animation, createTimeline, requestAnimation } from '../../View/Canvas/helper';

import { Tag, Tooltip } from './Tag.styles';

export default function PlayTag() {
    const { render, data } = useSelector(selectDialog);
    const [isPlay, setIsPlay] = useState(false);
    const [cancel, setCancel] = useState<any>();
    const [time, setTime] = useState(0);
    const [endTime, setEndTime] = useState(0);    
    const { width: canvasWidth } = data.size;

    const onPlayClick = () => {
        if (!render) return;
        setIsPlay(!isPlay);

        if (isPlay) {
            cancel();
            setTime(0);
            return;
        }
        const objects = render['master'].getObjects();
        const timelines: ReturnType<typeof createTimeline>[] = [];
        const sprites: ReturnType<typeof animation.sprite>[] = [];
        const sounds: (ReturnType<typeof sound> & { isPlayed: boolean; time: number })[] = [];

        objects.forEach((object) => {
            // CREATE IMAGE TIMELINE
            if (['character', 'basic'].includes(object.data.type) && object.data?.effects) {
                timelines.push(createTimeline({ effects: object.data.effects, object }));
            }
            if (['sprite'].includes(object.data.type)) {
                sprites.push(object.data.sprite);
            }
        });

        // EXCUTE EFFECT
        const endTime = timelines.reduce((p, c) => Math.max(p, c.endTime), 0);
        sprites.forEach((sprite) => sprite.start());
        const _cancel = requestAnimation({
            duration: endTime,
            onChange: (value) => {
                timelines.forEach((timeline) => timeline.excute(value));
                if (Math.abs(Number(time) - value) > 100) setTime(Number((value / 1000).toFixed(2)));
                sounds.forEach((sound) => {
                    if (sound.time <= value && !sound.isPlayed) {
                        sound.play();
                        sound.isPlayed = true;
                    }
                });
                if (endTime <= value) {
                    //@ts-ignore;
                    _cancel();
                    timelines.forEach((timeline) => timeline.init());
                    sprites.forEach((sprite) => sprite.stop());
                    setTime(0);
                    setIsPlay(false);
                }
            }
        }).start();
        setEndTime(endTime);
        setCancel(() => () => {
            //@ts-ignore;
            _cancel();
            timelines.forEach((timeline) => setTimeout(() => timeline.init()));
            sprites.forEach((sprite) => sprite.stop());
            sounds.forEach((sound) => sound.stop());
        });
    };
    return (
        <>
            <Tag sx={{ background: '#fff', boxShadow: `0 0 5px ${orange[900]}`, mt: 3 }} container alignItems='center' justifyContent='center'>
                <Tooltip title='play'>
                    <IconButton onClick={onPlayClick}>
                        {!isPlay && <PlayCircleOutlineIcon color='primary' />}
                        {isPlay && <StopCircleIcon color='primary' />}
                    </IconButton>
                </Tooltip>
            </Tag>
            {!!time && (
                <LinearProgress
                    sx={{ position: 'absolute', width: canvasWidth + 'px', height: '10px', left: '-1046px', top: '777px', zIndex: 10 }}
                    variant='determinate'
                    value={((Number(time) * 1000) / endTime) * 100}
                />
            )}
        </>
    );
}
