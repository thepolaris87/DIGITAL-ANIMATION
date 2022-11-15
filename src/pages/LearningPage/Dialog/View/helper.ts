import { fabric } from 'fabric';
import { sound } from '../../../../utils/util';

export type EFFECTBASICFORM = {
    type: string;
    timeline: number[];
    option?: { interval?: number; top?: number; left?: number; scaleX?: number; scaleY?: number; src?: string; extension?: string; from?: number; to?: number; angle?: number };
};
export type TIMELINEEFFECTTYPE = 'sound' | typeof totalFilters[number];
export type TIMELINEDATA = {
    key: keyof fabric.Object | TIMELINEEFFECTTYPE;
    t1: number;
    t2: number;
    from?: number;
    to?: number;
    play?: () => void;
    stop?: () => void;
    pause?: () => void;
    isPlayed?: boolean;
};

const totalFilters = ['brightness', 'noise', 'contrast', 'saturation'];

export const converToEffectTimelineFromAppearance = ([t1, t2]: number[]) => {
    const hidden = [0, t1];
    const visible = [t1, t2];
    const disappear = [t2, t2 + 0.3];
    const effects: EFFECTBASICFORM[] = [
        { type: 'hidden', timeline: hidden },
        { type: 'visible', timeline: visible },
        { type: 'hidden', timeline: disappear }
    ];
    return effects;
};

export const sprite = ({ object, frameCount, width: _width }: { object: fabric.Image | fabric.Object; frameCount: number; width?: number }) => {
    const { width } = object as { width: number };
    const cropX = _width || width! / frameCount;

    let currentFrame = 0;
    let interval: ReturnType<typeof setInterval>;
    let isAnimating = false;
    object.set({ cropX: cropX * currentFrame, width: cropX });
    object.canvas?.renderAll();

    const animate = () => {
        currentFrame += 1;
        currentFrame %= frameCount;
        object.set({ cropX: cropX * currentFrame, width: cropX });
        object.canvas?.renderAll();
    };
    const start = () => {
        if (isAnimating) return;
        if (!isAnimating) {
            interval = setInterval(animate, 1000 / frameCount);
            isAnimating = true;
        }
    };

    const stop = () => {
        isAnimating = false;
        clearInterval(interval);
    };

    return { start, stop };
};

export const timelineEasing = {
    linear: ({ time, t1, t2, from, to }: { time: number; t1: number; t2: number; from: number; to: number }) => ((to - from) / (t2 - t1)) * (time - t1) + from
};

export const createTimeline = ({ effects, object }: { effects: EFFECTBASICFORM[]; object: any }) => {
    const timelineData: TIMELINEDATA[] = [];
    const endTime = effects.reduce((p, c) => (c.timeline[1] > p ? c.timeline[1] : p), 0);
    const { top, left, opacity, scaleX, scaleY, filters = [],angle } = object;
    const cloneData = { ...object };
    const copyFilters = [...filters];

    for (let index = 0; index < effects.length; index++) {
        const { type, timeline, option } = effects[index];
        const data = { t1: timeline[0] * 1000, t2: timeline[1] * 1000 };

        if (type === 'fadeIn') {
            timelineData.push({ ...data, key: 'opacity', from: 0, to: 1 });
        }
        if (type === 'fadeOut') timelineData.push({ ...data, key: 'opacity', from: 1, to: 0 });
        if (type === 'move') {
            timelineData.push({ ...data, key: 'top', from: cloneData.top || 0, to: (cloneData?.top || 0) + (option?.top || 0) });
            timelineData.push({ ...data, key: 'left', from: cloneData.left || 0, to: (cloneData?.left || 0) + (option?.left || 0) });
            cloneData.top = (cloneData?.top || 0) + (option?.top || 0);
            cloneData.left = (cloneData?.left || 0) + (option?.left || 0);
        }
        if (type === 'hidden') timelineData.push({ ...data, key: 'opacity', from: 0, to: 0 });
        if (type === 'visible') timelineData.push({ ...data, key: 'opacity', from: 1, to: 1 });
        if (type === 'scale') {
            timelineData.push({ ...data, key: 'scaleX', from: cloneData.scaleX || 1, to: option?.scaleX || 1 });
            timelineData.push({ ...data, key: 'scaleY', from: cloneData.scaleY || 1, to: option?.scaleY || 1 });
            cloneData.scaleX = option?.scaleX || 1;
            cloneData.scaleY = option?.scaleY || 1;
        }

        if (type === 'blink') {
            const interval = option?.interval || 0;
            if (interval <= 0) continue;
            let [start, end] = timeline;
            let t1 = start * 1000;
            let t2 = t1;
            let opacity = true;
            let z = 0;
            while (t2 < end * 1000) {
                t2 = t1 + interval * 1000;
                const data = { key: 'opacity' as keyof fabric.Object, t1, t2, from: Number(opacity), to: Number(!opacity) };
                timelineData.push(data);
                t1 = t2;
                opacity = !opacity;
                z += 1;
                if (z > 100) {
                    console.error('CAN NOT CREATE BLINK');
                    break;
                }
            }
            timelineData.push({ key: 'opacity', t1: t2, t2: t2 + interval * 1000, from: 1, to: 1 });
        }
        if (type === 'sound' && option) {
            const audio = sound(`https://sol-api.esls.io/sounds/A1/${option.src}.${option.extension}`);
            audio.audio.loop = true;
            timelineData.push({ ...data, key: 'sound', ...audio });
        }
        if (totalFilters.includes(type)) {
            timelineData.push({ ...data, key: type, from: option?.from || 0, to: option?.to || 0 });
        }
        if (type === 'rotate') {
            timelineData.push({ ...data, key: 'angle', from: cloneData.angle || 0, to: (cloneData?.angle || 0) + (option?.angle || 0) });
            cloneData.angle = (cloneData?.angle || 0) + (option?.angle || 0);
        }
    }

    const inTimeExcute = (time: number, data: TIMELINEDATA) => {
        const { key, t1, t2, from, to, play, isPlayed } = data;
        // SOUND
        if (key === 'sound') {
            if (!isPlayed) {
                data.isPlayed = true;
                play?.();
            }
        }
        // FILTER
        if (totalFilters.includes(key) && typeof to === 'number' && typeof from === 'number') {
            const val = timelineEasing.linear({ time, t1, t2, from, to });
            if (!(object.filters as fabric.IBaseFilter[])?.find((filter) => filter.toObject()[`${key}`])) {
                if (key === 'brightness') filters.push(new fabric.Image.filters.Brightness({ brightness: val }));
                if (key === 'noise') filters.push(new fabric.Image.filters.Noise({ noise: val }));
                if (key === 'contrast') filters.push(new fabric.Image.filters.Contrast({ contrast: val }));
                if (key === 'saturation') filters.push(new fabric.Image.filters.Saturation({ saturation: val }));
            } else {
                (object.filters as fabric.IBaseFilter[])?.forEach((filter, i) => {
                    if (filter.toObject()[`${key}`]) {
                        filter.setOptions({ [key]: val });
                        if (val === 0 || isNaN(val)) {
                            filters.splice(i, 1);
                        }
                    }
                });
            }
            object?.applyFilters?.();
        }

        // ATTRIBUTE
        if (!['sound', ...totalFilters].includes(key) && typeof to === 'number' && typeof from === 'number') {
            const val = timelineEasing.linear({ time, t1, t2, from, to });
            (object as fabric.Object).set(key as keyof fabric.Object, val);
        }
    };

    const outTimeExcute = (data: TIMELINEDATA) => {
        const { key, stop, isPlayed } = data;
        if (key === 'sound') {
            if (isPlayed) {
                data.isPlayed = false;
                stop?.();
            }
        }
    };

    const excute = (time: number) => {
        timelineData.forEach((data) => {
            const { t1, t2 } = data;
            if (time >= t1 && time <= t2) {
                inTimeExcute(time, data);
            } else {
                outTimeExcute(data);
            }
            object.canvas?.requestRenderAll();
        });
    };

    const init = () => {
        object.set({ top, left, opacity, scaleX, scaleY, filters: copyFilters, angle });
        object?.applyFilters?.();
        timelineData.forEach((data) => data?.stop?.());
        object.canvas?.renderAll();
    };

    return { excute, init, endTime: Math.floor(endTime * 1000), timelineData };
};

export const requestAnimation = ({
    duration: endValue,
    onStart,
    onStop,
    onPause,
    onResume,
    onChange,
    onComplete,
    easing: _easing
}: {
    duration: number;
    onChange?: (value: number) => void;
    onComplete?: () => void;
    easing?: () => void;
    onStart?: () => void;
    onStop?: () => void;
    onPause?: (currentTime: number) => void;
    onResume?: (currentTime: number) => void;
}) => {
    const easing = (currentTime: number, from: number, to: number, duration: number) => currentTime;
    const interval = 10;
    let _currentTime = 0;
    let cancel: any;
    let _isPlay = false;

    const start = () => {
        _isPlay = true;
        cancel = animate(0, endValue);
        onStart?.();
        return cancel;
    };
    const pause = () => {
        _isPlay = false;
        cancel?.();
        onPause?.(_currentTime);
    };
    const stop = () => {
        _currentTime = 0;
        _isPlay = false;
        cancel?.();
        onStop?.();
    };
    const resume = () => {
        _isPlay = true;
        cancel = animate(_currentTime, endValue - _currentTime);
        onResume?.(_currentTime);
    };
    const animate = (currentTime: number, duration: number) =>
        fabric.util.animate({
            startValue: 0,
            endValue,
            duration,
            onChange: (value) =>
                setTimeout(() => {
                    if (!_isPlay) return;
                    const _value = Math.floor(Math.round(value) / interval) * interval;
                    _currentTime = Math.min(_value + currentTime, endValue);
                    onChange?.(_currentTime);
                }, interval / 2),
            onComplete: () => setTimeout(() => onComplete?.(), interval),
            easing: _easing || easing
        });

    return { start, pause, stop, resume };
};

export const createTimelineData = (canvas: fabric.Canvas) => {    
    const timelines: ReturnType<typeof createTimeline>[] = [];
    const sprites: ReturnType<typeof sprite>[] = [];
    const sounds: (ReturnType<typeof sound> & { isPlayed: boolean; time: number })[] = [];
    canvas.forEachObject((object) => {
        if (object.data.type === 'sprite') {
            const data = object.get('data');
            const frameCount = Number(object.data.frame);
            const width = object.get('width');
            object.set('data', { ...data, sprite: sprite({ object, frameCount, width }) });
        }

        if (['character', 'basic', 'text', 'sprite'].includes(object.data.type) && object.data?.effects) {
            timelines.push(createTimeline({ effects: object.data.effects, object }));
        }        
        if (['sprite'].includes(object.data.type)) sprites.push(object.data.sprite);
    });
    return { timelines, sprites, sounds };
};
