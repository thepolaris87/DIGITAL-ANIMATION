import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setOpen } from '../../../../../slices/intro';

export default function Animate() {
    const { open } = useSelector(selectIntro);
    const dispath = useDispatch();

    const onAnimateButtonClick = () => {
        dispath(setOpen({ animate: !open.animate, format: false, textAnimate: false }));
    };

    return (
        <Button variant={open.animate ? 'contained' : 'outlined'} onClick={onAnimateButtonClick}>
            ANIMATE
        </Button>
    );
}
