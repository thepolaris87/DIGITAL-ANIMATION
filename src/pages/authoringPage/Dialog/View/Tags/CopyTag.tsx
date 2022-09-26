import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DATA, IMAGEBASICFORM, selectIntro, setCurrentDialog, setData } from '../../../../../slices/intro';
import { Tag, Tooltip } from './Tags.styles';
import { v4 as uuidv4 } from 'uuid';

const getObjectAttr = (objects: fabric.Object[], image: IMAGEBASICFORM) => {
    const target = objects.find((object) => object.data.id === image.id);
    const position = target && { top: Number(target?.top?.toFixed(2)) || 0, left: Number(target?.left?.toFixed(2)) || 0 };
    const transform = target && {
        angle: Number(target?.angle?.toFixed(2)) || 0,
        scaleX: Number(target?.scaleX?.toFixed(2)) || 1,
        scaleY: Number(target?.scaleY?.toFixed(2)) || 1,
        flipX: target.flipX || false,
        flipY: target.flipY || false
    };
    const attr = target && { opacity: target.opacity || 1 };
    return { position, transform, attr };
};

export default function CopyTag({ id }: { id: string }) {
    const { data, render } = useSelector(selectIntro);
    const dispatch = useDispatch();

    const onCopyClick = () => {
        const target = data.find((el) => el.dialogId === id);
        if (target) {
            const objects = render[id].getObjects();
            const dialogId = uuidv4();
            const copy: DATA = {
                ...target,
                dialogId,
                background: target.background && { ...target.background, id: uuidv4() },
                characters: target.characters && target.characters.map((el) => ({ ...el, id: uuidv4(), ...getObjectAttr(objects, el) })),
                images: target.images && target.images.map((el) => ({ ...el, id: uuidv4(), ...getObjectAttr(objects, el) }))
            };
            dispatch(setData(data.concat(copy)));
            setTimeout(() => dispatch(setCurrentDialog(dialogId)), 1000);
        }
    };

    return (
        <Tag sx={{ background: '#fff', boxShadow: '0 0 5px #ffa500', mt: 2 }} container alignItems='center' justifyContent='center'>
            <Tooltip title='COPY'>
                <IconButton onClick={onCopyClick}>
                    <ContentCopyIcon color='primary' />
                </IconButton>
            </Tooltip>
        </Tag>
    );
}
