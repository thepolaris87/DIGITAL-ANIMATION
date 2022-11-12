import { fabric } from 'fabric';
import { Box } from '@mui/system';
import { useMemo, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GETMASTERFRAME } from '../../../../apis/api';
import { selectDialog, setCurrentTarget } from '../../../../slices/dialog';

const rate = 0.3;

export default function MasterFrameList() {
    const { data, render } = useSelector(selectDialog);
    const dispatch = useDispatch();
    const { width: canvasWidth, height: canvasHeight } = data.size;
    const queryClient = useQueryClient();
    const masterData = queryClient.getQueryData<GETMASTERFRAME[]>(['dialog', 'master']);
    const container = useRef<HTMLDivElement>(null);
    const parseMasterData = useMemo(() => {
        if (!masterData) return;
        const parseData = masterData.map((data) => {
            const parseData = data.frameConfig.replace(/"(AI\d{8}.*?)"/g, '"https://sol-api.esls.io/images/A1/$1"');            
            return { id: data.frameId, canvas: JSON.parse(parseData)?.master?.canvas };
        });

        parseData.forEach((data) => {
            const hasChild = Array.from(container.current?.children || []).some((child) => child.id === data.id);
            if (hasChild) return;
            const staticCanvas = new fabric.StaticCanvas(null, { width: canvasWidth, height: canvasHeight });

            staticCanvas.loadFromJSON(data.canvas, () => {
                const wrapper = document.createElement('div');
                const svg = staticCanvas.toSVG({ width: canvasWidth * rate, height: canvasHeight * rate });
                wrapper.id = data.id;
                wrapper.style.minWidth = canvasWidth * rate + 'px';
                wrapper.style.minHeight = canvasHeight * rate + 'px';
                wrapper.style.padding = '8px';
                wrapper.innerHTML = svg;
                wrapper.addEventListener('click', () => {
                    if (!render?.['master']) return;

                    window.confirm('정말로 적용할까요?') &&
                        render['master'].loadFromJSON(data.canvas, () => {
                            render['master'].renderAll();
                            dispatch(setCurrentTarget({ type: '' }));
                        });
                });
                container.current?.append(wrapper);
            });
        });

        return parseData;
    }, [dispatch, masterData, canvasWidth, canvasHeight, render]);

    if (!parseMasterData) return null;

    return <Box ref={container} sx={{ p: 1 }}></Box>;
}
