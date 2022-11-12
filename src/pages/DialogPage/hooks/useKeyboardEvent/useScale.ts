import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function useScale() {
    const { currentTarget } = useSelector(selectDialog);

    const scale = (scale: number) => {
        if (!currentTarget.object || currentTarget.type === 'script') return;
        const scaleX = currentTarget.object.get('scaleX');
        const scaleY = currentTarget.object.get('scaleY');
        currentTarget.object.set({ scaleX: Number(scaleX) + scale, scaleY: Number(scaleY) + scale });
        currentTarget.object.canvas?.renderAll();
    };

    return { scale };
}
