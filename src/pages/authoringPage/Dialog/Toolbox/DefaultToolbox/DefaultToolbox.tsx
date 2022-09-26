import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addDialog, deleteDialog, selectIntro, init, setCurrentDialog } from '../../../../../slices/intro';
import { v4 as uuidv4 } from 'uuid';
import Save from './Save';
import ViewType from './ViewType';

export default function DefaultToolbox() {
    const dispatch = useDispatch();
    const { currentDialog } = useSelector(selectIntro);

    const onDialogAddClick = () => {
        const id = uuidv4();
        dispatch(addDialog(id));
        setTimeout(() => dispatch(setCurrentDialog(id)));
    };

    const onDialogDeleteClick = () => {
        dispatch(deleteDialog(currentDialog));
    };

    const onDialogAllDeleteClick = () => {
        window.confirm('all remove?') && dispatch(init());
    };

    return (
        <div>
            <Button onClick={onDialogAddClick}>추가</Button>
            <Button onClick={onDialogDeleteClick}>삭제</Button>
            <Button onClick={onDialogAllDeleteClick}>모두 삭제</Button>
            <ViewType />
            <Save />
        </div>
    );
}
