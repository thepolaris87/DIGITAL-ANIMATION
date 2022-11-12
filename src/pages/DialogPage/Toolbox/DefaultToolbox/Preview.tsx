import { FormControlLabel, Grid, IconButton, Radio, RadioGroup, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';
import MetaModal from '../../../../components/MetaModal';
import { useState } from 'react';
import { postMessage } from '../../../../utils/util';

import LearningPage from '../../../LearningPage';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function Preview() {
    const { frameId } = useParams();
    const { frameType } = useSelector(selectDialog);
    const [open, setOpen] = useState(false);
    const [locale, setLocale] = useState('ko');

    const onClose = () => {
        setOpen((prev) => {
            postMessage({ code: prev ? 'close' : 'open' });
            return !prev;
        });
    };

    const onLocaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocale(e.target.value);
    };

    const onPreviewClick = () => {
        if (process.env.NODE_ENV === 'development') {
            setOpen((prev) => {
                postMessage({ code: prev ? 'close' : 'open' });
                return !prev;
            });
        } else {
            postMessage({ code: 'preview' });
        }
    };

    return (
        <>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='preview' placement='bottom-end'>
                <span>
                    <IconButton onClick={onPreviewClick} disabled={frameType === 'M'}>
                        <PreviewIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <MetaModal title='Preview' open={open} onClose={onClose} save={false}>
                <Grid sx={{ position: 'absolute', top: '17px', left: '130px', width: 'fit-content' }} container alignItems='center' wrap='nowrap'>
                    <Grid item>
                        <RadioGroup row value={locale} onChange={onLocaleChange}>
                            <FormControlLabel value='ko' control={<Radio />} label='KO' />
                            <FormControlLabel value='en' control={<Radio />} label='EN' />
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Grid sx={{ height: '100%', width: '100%' }} container alignItems='center' justifyContent='center'>
                    {frameId && locale && <LearningPage key={locale} frameId={frameId} locale={locale} />}
                </Grid>
            </MetaModal>
        </>
    );
}
