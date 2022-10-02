import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EFFECTBASICFORM, setEffects } from '../../../../../../slices/intro';

export default function MoveOption({ effectList, index, disabled }: { effectList: EFFECTBASICFORM[]; index: number; disabled?: boolean }) {
    const [value, setValue] = useState(effectList[index].option);
    const dispatch = useDispatch();

    const optionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: 'top' | 'left') => {
        const data = effectList.map((el, i) => {
            if (i === index) return { ...el, option: { ...el.option, [key]: Number(e.target.value) } };
            return el;
        });
        setValue({ ...value, [key]: e.target.value });
        dispatch(setEffects(data));
    };

    return (
        <Grid sx={{ p: 1 }} container justifyContent='space-between' wrap='nowrap'>
            <TextField
                variant='standard'
                label='MOVE-X'
                name='left'
                value={effectList?.[index]?.option?.left || 0}
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
                value={effectList?.[index]?.option?.top || 0}
                size='small'
                type='number'
                sx={{ ml: 0.5, backgroundColor: 'white' }}
                onChange={(e) => optionChange(e, 'top')}
                disabled={disabled}
            />
        </Grid>
    );
}
