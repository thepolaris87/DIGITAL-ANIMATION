import { Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setCurrentDialog } from '../../../../../slices/intro';
import { ThumnailContainer } from './Thumbnail.styles';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const [width, height, rate] = [1024, 768, 0.15];

export default function Thumbnail() {
    const { data, render, currentTarget, currentDialog, viewType } = useSelector(selectIntro);
    const container = useRef<HTMLDivElement>();
    const [hidden, setHidden] = useState(false);
    const dispatch = useDispatch();

    const onHiddenClick = () => {
        setHidden(!hidden);
    };

    // DRAW
    useEffect(() => {
        setTimeout(() => {
            Array.from(container.current?.children || []).forEach((el, i) => i !== 0 && el.remove());
            data.forEach((el, i) => {
                const { dialogId } = el;
                if (render[dialogId]) {
                    const item = document.createElement('div');
                    const clone = render[dialogId].toSVG({ width: width * rate, height: height * rate });
                    item.id = dialogId;
                    item.style.minWidth = width * rate + 'px';
                    item.style.minHeight = height * rate + 'px';
                    item.innerHTML = clone;
                    item.className = dialogId === currentDialog ? 'focus' : '';
                    item.addEventListener('click', () => {
                        dispatch(setCurrentDialog(dialogId));
                    });
                    container.current?.append(item);
                }
            });
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, render]);

    // UPDATE
    useEffect(() => {
        Array.from(container.current?.children || []).forEach((el, i) => {
            if (i === 0) return;
            if (el.id === currentDialog) {
                const clone = render[currentDialog].toSVG({ width: width * rate, height: height * rate });
                el.innerHTML = clone;
                el.className = 'focus';
            } else {
                el.className = '';
            }
        });
    }, [currentTarget, currentDialog, render]);

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
                zIndex: '1000'
            }}>
            <ThumnailContainer ref={container} className={currentDialog}>
                <Button sx={{ p: 0, minWidth: 'unset' }} onClick={onHiddenClick}>
                    {hidden ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Button>
            </ThumnailContainer>
        </Box>
    );
}
