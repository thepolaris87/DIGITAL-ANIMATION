import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { EFFECTBASICFORM } from '../../../../../slices/dialog';

export default function RotateOption({ object, index, disabled, onChangeCommitted }: { object: fabric.Object; index: number; disabled?: boolean; onChangeCommitted?: () => void }) {
    const [update, setUpdate] = useState(false);
    const optionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = object.get('data');
        const effects = data.effects.map((effect: EFFECTBASICFORM, i: number) => {
            if (i === index) return { ...effect, option: { ...(effect?.option || {}), angle: Number(e.target.value) } };
            return effect;
        });
        object.set('data', { ...data, effects });
        setUpdate(!update);
        onChangeCommitted?.();
    };
    return (
        <Box sx={{ p: 1 }}>
            <TextField
                variant='standard'
                label='ANGLE'
                name='angle'
                value={object.data.effects[index]?.option?.angle || 0}
                size='small'
                type='number'
                sx={{ mr: 0.5, backgroundColor: '#fff' }}
                onChange={(e) => optionChange(e)}
                disabled={disabled}
            />
        </Box>
    );
}
