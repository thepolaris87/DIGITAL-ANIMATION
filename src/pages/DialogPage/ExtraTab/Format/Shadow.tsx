import { fabric } from 'fabric';
import { alpha, Box, Button, Checkbox, Grid, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import ColorPicker from '../../Toolbox/OptionToolbox/ColorPicker';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const initialShadow = { color: '#000000', opacity: 0.5, dx: 0, dy: 0, blur: 25 };

export default function Shadow() {
    const { currentTarget } = useSelector(selectDialog);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [shadow, setShadow] = useState(initialShadow);
    const [useShadow, setUseShadow] = useState(false);

    const onUseShadowChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setUseShadow(checked);
        if (!checked) {
            setShadow(initialShadow);
            currentTarget.object.set('shadow');
            currentTarget.object.canvas.renderAll();
        } else updateShadow(initialShadow);
    };

    const onColorPickerOpenClick = () => {
        setColorPickerOpen(!colorPickerOpen);
    };
    const onColorPickerClick = (color: string) => {
        const _shadow = { ...shadow, color };
        setShadow((prev) => ({ ...prev, color }));
        setColorPickerOpen(false);
        updateShadow(_shadow);
    };
    const onOpacityChange = (e: Event, value: number | number[]) => {
        const _shadow = { ...shadow, opacity: value as number };
        setShadow((prev) => _shadow);
        updateShadow(_shadow);
    };
    const onHorizontalChange = (e: Event, value: number | number[]) => {
        const _shadow = { ...shadow, dx: value as number };
        setShadow(_shadow);
        updateShadow(_shadow);
    };
    const onVerticalChange = (e: Event, value: number | number[]) => {
        const _shadow = { ...shadow, dy: value as number };
        setShadow(_shadow);
        updateShadow(_shadow);
    };
    const onBlurChange = (e: Event, value: number | number[]) => {
        const _shadow = { ...shadow, blur: value as number };
        setShadow(_shadow);
        updateShadow(_shadow);
    };

    const updateShadow = (data: typeof shadow) => {
        const rgba = alpha(data.color, data.opacity);
        const _shadow = `${rgba} ${data.dx}px ${data.dy}px ${data.blur}px`;
        currentTarget.object.set('shadow', _shadow);
        currentTarget.object.canvas?.renderAll();
    };

    useEffect(() => {
        if (currentTarget.object.shadow instanceof fabric.Shadow) {
            const color = new fabric.Color(currentTarget.object.shadow.color);
            setShadow({
                color: '#' + color.toHex(),
                opacity: color.getAlpha(),
                dx: currentTarget.object.shadow.offsetX,
                dy: currentTarget.object.shadow.offsetY,
                blur: currentTarget.object.shadow.blur
            });
            setUseShadow(true);
        }
    }, [currentTarget.object]);

    return (
        <Box sx={{ px: 3 }}>
            <Grid container alignItems='center'>
                <Typography className='jei-subtitle' sx={{ flex: 1 }}>
                    COLOR
                </Typography>
                <Checkbox checked={useShadow} onChange={onUseShadowChange} />
                <Button onClick={onColorPickerOpenClick} disabled={!useShadow}>
                    <Grid sx={{ p: 0.5, pr: 0, borderRadius: '8px', border: '1px solid #757575' }} container alignItems='center' wrap='nowrap'>
                        <Box sx={{ minWidth: '30px', minHeight: '30px', background: shadow.color, borderRadius: '50%' }}></Box>
                        {colorPickerOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </Grid>
                </Button>
            </Grid>
            <Box sx={{ position: 'relative' }}>{colorPickerOpen && <ColorPicker onClick={onColorPickerClick} initialColor={shadow.color} />}</Box>
            <Typography className='jei-subtitle'>OPACITY</Typography>
            <Slider sx={{ flex: 1 }} min={0} max={1} step={0.1} size='small' valueLabelDisplay='auto' value={shadow.opacity} onChange={onOpacityChange} disabled={!useShadow} />
            <Typography className='jei-subtitle'>HORIZONTAL</Typography>
            <Slider min={-25} max={25} step={0.1} size='small' valueLabelDisplay='auto' value={shadow.dx} onChange={onHorizontalChange} disabled={!useShadow} />
            <Typography className='jei-subtitle'>VERTICAL</Typography>
            <Slider min={-25} max={25} step={0.1} size='small' valueLabelDisplay='auto' value={shadow.dy} onChange={onVerticalChange} disabled={!useShadow} />
            <Typography className='jei-subtitle'>BLUR</Typography>
            <Slider min={0} max={50} step={0.1} size='small' valueLabelDisplay='auto' value={shadow.blur} onChange={onBlurChange} disabled={!useShadow} />
        </Box>
    );
}
