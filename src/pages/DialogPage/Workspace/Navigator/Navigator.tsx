import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setNavi } from '../../../../slices/dialog';

export default function Navigator() {
    const { navi, frameType } = useSelector(selectDialog);
    const dispatch = useDispatch();
    const isMaster = useMemo(() => frameType === 'M', [frameType]);

    const onNaviChange = (e: React.SyntheticEvent<Element, Event>, value: any) => {
        dispatch(setNavi(value));
    };

    return (
        <Box>
            <Tabs value={navi} onChange={onNaviChange} TabIndicatorProps={{ style: { backgroundColor: navi === 'master' ? orange[900] : '#1976d2' } }}>
                <Tab label='SCENE' value='scene' disabled={isMaster} />
                <Tab label='DIALOGS' value='dialogs' disabled={isMaster} />
                <Tab label='OBJECTS' value='objects' disabled={isMaster} />
                <Tab
                    label={
                        <Typography sx={{ color: navi === 'master' ? orange[900] : '#00000099', fontSize: '0.875rem' }} align='center'>
                            MASTER
                        </Typography>
                    }
                    value='master'
                />
            </Tabs>
            <Divider />
        </Box>
    );
}
