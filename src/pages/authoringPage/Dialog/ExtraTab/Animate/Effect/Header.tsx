import { Grid, IconButton, Typography } from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { EFFECTBASICFORM, effects, setEffects } from '../../../../../../slices/intro';
import { useDispatch } from 'react-redux';

export default function Header({
    disabled,
    effectList,
    index,
    collapse,
    setCollapse,
    onRemoveClick
}: {
    disabled?: boolean;
    effectList: EFFECTBASICFORM[];
    index: number;
    collapse: boolean;
    setCollapse: () => void;
    onRemoveClick: () => void;
}) {
    const dispatch = useDispatch();
    const getDisplayName = (type: string) => effects.find((el) => el.value === type)?.display || '';

    const onCollapseIconClick = () => {
        setCollapse();
    };

    const onRemoveIconClick = () => {
        const data = effectList.filter((el, i) => i !== index);
        onRemoveClick();
        dispatch(setEffects(data));
    };

    return (
        <Grid container alignItems='center'>
            <Grid item>
                <IconButton onClick={onCollapseIconClick}>{collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</IconButton>
            </Grid>
            <Grid sx={{ ml: 1, flex: 1 }} item>
                <Typography className='jei-intro-subtitle' sx={{ color: '#F8B00C !important' }}>
                    {getDisplayName(effectList[index].type)}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={onRemoveIconClick} disabled={disabled}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
