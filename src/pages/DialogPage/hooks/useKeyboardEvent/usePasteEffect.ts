import { useDispatch, useSelector } from 'react-redux';
import { effects, selectDialog, setSnackbarMessage } from '../../../../slices/dialog';

export default function usePasteEffect() {
    const { currentTarget, effectClip } = useSelector(selectDialog);
    const dispatch = useDispatch();
    const pasteEffect = () => {
        if (!effectClip || !currentTarget.object) return;
        const data = currentTarget.object.get('data');
        if (['script', 'sprite'].includes(data.type)) {
            dispatch(setSnackbarMessage(`CAN NOT PASTE EFFECT TO ${data.type.toUpperCase()}`));
            return;
        }
        currentTarget.object.set('data', { ...data, effects: (data.effects || []).concat(effectClip) });
        if (Array.isArray(effectClip)) {
            dispatch(setSnackbarMessage('PASTE EFFECT'));
        } else {
            const display = effects.find((el) => el.value === effectClip.type)?.display;
            dispatch(setSnackbarMessage(`PASTE ${display} EFFECT`));
        }
    };

    return { pasteEffect };
}
