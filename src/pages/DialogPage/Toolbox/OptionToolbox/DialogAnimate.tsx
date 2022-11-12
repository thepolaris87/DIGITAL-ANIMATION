import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setOpen } from '../../../../slices/dialog';

export default function DialogAnimate() {
    const { open } = useSelector(selectDialog);
    const dispath = useDispatch();

    const onTextAnimateButtonClick = () => {
        dispath(setOpen({ textAnimate: !open.textAnimate, animate: false, format: false, masterFrame: false }));
    };

    return (
        <Button variant={open.textAnimate ? 'contained' : 'outlined'} onClick={onTextAnimateButtonClick}>
            Dialog ANIMATE
        </Button>
    );
}
