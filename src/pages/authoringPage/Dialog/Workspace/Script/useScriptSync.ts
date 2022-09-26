import { useDispatch, useSelector } from 'react-redux';

import { SCRIPTBASICFORM, selectIntro, setScripts } from '../../../../../slices/intro';

export default function useScriptSync() {
    const { locale } = useSelector(selectIntro);
    const dispatch = useDispatch();

    const excuteTextSync = ({ script, textbox }: { script: SCRIPTBASICFORM; textbox: fabric.Object }) => {
        const id = script.id;
        const { top = 0, left = 0, width = 0, angle = 0 } = textbox;
        const data = { top: Number(top?.toFixed(2)), left: Number(left?.toFixed(2)), width: Number(width?.toFixed(2)), angle: Number(angle?.toFixed(2)) };
        if (locale === 'ko') {
            dispatch(setScripts({ id, key: 'textbox', data: { ko: data, en: { ...script.textbox?.en } } }));
            dispatch(
                setScripts({
                    id,
                    key: 'textStyles',
                    data: { ko: JSON.stringify((textbox as fabric.Textbox).styles), en: script.textStyles?.en || '{}' }
                })
            );
        }
        if (locale === 'en') {
            dispatch(setScripts({ id, key: 'textbox', data: { ko: { ...script.textbox?.ko }, en: data } }));
            dispatch(
                setScripts({
                    id,
                    key: 'textStyles',
                    data: { ko: script.textStyles?.ko || '{}', en: JSON.stringify((textbox as fabric.Textbox).styles) }
                })
            );
        }
    };

    const excuteBubbleSync = ({ script, bubble }: { script: SCRIPTBASICFORM; bubble: fabric.Object }) => {
        const { type = 'rect', top = 0, left = 0, scaleX = 1, scaleY = 1, width = 0, height = 0, angle = 0, fill } = bubble;
        const data =
            type === 'rect'
                ? {
                      position: { top: Number(top.toFixed(2)), left: Number(left.toFixed(2)) },
                      transform: { angle: Number(angle.toFixed(2)) },
                      attr: {
                          width: Number(width.toFixed(2)),
                          height: Number(height.toFixed(2)),
                          rx: (bubble as fabric.Rect)?.rx || 0,
                          ry: (bubble as fabric.Rect)?.ry || 0,
                          fill: bubble.fill
                      }
                  }
                : {
                      position: { top: Number(top.toFixed(2)), left: Number(left.toFixed(2)) },
                      transform: { scaleX: Number(scaleX.toFixed(2)), scaleY: Number(scaleY.toFixed(2)), angle: Number(angle.toFixed(2)) }
                  };

        if (locale === 'ko') {
            dispatch(
                setScripts({
                    key: 'bubble',
                    id: script.id,
                    data: { ...script.bubble, type: type === 'rect' ? 'shape' : 'image', ko: data, en: { ...script.bubble?.en } }
                })
            );
        }
        if (locale === 'en') {
            dispatch(
                setScripts({
                    key: 'bubble',
                    id: script.id,
                    data: { ...script.bubble, type: type === 'rect' ? 'shape' : 'image', en: data, ko: { ...script.bubble?.ko } }
                })
            );
        }
    };

    return { excuteTextSync, excuteBubbleSync };
}
