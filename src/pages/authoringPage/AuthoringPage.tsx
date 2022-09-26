import { Grid } from '@mui/material';
import Dialog from './Dialog';

export default function AuthoringPage() {

    console.log(process.env.REACT_APP_ASSETS)
    return (
        <Grid sx={{ background: '#F2F5F5' }} container>
            <Dialog />
        </Grid>
    );
}
