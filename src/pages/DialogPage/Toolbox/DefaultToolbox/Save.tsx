import { IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function Save({ onMessage }: { onMessage?: (msg: string) => void }) {
    const onSaveClick = () => {
        onMessage?.('CAN NOT SAVE');
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='save' placement='bottom-end'>
            <span>
                <IconButton id='dialog-save' onClick={onSaveClick}>
                    <SaveIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
