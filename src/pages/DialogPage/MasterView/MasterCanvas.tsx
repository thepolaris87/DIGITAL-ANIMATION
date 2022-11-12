import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DATAMASTER, addRender, setCurrentTarget, selectDialog, addStack } from '../../../slices/dialog';
import { animation } from '../View/Canvas/helper';

export default function MasterCanvas({ data }: { data: DATAMASTER }) {
    const { data: _data } = useSelector(selectDialog);
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    const { width: canvasWidth, height: canvasHeight } = _data.size;

    useEffect(() => {
        if (canvas || !canvasRef.current) return;
        const _canvas = new fabric.Canvas(canvasRef.current, { defaultCursor: 'default', containerClass: 'dialog-canvas-container' });
        const objects = data?.canvas?.objects && Array.isArray(data?.canvas?.objects) ? data.canvas.objects : [];

        _canvas.loadFromJSON({ ...data.canvas, objects }, () => {
            _canvas.getObjects().forEach((object) => {
                if (object.data.type === 'sprite') {
                    const data = object.get('data');
                    const width = object.get('width');
                    const frameCount = Number(object.data.frame);
                    object.set('data', { ...data, sprite: animation.sprite({ object, frameCount, width }) });
                }
            });
            dispatch(addRender({ master: _canvas }));
        });

        _canvas.on('mouse:up', (e) => {
            const activeObject = _canvas.getActiveObject();
            const isGroup = activeObject?.type === 'activeSelection';

            if (!activeObject) {
                dispatch(setCurrentTarget({ type: '' }));
                return;
            }
            if (isGroup) {
                activeObject.set('data', { type: 'group' });
                dispatch(setCurrentTarget({ type: 'group', object: activeObject }));
            } else {
                dispatch(setCurrentTarget({ type: activeObject.data.type, object: activeObject }));
            }
        });
        _canvas.on('object:modified', (e) => {
            const stackData = _canvas.toJSON(['data']);
            dispatch(addStack({ id: data.id, data: stackData }));
        });

        setCanvas(canvas);
    }, [canvas, data, dispatch]);

    return <canvas ref={canvasRef} width={canvasWidth + 'px'} height={canvasHeight + 'px'}></canvas>;
}
