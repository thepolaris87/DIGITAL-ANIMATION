import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../slices/dialog';
import Animate from './Animate';
import Format from './Format';
import DialogAnimate from './DialogAnimate';
import MasterFrame from './MasterFrame';

export default function ExtraTab() {
    const { open } = useSelector(selectDialog);
    const isOpen = useMemo(() => Object.values(open).some((el) => el), [open]);
    const width = useMemo(() => {
        if (open.format) return '300px';
        if (open.masterFrame) return 'fit-content';
        if (open.textAnimate) return '700px';
        if (open.animate) return '1100px';
        return '0';
    }, [open]);

    return (
        <Box sx={{ position: 'relative', height: '100%' }}>
            <Box
                sx={{
                    position: 'absolute',
                    right: '-8px',
                    top: '-8px',
                    bottom: '-8px',
                    maxWidth: '90vw',
                    width: isOpen ? width : '0',
                    transition: 'width 300ms',
                    background: '#fff',
                    boxShadow: '-4px 0 4px #d6d6d0',
                    overflow: 'auto',
                    zIndex: 1
                }}>
                {open.format && <Format />}
                {open.animate && <Animate />}
                {open.textAnimate && <DialogAnimate />}
                {open.masterFrame && <MasterFrame />}
            </Box>
        </Box>
    );
}
