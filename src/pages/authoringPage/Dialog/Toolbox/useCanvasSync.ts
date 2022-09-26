import { useSelector } from 'react-redux';
import { IMAGEBASICFORM, SCRIPTBASICFORM, selectIntro } from '../../../../slices/intro';

export default function useCanvasSync() {
    const { locale } = useSelector(selectIntro);
    const characterSync = (characters: IMAGEBASICFORM[], canvasObjects: fabric.Object[]) => {
        const _characters =
            characters.map((character) => {
                const target = canvasObjects.find((object) => object.data.id === character.id);
                const { top = 0, left = 0, scaleX = 1, scaleY = 1, angle = 0, opacity = 1, flipX, flipY } = target || {};

                return {
                    ...character,
                    position: { top: Number(top?.toFixed(2)), left: Number(left?.toFixed(2)) },
                    transform: { scaleX: Number(scaleX?.toFixed(2)), scaleY: Number(scaleY?.toFixed(2)), angle: Number(angle?.toFixed(2)), flipX, flipY },
                    attr: { opacity }
                };
            }) || [];

        return _characters;
    };

    const decoImageSync = (images: IMAGEBASICFORM[], canvasObjects: fabric.Object[]) => {
        const _images =
            images?.map((image) => {
                const target = canvasObjects.find((object) => object.data.id === image.id);
                const { top = 0, left = 0, scaleX = 1, scaleY = 1, angle = 0, opacity = 1, flipX, flipY } = target || {};
                return {
                    ...image,
                    position: { top: Number(top?.toFixed(2)), left: Number(left?.toFixed(2)) },
                    transform: { scaleX: Number(scaleX?.toFixed(2)), scaleY: Number(scaleY?.toFixed(2)), angle: Number(angle?.toFixed(2)), flipX, flipY },
                    attr: { opacity }
                };
            }) || [];
        return _images;
    };

    const scriptSync = (scripts: SCRIPTBASICFORM[], canvasObjects: fabric.Object[]) => {
        const _scripts = scripts?.map((script) => {
            const text = canvasObjects.find((object) => object.data.id === script.id && object.data.type === 'text');
            const bubble = canvasObjects.find((object) => object.data.id === script.id && object.data.type === 'bubble');
            const textboxData = {
                top: Number(text?.top?.toFixed(2)),
                left: Number(text?.left?.toFixed(2)),
                width: Number(text?.width?.toFixed(2)),
                angle: Number(text?.angle?.toFixed(2))
            };
            const textStyleData = JSON.stringify((text as fabric.Textbox).styles);
            const bubbleData =
                bubble?.type === 'rect'
                    ? {
                          position: { top: Number(bubble?.top?.toFixed(2)), left: Number(bubble?.left?.toFixed(2)) },
                          transform: { angle: Number(bubble?.angle?.toFixed(2)) },
                          attr: {
                              width: Number(bubble?.width?.toFixed(2)),
                              height: Number(bubble?.height?.toFixed(2)),
                              rx: (bubble as fabric.Rect)?.rx || 0,
                              ry: (bubble as fabric.Rect)?.ry || 0,
                              fill: bubble?.fill
                          }
                      }
                    : {
                          position: { top: Number(bubble?.top?.toFixed(2)), left: Number(bubble?.left?.toFixed(2)) },
                          transform: { scaleX: Number(bubble?.scaleX?.toFixed(2)), scaleY: Number(bubble?.scaleY?.toFixed(2)), angle: Number(bubble?.angle?.toFixed(2)) }
                      };

            if (locale === 'ko')
                return {
                    ...script,
                    textbox: { ko: textboxData, en: { ...script.textbox?.en } },
                    textStyles: { ko: textStyleData, en: script.textStyles?.en || '{}' },
                    bubble: { ...script.bubble, ko: bubbleData }
                };
            else
                return {
                    ...script,
                    textbox: { en: textboxData, ko: { ...script.textbox?.ko } },
                    textStyles: { en: textStyleData, ko: script.textStyles?.ko || '{}' },
                    bubble: { ...script.bubble, en: bubbleData }
                };
        });
        return _scripts;
    };

    return { characterSync, decoImageSync, scriptSync };
}
