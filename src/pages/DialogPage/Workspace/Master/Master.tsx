import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaTitle from '../../../../components/MetaTitle';
import { selectDialog, setCurrentDialog, setCurrentTarget, setOpen } from '../../../../slices/dialog';
import useSyncMaster from '../../hooks/useSyncMaster';
import MasterList from './MasterList';
import { v4 as uuidv4 } from 'uuid';
import { drawImage } from '../../View/Canvas/helper';


export default function Master() {
    const { data, render } = useSelector(selectDialog);    
    const dispatch = useDispatch();
    const { syncMaster } = useSyncMaster();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!render?.['master']) return;
        const uploadImage = e.target?.files;
        if (uploadImage) {
            for (const key in uploadImage) {
                if (Object.prototype.hasOwnProperty.call(uploadImage, key)) {
                    const file = uploadImage[key];
                    const id = uuidv4();
                    const src = window.URL.createObjectURL(file);
                    drawImage({
                        canvas: render['master'],
                        src: src,
                        data: { id, type: 'basic', imageDivisionCode: '01', frame: '1', master: true  },
                        attr: { top: data.size.width / 2, left: data.size.height / 2 }
                    })?.then(() => {
                        dispatch(setCurrentTarget({ type: '' }));
                    });
                }
            }
        }
    };

    useEffect(() => {
        dispatch(setCurrentDialog('master'));
        render?.['master']?.forEachObject((object) => {
            object.set({ evented: true, selectable: true });
        });
        return () => {
            dispatch(setCurrentDialog(''));
            dispatch(setCurrentTarget({ type: '' }));
            dispatch(setOpen({ format: false, animate: false, textAnimate: false, masterFrame: false }));
            syncMaster();
        };
    }, [dispatch, syncMaster, render]);

    return (
        <Box>
            <Box sx={{ mt: 4 }}>
                <MetaTitle>
                    <MetaTitle.Title>MASTER</MetaTitle.Title>
                    <MetaTitle.UploadIcon onChange={onChange} accept='image/*' multiple />
                </MetaTitle>
            </Box>
            <MasterList />
            
        </Box>
    );
}
