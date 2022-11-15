import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectLearning } from '../../../../slices/learning';
import { createTimelineData, requestAnimation } from '../View/helper';

type TIMELINEANIMATE = {
    onStart?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onChange?: () => void;
    onComplete?: (id: string) => void;
};
export default function useCreateTimelineAnimate({ onStart, onPause, onResume, onChange, onComplete }: TIMELINEANIMATE) {
    const { data, render, complete } = useSelector(selectLearning);

    const animates = useMemo(() => {
        if (!complete || !render || !data) return;
        const _animates: (ReturnType<typeof requestAnimation> & { init: () => void; effect: { type: string; duration: number }; cutAway: string })[] = [];
        data.dialog.forEach((data) => {
            const canvas = render[data.id];
            if (!canvas) return;
            const { timelines, sprites, sounds } = createTimelineData(canvas);
            const duration = timelines.reduce((p, c) => Math.max(p, c.endTime), 0);
            const _animate = requestAnimation({
                duration,
                onStart: () => {
                    sprites.forEach((sprite: any) => sprite.start());
                    onStart?.();
                },
                onResume: (currentTime) => {
                    sprites.forEach((sprite: any) => sprite.start());
                    sounds.forEach((sound: any) => {
                        if (sound.time <= currentTime && sound.isPlayed && sound.audio.currentTime !== 0) {
                            sound.play();
                        }
                    });
                    timelines.forEach(({ timelineData }) => {
                        timelineData.forEach((data) => {
                            if (data.key === 'sound' && currentTime >= data.t1 && currentTime <= data.t2) {
                                data.play?.();
                            }
                        });
                    });
                    onResume?.();
                },
                onStop: () => {
                    sprites.forEach((sprite: any) => sprite.stop());
                    sounds.forEach((sound: any) => {
                        sound.stop();
                    });
                    timelines.forEach(({ timelineData }) => {
                        timelineData.forEach((data) => {
                            if (data.key === 'sound') {
                                data.stop?.();
                            }
                        });
                    });
                },
                onPause: () => {
                    sprites.forEach((sprite: any) => sprite.stop());
                    sounds.forEach((sound: any) => {
                        sound.pause();
                    });
                    timelines.forEach(({ timelineData }) => {
                        timelineData.forEach((data) => {
                            if (data.key === 'sound') {
                                data.pause?.();
                            }
                        });
                    });
                    onPause?.();
                },
                onChange: (value) => {
                    timelines.forEach((timeline: any) => timeline.excute(value));
                    sounds.forEach((sound: any) => {
                        if (sound.time <= value && !sound.isPlayed) {
                            sound.play();
                            sound.isPlayed = true;
                        }
                    });
                    onChange?.();
                },
                onComplete: () => {
                    sprites.forEach((sprite: any) => sprite.stop());
                    sounds.forEach((sound) => sound.stop());
                    timelines.forEach(({ timelineData }) => timelineData.forEach((data) => data.key === 'sound' && data.stop?.()));
                    _animate.stop();
                    onComplete?.(data.id);
                }
            });
            const init = () => timelines.forEach(({ init }) => init());
            const animate = { ..._animate, init, effect: data.scene.effect, cutAway: data.scene.cutAway };
            _animates.push(animate);
        });
        return _animates;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [complete, render, data]);

    return { animates };
}
