import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Tag, Tooltip } from './Tags.styles';

export default function PlayTag({ id }: { id: string }) {
    const [isPlay, setIsPlay] = useState(false);
    const onPlayClick = () => {
        setIsPlay(!isPlay);
    };
    return (
        <Tag sx={{ background: '#fff', boxShadow: '0 0 5px #ffa500', mt: 3 }} container alignItems='center' justifyContent='center'>
            <Tooltip title='PLAY'>
                <IconButton onClick={onPlayClick}>
                    {!isPlay && <PlayCircleOutlineIcon color='primary' />}
                    {isPlay && <StopCircleIcon color='primary' />}
                </IconButton>
            </Tooltip>
        </Tag>
    );
}
