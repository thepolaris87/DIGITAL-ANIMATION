import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EFFECTBASICFORM, setEffects } from '../../../../../../slices/intro';

export default function ScaleOption({ effectList, index, disabled }: { effectList: EFFECTBASICFORM[]; index: number; disabled?: boolean }) {
    const [value, setValue] = useState(effectList[index].option);
    const dispatch = useDispatch();

    const optionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: 'scaleX' | 'scaleY') => {
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
                label='SCALE-X'
                name='scaleX'
                value={effectList?.[index]?.option?.scaleX || 0}
                size='small'
                type='number'
                sx={{ mr: 0.5, backgroundColor: 'white' }}
                onChange={(e) => optionChange(e, 'scaleX')}
                disabled={disabled}
            />
            <TextField
                variant='standard'
                label='scale-Y'
                name='scaleY'
                value={effectList?.[index]?.option?.scaleY || 0}
                size='small'
                type='number'
                sx={{ ml: 0.5, backgroundColor: 'white' }}
                onChange={(e) => optionChange(e, 'scaleY')}
                disabled={disabled}
            />
        </Grid>
    );
}
