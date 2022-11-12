import { fabric } from 'fabric';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { EditingTextWrapper } from './OptionToolbox.styles';

import ColorPicker from './ColorPicker';

export default function TextStrokeColor() {
    const { currentTarget } = useSelector(selectDialog);
    const [open, setOpen] = useState(false);

    const onFormatColorClick = () => {
        setOpen(!open);
    };

    const onColorPickerClick = (color: string) => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;

            if (isAllSelection || !currentTarget.object.isEditing) {
                currentTarget.object.removeStyle('stroke');
                currentTarget.object.set('stroke', color);
            } else {
                currentTarget.object.setSelectionStyles({ stroke: color }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            }

            currentTarget.object.canvas?.renderAll();
        }
    };

    return (
        <EditingTextWrapper sx={{ position: 'relative' }}>
            <IconButton sx={{ p: 0.5 }} onClick={onFormatColorClick}>
                <BorderColorIcon />
            </IconButton>
            {open && <ColorPicker onClick={(color) => onColorPickerClick(color)} />}
        </EditingTextWrapper>
    );
}
