import { Divider, Grid as MuiGrid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../../../slices/dialog';

import Save from './Save';
import ViewType from './ViewType';
import Timeline from './Timeline';
import Preview from './Preview';
import Order from './Order';
import Add from './Add';
import Remove from './Remove';
import Reset from './Reset';
import Size from './Size';
import Text from './Text';
import Grid from './Grid';
// import Undo from './Undo';

export default function DefaultToolbox() {
    const dispatch = useDispatch();

    return (
        <MuiGrid container alignItems='center' wrap='nowrap'>
            <Save onMessage={(msg) => dispatch(setSnackbarMessage(msg))} />
            <Preview />
            <Divider flexItem orientation='vertical' />
            {/* <Undo />
            <Divider flexItem orientation='vertical' /> */}
            <Size />
            <Add />
            <Remove />
            <Reset />
            <Divider flexItem orientation='vertical' />
            <ViewType />
            <Timeline />
            <Divider flexItem orientation='vertical' />
            <Grid />
            <Text />
            <Divider flexItem orientation='vertical' />
            <Order />
        </MuiGrid>
    );
}
