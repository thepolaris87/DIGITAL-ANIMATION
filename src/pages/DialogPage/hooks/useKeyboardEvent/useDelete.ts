import { fabric } from 'fabric';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setCurrentTarget, setSnackbarMessage } from '../../../../slices/dialog';

export default function useDelete() {
    const { currentTarget } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const _delete = (code: 'Delete' | 'Backspace') => {
        if (!currentTarget.object) return;
        if (currentTarget.object.data.type === 'text' && currentTarget.object.isEditing) return;

        if (currentTarget.object instanceof fabric.ActiveSelection) currentTarget.object.forEachObject((object) => object.canvas?.remove(object));
        else currentTarget.object.canvas?.remove(currentTarget.object);

        currentTarget.object.canvas?.discardActiveObject();
        dispatch(setSnackbarMessage(`DELETE ${currentTarget.type.toUpperCase()}`));
        dispatch(setCurrentTarget({ type: '' }));
    };

    return { delete: _delete };
}
