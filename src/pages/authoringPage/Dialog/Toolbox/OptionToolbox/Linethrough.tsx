import { IconButton } from '@mui/material';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Linethrough() {
    const { currentTarget } = useSelector(selectIntro);

    const onLinethroughClick = () => {
        const isLinethrough = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.linethrough);
        (currentTarget.object as fabric.Textbox).setSelectionStyles({ linethrough: !isLinethrough }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };
    return (
        <EditingTextWrapper>
            <IconButton sx={{ p: 0.5 }} onClick={onLinethroughClick}>
                <FormatStrikethroughIcon />
            </IconButton>
        </EditingTextWrapper>
    );
}
