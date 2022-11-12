import { fabric } from 'fabric';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { EditingTextWrapper } from './OptionToolbox.styles';

import ColorPicker from './ColorPicker';

export default function TextColor() {
    const { currentTarget } = useSelector(selectDialog);
    const [open, setOpen] = useState(false);

    const onFormatColorClick = () => {
        setOpen(!open);
    };

    const onColorPickerClick = (color: string) => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;

            if (isAllSelection || !currentTarget.object.isEditing) {
                currentTarget.object.removeStyle('fill');
                currentTarget.object.set('fill', color);
            } else {
                currentTarget.object.setSelectionStyles({ fill: color }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            }

            currentTarget.object.canvas?.renderAll();
        }
    };

    return (
        <EditingTextWrapper sx={{ position: 'relative' }}>
            <IconButton sx={{ p: 0.5 }} onClick={onFormatColorClick}>
                <FormatColorTextIcon />
            </IconButton>
            {open && <ColorPicker onClick={(color) => onColorPickerClick(color)} />}
        </EditingTextWrapper>
    );
}
