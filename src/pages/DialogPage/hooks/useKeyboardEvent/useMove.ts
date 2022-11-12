import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function useMove() {
    const { currentTarget } = useSelector(selectDialog);

    const move = (left: number, top: number) => {
        if (!currentTarget.object) return;
        if (currentTarget.object.data.type === 'text' && currentTarget.object.isEditing) return;
        const _top = currentTarget.object.get('top');
        const _left = currentTarget.object.get('left');
        currentTarget.object.set({ top: _top + top, left: _left + left });
        currentTarget.object.canvas?.renderAll();
    };

    return { move };
}
