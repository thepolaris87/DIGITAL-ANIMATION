import { Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETIMAGE } from '../../../../../../apis/api';
import { selectIntro, setScripts } from '../../../../../../slices/intro';
import { divisionCode } from '../../../View/Canvas/helper';

export default function SelectImage() {
    const { data, currentDialog, render, locale } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);
    const queryClient = useQueryClient();
    const imageData = queryClient.getQueryData(['intro', 'image']) as GETIMAGE[];
    const imageList = useMemo(() => imageData && imageData.filter((el) => el.imageDivisionCode === divisionCode.image.character && (el.height || el.width)), [imageData]);
    const dispatch = useDispatch();
    const onImageChange = (e: SelectChangeEvent<string>, type: 'bubble' | 'nameTag', id?: string) => {
        if (imageList && id) {
            const script = render[currentDialog].getObjects().find((el) => el.data.id === id && el.data.type === 'text');
            const attr = { position: { top: script?.top, left: script?.left }, transfrom: { scaleX: script?.scaleX, scaleY: script?.scaleY, angle: script?.angle } };
            dispatch(
                setScripts({
                    id,
                    key: 'bubble',
                    data: {
                        ...targetData?.scripts?.[0].bubble,
                        type: 'image',
                        src: e.target.value,
                        ko: locale === 'ko' ? attr : { ...targetData?.scripts?.[0].bubble?.ko },
                        en: locale === 'en' ? attr : { ...targetData?.scripts?.[0].bubble?.en }
                    }
                })
            );
        }
    };
    return (
        <Grid sx={{ flex: 1, m: '8px 0' }} container alignItems='center' wrap='nowrap'>
            <Grid sx={{ minWidth: '100px', mr: 2 }} item>
                <Typography className='jei-intro-title'>BUBBLE</Typography>
            </Grid>
            <Grid sx={{ minWidth: '100px', mr: 2 }} item>
                <Select
                    size='small'
                    value={Boolean(targetData?.scripts?.[0]?.bubble?.src) ? targetData?.scripts?.[0]?.bubble?.src : imageList[0].imageId}
                    onChange={(e) => onImageChange(e, 'bubble', targetData?.scripts?.[0]?.id)}>
                    {imageList.map((el) => (
                        <MenuItem key={el.imageId} value={el.imageId}>
                            <Grid sx={{ width: '50px', height: '50px', m: 'auto' }} container justifyContent='center'>
                                <img
                                    style={{
                                        width: Number(el.width) > 50 || Number(el.height) > 50 ? '50px' : 'auto',
                                        height: Number(el.width) > 50 || Number(el.height) > 50 ? '50px' : 'auto'
                                    }}
                                    // src={`${process.env.REACT_APP_SOL}/images/D1/${el.imageId}.${el.extension}`}
                                    src={`/assets/images/${el.imageId}.${el.extension}`}
                                    alt={el.imageId}></img>
                            </Grid>
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>
    );
}
