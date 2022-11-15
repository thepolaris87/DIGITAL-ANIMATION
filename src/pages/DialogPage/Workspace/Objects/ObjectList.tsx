import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, IMAGEBASICFORM, setCurrentTarget } from '../../../../slices/dialog';
import { ObjectsView } from '../Workspace.styles';

export default function ObjectList() {
    const { currentDialog, render, currentTarget } = useSelector(selectDialog);
    const imageObjects = render?.[currentDialog]?.getObjects().filter((object) => ['text', 'basic'].includes(object.data.type));
    const dispatch = useDispatch();

    const onImageClick = (image: IMAGEBASICFORM) => {
        if (!imageObjects) return;
        const target = imageObjects.find((el) => el.data.id === image.id);

        if (target) {
            target?.canvas?.setActiveObject(target);
            target?.canvas?.renderAll();
            dispatch(setCurrentTarget({ type: target.data.type, object: target }));
        }
    };

    const onRemoveClick = (e: React.MouseEvent, image: IMAGEBASICFORM) => {
        if (!imageObjects) return;
        e.stopPropagation();
        const target = imageObjects.find((el) => el.data.id === image.id);
        target?.canvas?.remove(target);
        dispatch(setCurrentTarget({ type: '' }));
    };

    const onRemoveBackgroundClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (render?.[currentDialog]) {
            (render?.[currentDialog] as fabric.Canvas).backgroundImage = undefined;
            render?.[currentDialog].renderAll();
            dispatch(setCurrentTarget({ type: '' }));
        }
    };

    if (!imageObjects) return null;

    return (
        <Grid sx={{ background: '#fff' }} container>
            {render?.[currentDialog].backgroundImage && (
                <Box sx={{ position: 'relative' }}>
                    <ObjectsView object={render?.[currentDialog].backgroundImage as fabric.Image} onClick={(e) => onRemoveBackgroundClick(e)} />
                </Box>
            )}
            {imageObjects?.map((el) => (
                <Box sx={{ position: 'relative', pointerEvents: el.data.master ? 'none' : 'auto' }} key={el.data.id} onClick={() => onImageClick(el.data)}>
                    <ObjectsView
                        object={el as fabric.Image}
                        focus={currentTarget.object && el.data.id === currentTarget.object?.data?.id}
                        onClick={(e) => onRemoveClick(e, el.data)}
                    />
                </Box>
            ))}
        </Grid>
    );
}
