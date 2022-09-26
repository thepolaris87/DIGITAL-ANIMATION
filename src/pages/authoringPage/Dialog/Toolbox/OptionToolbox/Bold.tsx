import { IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import { EditingTextWrapper } from './OptionToolbox.styles';

export default function Bold() {
    const { currentTarget } = useSelector(selectIntro);
    const onBoldClick = () => {
        const isBold = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.fontWeight === 'bold');
        (currentTarget.object as fabric.Textbox).setSelectionStyles(
            { fontWeight: isBold ? 'normal' : 'bold' },
            currentTarget.object.selectionStart,
            currentTarget.object.selectionEnd
        );
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    };
    return (
        <EditingTextWrapper>
            <IconButton sx={{ p: 0.5 }} onClick={onBoldClick}>
                <FormatBoldIcon />
            </IconButton>
        </EditingTextWrapper>
    );
}
