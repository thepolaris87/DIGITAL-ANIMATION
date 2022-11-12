import { Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThumnailContainer } from './Thumbnail.styles';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { selectDialog, setCurrentDialog, setCurrentTarget } from '../../../../slices/dialog';

const rate = 0.15;

export default function Thumbnail() {
    const { data, render, currentDialog, viewType } = useSelector(selectDialog);
    const container = useRef<HTMLDivElement>();
    const [hidden, setHidden] = useState(false);
    const dispatch = useDispatch();
    const { width: canvasWidth, height: canvasHeight } = data.size;

    const onHiddenClick = () => {
        setHidden(!hidden);
    };

    // DRAW
    useEffect(() => {
        if (!render || !container.current) return;
        setTimeout(() => {
            data.dialog.forEach((data) => {
                const canvas = render[data.id];
                if (!canvas || data.id === 'master') return;
                const hasChild = Array.from(container.current?.children || []).some((child) => child.id === data.id);
                if (hasChild) return;
                const wrapper = document.createElement('div');
                const thumnamil = canvas.toSVG({ width: canvasWidth * rate, height: canvasHeight * rate });
                wrapper.id = data.id;
                wrapper.style.minWidth = canvasWidth * rate + 'px';
                wrapper.style.minHeight = canvasHeight * rate + 'px';
                wrapper.innerHTML = thumnamil;
                wrapper.addEventListener('click', () => {
                    dispatch(setCurrentDialog(data.id));
                    dispatch(setCurrentTarget({ type: '' }));
                });
                container.current?.append(wrapper);
            });
        }, 500);
    }, [data, render, currentDialog, dispatch, canvasWidth, canvasHeight]);

    // UPDATE
    useEffect(() => {
        if (!render || !container.current) return;
        Array.from(container.current?.children || []).forEach((child, i) => {
            if (i === 0) return;
            if (!render[child.id]) child.remove();
            child.className = child.id === currentDialog ? 'focus' : '';
            if (child.id === currentDialog) {
                const thumnamil = render[child.id]?.toSVG({ width: canvasWidth * rate, height: canvasHeight * rate });
                child.innerHTML = thumnamil;
            }
        });
    });
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: viewType === 'multi' ? '-150px' : '0',
                left: '8px',
                right: '8px',
                width: hidden ? '33px' : 'calc(100% - 16px)',
                overflow: hidden ? 'hidden' : 'auto',
                transition: 'width 0.3s, bottom 0.5s',
                zIndex: '100'
            }}>
            <ThumnailContainer ref={container} className={currentDialog} sx={{ height: canvasHeight * rate * 1.25 }}>
                <Button sx={{ p: 0, minWidth: 'unset' }} onClick={onHiddenClick}>
                    {hidden ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Button>
            </ThumnailContainer>
        </Box>
    );
}
