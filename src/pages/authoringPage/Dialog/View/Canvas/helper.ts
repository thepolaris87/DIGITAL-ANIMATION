import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { EFFECTBASICFORM } from '../../../../../slices/intro';
import { max } from '../../Dialog';

export const zIndex = { image: 0, character: 100, bubble: 200, script: 300, backdrop: 400 };
export const divisionCode = {
    image: { background: '04', character: '05', sprite: '02', basic: '01', bubble: '06' },
    text: { script: '04' },
    sound: { tts: '02' }
};

export const backdropId = 'popup-backdrop';
export const scriptId = 'script-text';
export const basicFontSize = 35;

export const drawBackground = ({ canvas, src }: { canvas: fabric.Canvas; src: string }) => {
    if (!canvas) return;
    const img = new Image();
    img.src = src;

    return new Promise<{ complete: boolean; object: fabric.Image }>((resolve) => {
        img.onload = () => {
            const backgroundImage = new fabric.Image(img);
            canvas.setBackgroundImage(backgroundImage, () => {
                canvas.renderAll();
                resolve({ complete: true, object: backgroundImage });
            });
        };
    });
};

export const drawImage = ({ canvas, src, attr, id, type = '01' }: { canvas: fabric.Canvas; src: string; attr?: fabric.IImageOptions; id?: string; type?: string }) => {    
    if (!canvas) return;
    const img = new Image();
    img.src = src;    

    return new Promise<{ complete: boolean; object: fabric.Image }>((resolve) => {        
        img.onload = () => {            
            const object = new fabric.Image(img, {
                ...attr,
                originX: 'center',
                originY: 'center',
                data: { id: id || uuidv4(), type }
            });
            canvas.add(object);
            canvas.renderAll();
            resolve({ complete: true, object });
        };
    });
};

export const drawBackdrop = ({ canvas }: { canvas: fabric.Canvas }) => {
    if (!canvas) return;
    const { id, backdrop: _backdrop } = _existBackdrop({ canvas });
    if (_backdrop) return;
    const backdrop = new fabric.Rect({
        top: 0,
        left: 0,
        width: canvas.width,
        height: canvas.height,
        opacity: 0.3,
        fill: '#000',
        selectable: false,
        evented: false,
        data: { id }
    });
    canvas.add(backdrop);
    canvas.renderAll();
};

export const drawBubble = ({ canvas, id, attr }: { canvas: fabric.Canvas; id: string; attr?: fabric.IRectOptions }) => {
    if (!canvas) return;

    const bubble = new fabric.Rect({
        top: attr?.top,
        left: attr?.left,
        width: attr?.width,
        height: attr?.height,
        angle: attr?.angle,
        rx: attr?.rx,
        ry: attr?.ry,
        fill: attr?.fill || '#F4F0E9',
        data: { id, type: 'bubble' },
        originX: 'center',
        originY: 'center',
        lockScalingFlip: true,
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
        lockUniScaling: true
    });
    canvas.add(bubble);
    canvas.renderAll();
};

export const drawScript = ({
    id,
    canvas,
    script,
    attr = {},
    styles = JSON.stringify({})
}: {
    id: string;
    canvas: fabric.Canvas;
    script: string;
    attr?: fabric.ITextboxOptions;
    styles?: any;
}) => {
    if (!canvas) return;
    const text = new fabric.Textbox(script, {
        ...attr,
        fontSize: basicFontSize,
        data: { id, type: 'text' },
        originX: 'center',
        originY: 'center',
        lockScalingFlip: true,
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
        lockUniScaling: true,
        isEditing: false,
        styles: JSON.parse(styles)
    });
    text.onKeyDown = (e) => {
        e.preventDefault();
    };
    canvas.add(text);
    canvas.renderAll();
};

export const removeBackDrop = ({ canvas }: { canvas: fabric.Canvas }) => {
    const { backdrop } = _existBackdrop({ canvas });
    backdrop && canvas.remove(backdrop);
};

export const removeObject = ({ canvas, id, type }: { canvas: fabric.Canvas; id: string; type?: string }) => {
    const objects = canvas.getObjects().filter((object) => object.data.id === id && (type ? object.data.type === type : true));
    objects?.forEach((object) => {
        canvas.remove(object);
        canvas.renderAll();
    });
};

export const animation = {
    dealy: async (delay: number) => new Promise<void>((resolve) => setTimeout(resolve, delay)),
    fadeIn: ({ object, option, render }: { object: fabric.Object; option: { duration: number }; render: fabric.Canvas }) => {
        object.set('opacity', 0);
        render.renderAll();

        const start = () => object.animate({ opacity: 1 }, { duration: option.duration, onChange: () => render.renderAll() });
        const stop = () => {
            object.set('opacity', 1);
            render.renderAll();
        };

        return { start, stop };
    },
    fadeOut: ({ object, option, render }: { object: fabric.Object; option: { duration: number }; render: fabric.Canvas }) => {
        object.set('opacity', 1);
        render.renderAll();

        const start = () => object.animate({ opacity: 0 }, { duration: option.duration, onChange: () => render.renderAll() });
        const stop = () => {
            object.set('opacity', 1);
            render.renderAll();
        };

        return { start, stop };
    },
    blink: ({ object, option, render }: { object: fabric.Object; option: { duration: number; opacity?: number }; render: fabric.Canvas }) => {
        object.set('opacity', 1);
        render.renderAll();
        let isStop = false;

        const aniFunc = async () => {
            object.set('opacity', 1);
            render.renderAll();
            await new Promise<void>((resolve) =>
                object.animate({ opacity: option.opacity || 0 }, { duration: option.duration / 2, onChange: () => render.renderAll(), onComplete: resolve })
            );
            await new Promise<void>((resolve) => object.animate({ opacity: 1 }, { duration: option.duration / 2, onChange: () => render.renderAll(), onComplete: resolve }));
        };
        const start = async () => {
            await aniFunc();
            !isStop && start();
        };
        const stop = () => {
            isStop = true;
            object.set('opacity', 1);
            render.renderAll();
        };

        return { start, stop };
    },
    sprite: ({ object, frameCount }: { object: fabric.Image | fabric.Object; frameCount: number }) => {
        const { width } = object as { width: number };
        const cropX = width! / frameCount;

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
    }

    // zoomIn: ({ object, option, render }: { object: fabric.Object; option: { duration: number }; render: fabric.Canvas }) => {
    // object.set('opacity', 1);
    // render.renderAll();
    // object.animate({ opacity: 0 }, { duration: option.duration, onChange: () => render.renderAll() });
    // }
    // zoomOut
    // rotate
    // moveAway
};

export const textAnimation = {
    terminal: async ({ object, interval = 100 }: { object: fabric.Textbox; interval: number }) => {
        const { _text } = object;
        for (let index = 0; index < _text.length + 1; index++) {
            object.text = _text.slice(0, index).reduce((p, c) => (p += c), '');
            await new Promise((resolve) => setTimeout(resolve, interval));
            object.canvas?.renderAll();
        }
    }
};

export const converToEffectTimelineFromAppearance = ([t1, t2]: number[]) => {
    const hidden = [0, t1];
    const visible = [t1, t2];
    const disappear = [t2, max];
    const effects: EFFECTBASICFORM[] = [
        { type: 'hidden', timeline: hidden },
        { type: 'visible', timeline: visible },
        { type: 'hidden', timeline: disappear }
    ];
    return effects;
};

export const timelineEasing = {
    linear: ({ time, t1, t2, from, to }: { time: number; t1: number; t2: number; from: number; to: number }) => ((to - from) / (t2 - t1)) * (time - t1) + from
};

export const createTimeline = ({ effects, object }: { effects: EFFECTBASICFORM[]; object: fabric.Object | fabric.Textbox }) => {
    const timelineData: { key: keyof fabric.Object; t1: number; t2: number; from?: number; to?: number }[] = [];
    const endTime = effects.reduce((p, c) => (c.timeline[1] > p ? c.timeline[1] : p), 0);
    const { top, left, opacity, scaleX, scaleY } = object;

    for (let index = 0; index < effects.length; index++) {
        const { type, timeline, option } = effects[index];
        const data = { t1: timeline[0] * 1000, t2: timeline[1] * 1000 };

        if (type === 'fadeIn') timelineData.push({ ...data, key: 'opacity', from: 0, to: 1 });
        if (type === 'fadeOut') timelineData.push({ ...data, key: 'opacity', from: 1, to: 0 });
        if (type === 'move') {
            timelineData.push({ ...data, key: 'top', from: object.top || 0, to: (object?.top || 0) + (option?.top || 0) });
            timelineData.push({ ...data, key: 'left', from: object.left || 0, to: (object?.left || 0) + (option?.left || 0) });
        }
        if (type === 'hidden') timelineData.push({ ...data, key: 'opacity', from: 0, to: 0 });
        if (type === 'visible') timelineData.push({ ...data, key: 'opacity', from: 1, to: 1 });
        if (type === 'scale') {
            timelineData.push({ ...data, key: 'scaleX', from: object.scaleX || 1, to: option?.scaleX || 1 });
            timelineData.push({ ...data, key: 'scaleY', from: object.scaleY || 1, to: option?.scaleY || 1 });
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
    }

    const excute = (time: number) => {
        timelineData.forEach(({ key, from, to, t1, t2 }) => {
            if (time >= t1 && time <= t2 && typeof to === 'number' && typeof from === 'number') {
                const val = timelineEasing.linear({ time, t1, t2, from, to });
                (object as fabric.Object).set(key, val);
            }
            object.canvas?.renderAll();
        });
    };

    const init = () => {
        object.set({ top, left, opacity, scaleX, scaleY });
        if (['text', 'bubble'].includes(object.data.type)) (object as fabric.Object).set('opacity', 1);
        object.canvas?.renderAll();
    };

    return { excute, init, endTime: endTime * 1000 };
};

export const requestAnimation = ({
    duration,
    onChange,
    onComplete,
    easing: _easing
}: {
    duration: number;
    onChange?: (value: number) => void;
    onComplete?: () => void;
    easing?: () => void;
}) => {
    const easing = (currentTime: number, from: number, to: number, duration: number) => currentTime;
    return fabric.util.animate({
        startValue: 0,
        endValue: duration,
        duration,
        onChange,
        onComplete,
        easing: _easing || easing
    });
};

const _existBackdrop = ({ canvas }: { canvas: fabric.Canvas }) => {
    const backdrop = canvas.getObjects().find((el) => el.data.id === backdropId);
    return { id: backdropId, backdrop };
};
