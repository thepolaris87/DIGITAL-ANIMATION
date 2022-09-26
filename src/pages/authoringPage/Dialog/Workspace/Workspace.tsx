import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../slices/intro';

import Navigator from './Navigator';
import Background from './Background';
import Script from './Script';
import useReorderObject from './useReorderObject';

export default function Workspace() {
    const { navi, currentDialog } = useSelector(selectIntro);

    // object order
    useReorderObject();

    if (!currentDialog)
        return (
            <Typography className='jei-intro-subtitle' sx={{ mt: 5, fontSize: '24px' }} align='center'>
                SCENE을 선택해주세요.
            </Typography>
        );

    return (
        <Box>
            <Navigator />
            {navi === 'background' && <Background />}
            {navi === 'script' && <Script />}
        </Box>
    );
}
