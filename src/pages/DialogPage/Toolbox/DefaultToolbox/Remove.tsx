import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDialog, selectDialog } from '../../../../slices/dialog';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMemo } from 'react';

export default function Remove() {
    const { currentDialog, frameType } = useSelector(selectDialog);
    const isMaster = useMemo(() => frameType === 'M', [frameType]);
    const dispatch = useDispatch();
    const onDialogDeleteClick = () => {
        dispatch(deleteDialog({ id: currentDialog }));
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='remove' placement='bottom-end'>
            <span>
                <IconButton onClick={onDialogDeleteClick} disabled={isMaster}>
                    <RemoveIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
