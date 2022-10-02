import { Divider, Grid, IconButton, List, ListSubheader, Typography } from '@mui/material';

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setOpen } from '../../../../../slices/intro';
import CloseIcon from '@mui/icons-material/Close';
import { NoTarget } from '../ExtraTab.styles';
import ScriptEffect from './ScriptEffect';

export default function ScriptAnimate() {
    const { open, currentTarget, data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find((el) => el.dialogId === currentDialog), [data, currentDialog]);
    const dispath = useDispatch();

    const onCloseIconClick = () => dispath(setOpen({ ...open, textAnimate: !open.textAnimate }));
    return (
        <List>
            <ListSubheader>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography className='jei-intro-title'>SCRIPT ANIMATE</Typography>
                    <IconButton onClick={onCloseIconClick}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </ListSubheader>
            <Divider />
            {['text', 'bubble'].includes(currentTarget.type) && targetData?.scripts?.length !== 0 ? (
                <React.Fragment key={currentTarget.object.data.id}>
                    <ScriptEffect />
                </React.Fragment>
            ) : (
                <NoTarget />
            )}
        </List>
    );
}
