import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EFFECTBASICFORM, setEffects } from '../../../../../../slices/intro';

export default function BlinkOption({ effectList, index, disabled }: { effectList: EFFECTBASICFORM[]; index: number; disabled?: boolean }) {
    const dispatch = useDispatch();
    const optionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = effectList.map((el, i) => {
            if (i === index) return { ...el, option: { ...el.option, interval: Number(e.target.value) } };
            return el;
        });
        dispatch(setEffects(data));
    };
    return (
        <Box sx={{ p: 1 }}>
            <TextField
                variant='standard'
                label='INTERVAL'
                name='interval'
                value={effectList?.[index]?.option?.interval || 0}
                size='small'
                type='number'
                sx={{ mr: 0.5, backgroundColor: '#fff' }}
                onChange={(e) => optionChange(e)}
                disabled={disabled}
            />
        </Box>
    );
}
