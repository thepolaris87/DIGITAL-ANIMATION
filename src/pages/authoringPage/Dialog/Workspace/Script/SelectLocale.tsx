import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETTEXT } from '../../../../../apis/api';
import { selectIntro, setLocale } from '../../../../../slices/intro';
import { drawBubble, drawScript, removeObject } from '../../View/Canvas/helper';
import useScriptSync from './useScriptSync';

export default function SelectLocale() {
    const { data, locale, render } = useSelector(selectIntro);
    const queryClient = useQueryClient();
    const textData = queryClient.getQueryData(['intro', 'text']) as GETTEXT[];
    const textList = useMemo(() => textData && textData.filter((el) => el.textDivisionCode === '04' && (el.textEn || el.textKo)), [textData]);
    const dispatch = useDispatch();
    const { excuteTextSync, excuteBubbleSync } = useScriptSync();

    const onLocaleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        data.forEach((el) => {
            el.scripts?.forEach((script) => {
                const id = script.id;
                const canvas = render[el.dialogId];
                const objects = canvas.getObjects();
                const textTarget = textList.find(({ textId }) => textId === script.text?.src);
                const textbox = objects.find((object) => object.data.id === id && object.data.type === 'text');
                const bubble = objects.find((object) => object.data.id === id && object.data.type === 'bubble');
                // REMOVE ALL SCRIPT OBJECT
                removeObject({ canvas, id: script.id });

                // TEXT SYNC
                textbox && excuteTextSync({ script, textbox });

                // DRAW TEXT
                if (textTarget) {
                    drawScript({
                        id,
                        canvas,
                        script: textTarget[value === 'ko' ? 'textKo' : 'textEn'],
                        attr: script.textbox?.[value as 'ko' | 'en'],
                        styles: script.textStyles?.[value as 'ko' | 'en']
                    });
                }
                // BUBBLE SYNC
                bubble && excuteBubbleSync({ script, bubble });

                // BUBBLE TEXT
                if (bubble?.type === 'rect') {
                    const { ko, en } = script.bubble || {};
                    drawBubble({ canvas, id, attr: value === 'ko' ? { ...ko?.attr, ...ko?.position, ...ko?.transform } : { ...en?.attr, ...en?.position, ...en?.transform } });
                }
            });
        });
        dispatch(setLocale(value as 'ko' | 'en'));
    };

    return (
        <Grid sx={{ mt: 2 }} container alignItems='center'>
            <Grid sx={{ mr: 2, width: '110px' }} item>
                <Typography className='jei-intro-title'>LOCALE</Typography>
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
