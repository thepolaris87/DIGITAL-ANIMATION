import { FormControl, Grid, Input, InputLabel, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro } from '../../../../../../slices/intro';

export default function InputCharacterName() {
    const { data, currentDialog } = useSelector(selectIntro);
    const [value, setValue] = useState({ ko: '', en: '' });
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const dispatch = useDispatch();
    const onCharacterNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, locale: 'ko' | 'en') => {
        setValue({ ...value, [locale]: e.target.value });
    };

    const onCharacterNameBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>, locale: 'ko' | 'en', id: string) => {
        const counterLocale = locale === 'ko' ? 'en' : 'ko';
        console.log(e.target.value)
        // const data = {
        // [locale]: e.target.value,
        // [counterLocale]: value[counterLocale]
        // } as { ko: string; en: string };
        // dispatch(setScripts({ id, key: 'speaker', data }));
    };

    return (
        <Grid container alignItems='flex-end'>
            <Grid sx={{ mr: 2, minWidth: '110px' }} item>
                <Typography className='jei-intro-title'>NAME</Typography>
            </Grid>
            <Grid sx={{ flex: 1 }} container>
                <Grid sx={{ mr: 2, minWidth: '170px' }} item>
                    <FormControl variant='standard'>
                        <InputLabel>KO NAME</InputLabel>
                        <Input value={value.ko} onChange={(e) => onCharacterNameChange(e, 'ko')} onBlur={(e) => onCharacterNameBlur(e, 'ko', targetData?.scripts?.[0].id || '')} />
                    </FormControl>
                </Grid>
                <Grid sx={{ minWidth: '170px' }} item>
                    <FormControl variant='standard'>
                        <InputLabel>EN NAME</InputLabel>
                        <Input value={value.en} onChange={(e) => onCharacterNameChange(e, 'en')} onBlur={(e) => onCharacterNameBlur(e, 'ko', targetData?.scripts?.[0].id || '')} />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}
