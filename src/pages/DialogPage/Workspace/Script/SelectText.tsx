import { Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { GETTEXT } from '../../../../apis/api';
import { selectDialog } from '../../../../slices/dialog';
import { divisionCode } from '../../View/Canvas/helper';

// 텍스트 디비전 코드
// 04 : 대사
export default function SelectText({ object }: { object: fabric.Textbox }) {
    const { locale } = useSelector(selectDialog);
    const queryClient = useQueryClient();
    const textData = queryClient.getQueryData(['dialog', 'text']) as GETTEXT[];
    const textList = useMemo(() => textData && textData.filter((el) => el.textDivisionCode === divisionCode.text.script && (el.textEn || el.textKo)), [textData]);
    const [update, setUpdate] = useState(false);

    const onTextChange = (e: SelectChangeEvent<any>) => {
        if (textList) {
            const target = textList.find((el) => el.textId === e.target.value);
            if (target) {
                const data = object.get('data');
                object.set('text', locale === 'ko' ? target?.textKo : target?.textEn);
                object.set('data', { ...data, src: e.target.value });
                object.canvas?.renderAll();
                setUpdate(!update);
            }
        }
    };

    if (!textList || textList.length === 0) return null;

    return (
        <Grid sx={{ mb: 1, mt: 1 }} container wrap='nowrap'>
            <Grid sx={{ width: '250px' }} container alignItems='center' wrap='nowrap'>
                <Grid sx={{ width: '60px', mr: 2 }} item>
                    <Typography className='dia-title'>TEXT</Typography>
                </Grid>
                <Select value={object.data.src} size='small' onChange={(e) => onTextChange(e)}>
                    {textList.map((el) => (
                        <MenuItem key={el.textId} value={el.textId}>
                            {el.textId}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>
    );
}
