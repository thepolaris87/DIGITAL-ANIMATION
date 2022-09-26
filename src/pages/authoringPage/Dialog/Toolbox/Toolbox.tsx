import { Box, Divider } from '@mui/material';
import DefaultToolbox from './DefaultToolbox';
import OptionToolbox from './OptionToolbox';

export default function Toolbox() {
    return (
        <Box>
            <Divider />
            <DefaultToolbox />
            <Divider />
            <OptionToolbox />
            <Divider />
        </Box>
    );
}
