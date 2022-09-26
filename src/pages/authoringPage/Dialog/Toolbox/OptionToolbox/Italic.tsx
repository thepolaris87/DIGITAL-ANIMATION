import {  IconButton } from '@mui/material';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Italic() {
    const { currentTarget } = useSelector(selectIntro);

    const onItalicClick = () => {
        const isItalic = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.fontStyle === 'italic');
        (currentTarget.object as fabric.Textbox).setSelectionStyles(
            { fontStyle: isItalic ? 'normal' : 'italic' },
            currentTarget.object.selectionStart,
            currentTarget.object.selectionEnd
        );
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
