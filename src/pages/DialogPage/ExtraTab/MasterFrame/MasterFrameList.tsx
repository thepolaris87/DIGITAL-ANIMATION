import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { Typography } from '@mui/material';

const rate = 0.3;

export default function MasterFrameList() {
    const { data } = useSelector(selectDialog);
    const { width: canvasWidth } = data.size;

    return (
        <Box sx={{ p: 1 }}>
            <Typography className='dia-subtitle' sx={{ width: canvasWidth * rate + 'px', py: 2 }} align='center'>
                CAN NOT USE MASTER FRAME WITHOUT DB
            </Typography>
        </Box>
    );
}
