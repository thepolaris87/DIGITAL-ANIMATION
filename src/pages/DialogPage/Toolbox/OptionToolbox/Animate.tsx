import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setOpen } from '../../../../slices/dialog';

export default function Animate() {
    const { open } = useSelector(selectDialog);
    const dispath = useDispatch();

    const onAnimateButtonClick = () => {
        dispath(setOpen({ animate: !open.animate, format: false, textAnimate: false, masterFrame: false }));
    };

    return (
        <Button variant={open.animate ? 'contained' : 'outlined'} onClick={onAnimateButtonClick}>
            ANIMATE
        </Button>
    );
}
