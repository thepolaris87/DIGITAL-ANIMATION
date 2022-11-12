import { Grid } from '@mui/material';

export const NoTarget = () => {
    return (
        <Grid sx={{ height: '300px' }} direction='column' container justifyContent='center' alignItems='center'>
            <div>SELECT AN OBJECT</div>
            <div>TO SEE THIS TOOL BOX</div>
        </Grid>
    );
};
