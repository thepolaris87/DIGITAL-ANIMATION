import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addDialog, selectDialog } from '../../../../slices/dialog';
import { Tag, Tooltip } from './Tags.styles';
import { v4 as uuidv4 } from 'uuid';

export default function CopyTag({ id }: { id: string }) {
    const { data, render } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const onCopyClick = () => {
        const target = data.dialog.find((el) => el.id === id);
        if (!render || !target) return;
        const newId = uuidv4();
        render[id].includeDefaultValues = false;
        const canvas = render[id].toObject(['data']);
        dispatch(addDialog({ ...target, id: newId, canvas }));
    };

    return (
        <Tag sx={{ background: '#fff', boxShadow: '0 0 5px #ffa500', mt: 2 }} container alignItems='center' justifyContent='center'>
            <Tooltip title='copy'>
                <IconButton onClick={onCopyClick}>
                    <ContentCopyIcon color='primary' />
                </IconButton>
            </Tooltip>
        </Tag>
    );
}
