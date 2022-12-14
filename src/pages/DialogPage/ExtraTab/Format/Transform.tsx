import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FlipIcon from '@mui/icons-material/Flip';
import { selectDialog } from '../../../../slices/dialog';

export default function Transform() {
    const { currentTarget } = useSelector(selectDialog);
    const [transform, setTransform] = useState<{ scaleX: number; scaleY: number; angle: number; width: number; height: number }>();

    const onTransformChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (transform) {
            const value = Number(parseFloat(e.target.value).toFixed(2));
            currentTarget.object.set(e.target.name as keyof fabric.Object, value);
            currentTarget.object.canvas.renderAll();
            setTransform({ ...transform, [e.target.name]: value });
        }
    };

    const onFlipClick = (orientation: 'flipX' | 'flipY') => {
        const originFlip = currentTarget.object[orientation] || false;
        currentTarget.object.set(orientation, !originFlip);
        currentTarget.object.canvas.renderAll();
    };

    useEffect(() => {
        if (!currentTarget.object) return;
        const { scaleX = 1, scaleY = 1, angle = 0, width = 0, height = 0 } = currentTarget.object;
        setTransform({
            scaleX: Number(parseFloat(scaleX).toFixed(2)),
            scaleY: Number(parseFloat(scaleY).toFixed(2)),
            angle: Number(parseFloat(angle).toFixed(2)),
            width: Number(parseFloat(width).toFixed(2)),
            height: Number(parseFloat(height).toFixed(2))
        });
    }, [currentTarget]);

    return (
        <Box>
            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextField
                    variant='standard'
                    label='WIDTH'
                    name='width'
                    value={transform?.width || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onTransformChange}
                    error={(transform?.width || 0) < 0}
                    disabled={!['script', 'text'].includes(currentTarget.type)}
                />
                <TextField
                    variant='standard'
                    label='HEIGHT'
                    name='height'
                    value={transform?.height || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onTransformChange}
                    error={(transform?.height || 0) < 0}
                    disabled={!['script', 'text'].includes(currentTarget.type)}
                />
            </Grid>

            <Grid sx={{ p: '8px 24px' }} container justifyContent='space-between'>
                <TextField
                    variant='standard'
                    label='SCALE-X'
                    name='scaleX'
                    value={transform?.scaleX || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onTransformChange}
                    error={(transform?.scaleX || 0) < 0}
                    disabled={currentTarget?.object?.lockScalingX}
                />
                <TextField
                    variant='standard'
                    label='SCALE-Y'
                    name='scaleY'
                    value={transform?.scaleY || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onTransformChange}
                    error={(transform?.scaleY || 0) < 0}
                    disabled={currentTarget?.object?.lockScalingY}
                />
            </Grid>
            <Grid sx={{ p: '8px 24px' }} container>
                <TextField
                    variant='standard'
                    label='ANGLE'
                    name='angle'
                    value={transform?.angle || 0}
                    size='small'
                    type='number'
                    sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                    onChange={onTransformChange}
                    disabled={currentTarget?.object?.lockRotation}
                />
            </Grid>
            {!currentTarget?.object?.lockScalingFlip && (
                <Grid sx={{ p: '8px 24px' }} container alignItems='center'>
                    <Typography sx={{ mr: 2 }} className='dia-subtitle'>
                        FLIP
                    </Typography>
                    <IconButton onClick={() => onFlipClick('flipX')}>
                        <FlipIcon />
                    </IconButton>
                    <IconButton sx={{ transform: 'rotate(90deg)' }} onClick={() => onFlipClick('flipY')}>
                        <FlipIcon />
                    </IconButton>
                </Grid>
            )}
        </Box>
    );
}
