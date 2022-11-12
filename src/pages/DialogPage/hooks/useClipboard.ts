import { fabric } from 'fabric';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setClip } from '../../../slices/dialog';

export default function useClipboard() {
    const dispatch = useDispatch();
    const focusEventHandler = useCallback(() => {
        navigator.clipboard.readText().then((clipText) => {
            if (typeof clipText !== 'string') return;
            try {
                fabric.util.enlivenObjects(
                    [JSON.parse(clipText)],
                    (object: fabric.Object[]) => {
                        if (!!object[0]) dispatch(setClip(object[0]));
                    },
                    ''
                );
            } catch (error) {}
        });
    }, [dispatch]);

    useEffect(() => {
        const container = document.getElementsByClassName('dialog-canvas-container'); 
        Array.from(container).forEach((canvas) => {
            canvas.addEventListener('focus', focusEventHandler);
        });

        return () =>
            Array.from(container).forEach((canvas) => {
                canvas.removeEventListener('focus', focusEventHandler);
            });
    });
}
