import { Typography, Grid, IconButton, Box, Button } from '@mui/material';
// import { Header as SHeader } from './MetaTitle.styles';
import AddIcon from '@mui/icons-material/Add';
import { ReactNode } from 'react';
import { orange } from '@mui/material/colors';
type METATITLE = { children?: ReactNode; backgroundColor?: 'master' };
type STYLE = { [key: string]: any; children?: ReactNode };

const Header = ({ children, backgroundColor, ...rest }: STYLE) => {
    return (
        <Box
            sx={{
                padding: '8px',
                paddingLeft: '16px',
                borderRadius: '8px 8px 0 0',
                backgroundColor: backgroundColor === 'master' ? orange[400] : 'darkgrey',
                color: 'white'
            }}
            {...rest}>
            {children}
        </Box>
    );
};

export default function MetaTitle({ children, backgroundColor }: METATITLE) {
    return (
        <Header backgroundColor={backgroundColor}>
            <Grid sx={{ height: '32px', backgroundColor: backgroundColor === 'master' ? orange[400] : 'darkgrey' }} container justifyContent='space-between' alignItems='center'>
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
            <IconButton sx={{ color: 'white', padding: '0 8px' }} onClick={onClick}>
                <AddIcon sx={{ width: '30px', height: '30px' }} />
            </IconButton>
        </Grid>
    );
};

MetaTitle.UploadIcon = ({ onChange, accept, multiple }: { onChange: React.ChangeEventHandler<HTMLInputElement>; accept: string; multiple: boolean }) => {
    return (
        <Grid item alignItems={'center'}>
            <IconButton sx={{ color: 'white', padding: '0 8px' }} component='label'>
                <AddIcon sx={{ width: '30px', height: '30px' }} />
                <input hidden accept={accept} type='file' multiple onChange={onChange} />
            </IconButton>
        </Grid>
    );
};
