import { Box, Typography } from '@mui/material';
import UpcomingIcon from '@mui/icons-material/Upcoming';

export default function NoData({ type = 'icon', message = '해당 내역이 없습니다.' }: { type?: 'text' | 'icon'; message?: string }) {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {type === 'text' && <Typography sx={{ color: '#757575' }}>{message}</Typography>}
            {type === 'icon' && <UpcomingIcon sx={{ color: '#757575' }} fontSize='large' />}
        </Box>
    );
}
