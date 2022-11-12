import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { effects } from '../../../../../slices/dialog';

export default function Selector({ type, onChange, disabled }: { type: string; disabled?: boolean; onChange: (type: string) => void }) {
    const onEffectChange = (e: SelectChangeEvent<string>) => {
        onChange(e.target.value);
    };

    return (
        <Box sx={{ p: 1 }}>
            <FormControl size='small' fullWidth disabled={disabled}>
                <InputLabel>TYPE</InputLabel>
                <Select value={type} label='TYPE' onChange={(e) => onEffectChange(e)}>
                    {effects.map((el, i) => (
                        <MenuItem key={el.value} value={el.value}>
                            {el.display}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
