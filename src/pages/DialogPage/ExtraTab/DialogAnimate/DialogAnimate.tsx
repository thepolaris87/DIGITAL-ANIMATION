import { Divider, Grid, IconButton, List, ListSubheader, Typography } from '@mui/material';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { NoTarget } from '../ExtraTab.styles';
import DialogEffect from './DialogEffect';
import { selectDialog, setOpen } from '../../../../slices/dialog';

export default function DialogAnimate() {
    const { open, currentTarget,  } = useSelector(selectDialog);

    const dispath = useDispatch();

    const onCloseIconClick = () => dispath(setOpen({ ...open, textAnimate: !open.textAnimate }));
    return (
        <List>
            <ListSubheader>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography className='jei-title'>DIALOG ANIMATE</Typography>
                    <IconButton onClick={onCloseIconClick}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </ListSubheader>
            <Divider />
            {['script', 'bubble'].includes(currentTarget.type) ? (
                <React.Fragment key={currentTarget.object.data.id}>
                    <DialogEffect />
                </React.Fragment>
            ) : (
                <NoTarget />
            )}
        </List>
    );
}
