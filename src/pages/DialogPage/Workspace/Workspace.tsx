import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import Navigator from './Navigator';
import Objects from './Objects';
import Script from './Script';

import { selectDialog } from '../../../slices/dialog';
import Master from './Master';
import Scene from './Scene';

export default function Workspace() {
    const { navi, currentDialog } = useSelector(selectDialog);

    if (!currentDialog)
        return (
            <Typography className='jei-subtitle' sx={{ mt: 5, fontSize: '24px' }} align='center'>
                SCENE을 선택해주세요.
            </Typography>
        );

    return (
        <Box>
            <Navigator />
            {navi === 'scene' && <Scene />}
            {navi === 'objects' && <Objects />}
            {navi === 'dialogs' && <Script />}
            {navi === 'master' && <Master />}
        </Box>
    );
}
