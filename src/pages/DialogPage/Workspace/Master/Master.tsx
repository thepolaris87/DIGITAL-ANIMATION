import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaTitle from '../../../../components/MetaTitle';
import { selectDialog, setCurrentDialog, setCurrentTarget, setOpen } from '../../../../slices/dialog';
import { postMessage } from '../../../../utils/util';
import useSyncMaster from '../../hooks/useSyncMaster';
import MasterList from './MasterList';
import MasterSelect from './MasterSelect';

export default function Master() {
    const { render } = useSelector(selectDialog);
    const [openObjects, setOpenObjects] = useState(false);
    const dispatch = useDispatch();
    const { syncMaster } = useSyncMaster();

    const onOpenClick = () => {
        postMessage({ code: 'open' });
        setOpenObjects(true);
    };

    const onClose = () => {
        postMessage({ code: 'close' });
        setOpenObjects(false);
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
                    <MetaTitle.AddIcon onClick={onOpenClick} />
                </MetaTitle>
            </Box>
            <MasterList />
            <MasterSelect open={openObjects} onClose={onClose} />
        </Box>
    );
}
