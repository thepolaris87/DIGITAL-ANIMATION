import { fabric } from 'fabric';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog, totalFilters } from '../../../../slices/dialog';
import TextFieldAttribute from './TextFieldAttribute';

type ATTRIBUTE = { rx: number; ry: number; opacity: number; brightness: number; noise: number; contrast: number; saturation: number };

export default function Attribute() {
    const { currentTarget } = useSelector(selectDialog);
    const [attribute, setAttribute] = useState<ATTRIBUTE>();

    const radiusDisabled = ['character', 'basic', 'sprite', 'text'].includes(currentTarget.object.data.type);
    const filterDisabled = ['text'].includes(currentTarget.object.data.type);

    const onAttributeChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value ? Number(parseFloat(e.target.value).toFixed(2)) : 0;
        if (attribute && !totalFilters.includes(e.target.name)) {
            currentTarget.object.set(e.target.name as keyof fabric.Object, value);
            currentTarget.object.canvas.renderAll();
            setAttribute({ ...attribute, [e.target.name]: value });
        } else if (attribute && totalFilters.includes(e.target.name)) {
            setAttribute({ ...attribute, [e.target.name]: value });
            const filters = (currentTarget.object as fabric.Image).get('filters');
            const hasFilter = filters?.find((filter) => filter.toObject()[`${e.target.name}`]);
            const input: any = {};
            input[`${e.target.name}`] = value;
            if (hasFilter) {
                filters?.forEach((filter, i) => {
                    if (filter.toObject()[`${e.target.name}`]) {
                        filter.setOptions(input);
                        if (value === 0 || isNaN(value)) filters.splice(i, 1);
                    }
                });
            } else if (!hasFilter && e.target.name === 'brightness') {
                filters?.push(new fabric.Image.filters.Brightness(input));
            } else if (!hasFilter && e.target.name === 'noise') {
                filters?.push(new fabric.Image.filters.Noise(input));
            } else if (!hasFilter && e.target.name === 'contrast') {
                filters?.push(new fabric.Image.filters.Contrast(input));
            } else if (!hasFilter && e.target.name === 'saturation') {
                filters?.push(new fabric.Image.filters.Saturation(input));
            }

            currentTarget.object.applyFilters();
            currentTarget.object.canvas.renderAll();
        }
    };

    useEffect(() => {
        if (!currentTarget.object) return;
        const { rx = 0, ry = 0, opacity } = currentTarget.object;
        const filters = (currentTarget.object as fabric.Image).get('filters');
        const hasBrightness = filters?.find((filter) => filter.toObject().brightness);
        const hasNoise = filters?.find((filter) => filter.toObject().noise);
        const hasContrast = filters?.find((filter) => filter.toObject().contrast);
        const hasSaturation = filters?.find((filter) => filter.toObject().saturation);

        const brightness = hasBrightness ? hasBrightness.toObject().brightness : 0;
        const noise = hasNoise ? hasNoise.toObject().noise : 0;
        const contrast = hasContrast ? hasContrast.toObject().contrast : 0;
        const saturation = hasSaturation ? hasSaturation.toObject().saturation : 0;
        setAttribute({ rx: Number(parseFloat(rx).toFixed(2)), ry: Number(parseFloat(ry).toFixed(2)), opacity, brightness, noise, contrast, saturation });
    }, [currentTarget]);

    return (
        <Box>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextFieldAttribute name='opacity' value={attribute?.opacity || 0} onChange={onAttributeChange} error={(attribute?.opacity || 0) < 0} />
            </Grid>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextFieldAttribute name='rx' value={attribute?.rx || 0} onChange={onAttributeChange} error={(attribute?.rx || 0) < 0} disabled={radiusDisabled} />
                <TextFieldAttribute name='ry' value={attribute?.ry || 0} onChange={onAttributeChange} error={(attribute?.ry || 0) < 0} disabled={radiusDisabled} />
            </Grid>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextFieldAttribute name='brightness' value={attribute?.brightness || 0} onChange={onAttributeChange} disabled={filterDisabled} />
                <TextFieldAttribute name='noise' value={attribute?.noise || 0} onChange={onAttributeChange} disabled={filterDisabled} />
            </Grid>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextFieldAttribute name='contrast' value={attribute?.contrast || 0} onChange={onAttributeChange} disabled={filterDisabled} />
                <TextFieldAttribute name='saturation' value={attribute?.saturation || 0} onChange={onAttributeChange} disabled={filterDisabled} />
            </Grid>
        </Box>
    );
}
