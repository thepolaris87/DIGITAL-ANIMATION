import { Grid, IconButton, Typography } from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DeleteIcon from '@mui/icons-material/Delete';
import { effects } from '../../../../../slices/dialog';

export default function Header({
    disabled,
    type,
    collapse,
    setCollapse,
    onRemoveClick,
    onCopyClick
}: {
    disabled?: boolean;
    type: string;
    collapse: boolean;
    setCollapse: () => void;
    onRemoveClick: () => void;
    onCopyClick: () => void;
}) {
    const getDisplayName = (type: string) => effects.find((el) => el.value === type)?.display || '';
    const onCollapseIconClick = () => {
        setCollapse();
    };
    const onRemoveIconClick = () => {
        onRemoveClick();
    };
    const onCopyIconClick = () => {
        onCopyClick();
    };

    return (
        <Grid container alignItems='center'>
            <Grid item>
                <IconButton onClick={onCollapseIconClick}>{collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</IconButton>
            </Grid>
            <Grid sx={{ ml: 1, flex: 1 }} item>
                <Typography className='dia-subtitle' sx={{ color: '#F8B00C !important' }}>
                    {getDisplayName(type)}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={onCopyIconClick} size='small'>
                    <AutoAwesomeMotionIcon fontSize='small' />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={onRemoveIconClick} disabled={disabled} size='small'>
                    <DeleteIcon fontSize='small' />
                </IconButton>
            </Grid>
        </Grid>
    );
}
