import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSnackbarMessage } from '../../../../slices/dialog';

export default function useSave() {
    const { frameId } = useParams();
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<any>(['dialog', 'meta', frameId]);
    const dispatch = useDispatch();

    const save = () => {
        if (data.frameStatusCode === '02') {
            dispatch(setSnackbarMessage('CAN NOT SAVE'));
            return;
        }
        const saveBtn = document.getElementById('dialog-save');
        saveBtn?.click();
    };

    return { save };
}
