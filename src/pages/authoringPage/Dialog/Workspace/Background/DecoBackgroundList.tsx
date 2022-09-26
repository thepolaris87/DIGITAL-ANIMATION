import { Box, Grid, IconButton } from '@mui/material';
import { useMemo } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGEBASICFORM, selectIntro, setCurrentTarget, setImages } from '../../../../../slices/intro';
import { removeObject } from '../../View/Canvas/helper';
import Delete from '@mui/icons-material/Delete';
import { ImageView } from './Background.styles';
import UpcomingIcon from '@mui/icons-material/Upcoming';

export default function DecoBackgroundList() {
    const { data, currentDialog, render, currentTarget: currentImage } = useSelector(selectIntro);

    const currentTarget = useMemo(() => {
        const currentData = data.find((el) => el.dialogId === currentDialog);
        const currentRender = render[currentDialog];
        return { data: currentData, render: currentRender };
    }, [currentDialog, data, render]);

    const dispatch = useDispatch();

    const onDecoImageClick = (image: IMAGEBASICFORM) => {
        const { id } = image;
        const target = currentTarget.render.getObjects().find((el) => el.data.id === id);

        if (target) {
            currentTarget.render.setActiveObject(target);
            currentTarget.render.renderAll();
            // sprite
            if (image.imageDivisionCode === '02') dispatch(setCurrentTarget({ type: 'sprite', object: target }));
            else dispatch(setCurrentTarget({ type: 'image', object: target }));
        }
    };

    const onRemoveClick = (e: React.MouseEvent, image: IMAGEBASICFORM) => {
        e.stopPropagation();
        if (currentTarget && currentTarget.data && currentTarget.data.images) {
            const data = currentTarget.data.images.filter((el) => el.id !== image.id);
            dispatch(setImages(data));
            removeObject({ canvas: currentTarget.render, id: image.id });
        }
    };

    const onDragStart = () => {
        currentTarget.render.discardActiveObject();
        currentTarget.render.renderAll();
        dispatch(setCurrentTarget({ type: '' }));
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        if (currentTarget?.data?.images) {
            const items = [...currentTarget.data.images];
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            dispatch(setImages(items));
        }
    };

    if (!currentTarget.data) return null;

    return (
        <Grid sx={{ background: '#fff', height: '170px', position: 'relative' }} container wrap='nowrap' alignItems='center'>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable direction='horizontal' droppableId='characterList'>
                    {(provided) => (
                        <Grid sx={{ overflow: 'scroll' }} container wrap='nowrap' {...provided.droppableProps} ref={provided.innerRef}>
                            {currentTarget?.data?.images?.map((el, i) => (
                                <Draggable key={el.id} draggableId={el.id} index={i}>
                                    {(provided) => (
                                        <Box
                                            sx={{ display: 'inline-block', position: 'relative' }}
                                            onClick={() => onDecoImageClick(el)}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <ImageView image={el} focus={currentImage.object && el.id === currentImage.object?.data?.id}></ImageView>
                                            <IconButton sx={{ position: 'absolute', right: '5px', top: '5px' }} onClick={(e) => onRemoveClick(e, el)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Grid>
    );
}
