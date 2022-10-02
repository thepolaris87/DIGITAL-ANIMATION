import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setOpen } from '../../../../../slices/intro';

export default function Format() {
    const { open } = useSelector(selectIntro);
    const dispath = useDispatch();

    const onFormatButtonClick = () => {
        dispath(setOpen({ format: !open.format, animate: false, textAnimate: false }));
    };

    return (
        <Button variant={open.format ? 'contained' : 'outlined'} onClick={onFormatButtonClick}>
            FORMAT
        </Button>
    );
}
