import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRender, addStack, DATADIALOG, selectDialog, setCurrentDialog, setCurrentTarget } from '../../../../slices/dialog';
import { animation } from './helper';

type CANVAS = {
    data: DATADIALOG;
    onComplete?: () => void;
};

export default function Canvas({ data, onComplete }: CANVAS) {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [complete, setComplete] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dispatch = useDispatch();
    const { data: _data } = useSelector(selectDialog);
    const { width: canvasWidth, height: canvasHeight } = _data.size;

    useEffect(() => {
        if (canvas || !canvasRef.current) return;

        const _canvas = new fabric.Canvas(canvasRef.current, { defaultCursor: 'default', containerClass: 'dialog-canvas-container' });

        let objects = [];
        if (data?.canvas?.objects && Array.isArray(data?.canvas?.objects)) {
            objects = data.canvas.objects.map((object: any) => {
                if (object.data.type === 'script') {
                    return {
                        ...object,
                        onKeyDown: (e: any) => e.preventDefault(),
                        styles: object.data.koStyles
                    };
                }
                return object;
            });
        }

        _canvas.loadFromJSON({ ...data.canvas, objects }, () => {
            _canvas.forEachObject((object) => {
                if (object.data.master) {
                    object.set({ evented: false, selectable: false });
                    object.sendToBack();
                }
                if (object.data.type === 'sprite') {
                    const data = object.get('data');
                    const frameCount = Number(object.data.frame);
                    const width = object.get('width');
                    object.set('data', { ...data, sprite: animation.sprite({ object, frameCount, width }) });
                }
            });
            dispatch(addRender({ [data.id]: _canvas }));
            setComplete(true);
            onComplete?.();
        });
        _canvas.on('mouse:up', (e) => {
            const activeObject = _canvas.getActiveObject();
            const isGroup = activeObject?.type === 'activeSelection';
            dispatch(setCurrentDialog(data.id || ''));

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

        setCanvas(_canvas);
    }, [canvas, data, dispatch]);

    return (
        <div>
            <canvas ref={canvasRef} width={canvasWidth + 'px'} height={canvasHeight + 'px'}></canvas>
            {!complete && <div>그리는 중</div>}
        </div>
    );
}
