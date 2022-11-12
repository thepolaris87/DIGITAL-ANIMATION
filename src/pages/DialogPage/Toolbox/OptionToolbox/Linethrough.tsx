import { fabric } from 'fabric';
import { IconButton } from '@mui/material';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Linethrough() {
    const { currentTarget } = useSelector(selectDialog);

    const onLinethroughClick = () => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;

            if (isAllSelection || !currentTarget.object.isEditing) {
                currentTarget.object.removeStyle('linethrough');
                currentTarget.object.set('linethrough', !currentTarget.object.linethrough);
            } else {
                const isLinethrough = currentTarget.object
                    .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
                    .every((style) => style.linethrough);
                currentTarget.object.setSelectionStyles({ linethrough: !isLinethrough }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            }

            currentTarget.object.canvas?.renderAll();
        }
    };
    return (
        <EditingTextWrapper>
            <IconButton sx={{ p: 0.5 }} onClick={onLinethroughClick}>
                <FormatStrikethroughIcon />
            </IconButton>
        </EditingTextWrapper>
    );
}
