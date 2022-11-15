import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addDialog, selectDialog, setNavi } from '../../../../slices/dialog';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';
export default function Add() {
    const { data, frameType } = useSelector(selectDialog);
    const isMaster = useMemo(() => data.dialog.length !== 0 && frameType === 'M', [frameType, data.dialog.length]);
    const dispatch = useDispatch();

    const onDialogAddClick = () => {
        const id = uuidv4();
        dispatch(addDialog({ id, scene: { effect: { type: 'disappear', duration: 3000 }, cutAway: 'auto' } }));
        frameType === 'M' && dispatch(setNavi('master'));
    };
    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='add' placement='bottom-end'>
            <span>
                <IconButton onClick={onDialogAddClick} disabled={isMaster}>
                    <AddIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
