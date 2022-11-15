import { fabric } from 'fabric';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { fonts } from '../../../../utils/const';

const defaultFont = { name: 'default', display: 'DEFAULT' };

export default function FontFamily() {
    const { currentTarget } = useSelector(selectDialog);
    const [value, setValue] = useState<string>();

    const onChange = (event: SelectChangeEvent<string>) => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;

            if (isAllSelection || !currentTarget.object.isEditing) {
                currentTarget.object.removeStyle('fontFamily');
                currentTarget.object.set('fontFamily', event.target.value);
            } else {
                currentTarget.object.setSelectionStyles({ fontFamily: event.target.value }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            }

            currentTarget.object.canvas?.renderAll();
            setValue(event.target.value);
        }
    };

    useEffect(() => {
        if (currentTarget.object.fontFamily) {
            setValue(currentTarget.object.fontFamily);
            return;
        }
        let start = 0;
        let end = currentTarget.object._text.length;
        if (currentTarget.object instanceof fabric.Textbox) {
            if (currentTarget.object.isEditing) {
                start = currentTarget.object.selectionStart || 0;
                end = currentTarget.object.selectionEnd || 0;
            }
            const currentFontFamily = currentTarget.object.getSelectionStyles(start, end).reduce((p, c, i) => {
                if (i === 0) return c.fontFamily;
                return p === c.fontFamily ? p : defaultFont.name;
            }, defaultFont.name);
            setValue(currentFontFamily);
        }
    }, [currentTarget.object]);

    return (
        <Select
            sx={{ fontFamily: value, p: 0, width: '160px', mr: 0.5 }}
            inputProps={{ sx: { py: 0.9, px: 1, background: '#ffffff' } }}
            value={value || defaultFont.name}
            onChange={onChange}>
            {[defaultFont, ...fonts].map((font) => {
                return (
                    <MenuItem key={font.name} value={font.name} sx={{ fontFamily: font.name }}>
                        {font.display}
                    </MenuItem>
                );
            })}
        </Select>
    );
}
