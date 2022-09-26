import { styled, Grid, Box, Tooltip as MuiTooltip } from '@mui/material';
import { ReactElement } from 'react';

export const Tag = styled(Grid)`
    width: 65px;
    transform: scale(1.25);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    position: relative;

    &:hover {
        & .tooltip {
            visibility: visible;
        }
    }
`;

export const Tooltip = ({ title, children }: { title: string; children: ReactElement }) => (
    <MuiTooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '8px', left: '-16px' } } }} title={title} placement='right-end'>
        {children}
    </MuiTooltip>
);
