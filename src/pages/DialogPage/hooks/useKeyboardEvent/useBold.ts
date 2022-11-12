import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function useBold() {
    const { currentTarget } = useSelector(selectDialog);
    
    const bold = () => {
        if (currentTarget.type !== 'script') return;
        const isBold = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.fontWeight === 'bold');
        (currentTarget.object as fabric.Textbox).setSelectionStyles(
            { fontWeight: isBold ? 'normal' : 'bold' },
            currentTarget.object.selectionStart,
            currentTarget.object.selectionEnd
        );
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };

    return { bold };
}
