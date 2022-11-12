import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setCurrentTarget } from '../../../slices/dialog';

export default function useSyncMaster() {
    const { render, data } = useSelector(selectDialog);

    const dispatch = useDispatch();

    const addMasterObject = useCallback(
        async (objects: fabric.Object[], canvas: fabric.Canvas) => {
            if (!render?.['master']) return;

            const promiseFn = objects.map((object) => {
                return new Promise<void>((resolve) => {
                    object.clone(
                        (object: fabric.Object) => {
                            object.set({ evented: false, selectable: false });
                            canvas.add(object);
                            object.sendToBack();
                            resolve();
                        },
                        ['data']
                    );
                });
            });
            canvas.backgroundImage = render['master']?.backgroundImage;
            await Promise.all(promiseFn);
            dispatch(setCurrentTarget({ type: '' }));
            canvas.renderAll();
        },
        [render, dispatch]
    );

    const removeMasterObject = (canvas: fabric.Canvas) => {
        canvas.forEachObject((object) => {
            const data = object.get('data');
            if (data.master) {
                object.canvas?.remove(object);
            }
        });
        canvas.renderAll();
    };

    const syncMaster = useCallback(() => {
        if (!render?.['master']) return;
        const masterObjects = render['master'].getObjects().concat().reverse();
        data.dialog.forEach((data) => {
            if (!render?.[data.id]) return;
            removeMasterObject(render[data.id]);
            if (data.master) addMasterObject(masterObjects, render[data.id]);
        });
    }, [data.dialog, render, addMasterObject]);

    return { syncMaster, addMasterObject, removeMasterObject };
}
