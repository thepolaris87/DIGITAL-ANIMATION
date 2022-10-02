import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../slices/intro';
import Animate from './Animate';
import Format from './Format';
import ScriptAnimate from './ScriptAnimate';

export default function ExtraTab() {
    const { open } = useSelector(selectIntro);
    const isOpen = useMemo(() => Object.values(open).some((el) => el), [open]);
    const width = useMemo(() => {
        if (open.format) return '300px';
        if (open.animate) return '800px';
        if (open.textAnimate) return '500px';
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
                    width: isOpen ? width : '0',
                    transition: 'width 300ms',
                    background: '#fff',
                    boxShadow: '-4px 0 4px #d6d6d0',
                    overflow: 'auto',
                    zIndex: 1
                }}>
                {open.format && <Format />}
                {open.animate && <Animate />}
                {open.textAnimate && <ScriptAnimate />}
            </Box>
        </Box>
    );
}
