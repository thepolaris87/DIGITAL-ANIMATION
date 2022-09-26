import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import { InputColor } from '../../ExtraTab/Formatting/FormattingTab.styles';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function TextColor() {
    const { currentTarget } = useSelector(selectIntro);
    const [hex, setHex] = useState('#000000');
    const [open, setOpen] = useState(false);

    const onFormatColorClick = () => {
        setOpen(!open);
    };

    const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHex(e.target.value);
    };

    const onApplyClick = () => {
        (currentTarget.object as fabric.Textbox).setSelectionStyles({ fill: hex }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };

    return (
        <EditingTextWrapper sx={{ position: 'relative' }}>
            <IconButton sx={{ p: 0.5 }} onClick={onFormatColorClick}>
                <FormatColorTextIcon />
            </IconButton>
            {open && (
                <Grid
                    sx={{ p: '8px 16px', width: '230px', borderRadius: '24px', position: 'absolute', zIndex: 100, background: '#fff' }}
                    container
                    alignItems='center'
                    justifyContent='space-around'
                    wrap='nowrap'>
                    <Grid sx={{ mr: 2.5 }} item>
                        <InputColor type='color' value={hex} onChange={onColorChange} />
                    </Grid>
                    <Grid sx={{ flex: 1 }} item>
                        <Typography className='jei-intro-subtitle'>HEX : {hex}</Typography>
                        <Button size='small' variant='outlined' onClick={onApplyClick}>
                            APPLY
                        </Button>
                    </Grid>
                </Grid>
            )}
        </EditingTextWrapper>
    );
}
