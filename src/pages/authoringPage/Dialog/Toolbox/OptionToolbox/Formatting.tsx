import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setOpen } from '../../../../../slices/intro';

export default function Formatting() {
    const { open } = useSelector(selectIntro);
    const dispath = useDispatch();

    const onFormattingButtonClick = () => {
        dispath(setOpen({ animating: false, formatting: !open.formatting }));
    };

    return (
        <Button variant={open.formatting ? 'contained' : 'outlined'} onClick={onFormattingButtonClick}>
            FORMAT
        </Button>
    );
}
