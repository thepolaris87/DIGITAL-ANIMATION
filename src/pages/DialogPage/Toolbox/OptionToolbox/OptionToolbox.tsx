import React from 'react';
import { Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import Animate from './Animate';
import Format from './Format';
import TextColor from './TextColor';
import Bold from './Bold';
import Italic from './Italic';
import Underline from './Underline';
import Linethrough from './Linethrough';
import FontSize from './FontSize';
import FillColor from './FillColor';
import DialogAnimate from './DialogAnimate';
import { divisionCode, getImageCodeName } from '../../View/Canvas/helper';
import MasterFrame from './MasterFrame';
import TextStrokeColor from './TextStrokeColor';
import TextStrokeWidth from './TextStrokeWidth';
import FontFamily from './FontFamily';

export default function OptionToolbox() {
    const { currentTarget, navi } = useSelector(selectDialog);

    return (
        <Grid sx={{ p: '0 8px', height: '52.5px' }} container alignItems='center'>
            {['master'].includes(navi) && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <MasterFrame />
                </React.Fragment>
            )}
            {['script', 'text'].includes(currentTarget.type) && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <Bold />
                    <Italic />
                    <Underline />
                    <Linethrough />
                    <TextColor />
                    <TextStrokeColor />
                    <TextStrokeWidth />
                    <FontFamily />
                    <FontSize />
                    
                </React.Fragment>
            )}
            {currentTarget.type && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <Format />
                </React.Fragment>
            )}
            {[getImageCodeName(divisionCode.image.basic), getImageCodeName(divisionCode.image.character), getImageCodeName(divisionCode.image.sprite), 'text'].includes(
                currentTarget.type
            ) && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <Animate />
                </React.Fragment>
            )}
            {['script', 'bubble'].includes(currentTarget.type) && (
                <React.Fragment>
                    <Divider sx={{ m: 0.5 }} orientation='vertical' flexItem />
                    <DialogAnimate />
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
