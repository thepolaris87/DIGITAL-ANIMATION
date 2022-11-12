import { fabric } from 'fabric';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setSnackbarMessage } from '../../../../slices/dialog';
import { v4 as uuidv4 } from 'uuid';
import { animation } from '../../View/Canvas/helper';

export default function usePaste() {
    const { clip, render, currentDialog } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const update = (obj: fabric.Object, parent?: fabric.ActiveSelection) => {
        if (!render || !currentDialog) return;
        const id = uuidv4();
        const data = obj.get('data');
        const left = (parent?.left || 0) + (parent?.width || 0) / 2 + (obj.left || 0);
        const top = (parent?.top || 0) + (parent?.height || 0) / 2 + (obj.top || 0);
        if ('master' in data) delete data.master;
        if (data.type === 'sprite') {
            obj.set('data', { ...data, id, sprite: animation.sprite({ object: obj, frameCount: Number(data.frame), width: obj.get('width') }) });
        } else {
            obj.set('data', { ...data, id });
        }
        obj.set({ top, left });
        render[currentDialog].add(obj);
    };

    const paste = () => {
        if (!clip || !render || !currentDialog) return;        
        if (clip instanceof fabric.Object) {
            if (clip.data.type === 'group') {
                (clip as fabric.ActiveSelection).forEachObject((object) => {
                    object.clone((clone: fabric.Object) => update(clone, clip as fabric.ActiveSelection), ['data']);
                });
            } else {
                clip.clone(update, ['data']);
            }
            dispatch(setSnackbarMessage(`PASTE ${clip.data.type.toUpperCase()}`));
        }
    };

    return { paste };
}
