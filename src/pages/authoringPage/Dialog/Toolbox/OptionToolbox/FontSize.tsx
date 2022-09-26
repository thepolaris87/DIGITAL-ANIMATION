import { Grid, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { EditingTextWrapper } from './OptionToolbox.styles';
import { selectIntro } from '../../../../../slices/intro';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { basicFontSize } from '../../View/Canvas/helper';



export default function FontSize() {
    const { currentTarget } = useSelector(selectIntro);
    const [value, setValue] = useState(0);
    const fontSizeInput = useRef<HTMLInputElement>();

    const onFontSizeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(Number(e.target.value));
    };

    const onIncreaseClick = () => {
        let selectionStart: number;
        let selectionEnd: number;
        if ((currentTarget.object as fabric.Textbox).hasControls) {
            selectionStart = 0;
            selectionEnd = (currentTarget.object as fabric.Textbox)._text.length;
        } else {
            selectionStart = (currentTarget.object as fabric.Textbox).selectionStart || 0;
            selectionEnd = (currentTarget.object as fabric.Textbox).selectionEnd || 0;
        }
        for (let index = selectionStart; index < selectionEnd; index++) {
            const fontSize = (currentTarget.object as fabric.Textbox).getSelectionStyles(index, index + 1)[0].fontSize || basicFontSize;
            (currentTarget.object as fabric.Textbox).setSelectionStyles({ fontSize: fontSize + 1 }, index, index + 1);
            if (Boolean(value)) setValue(fontSize + 1);
        }
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };

    const onDecreaseClick = () => {
        let selectionStart: number;
        let selectionEnd: number;
        if ((currentTarget.object as fabric.Textbox).hasControls) {
            selectionStart = 0;
            selectionEnd = (currentTarget.object as fabric.Textbox)._text.length;
        } else {
            selectionStart = (currentTarget.object as fabric.Textbox).selectionStart || 0;
            selectionEnd = (currentTarget.object as fabric.Textbox).selectionEnd || 0;
        }
        for (let index = selectionStart; index < selectionEnd; index++) {
            const fontSize = (currentTarget.object as fabric.Textbox).getSelectionStyles(index, index + 1)[0].fontSize || basicFontSize;
            (currentTarget.object as fabric.Textbox).setSelectionStyles({ fontSize: fontSize - 1 }, index, index + 1);
            if (Boolean(value)) setValue(fontSize - 1);
        }
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };

    const handler = useCallback(
        (e: KeyboardEvent) => {
            const { key } = e;
            if (key === 'Enter') {
                if ((currentTarget.object as fabric.Textbox).hasControls) {
                    (currentTarget.object as fabric.Textbox).setSelectionStyles({ fontSize: value }, 0, (currentTarget.object as fabric.Textbox)._text.length);
                } else {
                    (currentTarget.object as fabric.Textbox).setSelectionStyles(
                        { fontSize: value },
                        (currentTarget.object as fabric.Textbox).selectionStart,
                        (currentTarget.object as fabric.Textbox).selectionEnd
                    );
                }
                (currentTarget.object as fabric.Textbox).canvas?.renderAll();
            }
        },
        [currentTarget.object, value]
    );

    useEffect(() => {
        let fontSizes: any[];
        if ((currentTarget.object as fabric.Textbox).hasControls) {
            fontSizes = (currentTarget.object as fabric.Textbox).getSelectionStyles(0, (currentTarget.object as fabric.Textbox)._text.length);
        } else {
            fontSizes = (currentTarget.object as fabric.Textbox).getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        }
        if (fontSizes.length === 0) return setValue(0);
        const fontSize = fontSizes.reduce((p, c) => (p === (c.fontSize || basicFontSize) ? p : 0), fontSizes[0]?.fontSize || basicFontSize);
        setValue(fontSize);
    }, [currentTarget]);

    useEffect(() => {
        const target = fontSizeInput?.current;
        target?.addEventListener('keypress', handler);
        return () => target?.removeEventListener('keypress', handler);
    }, [handler]);

    return (
        <EditingTextWrapper>
            <Grid container>
                <IconButton sx={{ p: 0.5 }} onClick={onDecreaseClick}>
                    <RemoveIcon />
                </IconButton>
                <TextField
                    inputRef={fontSizeInput}
                    variant='outlined'
                    name='fontSize'
                    value={value || ''}
                    size='small'
                    sx={{ width: '45px', backgroundColor: 'white', pt: '1px' }}
                    inputProps={{ sx: { p: '4px 8px' } }}
                    onChange={onFontSizeChange}
                />
                <IconButton sx={{ p: 0.5 }} onClick={onIncreaseClick}>
                    <AddIcon />
                </IconButton>
            </Grid>
        </EditingTextWrapper>
    );
}
