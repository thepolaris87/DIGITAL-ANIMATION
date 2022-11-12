import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { EFFECTBASICFORM } from '../../../../../slices/dialog';

export default function MoveOption({ object, index, disabled, onChangeCommitted }: { object: fabric.Object; index: number; disabled?: boolean; onChangeCommitted?: () => void }) {
    const [update, setUpdate] = useState(false);
    const optionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: 'top' | 'left') => {
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
                label='MOVE-X'
                name='left'
                value={object.data.effects[index]?.option?.left || 0}
                size='small'
                type='number'
                sx={{ mr: 0.5, backgroundColor: 'white' }}
                onChange={(e) => optionChange(e, 'left')}
                disabled={disabled}
            />
            <TextField
                variant='standard'
                label='MOVE-Y'
                name='top'
                value={object.data.effects[index]?.option?.top || 0}
                size='small'
                type='number'
                sx={{ ml: 0.5, backgroundColor: 'white' }}
                onChange={(e) => optionChange(e, 'top')}
                disabled={disabled}
            />
        </Grid>
    );
}
