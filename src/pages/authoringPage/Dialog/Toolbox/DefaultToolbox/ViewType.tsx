import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setViewType } from '../../../../../slices/intro';
import RectangleIcon from '@mui/icons-material/Rectangle';
import TableRowsIcon from '@mui/icons-material/TableRows';
export default function ViewType() {
    const { viewType } = useSelector(selectIntro);
    const dispatch = useDispatch();

    const onViewTypeClick = () => {
        const type = viewType === 'single' ? 'multi' : 'single';
        dispatch(setViewType(type));
    };

    return (
        <IconButton onClick={onViewTypeClick}>
            {viewType === 'multi' && <TableRowsIcon />}
            {viewType === 'single' && <RectangleIcon />}
        </IconButton>
    );
}
