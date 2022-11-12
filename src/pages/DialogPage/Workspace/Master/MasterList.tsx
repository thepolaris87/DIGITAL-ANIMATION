import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ObjectsView } from '../Workspace.styles';
import { IMAGEBASICFORM, selectDialog, setCurrentTarget } from '../../../../slices/dialog';

export default function MasterList() {
    const { render, currentTarget } = useSelector(selectDialog);
    const imageObjects = render?.['master']?.getObjects();
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
        if (render?.['master']) {
            (render?.['master'] as fabric.Canvas).backgroundImage = undefined;
            render?.['master'].renderAll();
            dispatch(setCurrentTarget({ type: '' }));
        }
    };

    if (!imageObjects) return null;

    return (
        <Grid sx={{ background: '#fff' }} container>
            {render?.['master']?.backgroundImage && (
                <Box sx={{ position: 'relative' }}>
                    <ObjectsView object={render?.['master'].backgroundImage as fabric.Image} forceDelete onClick={(e) => onRemoveBackgroundClick(e)} />
                </Box>
            )}
            {imageObjects?.map((el) => (
                <Box sx={{ position: 'relative' }} key={el.data.id} onClick={() => onImageClick(el.data)}>
                    <ObjectsView
                        object={el as fabric.Image}
                        forceDelete
                        focus={currentTarget.object && el.data.id === currentTarget.object?.data?.id}
                        onClick={(e) => onRemoveClick(e, el.data)}
                    />
                </Box>
            ))}
        </Grid>
    );
}
