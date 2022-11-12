import { Box, Grid } from '@mui/material';
import Cutaway from './Cutaway';
import Effect from './Effect';
import SelectBGM from './SelectBGM';

export default function Scene() {
    return (
        <Box>
            <Grid item>
                <SelectBGM />
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Effect />
                </Grid>
                <Grid item xs={3}>
                    <Cutaway />
                </Grid>
            </Grid>
        </Box>
    );
}
