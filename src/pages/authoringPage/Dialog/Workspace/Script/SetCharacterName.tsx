import { FormControl, Grid, Input, InputLabel, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setScripts } from '../../../../../slices/intro';

export default function SetCharacterName() {
    const { data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const dispatch = useDispatch();
    const onCharacterNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, locale: 'ko' | 'en', id: string) => {
        const counterLocale = locale === 'ko' ? 'en' : 'ko';
        const data = {
            [locale]: e.target.value,
            [counterLocale]: (targetData?.scripts?.[0].speaker && targetData?.scripts?.[0].speaker[counterLocale]) || ''
        } as { ko: string; en: string };
        dispatch(setScripts({ id, key: 'speaker', data }));
    };

    return (
        <Grid sx={{ mt: 2 }} container alignItems='flex-end'>
            <Grid sx={{ mr: 2, minWidth: '110px' }} item>
                <Typography className='jei-intro-title'>CHARACTER</Typography>
            </Grid>
            <Grid sx={{ flex: 1 }} container>
                <Grid sx={{ mr: 2, minWidth: '170px' }} item>
                    <FormControl variant='standard'>
                        <InputLabel>KO NAME</InputLabel>
                        <Input value={targetData?.scripts?.[0].speaker?.ko || ''} onChange={(e) => onCharacterNameChange(e, 'ko', targetData?.scripts?.[0].id || '')} />
                    </FormControl>
                </Grid>
                <Grid sx={{ minWidth: '170px' }} item>
                    <FormControl variant='standard'>
                        <InputLabel>EN NAME</InputLabel>
                        <Input value={targetData?.scripts?.[0].speaker?.en || ''} onChange={(e) => onCharacterNameChange(e, 'en', targetData?.scripts?.[0].id || '')} />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}
