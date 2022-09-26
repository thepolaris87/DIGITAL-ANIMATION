import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setOpen } from '../../../../../slices/intro';

export default function Animating() {
    const { open } = useSelector(selectIntro);
    const dispath = useDispatch();

    const onAnimatingButtonClick = () => {
        dispath(setOpen({ animating: !open.animating, formatting: false }));
    };

    return (
        <Button variant={open.animating ? 'contained' : 'outlined'} onClick={onAnimatingButtonClick}>
            ANIMATE
        </Button>
    );
}
