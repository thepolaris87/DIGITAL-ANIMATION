import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { effects } from '../../../../../slices/intro';

export const EffectHeader = ({ type, onRemoveIconClick, disabled = false }: { type: string; onRemoveIconClick: () => void; disabled?: boolean }) => {
    const getDisplayName = (type: string) => effects.find((el) => el.value === type)?.display || '';
    return (
        <Grid container alignItems='center'>
            <Grid item>
                <Typography className='jei-intro-title' sx={{ mr: 1 }}>
                    EFFECT TYPE
                </Typography>
            </Grid>
            <Grid sx={{ ml: 1, flex: 1 }} item>
                <Typography className='jei-intro-subtitle' sx={{ color: '#F8B00C !important' }}>
                    {getDisplayName(type)}
                </Typography>
            </Grid>
            <Grid sx={{ mr: 1 }} item>
                <IconButton onClick={onRemoveIconClick} disabled={disabled}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export const EffectSelector = ({ type, onEffectChange, disabled = false }: { type: string; onEffectChange: (e: SelectChangeEvent<any>) => void; disabled?: boolean }) => {
    return (
        <Box sx={{ p: '8px', pb: '0', mt: 2 }}>
            <FormControl size='small' fullWidth disabled={disabled}>
                <InputLabel>TYPE</InputLabel>
                <Select value={type} label='TYPE' onChange={(e) => onEffectChange(e)}>
                    {effects.map((el) => (
                        <MenuItem key={el.value} value={el.value}>
                            {el.display}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export const EffectDuration = ({
    duration,
    onChange,
    onChangeCommitted,
    disabled = false
}: {
    duration: number;
    onChange: (value: number | number[]) => void;
    onChangeCommitted: (value: number | number[]) => void;
    disabled?: boolean;
}) => {
    return (
        <Box sx={{ mt: 2, p: '0 16px' }}>
            <Slider
                size='small'
                valueLabelDisplay='auto'
                defaultValue={duration}
                value={duration}
                min={10}
                max={300}
                onChange={(e, value) => onChange(value)}
                onChangeCommitted={(e, value) => onChangeCommitted(value)}
                disabled={disabled}
            />
            <Grid sx={{ mb: 2 }} container justifyContent='space-between'>
                <Typography sx={{ fontSize: '12px' }} className='jei-intro-subtitle'>
                    FAST
                </Typography>
                <Typography sx={{ fontSize: '12px' }} className='jei-intro-subtitle' align='center'>
                    MEDIUM
                </Typography>
                <Typography sx={{ fontSize: '12px' }} className='jei-intro-subtitle' align='right'>
                    SLOW
                </Typography>
            </Grid>
        </Box>
    );
};
