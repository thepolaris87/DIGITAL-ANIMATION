import { Box, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETTEXT } from '../../../../../apis/api';
import { selectIntro, setScripts } from '../../../../../slices/intro';
import { drawScript, removeObject, divisionCode } from '../../View/Canvas/helper';

// 텍스트 디비전 코드
// 04 : 대사
export default function SelectText() {
    const { data, currentDialog, render, locale } = useSelector(selectIntro);
    const queryClient = useQueryClient();
    const textData = queryClient.getQueryData(['intro', 'text']) as GETTEXT[];
    const textList = useMemo(() => textData && textData.filter((el) => el.textDivisionCode === divisionCode.text.script && (el.textEn || el.textKo)), [textData]);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const textViewValue = useMemo(() => textList && textList.find((el) => el.textId === targetData?.scripts?.[0]?.text?.src), [targetData, textList]);
    const dispatch = useDispatch();

    const onTextChange = (e: SelectChangeEvent<any>, id?: string) => {
        if (textList && id) {
            const target = textList.find((el) => el.textId === e.target.value);
            if (target) {
                const script = render[currentDialog].getObjects().find((el) => el.data.id === id && el.data.type === 'text');
                const attr = { top: script?.top, left: script?.left, width: script?.width, angle: script?.angle };
                dispatch(setScripts({ id, key: 'text', data: { src: target.textId, textDivisionCode: target.textDivisionCode } }));
                dispatch(setScripts({ id, key: 'textStyles', data: { ko: '{}', en: '{}' } }));
                removeObject({ canvas: render[currentDialog], id, type: 'text' });
                drawScript({ id, canvas: render[currentDialog], script: locale === 'ko' ? target.textKo : target.textEn, attr });
            }
        }
    };

    if (!textList || textList.length === 0) return null;

    return (
        <Box sx={{ background: '#fff', mt: 4, p: 2, borderRadius: '12px', border: '1px solid #999999' }}>
            <Grid container wrap='nowrap'>
                <Grid sx={{ width: '250px' }} container alignItems='center' wrap='nowrap'>
                    <Grid sx={{ width: '60px', mr: 2 }} item>
                        <Typography className='jei-intro-title'>TEXT</Typography>
                    </Grid>
                    <Select value={targetData?.scripts?.[0]?.text?.src || textList[0].textId} size='small' onChange={(e) => onTextChange(e, targetData?.scripts?.[0]?.id)}>
                        {textList.map((el) => (
                            <MenuItem key={el.textId} value={el.textId}>
                                {el.textId}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid sx={{ flex: 1 }} container wrap='nowrap'>
                    <Grid sx={{ flex: 1, mr: 1 }} item>
                        <TextField
                            inputProps={{ sx: { WebkitTextFillColor: '#757575 !important' } }}
                            fullWidth
                            label='KO TEXT'
                            multiline
                            rows={4}
                            value={textViewValue?.textKo || ''}
                            disabled
                        />
                    </Grid>
                    <Grid sx={{ flex: 1, ml: 1 }} item>
                        <TextField
                            inputProps={{ sx: { WebkitTextFillColor: '#757575 !important' } }}
                            fullWidth
                            label='EN TEXT'
                            multiline
                            rows={4}
                            value={textViewValue?.textEn || ''}
                            disabled
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
