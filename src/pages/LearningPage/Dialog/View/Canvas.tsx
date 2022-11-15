import { fabric } from 'fabric';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addRender } from '../../../../slices/learning';
import { sprite } from './helper';

export default function Canvas({ data, size = { width: 1024, height: 768 } }: { data: any; size?: { width: number; height: number } }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!canvasRef.current) return;
        const _canvas = new fabric.Canvas(canvasRef.current, { defaultCursor: 'default', containerClass: 'dialog-canvas-container' });
        _canvas.loadFromJSON({ ...data.canvas }, () => {
            _canvas.forEachObject((object) => {
                object.set({ evented: false, selectable: false });
                if (object.data.type === 'sprite') {
                    const data = object.get('data');
                    const frameCount = Number(object.data.frame);
                    const width = object.get('width');
                    object.set('data', { ...data, sprite: sprite({ object, frameCount, width }) });
                }
            });
            dispatch(addRender({ [data.id]: _canvas }));
        });
    }, [data.canvas, data.id, dispatch, size]);

    return <canvas ref={canvasRef} width={`${size.width}px`} height={`${size.height}px`}></canvas>;
}
