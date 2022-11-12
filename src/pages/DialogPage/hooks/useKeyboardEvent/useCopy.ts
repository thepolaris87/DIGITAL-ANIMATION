import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setClip, setSnackbarMessage } from '../../../../slices/dialog';

export default function useCopy() {
    const { currentTarget } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const copy = () => {
        if (!currentTarget.object) return;        
        dispatch(setClip(currentTarget.object));
        dispatch(setSnackbarMessage(`COPY ${currentTarget.type.toUpperCase()}`));

        //CLIP BOARD
        navigator.clipboard.writeText(JSON.stringify(currentTarget.object.toObject(['data'])));
    };

    return { copy };
}
