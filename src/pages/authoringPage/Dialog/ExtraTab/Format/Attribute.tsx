import { Box, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';

export default function Attribute() {
    const { currentTarget, render, currentDialog } = useSelector(selectIntro);
    const [attribute, setAttribute] = useState<{ rx: number; ry: number; opacity: number }>();

    const onAttributeChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (attribute) {
            const currentRender = render[currentDialog];
            const target = currentRender.getObjects().find((el) => el.data.id === currentTarget.object.data.id);
            const value = Number(parseFloat(e.target.value).toFixed(2));
            target?.set(e.target.name as keyof fabric.Object, value);
            currentRender.renderAll();
            setAttribute({ ...attribute, [e.target.name]: value });
        }
    };

    useEffect(() => {
        if (!currentTarget.object) return;
        const { rx = 0, ry = 0, opacity } = currentTarget.object;
        setAttribute({ rx: Number(parseFloat(rx).toFixed(2)), ry: Number(parseFloat(ry).toFixed(2)), opacity });
    }, [currentTarget]);

    return (
        <Box>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextField
                    variant='standard'
                    label='OPACITY'
                    name='opacity'
                    value={attribute?.opacity || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onAttributeChange}
                    error={(attribute?.opacity || 0) < 0}
                />
            </Grid>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextField
                    variant='standard'
                    label='RX'
                    name='rx'
                    value={attribute?.rx || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onAttributeChange}
                    error={(attribute?.rx || 0) < 0}
                />
                <TextField
                    variant='standard'
                    label='RY'
                    name='ry'
                    value={attribute?.ry || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onAttributeChange}
                    error={(attribute?.ry || 0) < 0}
                />
            </Grid>
        </Box>
    );
}
