import { Typography } from '@mui/material';
import UpcomingIcon from '@mui/icons-material/Upcoming';

export default function NoData({
    type = 'text',
    message = '해당 내역이 없습니다.',
    width = '30px',
    height = '30px'
}: {
    type?: 'text' | 'icon';
    message?: string;
    width?: string;
    height?: string;
}) {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {type === 'text' && <Typography sx={{ color: '#757575' }}>{message}</Typography>}
            {type === 'icon' && <UpcomingIcon sx={{ width: { width }, height: { height }, color: '#757575' }} />}
        </div>
    );
}
