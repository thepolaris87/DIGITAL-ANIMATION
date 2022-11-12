import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { init, selectDialog } from '../../../../slices/dialog';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMemo } from 'react';

export default function Reset() {
    const { frameType } = useSelector(selectDialog);
    const isMaster = useMemo(() => frameType === 'M', [frameType]);
    const dispatch = useDispatch();
    const onDialogAllDeleteClick = () => {
        window.confirm('all remove?') && dispatch(init());
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='reset' placement='bottom-end'>
            <span>
                <IconButton onClick={onDialogAllDeleteClick} disabled={isMaster}>
                    <DeleteForeverIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
