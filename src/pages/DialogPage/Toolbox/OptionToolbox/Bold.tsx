import { fabric } from 'fabric';
import { IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Bold() {
    const { currentTarget } = useSelector(selectDialog);

    const onBoldClick = () => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;

            if (isAllSelection || !currentTarget.object.isEditing) {
                currentTarget.object.removeStyle('fontWeight');
                currentTarget.object.set('fontWeight', currentTarget.object.fontWeight === 'bold' ? 'normal' : 'bold');
            } else {
                const isBold = currentTarget.object
                    .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
                    .every((style: any) => style.fontWeight === 'bold');
                currentTarget.object.setSelectionStyles({ fontWeight: isBold ? 'normal' : 'bold' }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            }

            currentTarget.object.canvas?.renderAll();
        }
    };
    return (
        <EditingTextWrapper>
            <IconButton sx={{ p: 0.5 }} onClick={onBoldClick}>
                <FormatBoldIcon />
            </IconButton>
        </EditingTextWrapper>
    );
}
