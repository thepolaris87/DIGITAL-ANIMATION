import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setOpen } from '../../../../slices/dialog';

export default function MasterFrame() {
    const { open } = useSelector(selectDialog);
    const dispath = useDispatch();

    const onFormatButtonClick = () => {
        dispath(setOpen({ masterFrame: !open.masterFrame, format: false, animate: false, textAnimate: false }));
    };

    return (
        <Button variant={open.masterFrame ? 'contained' : 'outlined'} onClick={onFormatButtonClick}>
            MASTER FRAME
        </Button>
    );
}
