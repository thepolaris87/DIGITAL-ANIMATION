import { IconButton, Tooltip } from '@mui/material';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { v4 as uuidv4 } from 'uuid';
import { drawScript } from '../../View/Canvas/helper';

export default function Text() {
    const { currentDialog, render } = useSelector(selectDialog);
    const onAddTextClick = () => {
        if (!render || !currentDialog) return;
        drawScript({
            canvas: render[currentDialog],
            script: 'TEXT',
            data: { id: uuidv4(), type: 'text' },
            attr: { top: 35, left: 200, width: 400 },
            disabled: false
        });
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='text' placement='bottom-end'>
            <span>
                <IconButton onClick={onAddTextClick} disabled={!render || !currentDialog}>
                    <TextIncreaseIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
