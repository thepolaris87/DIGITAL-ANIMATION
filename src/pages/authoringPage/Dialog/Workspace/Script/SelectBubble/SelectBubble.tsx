import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../../slices/intro';
import InputCharacterName from './InputCharacterName';
import SelectImage from './SelectImage';
import SelectType from './SelectType';

export default function SelectBubble() {
    const { data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find(({ dialogId }) => dialogId === currentDialog), [currentDialog, data]);

    return (
        <Box sx={{ background: '#fff', mt: 4, p: 2, borderRadius: '12px', border: '1px solid #999999' }}>
            <InputCharacterName />
            <SelectType />
            {targetData?.scripts?.[0]?.bubble?.type === 'image' && <SelectImage />}
        </Box>
    );
}
