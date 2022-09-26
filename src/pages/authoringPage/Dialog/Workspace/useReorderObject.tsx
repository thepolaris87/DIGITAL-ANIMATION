import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../../slices/intro';
import { backdropId, zIndex } from '../View/Canvas/helper';

export default function useReorderObject() {
    const { data, currentDialog, render } = useSelector(selectIntro);
    // object order
    useEffect(() => {
        const currentData = data.find((el) => el.dialogId === currentDialog);
        if (currentData) {
            const objects = render[currentDialog].getObjects();
            // image
            currentData.images?.forEach((item, i) => {
                const target = objects.find((object) => object.data.id === item.id);
                if (target) {
                    target.moveTo(zIndex.image + i);
                    render[currentDialog].renderAll();
                }
            });
            // character
            currentData.characters?.forEach((item, i) => {
                const target = objects.find((object) => object.data.id === item.id);
                if (target) {
                    target.moveTo(zIndex.character + i);
                    render[currentDialog].renderAll();
                }
            });
            // script
            currentData.scripts?.forEach((item, i) => {
                const bubbleObj = objects.find((object) => object.data.id === item.id && object.data.type === 'bubble');
                const scriptObj = objects.find((object) => object.data.id === item.id && object.data.type === 'text');
                if (bubbleObj) bubbleObj.moveTo(zIndex.bubble + i);
                if (scriptObj) scriptObj.moveTo(zIndex.script + i);
            });

            const backdrop = objects.find((el) => el.data.id === backdropId);
            backdrop && backdrop.moveTo(zIndex.backdrop);
        }
    }, [data, currentDialog, render]);
}
