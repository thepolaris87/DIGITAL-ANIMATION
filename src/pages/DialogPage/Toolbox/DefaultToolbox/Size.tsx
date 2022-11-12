import { Tooltip, IconButton, Grid, Box, TextField, Button } from '@mui/material';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setSize as _setSize } from '../../../../slices/dialog';

export default function Size() {
    const { data } = useSelector(selectDialog);    
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<{ width: number; height: number }>();
    const dispatch = useDispatch();
    const onSizeClick = () => {
        setOpen(!open);
    };

    const onSizeChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!size) return;
        setSize({ ...size, [e.target.name]: Number(e.target.value) });
    };
    const onApplyClick = () => {
        if (!size) return;
        dispatch(_setSize(size));
    };

    useEffect(() => {
        if (!size) setSize(data.size);
    }, [data.size, size]);

    return (
        <Box>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='size' placement='bottom-end'>
                <IconButton onClick={onSizeClick}>
                    <AspectRatioIcon />
                </IconButton>
            </Tooltip>
            {open && size && (
                <Grid sx={{ position: 'absolute', background: '#fff', zIndex: 10, width: 'fit-content', p: 1, borderRadius: '8px' }} container>
                    <TextField
                        variant='standard'
                        label='WIDTH'
                        name='width'
                        value={size.width}
                        size='small'
                        type='number'
                        sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                        onChange={onSizeChange}
                    />
                    <TextField
                        variant='standard'
                        label='HEIGHT'
                        name='height'
                        value={size.height}
                        size='small'
                        type='number'
                        sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
                        onChange={onSizeChange}
                    />
                    <Button onClick={onApplyClick} size='small' variant='outlined'>
                        APPLAY
                    </Button>
                </Grid>
            )}
        </Box>
    );
}
