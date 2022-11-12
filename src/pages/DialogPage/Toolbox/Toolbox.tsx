import { Box, Divider, Grid } from '@mui/material';
import DefaultToolbox from './DefaultToolbox';
import OptionToolbox from './OptionToolbox';

export default function Toolbox() {
    return (
        <Box>
            <Divider />
            <Grid container alignItems='center'>
                <Grid item>
                    <DefaultToolbox />
                </Grid>
                <Grid item>
                    <OptionToolbox />
                </Grid>
            </Grid>
            <Divider />
        </Box>
    );
}
