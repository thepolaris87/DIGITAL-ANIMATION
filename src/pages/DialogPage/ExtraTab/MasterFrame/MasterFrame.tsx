import { Divider, Grid, IconButton, List, ListSubheader, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setOpen } from '../../../../slices/dialog';
import { Close } from '@mui/icons-material';
import MasterFrameList from './MasterFrameList';

export default function MasterFrame() {
    const { open, navi } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const onCloseIconClick = () => dispatch(setOpen({ ...open, masterFrame: !open.masterFrame }));

    return (
        <List>
            <ListSubheader>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography className='dia-title'>MASTER FRAME</Typography>
                    <IconButton onClick={onCloseIconClick}>
                        <Close />
                    </IconButton>
                </Grid>
            </ListSubheader>
            <Divider />
            {navi === 'master' && <MasterFrameList />}
        </List>
    );
}
