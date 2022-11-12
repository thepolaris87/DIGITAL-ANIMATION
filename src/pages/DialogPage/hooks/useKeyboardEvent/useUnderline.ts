import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function useUnderline() {
    const { currentTarget } = useSelector(selectDialog);

    const underline = () => {
        if (currentTarget.type !== 'script') return;
        const isUnderline = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.underline);
        (currentTarget.object as fabric.Textbox).setSelectionStyles({ underline: !isUnderline }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };

    return { underline };
}
