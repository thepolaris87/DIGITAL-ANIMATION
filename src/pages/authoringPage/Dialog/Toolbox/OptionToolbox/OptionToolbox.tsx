import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import Animate from './Animate';
import Format from './Format';
import TextColor from './TextColor';
import Bold from './Bold';
import Italic from './Italic';
import Underline from './Underline';
import Linethrough from './Linethrough';
import FontSize from './FontSize';
import FillColor from './FillColor';

export default function OptionToolbox() {
    const { currentTarget } = useSelector(selectIntro);

    return (
        <Grid sx={{ p: '0 8px', height: '52.5px' }} container alignItems='center'>
            <Typography sx={{ color: '#757575', fontWeight: 'bold' }}>OPTIONAL</Typography>
            <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
            {currentTarget.type && <Format />}
            {['image', 'character'].includes(currentTarget.type) && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <Animate />
                </React.Fragment>
            )}
            {['text'].includes(currentTarget.type) && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <Bold />
                    <Italic />
                    <Underline />
                    <Linethrough />
                    <TextColor />
                    <FontSize />
                </React.Fragment>
            )}
            {['bubble'].includes(currentTarget.type) && currentTarget.object.type === 'rect' && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <FillColor />
                </React.Fragment>
            )}
        </Grid>
    );
}
