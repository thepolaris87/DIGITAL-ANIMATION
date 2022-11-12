import UndoIcon from '@mui/icons-material/Undo';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeStackIndex, selectDialog } from '../../../../slices/dialog';

export default function Undo() {
    const { stacks, currentDialog, render } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const undoClick = () => {
        if (!render?.[currentDialog]) return;

        const targetStack = stacks.find((stack) => stack.id === currentDialog);
        if (!targetStack) return;
        const targetIndex = targetStack.index - 1;
        if (!targetStack?.data?.[targetIndex]) return;

        render[currentDialog].loadFromJSON(targetStack.data[targetIndex], () => {
            dispatch(changeStackIndex({ id: currentDialog, index: targetIndex }));
        });
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='undo' placement='bottom-end'>
            <span>
                <IconButton id='dialog-save' onClick={undoClick}>
                    <UndoIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
