import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function useLinethorugh() {
    const { currentTarget } = useSelector(selectDialog);

    const linethrough = () => {
        if (currentTarget.type !== 'script') return;
        const isLinethrough = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.linethrough);
        (currentTarget.object as fabric.Textbox).setSelectionStyles({ linethrough: !isLinethrough }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };

    return { linethrough };
}
