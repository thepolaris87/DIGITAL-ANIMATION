import React, { useState } from 'react';
import { Collapse, Divider, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setOpen } from '../../../../../slices/intro';

import Effect from './Effect';
import { NoTarget } from '../ExtraTab.styles';

export default function Animate() {
    const { open, currentTarget } = useSelector(selectIntro);
    const dispath = useDispatch();
    const [collapse, setCollpase] = useState({ effect: false });
    const listItemButtonClick = (name: keyof typeof collapse) => setCollpase({ ...collapse, [name]: !collapse[name] });
    const onCloseIconClick = () => dispath(setOpen({ ...open, animate: !open.animate }));
    return (
        <List>
            <ListSubheader>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography className='jei-intro-title'>ANIMATE</Typography>
                    <IconButton onClick={onCloseIconClick}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </ListSubheader>
            <Divider />
            {['image', 'character'].includes(currentTarget.type) ? (
                <React.Fragment key={currentTarget.object.data.id}>
                    {/* <ListItemButton selected={collapse.effect} onClick={() => listItemButtonClick('effect')}>
                        <ListItemIcon>{collapse.effect ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='이펙트' />
                    </ListItemButton>
                    <Collapse in={collapse.effect}>
                        <Divider />
                        <Effect key={currentTarget.object.data.id} />
                    </Collapse> */}
                    <Effect target={currentTarget} />
                </React.Fragment>
            ) : (
                <NoTarget />
            )}
        </List>
    );
}
