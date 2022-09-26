import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setScripts } from '../../../../../../slices/intro';
import { canvasHeight, canvasWidth } from '../../../Dialog';
import { drawBubble, removeObject } from '../../../View/Canvas/helper';

export default function SelectType() {
    const { data, currentDialog, render } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const dispatch = useDispatch();

    const onBubbleTypeChange = (e: React.ChangeEvent<HTMLInputElement>, id?: string) => {
        const value = e.target.value as 'shape' | 'image';
        if (targetData && id) {
            const id = targetData?.scripts?.[0].id;
            if (id) {
                if (value === 'shape') {
                    const bubble = { top: canvasHeight / 2, left: canvasWidth / 2, width: 900, height: 150, rx: 100, ry: 100, angle: 0 };
                    drawBubble({ canvas: render[currentDialog], id, attr: bubble });
                } else {
                    removeObject({ canvas: render[currentDialog], id, type: 'bubble' });
                }
                dispatch(
                    setScripts({
                        id,
                        key: 'bubble',
                        data: { ...targetData?.scripts?.[0]?.bubble, type: value, ko: { ...targetData?.scripts?.[0]?.bubble?.ko }, en: { ...targetData?.scripts?.[0]?.bubble?.en } }
                    })
                );
            }
        }
    };
    return (
        <Grid sx={{ flex: 1, m: '8px 0', mt: 2 }} container alignItems='center' wrap='nowrap'>
            <Grid sx={{ minWidth: '100px', mr: 2 }} item>
                <Typography className='jei-intro-title'>BUBBLE TYPE</Typography>
            </Grid>
            <Grid item>
                <RadioGroup row value={targetData?.scripts?.[0]?.bubble?.type} onChange={(e) => onBubbleTypeChange(e, targetData?.scripts?.[0].id)}>
                    <FormControlLabel value='shape' control={<Radio />} label='SHAPE' />
                    <FormControlLabel value='image' control={<Radio />} label='IMAGE' />
                </RadioGroup>
            </Grid>
        </Grid>
    );
}
