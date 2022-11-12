import { IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useMutation, useQueryClient } from 'react-query';
import { patchFrameData } from '../../../../apis/api';
import { useParams } from 'react-router-dom';
import useCanvasSync from '../../hooks/useCanvasSync';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function Save({ onMessage }: { onMessage?: (msg: string) => void }) {
    const { data } = useSelector(selectDialog);
    const { frameId } = useParams();
    const { mutate } = useMutation(patchFrameData, {
        onMutate: () => onMessage?.('ON SAVE'),
        onSuccess: () => onMessage?.('SUCCESS SAVE')
    });
    const queryClient = useQueryClient();
    const originData = queryClient.getQueryData<any>(['dialog', 'meta', frameId]);
    const { getSyncData, getMasterSyncData } = useCanvasSync();

    const onSaveClick = () => {
        if (originData.frameStatusCode === '02') return;
        const syncData = getSyncData();
        const masterSyncData = getMasterSyncData();
        let frameConfig;

        if (masterSyncData) {
            frameConfig = JSON.stringify({ dialog: syncData, size: data.size, master: masterSyncData }).replace(/https:\/\/sol-api.esls.io\/images\/A1\//g, '');
        } else {
            frameConfig = JSON.stringify({ dialog: syncData, size: data.size }).replace(/https:\/\/sol-api.esls.io\/images\/A1\//g, '');
        }
        const body = { ...originData, frameConfig };
        console.log(syncData);
        console.log(body);
        mutate({ frameId, body });
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='save' placement='bottom-end'>
            <span>
                <IconButton id='dialog-save' onClick={onSaveClick} disabled={originData.frameStatusCode === '02'}>
                    <SaveIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
