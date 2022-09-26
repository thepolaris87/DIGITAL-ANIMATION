import { IconButton } from '@mui/material';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Underline() {
    const { currentTarget } = useSelector(selectIntro);

    const onUnderlineClick = () => {
        const isUnderline = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.underline);
        (currentTarget.object as fabric.Textbox).setSelectionStyles({ underline: !isUnderline }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };
    return (
        <EditingTextWrapper>
            <IconButton sx={{ p: 0.5 }} onClick={onUnderlineClick}>
                <FormatUnderlinedIcon />
            </IconButton>
        </EditingTextWrapper>
    );
}
