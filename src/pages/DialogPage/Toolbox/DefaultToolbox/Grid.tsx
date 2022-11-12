import { fabric } from 'fabric';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import { IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';

export default function Grid() {
    const { currentDialog, render, data } = useSelector(selectDialog);
    const onGridClick = () => {
        if (!render?.[currentDialog] || !data) return;
        const hasGrid = render[currentDialog].getObjects().find((object) => object.data.type === 'grid');
        if (hasGrid) hasGrid.canvas?.remove(hasGrid);
        else {
            const verticalLines = [...Array(Math.floor(data.size.width / 10) - 1)].map(
                (size, i) =>
                    new fabric.Line([(i + 1) * 10, 0, (i + 1) * 10, data.size.height], {
                        stroke: i % 10 === 9 ? '#00000050' : '#00000025'
                    })
            );
            const horizonealLines = [...Array(Math.floor(data.size.height / 10) - 1)].map(
                (size, i) =>
                    new fabric.Line([0, (i + 1) * 10, data.size.width, (i + 1) * 10], {
                        stroke: i % 10 === 9 ? '#00000050' : '#00000025'
                    })
            );
            const group = new fabric.Group([...verticalLines, ...horizonealLines], {
                excludeFromExport: true,
                selectable: false,
                evented: false,
                data: { type: 'grid' }
            });
            render[currentDialog].add(group);
            group.bringToFront();
        }
        render[currentDialog].renderAll();
    };

    return (
        <Tooltip componentsProps={{ tooltip: { sx: { position: 'relative', top: '-16px' } } }} title='grid' placement='bottom-end'>
            <IconButton onClick={onGridClick}>
                <Grid4x4Icon />
            </IconButton>
        </Tooltip>
    );
}
