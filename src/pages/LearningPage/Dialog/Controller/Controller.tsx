import { Box, Button } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useCreateTimelineAnimate from '../hooks/useCreateTimelineAnimate';
import useMediaRecord from '../../../../hooks/useMediaRecord';
import { useParams } from 'react-router-dom';
import { wait } from '../../../../utils/util';
import useCreateBgm from '../hooks/useCreateBgm';
import { selectLearning } from '../../../../slices/learning';

export default function Controller() {
    const { frameType } = useParams();
    const { render, complete, data } = useSelector(selectLearning);
    const index = useRef(0);
    const [disableStart, setDisableStart] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const { start, stop, download } = useMediaRecord();
    const { bgms } = useCreateBgm();
    const { animates } = useCreateTimelineAnimate({
        onComplete: (id) => {
            if (!animates) return;
            const animate = animates[index.current];
            index.current += 1;
            if (animates[index.current]) {
                const isSameBgm = bgms?.[index.current - 1].src === bgms?.[index.current].src;
                if (animate.cutAway === 'auto' || frameType === 'record') {
                    if (!isSameBgm) bgms?.[index.current - 1]?.stop?.();
                    const { duration = 0 } = onTransitionStart(id) || {};
                    setTimeout(() => {
                        animates?.[index.current].start();
                        if (!isSameBgm) bgms?.[index.current]?.play?.();
                    }, duration);
                } else setDisableStart(false);
            } else {
                if (frameType === 'record') {
                    stop();
                    setTimeout(() => download(), 300);
                    console.log('record complete');
                } else {
                    data?.dialog.forEach((data) => {
                        const canvas = document.getElementById(data.id);
                        if (canvas) canvas.style.opacity = '1';
                    });
                    index.current = 0;
                    setIsPlay(false);
                    animates.forEach((animate) => animate?.init?.());
                    console.log('play complete');
                }
                bgms?.forEach((bgm) => bgm?.stop?.());
                setDisableStart(false);
            }
        }
    });

    const onTransitionStart = (id?: string) => {
        if (!animates) return;
        const animate = animates[index.current - 1];
        const targetId = id || data?.dialog.find((data, i) => i === index.current - 1)?.id;
        if (!targetId) return;
        const canvas = document.getElementById(targetId);
        if (!canvas) return;
        if (animate.effect.type === 'disappear') {
            canvas.style.opacity = '0';
        } else {
            canvas.style.animation = `${animate.effect.type} ${animate.effect.duration}ms ease-out`;
            canvas.onanimationend = () => {
                canvas.style.opacity = '0';
                canvas.style.animation = 'none';
            };
        }
        return { duration: animate.effect.duration };
    };

    const onStartClick = async () => {
        setDisableStart(true);
        !isPlay && setIsPlay(true);
        if (index.current === 0) {
            animates?.[index.current].start();
            bgms?.[index.current]?.src && bgms?.[index.current]?.play?.();
        } else {
            const { duration = 0 } = onTransitionStart() || {};
            setTimeout(() => animates?.[index.current].start(), duration);
        }
    };
    const onPauseClick = () => {
        animates?.[index.current]?.pause?.();
        bgms?.[index.current]?.pause?.();
    };
    const onResumeClick = () => {
        animates?.[index.current].resume();
        bgms?.[index.current]?.play?.();
    };

    const onRecordClick = () => {
        window.open(window.location.href + '/record', '_blank', `popup width=${data?.size?.width || 1024} height=${(data?.size?.height || 768) + 48}`);
    };

    const recordStart = useCallback(async () => {
        if (isPlay) return;
        const result = await start();
        if (!result) return;
        await wait(500);
        animates?.[index.current]?.start?.();
        bgms?.[index.current]?.play?.();
        setIsPlay(true);
    }, [animates, isPlay, bgms, start]);

    useEffect(() => {
        if (!render || !complete || !animates || frameType !== 'record' || isPlay) return;
        recordStart();
    }, [animates, complete, render, frameType, isPlay, recordStart]);

    useEffect(() => {
        if (!animates || !bgms || !data) return;
        const receiveMessage = (event: MessageEvent<{ code: 'start' | 'pause' | 'next' | 'resume' | 'record' }>) => {
            const { data } = event;
            if (data.code === 'start') onStartClick();
            if (data.code === 'pause') onPauseClick();
            if (data.code === 'resume') onResumeClick();
            if (data.code === 'record') onRecordClick();
        };
        window.addEventListener('message', receiveMessage);

        return () => {
            window.removeEventListener('message', receiveMessage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, animates, bgms]);

    if (!render) return <div>Rendering</div>;

    if (!complete || !animates) return <div>ANIMTE 생성중</div>;

    if (frameType === 'record') return null;

    return (
        <Box>
            <Button disabled={disableStart} onClick={onStartClick}>
                {isPlay ? 'NEXT' : 'START'}
            </Button>
            <Button onClick={onPauseClick}>PAUSE</Button>
            <Button onClick={onResumeClick}>RESUME</Button>
            {/* <Button onClick={onRecordClick}>Record</Button> */}
        </Box>
    );
}
