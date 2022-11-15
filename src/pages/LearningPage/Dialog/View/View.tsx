import { Box } from '@mui/system';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLearning, setComplete } from '../../../../slices/learning';
import Canvas from './Canvas';

export default function View() {
    const { data, render, complete } = useSelector(selectLearning);
    const dispatch = useDispatch();
    const reverseDialog = useMemo(() => data?.dialog.concat().reverse(), [data?.dialog]);
    const size = useMemo(() => data?.size, [data?.size]);

    useEffect(() => {
        if (!data || !render) return;
        const _complete = data.dialog.every(({ id }) => id in render);
        dispatch(setComplete(_complete));
    }, [dispatch, data, render]);

    if (!reverseDialog) return null;

    return (
        <Box
            sx={{
                display: complete ? 'block' : 'none',
                position: 'relative',
                overflow: 'hidden',
                width: (data?.size?.width || 1024) + 'px',
                height: (data?.size?.height || 768) + 'px'
            }}>
            {!complete && <div>로딩중</div>}
            {reverseDialog.map((data) => (
                <Box id={data.id} key={data.id} sx={{ position: 'absolute', top: 0, left: 0, background: '#fff' }}>
                    <Canvas data={data} size={size} />
                </Box>
            ))}
        </Box>
    );
}
