import { Box } from '@mui/material';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';

import SelectLocale from './SelectLocale';
import SelectText from './SelectText';
import SelectTTS from './SelectTTS';
import SelectBubble from './SelectBubble';
import UsingScript from './UsingScript';

export default function Script() {
    const { data, currentDialog } = useSelector(selectIntro);
    const targetData = useMemo(() => data.find((el) => el.dialogId === currentDialog), [data, currentDialog]);

    return (
        <Box>
            <UsingScript />
            {targetData?.scripts?.length !== 0 && (
                <React.Fragment>
                    <SelectLocale />
                    <SelectText />
                    <SelectTTS />
                    <SelectBubble />
                </React.Fragment>
            )}
        </Box>
    );
}
