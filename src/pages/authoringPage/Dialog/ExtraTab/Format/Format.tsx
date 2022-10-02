import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton, Divider, ListSubheader, Grid, Typography } from '@mui/material/';
import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Transform from './Transform';
import Position from './Position';
import { selectIntro, setOpen } from '../../../../../slices/intro';
import { useDispatch, useSelector } from 'react-redux';
import { NoTarget } from '../ExtraTab.styles';
import Attribute from './Attribute';

export default function Format() {
    const { open, currentTarget } = useSelector(selectIntro);
    const dispath = useDispatch();
    const [collapse, setCollpase] = useState({ position: false, transform: false, attribute: false });
    const listItemButtonClick = (name: keyof typeof collapse) => setCollpase({ ...collapse, [name]: !collapse[name] });
    const onCloseIconClick = () => dispath(setOpen({ ...open, format: !open.format }));

    return (
        <List>
            <ListSubheader>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography className='jei-intro-title'>FORMAT</Typography>
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
                        <ListItemText primary='크기 및 회전' />
                    </ListItemButton>
                    <Collapse in={collapse.transform}>
                        <Transform />
                    </Collapse>
                    <ListItemButton selected={collapse.position} onClick={() => listItemButtonClick('position')}>
                        <ListItemIcon>{collapse.position ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='위치' />
                    </ListItemButton>
                    <Collapse in={collapse.position}>
                        <Position />
                    </Collapse>
                    <ListItemButton selected={collapse.attribute} onClick={() => listItemButtonClick('attribute')}>
                        <ListItemIcon>{collapse.attribute ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='속성' />
                    </ListItemButton>
                    <Collapse in={collapse.attribute}>
                        <Attribute />
                    </Collapse>
                </React.Fragment>
            ) : (
                <NoTarget />
            )}
        </List>
    );
}
