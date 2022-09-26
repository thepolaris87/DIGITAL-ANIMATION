import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIntro, setNavi } from '../../../../../slices/intro';

export default function Navigator() {
    const { navi } = useSelector(selectIntro);
    const dispatch = useDispatch();

    const onNaviChange = (e: React.SyntheticEvent<Element, Event>, value: any) => {
        dispatch(setNavi(value));
    };

    return (
        <Box>
            <Tabs value={navi} onChange={onNaviChange}>
                <Tab label='SCRIPT' value='script' />
                <Tab label='BACKGROUND' value='background' />
            </Tabs>
            <Divider />
        </Box>
    );
}
