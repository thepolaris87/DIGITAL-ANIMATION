import { fabric } from 'fabric';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setCurrentTarget } from '../../../../slices/dialog';

export default function useSelectAll() {
    const { render, currentDialog } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const selectAll = () => {
        if (!render?.[currentDialog]) return;
        const activeSelection = new fabric.ActiveSelection(
            render[currentDialog].getObjects().filter((object) => !object.data.master),
            { canvas: render[currentDialog] }
        );
        render[currentDialog].setActiveObject(activeSelection);
        render[currentDialog].renderAll();
        const activeObject = render[currentDialog].getActiveObject();
        activeObject.set('data', { type: 'group' });
        dispatch(setCurrentTarget({ type: 'group', object: activeObject }));        
    };

    return { selectAll };
}
