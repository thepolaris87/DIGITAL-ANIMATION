import { IconButton } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useState } from 'react';
import MetaModal from '../../../../../../components/metaModal';
import SetScriptTimeline from './SetScriptTimeline';
import SetCharacterTimeline from './SetCharacterTimeline';

export default function Timeline() {
    const [open, setOpen] = useState(false);

    const onTimelineClick = () => setOpen(!open);
    const onClose = () => setOpen(!open);

    return (
        <>
            <IconButton onClick={onTimelineClick}>
                <TimelineIcon />
            </IconButton>
            <MetaModal title='Timeline' open={open} onClose={onClose} save={false}>
                <SetScriptTimeline />
                <SetCharacterTimeline />
            </MetaModal>
        </>
    );
}
