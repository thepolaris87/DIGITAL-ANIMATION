import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../../slices/intro';
import { useMutation, useQueryClient } from 'react-query';
import { patchFrameData } from '../../../../../apis/api';
import { useParams } from 'react-router-dom';
import useCanvasSync from '../useCanvasSync';

export default function Save() {
    const { data, render } = useSelector(selectIntro);
    const { frameId } = useParams();
    const { mutate } = useMutation(patchFrameData);
    const queryClient = useQueryClient();
    const { characterSync, decoImageSync, scriptSync } = useCanvasSync();

    const onSaveClick = () => {
        const originData = queryClient.getQueryData(['meta', frameId]) as any;

        const _data = data.map((el) => {
            const { dialogId, characters, images, scripts } = el;
            const canvas = render[dialogId];
            const canvasObjects = canvas.getObjects();

            //캐릭터 싱크
            const _characters = characterSync(characters || [], canvasObjects);

            //데코 이미지 싱크
            const _images = decoImageSync(images || [], canvasObjects);

            //스크립트 싱크
            const _scripts = scriptSync(scripts || [], canvasObjects);

            return { ...el, characters: _characters, images: _images, scripts: _scripts };
        });
        console.log(originData, JSON.stringify(_data));

        const body = { ...originData, frameConfig: JSON.stringify(_data) };
        mutate({ frameId, body });
    };

    return (
        <IconButton onClick={onSaveClick}>
            <SaveIcon />
        </IconButton>
    );
}
