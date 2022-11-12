import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton, Divider, ListSubheader, Grid, Typography } from '@mui/material/';
import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Transform from './Transform';
import Position from './Position';
import { useDispatch, useSelector } from 'react-redux';
import { NoTarget } from '../ExtraTab.styles';
import Attribute from './Attribute';
import { selectDialog, setOpen } from '../../../../slices/dialog';
import Shadow from './Shadow';

export default function Format() {
    const { open, currentTarget } = useSelector(selectDialog);
    const dispatch = useDispatch();
    const [collapse, setCollpase] = useState({ position: false, transform: false, attribute: false, shadow: false });
    const listItemButtonClick = (name: keyof typeof collapse) => setCollpase({ ...collapse, [name]: !collapse[name] });
    const onCloseIconClick = () => dispatch(setOpen({ ...open, format: !open.format }));

    return (
        <List>
            <ListSubheader>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography className='jei-title'>FORMAT</Typography>
                    <IconButton onClick={onCloseIconClick}>
                        <Close />
                    </IconButton>
                </Grid>
            </ListSubheader>
            <Divider />
            {currentTarget.type ? (
                <React.Fragment key={currentTarget.object.data.id}>
                    <ListItemButton selected={collapse.transform} onClick={() => listItemButtonClick('transform')}>
                        <ListItemIcon>{collapse.transform ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='Size & Rotation' />
                    </ListItemButton>
                    <Collapse in={collapse.transform}>
                        <Transform />
                    </Collapse>
                    <ListItemButton selected={collapse.position} onClick={() => listItemButtonClick('position')}>
                        <ListItemIcon>{collapse.position ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='Position' />
                    </ListItemButton>
                    <Collapse in={collapse.position}>
                        <Position />
                    </Collapse>
                    <ListItemButton selected={collapse.attribute} onClick={() => listItemButtonClick('attribute')}>
                        <ListItemIcon>{collapse.attribute ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='Attribute' />
                    </ListItemButton>
                    <Collapse in={collapse.attribute}>
                        <Attribute />
                    </Collapse>
                    <ListItemButton selected={collapse.attribute} onClick={() => listItemButtonClick('shadow')}>
                        <ListItemIcon>{collapse.shadow ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='Shadow' />
                    </ListItemButton>
                    <Collapse in={collapse.shadow}>
                        <Shadow />
                    </Collapse>
                </React.Fragment>
            ) : (
                <NoTarget />
            )}
        </List>
    );
}
