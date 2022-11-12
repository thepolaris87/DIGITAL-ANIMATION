import { IconButton, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setCurrentTarget } from '../../../../slices/dialog';

export default function Order() {
    const { currentTarget, render, currentDialog, data } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const onOrderClick = (type: string) => {
        if (!currentTarget.object) return;
        const masterObjectsNum = data.dialog.find((el) => el.id === currentDialog)?.master ? render?.['master'].getObjects().length : 0;
        if (currentTarget.object.canvas?.getObjects().indexOf(currentTarget.object) === masterObjectsNum && (type === 'backward' || type === 'back')) return;

        if (type === 'backward') currentTarget.object.sendBackwards();
        if (type === 'back') currentTarget.object.sendToBack();
        if (type === 'foward') currentTarget.object.bringForward();
        if (type === 'front') currentTarget.object.bringToFront();
        dispatch(setCurrentTarget({ ...currentTarget }));
    };

    return (
        <>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='foward' placement='bottom-end'>
                <IconButton onClick={() => onOrderClick('foward')}>
                    <KeyboardArrowUpIcon />
                </IconButton>
            </Tooltip>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='front' placement='bottom-end'>
                <IconButton onClick={() => onOrderClick('front')}>
                    <KeyboardDoubleArrowUpIcon />
                </IconButton>
            </Tooltip>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='backward' placement='bottom-end'>
                <IconButton onClick={() => onOrderClick('backward')}>
                    <KeyboardArrowDownIcon />
                </IconButton>
            </Tooltip>
            <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='back' placement='bottom-end'>
                <IconButton onClick={() => onOrderClick('back')}>
                    <KeyboardDoubleArrowDownIcon />
                </IconButton>
            </Tooltip>
        </>
    );
}
