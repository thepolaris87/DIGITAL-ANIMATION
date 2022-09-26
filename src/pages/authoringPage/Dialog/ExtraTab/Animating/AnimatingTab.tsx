import { useState } from 'react';
import { Collapse, Divider, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setOpen } from '../../../../../slices/intro';

import Effect from './Effect';
import { NoTarget } from '../ExtraTab.styles';

export default function AnimatingTab() {
    const { open, currentTarget } = useSelector(selectIntro);
    const dispath = useDispatch();
    const [collapse, setCollpase] = useState({ animation: false });
    const listItemButtonClick = (name: keyof typeof collapse) => setCollpase({ ...collapse, [name]: !collapse[name] });
    const onCloseIconClick = () => dispath(setOpen({ ...open, animating: !open.animating }));
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
                <>
                    <ListItemButton selected={collapse.animation} onClick={() => listItemButtonClick('animation')}>
                        <ListItemIcon>{collapse.animation ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</ListItemIcon>
                        <ListItemText primary='이펙트' />
                    </ListItemButton>
                    <Collapse in={collapse.animation}>
                        <Effect />
                    </Collapse>
                </>
            ) : (
                <NoTarget />
            )}
        </List>
    );
}
