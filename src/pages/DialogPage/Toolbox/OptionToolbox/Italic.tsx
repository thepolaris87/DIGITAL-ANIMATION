import { fabric } from 'fabric';
import { IconButton } from '@mui/material';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Italic() {
    const { currentTarget } = useSelector(selectDialog);

    const onItalicClick = () => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;
            
            if (isAllSelection || !currentTarget.object.isEditing) {
                const isItalic = currentTarget.object
                    .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
                    .every((style: any) => style.fontStyle === 'italic');
                currentTarget.object.setSelectionStyles({ fontStyle: isItalic ? 'normal' : 'italic' }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            } else {
                currentTarget.object.removeStyle('fontStyle');
                currentTarget.object.set('fontStyle', currentTarget.object.fontStyle === 'italic' ? 'normal' : 'italic');
            }
            currentTarget.object.canvas?.renderAll();
        }
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };
    return (
        <EditingTextWrapper>
            <IconButton sx={{ p: 0.5 }} onClick={onItalicClick}>
                <FormatItalicIcon />
            </IconButton>
        </EditingTextWrapper>
    );
}
