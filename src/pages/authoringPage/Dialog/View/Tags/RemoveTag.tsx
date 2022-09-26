import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteDialog } from '../../../../../slices/intro';
import { Tag, Tooltip } from './Tags.styles';
export default function RemoveTag({ id }: { id: string }) {
    const dispatch = useDispatch();
    const onRemoveClick = () => {
        window.confirm('remove?') && dispatch(deleteDialog(id));
    };

    return (
        <Tag sx={{ background: '#fff', boxShadow: '0 0 5px #008000', mt: 2 }} container alignItems='center' justifyContent='center'>
            <Tooltip title='REMOVE'>
                <IconButton onClick={onRemoveClick}>
                    <RemoveCircleOutlineIcon color='primary' />
                </IconButton>
            </Tooltip>
        </Tag>
    );
}
