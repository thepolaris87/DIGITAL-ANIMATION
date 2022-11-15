import MetaTitle from '../../../../components/MetaTitle';
import ObjectList from './ObjectList';
import { Box, Grid } from '@mui/material';
import MasterControl from './MasterControl';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setCurrentTarget } from '../../../../slices/dialog';
import { v4 as uuidv4 } from 'uuid';
import { drawImage } from '../../View/Canvas/helper';

export default function Objects() {
    const { data, render, currentDialog } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!render?.[currentDialog]) return;
        const uploadImage = e.target?.files;
        if (uploadImage) {
            for (const key in uploadImage) {
                if (Object.prototype.hasOwnProperty.call(uploadImage, key)) {
                    const file = uploadImage[key];
                    const id = uuidv4();
                    const src = window.URL.createObjectURL(file);
                    drawImage({
                        canvas: render[currentDialog],
                        src: src,
                        data: { id, type: 'basic', imageDivisionCode: '01', frame: '1' },
                        attr: { top: data.size.width / 2, left: data.size.height / 2 }
                    })?.then(() => {
                        dispatch(setCurrentTarget({ type: '' }));
                    });
                }
            }
        }
    };

    return (
        <Box>
            <Grid item>
                <MasterControl />
            </Grid>
            <Box sx={{ mt: 4 }}>
                <MetaTitle>
                    <MetaTitle.Title>OBJECTS</MetaTitle.Title>
                    <MetaTitle.UploadIcon onChange={onChange} accept='image/*' multiple />
                </MetaTitle>
            </Box>
            <ObjectList />
        </Box>
    );
}
