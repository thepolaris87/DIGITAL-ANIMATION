import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setViewType } from '../../../../slices/dialog';
import RectangleIcon from '@mui/icons-material/Rectangle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useMemo } from 'react';
export default function ViewType() {
    const { viewType, frameType } = useSelector(selectDialog);
    const isMaster = useMemo(() => frameType === 'M', [frameType]);
    const dispatch = useDispatch();

    const onViewTypeClick = () => {
        const type = viewType === 'single' ? 'multi' : 'single';
        dispatch(setViewType(type));
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='view type' placement='bottom-end'>
            <span>
                <IconButton onClick={onViewTypeClick} disabled={isMaster}>
                    {viewType === 'multi' && <TableRowsIcon />}
                    {viewType === 'single' && <RectangleIcon />}
                </IconButton>
            </span>
        </Tooltip>
    );
}
