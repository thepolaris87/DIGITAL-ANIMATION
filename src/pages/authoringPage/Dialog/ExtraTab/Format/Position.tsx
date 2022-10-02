import { Box, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';

export default function Position() {
    const { currentTarget, render, currentDialog } = useSelector(selectIntro);
    const [position, setPosition] = useState<{ left: number; top: number }>();

    const onPositionChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (position) {
            const currentRender = render[currentDialog];
            const target = currentRender.getObjects().find((el) => el.data.id === currentTarget.object.data.id);
            const value = Number(parseFloat(e.target.value).toFixed(2));
            target?.set(e.target.name as keyof fabric.Object, value);
            currentRender.renderAll();
            setPosition({ ...position, [e.target.name]: value });
        }
    };

    useEffect(() => {
        if (!currentTarget.object) return;
        const { left = 0, top = 0 } = currentTarget.object;
        setPosition({ left: Number(parseFloat(left).toFixed(2)), top: Number(parseFloat(top).toFixed(2)) });
    }, [currentTarget]);

    return (
        <Box>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextField
                    variant='standard'
                    label='CENTER-X'
                    name='left'
                    value={position?.left || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onPositionChange}
                    disabled={currentTarget?.object?.lockMovementX}
                />
                <TextField
                    variant='standard'
                    label='CENTER-Y'
                    name='top'
                    value={position?.top || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onPositionChange}
                    disabled={currentTarget?.object?.lockMovementY}
                />
            </Grid>
        </Box>
    );
}
