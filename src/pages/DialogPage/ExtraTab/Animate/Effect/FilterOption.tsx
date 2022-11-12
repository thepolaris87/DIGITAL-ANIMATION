import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { EFFECTBASICFORM } from '../../../../../slices/dialog';

export default function FilterOption({
    object,
    index,
    disabled,
    onChangeCommitted
}: {
    object: fabric.Object;
    index: number;
    disabled?: boolean;
    onChangeCommitted?: () => void;
}) {
    const [update, setUpdate] = useState(false);
    const optionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: 'from' | 'to') => {
        const data = object.get('data');
        const effects = data.effects.map((effect: EFFECTBASICFORM, i: number) => {
            if (i === index) return { ...effect, option: { ...(effect?.option || {}), [key]: Number(e.target.value) } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
        setUpdate(!update);
        onChangeCommitted?.();
    };

    return (
        <Grid sx={{ p: 1 }} container justifyContent='space-between' wrap='nowrap'>
            <TextField
                variant='standard'
                label='FROM'
                name='from'
                value={object.data.effects[index]?.option?.from || 0}
                size='small'
                type='number'
                sx={{ mr: 0.5, backgroundColor: 'white' }}
                onChange={(e) => optionChange(e, 'from')}
                disabled={disabled}
            />
            <TextField
                variant='standard'
                label='TO'
                name='to'
                value={object.data.effects[index]?.option?.to || 0}
                size='small'
                type='number'
                sx={{ ml: 0.5, backgroundColor: 'white' }}
                onChange={(e) => optionChange(e, 'to')}
                disabled={disabled}
            />
        </Grid>
    );
}
