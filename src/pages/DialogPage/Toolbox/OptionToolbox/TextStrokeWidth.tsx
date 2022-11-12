import { fabric } from 'fabric';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import { Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { EditingTextWrapper } from './OptionToolbox.styles';
import CheckIcon from '@mui/icons-material/Check';

const strokeWidthList = [
    { class: '00', strokeWidth: 0 },
    { class: '01', strokeWidth: 1 },
    { class: '02', strokeWidth: 2 },
    { class: '03', strokeWidth: 3 },
    { class: '04', strokeWidth: 4 },
    { class: '05', strokeWidth: 8 },
    { class: '06', strokeWidth: 12 },
    { class: '07', strokeWidth: 16 },
    { class: '08', strokeWidth: 24 }
];

export default function TextStrokeWidth() {
    const { currentTarget } = useSelector(selectDialog);
    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState<number>();

    const onFormatColorClick = () => {
        setOpen(!open);
    };

    const onChange = (width: number) => {
        if (currentTarget.object instanceof fabric.Textbox) {
            const isAllSelection = (currentTarget.object.selectionEnd || 0) - (currentTarget.object.selectionStart || 0) === currentTarget.object._text.length;

            if (isAllSelection || !currentTarget.object.isEditing) {
                currentTarget.object.removeStyle('strokeWidth');
                width && currentTarget.object.set('strokeWidth', width);
            } else {
                currentTarget.object.setSelectionStyles({ strokeWidth: width }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
            }

            currentTarget.object.canvas?.renderAll();
            setWidth(width);
        }
    };

    useEffect(() => {
        if (currentTarget.object.strokeWidth) {
            setWidth(currentTarget.object.strokeWidth);
            return;
        }
        let start = 0;
        let end = currentTarget.object._text.length;
        if (currentTarget.object instanceof fabric.Textbox) {
            if (currentTarget.object.isEditing) {
                start = currentTarget.object.selectionStart || 0;
                end = currentTarget.object.selectionEnd || 0;
            }
            const currentStrokeWidth = currentTarget.object.getSelectionStyles(start, end).reduce((p, c, i) => {
                if (i === 0) return c.strokeWidth;
                return p === c.strokeWidth ? p : 0;
            }, 0);
            setWidth(currentStrokeWidth);
        }
    }, [currentTarget.object, open]);

    return (
        <EditingTextWrapper sx={{ position: 'relative' }}>
            <IconButton sx={{ p: 0.5 }} onClick={onFormatColorClick}>
                <LineWeightIcon />
            </IconButton>
            {open && (
                <Grid
                    sx={{
                        p: '8px 16px',
                        width: '130px',
                        borderRadius: '8px',
                        position: 'absolute',
                        zIndex: 100,
                        background: '#fff',
                        top: '34px',
                        left: '-4px'
                    }}
                    container
                    alignItems='center'>
                    <List>
                        {strokeWidthList.map((el: any) => (
                            <ListItem key={el.class} onClick={() => onChange(el.strokeWidth)} sx={{ p: '8px 2px' }}>
                                <Grid sx={{ height: '28px' }} container>
                                    <Grid sx={{ width: '30px', mr: '12px', color: '#757575' }} item>
                                        {el.strokeWidth === width && <CheckIcon sx={{ width: '24px', height: '24px' }} />}
                                    </Grid>
                                    <Typography>{el.strokeWidth}px</Typography>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            )}
        </EditingTextWrapper>
    );
}
