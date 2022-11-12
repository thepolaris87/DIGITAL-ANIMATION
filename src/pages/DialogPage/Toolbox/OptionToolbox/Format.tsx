import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setOpen } from '../../../../slices/dialog';

export default function Format() {
    const { open } = useSelector(selectDialog);
    const dispath = useDispatch();

    const onFormatButtonClick = () => {
        dispath(setOpen({ format: !open.format, animate: false, textAnimate: false, masterFrame: false }));
    };

    return (
        <Button variant={open.format ? 'contained' : 'outlined'} onClick={onFormatButtonClick}>
            FORMAT
        </Button>
    );
}
