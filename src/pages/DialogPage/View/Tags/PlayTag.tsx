import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { IconButton, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { sound } from '../../../../utils/util';
import { animation, converToEffectTimelineFromAppearance, createTimeline, requestAnimation } from '../Canvas/helper';
import { Tag, Tooltip } from './Tags.styles';

export default function PlayTag({ id }: { id: string }) {
    const { render, data } = useSelector(selectDialog);
    const [isPlay, setIsPlay] = useState(false);
    const [cancel, setCancel] = useState<any>();
    const [time, setTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const { width: canvasWidth, height: canvasHeight } = data.size;

    const onPlayClick = () => {
        if (!render) return;
        setIsPlay(!isPlay);
        if (isPlay) {
            cancel();
            setTime(0);
            return;
        }
        const objects = render[id].getObjects();
        const timelines: ReturnType<typeof createTimeline>[] = [];
        const sprites: ReturnType<typeof animation.sprite>[] = [];
        const sounds: (ReturnType<typeof sound> & { isPlayed: boolean; time: number })[] = [];

        objects.forEach((object) => {
            // CREATE IMAGE TIMELINE
            if (['character', 'basic', 'text', 'sprite'].includes(object.data.type) && object.data?.effects) {
                timelines.push(createTimeline({ effects: object.data.effects, object }));
            }            
            if (['sprite'].includes(object.data.type)) {
                sprites.push(object.data.sprite);
            }
        });

        // EXCUTE EFFECT
        const endTime = timelines.reduce((p, c) => Math.max(p, c.endTime), 0);
        sprites.forEach((sprite) => sprite.start());
        const animate = requestAnimation({
            duration: endTime,
            onChange: (value) => {
                timelines.forEach((timeline) => timeline.excute(value));
                setTime(value);
                sounds.forEach((sound) => {
                    if (sound.time <= value && !sound.isPlayed) {
                        sound.play();
                        sound.isPlayed = true;
                    }
                });
            },
            onComplete: () => {
                animate.stop();
                timelines.forEach((timeline) => timeline.init());
                sprites.forEach((sprite) => sprite.stop());
                setTime(0);
                setIsPlay(false);
            }
        });
        animate.start();
        setEndTime(endTime);
        setCancel(() => () => {
            animate.stop();
            timelines.forEach((timeline) => setTimeout(() => timeline.init()));
            sprites.forEach((sprite) => sprite.stop());
            sounds.forEach((sound) => sound.stop());
        });
    };
    return (
        <>
            <Tag sx={{ background: '#fff', boxShadow: '0 0 5px #ffa500', mt: 3 }} container alignItems='center' justifyContent='center'>
                <Tooltip title='play'>
                    <IconButton onClick={onPlayClick}>
                        {!isPlay && <PlayCircleOutlineIcon color='primary' />}
                        {isPlay && <StopCircleIcon color='primary' />}
                    </IconButton>
                </Tooltip>
            </Tag>
            {isPlay && (
                <LinearProgress
                    sx={{ position: 'absolute', width: canvasWidth + 'px', height: '10px', left: -canvasWidth - 22 + 'px', top: canvasHeight + 9 + 'px', zIndex: 10 }}
                    variant='determinate'
                    value={(time / endTime) * 100}
                />
            )}
        </>
    );
}
