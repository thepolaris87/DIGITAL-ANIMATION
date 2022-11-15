import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETTEXT } from '../../../../apis/api';
import { selectDialog, setLocale } from '../../../../slices/dialog';

export default function SelectLocale({ objects }: { objects: fabric.Object[] }) {
    const { locale, data: _data, render } = useSelector(selectDialog);
    const queryClient = useQueryClient();
    const textData = queryClient.getQueryData(['dialog', 'text']) as GETTEXT[];
    const textList = useMemo(() => textData && textData.filter((el) => el.textDivisionCode === '04' && (el.textEn || el.textKo)), [textData]);
    const dispatch = useDispatch();

    const onLocaleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        (objects as fabric.Textbox[]).forEach((object) => {            
            const data = object.get('data');
            const styles = object.styles;
            // CURRENT STYLE SAVE
            if (locale === 'ko') object.set('data', { ...data, koStyles: styles });
            if (locale === 'en') object.set('data', { ...data, enStyles: styles });
        });

        // CHANGE
        _data.dialog.forEach((data) => {
            if (!render) return;
            const canvas = render[data.id];
            if (!canvas) return;
            const objects = canvas.getObjects().filter((object) => object.data.type === 'script');
            (objects as fabric.Textbox[]).forEach((object) => {
                const target = textList.find((text) => text.textId === object.data.src);
                if (target) {
                    object.set('text', value === 'ko' ? target.textKo : target.textEn);
                    object.set('styles', value === 'ko' ? object.data.koStyles || {} : object.data.enStyles || {});
                    object.canvas?.renderAll();
                }
            });
        });

        dispatch(setLocale(value as 'ko' | 'en'));
    };

    return (
        <Grid sx={{ mt: 2 }} container alignItems='center'>
            <Grid sx={{ mr: 2, width: '110px' }} item>
                <Typography className='dia-title'>LOCALE</Typography>
            </Grid>
            <Grid item>
                <FormControl>
                    <RadioGroup row value={locale} onChange={onLocaleChange}>
                        <FormControlLabel value='ko' control={<Radio />} label='KO' />
                        <FormControlLabel value='en' control={<Radio />} label='EN' />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
}
