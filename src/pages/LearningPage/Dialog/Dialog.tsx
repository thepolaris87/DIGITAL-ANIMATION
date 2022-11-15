import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLearning } from '../../../slices/learning';
import Controller from './Controller';
import View from './View';

export default function Dialog() {
    const { data } = useSelector(selectLearning);

    if (!data) return null;

    return (
        <Box>            
            <Controller />
            <View />
        </Box>
    );
}
