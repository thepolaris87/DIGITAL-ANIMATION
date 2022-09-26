import { Grid, Switch, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, addScript, removeScripts } from '../../../../../slices/intro';
import { removeObject, drawBubble, drawScript } from '../../View/Canvas/helper';
import { v4 as uuidv4 } from 'uuid';
import { useQueryClient } from 'react-query';
import { GETSOUND, GETTEXT } from '../../../../../apis/api';
import { canvasHeight, canvasWidth } from '../../Dialog';

export default function UsingScript() {
    const { data, render, currentDialog, locale } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find((el) => el.dialogId === currentDialog), [data, currentDialog]);
    const queryClient = useQueryClient();
    const textData = queryClient.getQueryData(['intro', 'text']) as GETTEXT[];
    const soundData = queryClient.getQueryData(['intro', 'sound']) as GETSOUND[];
    const textList = useMemo(() => textData && textData.filter((el) => el.textDivisionCode === '04' && (el.textEn || el.textKo)), [textData]);
    const soundList = useMemo(() => soundData && soundData.filter((el) => el.soundDivisionCode === '04' && el.extension), [soundData]);
    const dispatch = useDispatch();

    const onUseScriptChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
            const id = uuidv4();
            const textbox = { top: canvasHeight / 2, left: canvasWidth / 2, width: canvasWidth / 2, angle: 0 };
            const text = { src: textList[0].textId, textDivisionCode: textList[0].textDivisionCode };
            const sound = { src: soundList[0].soundId, extension: soundList[0].extension, soundDivisionCode: soundList[0].soundDivisionCode };
            const bubble = {
                position: { top: canvasHeight / 2, left: canvasWidth / 2 },
                transform: { angle: 0 },
                attr: { width: 900, height: 150, rx: 100, ry: 100 }
            };
            dispatch(addScript({ id, text, textbox: { ko: textbox, en: textbox }, tts: { ko: sound, en: sound }, bubble: { type: 'shape', ko: bubble, en: bubble } }));
            drawScript({ id, canvas: render[currentDialog], script: locale === 'ko' ? textList[0].textKo : textList[0].textEn, attr: textbox });
            drawBubble({ id, canvas: render[currentDialog], attr: { ...bubble.position, ...bubble.attr, ...bubble.transform } });
        } else {
            targetData?.scripts?.forEach((el) => removeObject({ canvas: render[currentDialog], id: el.id }));
            dispatch(removeScripts());
        }
    };

    return (
        <Grid sx={{ mt: 2 }} container alignItems='center'>
            <Grid sx={{ mr: 2, minWidth: '110px' }} item>
                <Typography className='jei-intro-title'>USE SCRIPT</Typography>
            </Grid>
            <Grid>
                <Switch sx={{ ml: -1.5 }} checked={targetData?.scripts?.length !== 0} onChange={onUseScriptChange} />
            </Grid>
        </Grid>
    );
}
