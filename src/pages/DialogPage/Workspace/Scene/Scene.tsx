import { Box } from '@mui/material';
// import Cutaway from './Cutaway';
import Effect from './Effect';
import SelectBGM from './SelectBGM';

export default function Scene() {
    return (
        <Box>
            <SelectBGM />
            <Effect />
        </Box>
    );
}
