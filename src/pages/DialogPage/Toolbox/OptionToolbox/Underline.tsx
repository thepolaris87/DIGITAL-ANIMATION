import { fabric } from 'fabric';
import { IconButton } from '@mui/material';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Underline() {
    const { currentTarget } = useSelector(selectDialog);

    const onUnderlineClick = () => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;

            if (isAllSelection || !currentTarget.object.isEditing) {
                currentTarget.object.removeStyle('underline');
                currentTarget.object.set('underline', !currentTarget.object.underline);
            } else {
                const isUnderline = (currentTarget.object as fabric.Textbox)
                    .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
                    .every((style) => style.underline);
                currentTarget.object.setSelectionStyles({ underline: !isUnderline }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            }

            currentTarget.object.canvas?.renderAll();
        }
    };
    return (
        <EditingTextWrapper>
            <IconButton sx={{ p: 0.5 }} onClick={onUnderlineClick}>
                <FormatUnderlinedIcon />
            </IconButton>
        </EditingTextWrapper>
    );
}
