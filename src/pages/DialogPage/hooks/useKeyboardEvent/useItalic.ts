import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function useItalic() {
    const { currentTarget } = useSelector(selectDialog);

    const italic = () => {
        if (currentTarget.type !== 'script') return;
        const isItalic = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.fontStyle === 'italic');
        (currentTarget.object as fabric.Textbox).setSelectionStyles(
            { fontStyle: isItalic ? 'normal' : 'italic' },
            currentTarget.object.selectionStart,
            currentTarget.object.selectionEnd
        );
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };

    return { italic };
}
