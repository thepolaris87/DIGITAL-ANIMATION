import { ReactNode } from 'react';
import { Typography } from '@mui/material';

type TITLE = { title?: ReactNode; align?: 'center' | 'right' | 'left' | 'inherit' | 'justify' };

export default function Title({ title = 'TITLE', align = 'center' }: TITLE) {
    return (
        <Typography variant='h5' align={align}>
            {title}
        </Typography>
    );
}
