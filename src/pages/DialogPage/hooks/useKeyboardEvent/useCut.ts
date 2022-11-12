import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDialog, setClip, setSnackbarMessage } from '../../../../slices/dialog';

export default function useCut() {
    const { currentTarget } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const cut = () => {
        if (!currentTarget.object) return;

        dispatch(setClip(currentTarget.object));
        dispatch(setSnackbarMessage(`CUT ${currentTarget.type.toUpperCase()}`));

        if (currentTarget.object instanceof fabric.ActiveSelection) currentTarget.object.forEachObject((object) => object.canvas?.remove(object));
        else currentTarget.object.canvas?.remove(currentTarget.object);
        currentTarget.object.canvas?.discardActiveObject();

        //CLIP BOARD
        navigator.clipboard.writeText(JSON.stringify(currentTarget.object.toObject(['data'])));
    };

    return { cut };
}
