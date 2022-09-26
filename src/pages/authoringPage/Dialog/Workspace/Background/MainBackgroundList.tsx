import { Box, Divider, Grid, IconButton } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGEBASICFORM, selectIntro, setCharacters, setCurrentTarget } from '../../../../../slices/intro';
import Delete from '@mui/icons-material/Delete';
import { removeObject } from '../../View/Canvas/helper';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { ImageView } from './Background.styles';
import UpcomingIcon from '@mui/icons-material/Upcoming';

export default function MainBackgroundList() {
    const { data, currentDialog, render, currentTarget: currentImage } = useSelector(selectIntro);

    const currentTarget = useMemo(() => {
        const currentData = data.find((el) => el.dialogId === currentDialog);
        const currentRender = render[currentDialog];
        return { data: currentData, render: currentRender };
    }, [currentDialog, data, render]);

    const dispatch = useDispatch();

    const onBackgroundImageClick = () => {};

    const onMainCharacterImageClick = (image: IMAGEBASICFORM) => {
        const { id } = image;
        const target = currentTarget.render.getObjects().find((el) => el.data.id === id);

        if (target) {
            currentTarget.render.setActiveObject(target);
            currentTarget.render.renderAll();
            dispatch(setCurrentTarget({ type: 'character', object: target }));
        }
    };

    const onRemoveClick = (e: React.MouseEvent, image: IMAGEBASICFORM) => {
        e.stopPropagation();
        if (currentTarget && currentTarget.data && currentTarget.data.characters) {
            const data = currentTarget.data.characters.filter((el) => el.id !== image.id);
            dispatch(setCharacters(data));
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
        if (currentTarget?.data?.characters) {
            const items = [...currentTarget.data.characters];
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            dispatch(setCharacters(items));
        }
    };

    if (!currentTarget.data) return null;

    return (
        <Grid sx={{ background: '#fff', height: '170px' }} container wrap='nowrap' alignItems='center'>
            <Grid className='cp' sx={{ p: 2, width: `${1024 * 0.2}px`, height: `${768 * 0.2}`, position: 'relative' }} item>
                {currentTarget.data.background && (
                    <img
                        width='100%'
                        height='100%'
                        src={`${process.env.REACT_APP_SOL}/images/D1/${currentTarget.data.background.src}.${currentTarget.data.background.extension}`}
                        alt='background'
                    />
                )}
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid sx={{ flex: '1', overflow: 'hidden' }} item>
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <Droppable direction='horizontal' droppableId='characterList'>
                        {(provided) => (
                            <Grid sx={{ overflow: 'scroll' }} container wrap='nowrap' {...provided.droppableProps} ref={provided.innerRef}>
                                {currentTarget?.data?.characters?.map((el, i) => (
                                    <Draggable key={el.id} draggableId={el.id} index={i}>
                                        {(provided) => (
                                            <Box
                                                sx={{ display: 'inline-block', position: 'relative' }}
                                                onClick={() => onMainCharacterImageClick(el)}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <ImageView image={el} focus={currentImage.object && el.id === currentImage.object?.data?.id} />
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
        </Grid>
    );
}
