import { Typography, Grid, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ReactNode } from 'react';
import { orange } from '@mui/material/colors';
type METATITLE = { children?: ReactNode; backgroundColor?: 'master' };
type STYLE = { [key: string]: any; children?: ReactNode };

const Header = ({ children, backgroundColor, ...rest }: STYLE) => {
    return (
        <Box
            sx={{
                padding: '6px',
                paddingLeft: '16px',
                borderRadius: '6px 6px 0 0',
                backgroundColor: backgroundColor === 'master' ? orange[400] : 'darkgrey',
                color: 'white'
            }}
            {...rest}>
            {children}
        </Box>
    );
};

export default function MetaTitleSub({ children, backgroundColor }: METATITLE) {
    return (
        <Header backgroundColor={backgroundColor}>
            <Grid
                sx={{ height: '24px', backgroundColor: backgroundColor === 'master' ? orange[400] : 'darkgrey' }}
                container
                justifyContent='space-between'
                alignItems='center'>
                {children}
            </Grid>
        </Header>
    );
}

MetaTitleSub.Title = ({ children }: { children: ReactNode }) => {
    return (
        <Grid item>
            <Typography align='center'>{children}</Typography>
        </Grid>
    );
};

MetaTitleSub.AddIcon = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <Grid item alignItems={'center'}>
            <IconButton sx={{ color: 'white', padding: '0 6px' }} onClick={onClick}>
                <AddIcon sx={{ width: '22.5px', height: '22.5px' }} />
            </IconButton>
        </Grid>
    );
};
