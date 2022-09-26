import { Typography, Grid, IconButton, Box } from '@mui/material';
// import { Header as SHeader } from './MetaTitle.styles';
import AddIcon from '@mui/icons-material/Add';
import { ReactNode } from 'react';

type METATITLE = { children?: ReactNode };
type STYLE = { [key: string]: any; children?: ReactNode };

const Header = ({ children, ...rest }: STYLE) => {
    return (
        <Box
            sx={{
                padding: '8px',
                paddingLeft: '16px',
                borderRadius: '8px 8px 0 0',
                backgroundColor: 'darkgrey',
                color: 'white'
            }}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default function MetaTitle({ children }: METATITLE) {
    return (
        <Header>
            <Grid sx={{ height: '32px' }} container justifyContent='space-between' alignItems='center'>
                {children}
            </Grid>
        </Header>
    );
}

MetaTitle.Title = ({ children }: { children: ReactNode }) => {
    return (
        <Grid item>
            <Typography align='center'>{children}</Typography>
        </Grid>
    );
};

MetaTitle.AddIcon = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <Grid item alignItems={'center'}>
            <IconButton sx={{color: 'white',  padding: '0 8px'}} onClick={onClick}>
                <AddIcon sx={{ width: '30px', height: '30px' }}/>
            </IconButton>
        </Grid>
    );
};
