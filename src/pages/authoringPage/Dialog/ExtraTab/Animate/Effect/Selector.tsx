import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EFFECTBASICFORM, effects, setEffects, EFFECT } from '../../../../../../slices/intro';

export default function Selector({ disabled, effectList, index }: { disabled?: boolean; effectList: EFFECTBASICFORM[]; index: number }) {
    const dispatch = useDispatch();
    const onEffectChange = (e: SelectChangeEvent<EFFECT>) => {
        const type = e.target.value as EFFECT;
        const data = effectList.map((el, i) => {
            if (i === index) return { ...el, type };
            return el;
        });
        dispatch(setEffects(data));
    };

    return (
        <Box sx={{ p: 1 }}>
            <FormControl size='small' fullWidth disabled={disabled}>
                <InputLabel>TYPE</InputLabel>
                <Select value={effectList[index].type} label='TYPE' onChange={(e) => onEffectChange(e)}>
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
