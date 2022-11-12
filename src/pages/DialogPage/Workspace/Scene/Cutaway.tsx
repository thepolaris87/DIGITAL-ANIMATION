import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MetaTitle from '../../../../components/MetaTitle';
import { DATADIALOG, selectDialog, setSceneCutaway } from '../../../../slices/dialog';

export default function Cutaway() {
    const { currentDialog, data } = useSelector(selectDialog);
    const dispatch = useDispatch();

    const currentCutaway = data.dialog.find((el) => el.id === currentDialog)?.scene.cutAway || 'auto';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSceneCutaway(e.target.value as DATADIALOG['scene']['cutAway']));
    };

    const cutAways = ['auto', 'click'];
    return (
        <Box sx={{ mt: 4 }}>
            {/* 상단 */}
            <MetaTitle>
                <MetaTitle.Title>Cutaway</MetaTitle.Title>
            </MetaTitle>

            {/* 목록 */}
            {/* container */}
            <Box
                sx={{
                    overflow: 'scroll',
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 200,
                    padding: 1
                }}>
                <FormControl sx={{ width: '100%', ml: 3 }}>
                    <RadioGroup row value={currentCutaway} onChange={handleChange}>
                        {/* 목록 */}
                        {cutAways.map((el, i) => {
                            return <FormControlLabel key={el} value={el} control={<Radio />} label={el.toUpperCase()} sx={{ width: '100%' }} disabled={el === 'click'} />;
                        })}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
}
