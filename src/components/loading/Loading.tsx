import { CircularProgress, Grid } from '@mui/material';

export default function Loading() {
    return (
        <Grid sx={{ position: 'absolute', inset: '0' }} container alignItems='center' justifyContent='center'>
            <CircularProgress />
        </Grid>
    );
}
