import React from 'react';
import { Divider, Grid, IconButton, List, ListSubheader, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';

import Effect from './Effect';
import { NoTarget } from '../ExtraTab.styles';
import { selectDialog, setOpen } from '../../../../slices/dialog';

export default function Animate() {
    const { open, currentTarget } = useSelector(selectDialog);
    const dispath = useDispatch();
    const onCloseIconClick = () => dispath(setOpen({ ...open, animate: !open.animate }));

    return (
        <List>
            <ListSubheader>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography className='dia-title'>ANIMATE</Typography>
                    <IconButton onClick={onCloseIconClick}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </ListSubheader>
            <Divider />
            {['image', 'character', 'basic', 'text', 'sprite'].includes(currentTarget.type) ? (
                <React.Fragment key={currentTarget.object.data.id}>
                    <Effect object={currentTarget.object} />
                </React.Fragment>
            ) : (
                <NoTarget />
            )}
        </List>
    );
}
