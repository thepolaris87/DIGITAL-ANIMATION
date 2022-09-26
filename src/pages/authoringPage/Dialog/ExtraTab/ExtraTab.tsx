import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../slices/intro';
import AnimatingTab from './Animating';
import FormattingTab from './Formatting';

export default function ExtraTab() {
    const { open } = useSelector(selectIntro);
    const isOpen = useMemo(() => Object.values(open).some((el) => el), [open]);

    
    return (
        <Box sx={{ position: 'relative', height: '100%' }}>
            <Box
                sx={{
                    position: 'absolute',
                    right: '-8px',
                    top: '-8px',
                    bottom: '-8px',
                    width: isOpen ? '300px' : '0',
                    transition: 'width 300ms',
                    background: '#fff',
                    boxShadow: '-4px 0 4px #d6d6d0',
                    overflow: 'auto'
                }}>
                {open.formatting && <FormattingTab />}
                {open.animating && <AnimatingTab />}
            </Box>
        </Box>
    );
}
