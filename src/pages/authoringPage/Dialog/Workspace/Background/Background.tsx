import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import { useEffect, useState } from 'react';
import MetaTitle from '../../../../../components/metaTitle';
import SelectSceneType from './SelectSceneType';
import MainBackgroundList from './MainBackgroundList';
import MainBackgroundSelect from './MainBackgroundSelect';
import SelectBGM from './SelectBGM';
import { Box } from '@mui/material';
import { useQueryClient } from 'react-query';
import { GETSOUND } from '../../../../../apis/api';
import DecoBackgroundList from './DecoBackgroundList';
import DecoBackgroundSelect from './DecoBackgroundSelect';

export default function Background() {
    const [openMainSelect, setOpenMainSelect] = useState(false);
    const [openDecoSelect, setOpenDecoSelect] = useState(false);
    const queryClient = useQueryClient();
    const soundData = queryClient.getQueryData<GETSOUND[]>(['intro', 'sound']);

    if (!soundData) return null;

    return (
        <Box>
            {/* <SelectBGM data={soundData} /> */}
            <SelectSceneType />
            <Box sx={{ mt: 4 }}>
                <MetaTitle>
                    <MetaTitle.Title>배경 및 캐릭터</MetaTitle.Title>
                    <MetaTitle.AddIcon onClick={() => setOpenMainSelect(true)} />
                </MetaTitle>
            </Box>
            <MainBackgroundList />
            <MainBackgroundSelect open={openMainSelect} onClose={() => setOpenMainSelect(false)} />
            <Box sx={{ mt: 6 }}>
                <MetaTitle>
                    <MetaTitle.Title>꾸밈 이미지</MetaTitle.Title>
                    <MetaTitle.AddIcon onClick={() => setOpenDecoSelect(true)} />
                </MetaTitle>
            </Box>
            <DecoBackgroundList />
            <DecoBackgroundSelect open={openDecoSelect} onClose={() => setOpenDecoSelect(false)} />
        </Box>
    );
}
