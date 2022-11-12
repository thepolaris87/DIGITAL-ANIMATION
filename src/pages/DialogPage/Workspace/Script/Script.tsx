import { fabric } from 'fabric';
import { Box, Divider, IconButton } from '@mui/material';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectLocale from './SelectLocale';
import SelectText from './SelectText';
import SelectTTS from './SelectTTS';

import { selectDialog, setCurrentTarget } from '../../../../slices/dialog';
import MetaTitle from '../../../../components/MetaTitle';
import { useQueryClient } from 'react-query';
import { GETSOUND, GETTEXT } from '../../../../apis/api';
import { divisionCode, drawScript } from '../../View/Canvas/helper';
import { v4 as uuidv4 } from 'uuid';
import Delete from '@mui/icons-material/Delete';

export default function Script() {
    const { data, currentDialog, render, locale, currentTarget } = useSelector(selectDialog);
    const [update, setUpdate] = useState(false);
    const queryClient = useQueryClient();
    const textData = queryClient.getQueryData(['dialog', 'text']) as GETTEXT[];
    const soundData = queryClient.getQueryData(['dialog', 'sound']) as GETSOUND[];
    const textList = useMemo(() => textData && textData.filter((el) => el.textDivisionCode === divisionCode.text.script && (el.textEn || el.textKo)), [textData]);
    const soundList = useMemo(() => soundData && soundData.filter((el) => el.soundDivisionCode === divisionCode.sound.tts && el.extension), [soundData]);
    const objects = render?.[currentDialog]?.getObjects().filter((el) => el.data.type === 'script');
    const dispatch = useDispatch();
    const { width: canvasWidth, height: canvasHeight } = data.size;

    const onDialogAddClick = () => {
        if (!render?.[currentDialog] || !textList || textList.length === 0) return;

        drawScript({
            canvas: render[currentDialog],
            script: locale === 'ko' ? textList[0].textKo : textList[0].textEn,
            data: {
                id: uuidv4(),
                type: 'script',
                textDivisionCode: textList[0].textDivisionCode,
                src: textList[0].textId,
                koTTS: { src: soundList[0].soundId, soundDivisionCode: soundList[0].soundDivisionCode, extension: soundList[0].extension },
                enTTS: { src: soundList[0].soundId, soundDivisionCode: soundList[0].soundDivisionCode, extension: soundList[0].extension },
                effect: { appearance: [0, 15] }                
            },
            attr: { left: canvasWidth / 2, top: canvasHeight / 2, width: canvasWidth / 2 }
        });

        setUpdate(!update);
    };

    const onRemoveScriptClick = (object: fabric.Object) => {
        object.canvas?.remove(object);
        setUpdate(!update);
    };

    const onDialogClick = (object: fabric.Object) => {
        dispatch(setCurrentTarget({ type: 'script', object }));
        object.canvas?.setActiveObject(object);
        object.canvas?.renderAll();
    };

    return (
        <Box>
            {objects && <SelectLocale objects={objects} />}
            <Box sx={{ mt: 4 }}>
                <MetaTitle>
                    <MetaTitle.Title>DIALOGS</MetaTitle.Title>
                    <MetaTitle.AddIcon onClick={onDialogAddClick} />
                </MetaTitle>
            </Box>
            <Box sx={{ background: '#fff' }}>
                {objects?.map((object, i) => (
                    <Box sx={{ p: '4px 8px', cursor: 'pointer' }} key={object.data.id} onClick={() => onDialogClick(object)}>
                        {i !== 0 && <Divider sx={{ mb: 1 }} />}
                        <Box
                            sx={{
                                p: 0.5,
                                px: currentTarget?.object?.data.id === object.data.id ? 2 : 0.5,
                                position: 'relative',
                                borderRadius: '8px',
                                boxShadow: `0px 5px 10px ${currentTarget?.object?.data.id === object.data.id ? '#757575' : 'transparent'}`
                            }}>
                            <IconButton sx={{ position: 'absolute', top: '0', right: '0' }} onClick={() => onRemoveScriptClick(object)}>
                                <Delete />
                            </IconButton>
                            <SelectText object={object as fabric.Textbox} />
                            <SelectTTS object={object as fabric.Textbox} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
