import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setEffectClip, setSnackbarMessage } from '../../../../slices/dialog';
import { converToEffectTimelineFromAppearance } from '../../View/Canvas/helper';

export default function useCopyEffect() {
    const { currentTarget } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const copyEffect = () => {
        if (!currentTarget.object) return;
        const data = currentTarget.object.get('data');
        if (!data.effects && !data.effect) return;
        if(['script'].includes(data.type)) {
            const effects = converToEffectTimelineFromAppearance(data.effect.appearance);
            dispatch(setEffectClip(effects));
            dispatch(setSnackbarMessage('COPY SCRIPT EFFECT'));
        } else {
            dispatch(setEffectClip(data.effects));
            dispatch(setSnackbarMessage('COPY OBJECT EFFECT'));
        }
        
    };

    return { copyEffect };
}
