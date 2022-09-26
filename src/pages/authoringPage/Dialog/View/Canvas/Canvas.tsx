import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRender, SCRIPTBASICFORM, setCurrentDialog, setCurrentTarget, setNavi } from '../../../../../slices/intro';
import { drawBackdrop, drawBackground, drawImage, zIndex, animation, drawScript, drawBubble } from './helper';
import type { IMAGEBASICFORM, DATA } from '../../../../../slices/intro';
import { useQueryClient } from 'react-query';
import { GETTEXT } from '../../../../../apis/api';

type CANVAS = {
    id: string;
    locale?: 'ko' | 'en';
    sceneType?: DATA['dialogType'];
    background?: IMAGEBASICFORM;
    images?: IMAGEBASICFORM[];
    characters?: IMAGEBASICFORM[];
    scripts?: SCRIPTBASICFORM[];
    onComplete?: () => void;
};

export default function Canvas({ id, locale = 'ko', sceneType, background, images, characters, scripts, onComplete }: CANVAS) {
    const queryClient = useQueryClient();
    const scriptData = queryClient.getQueryData(['intro', 'text']) as GETTEXT[];
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [complete, setComplete] = useState({ character: false, background: false, image: false });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dispatch = useDispatch();

    const _drawBackground = useCallback(
        async (canvas: fabric.Canvas) => {
            if (background) {
                await drawBackground({ canvas, src: `${process.env.REACT_APP_SOL}/images/D1/${background.src}.${background.extension}` });
            }
            setComplete((prev) => ({ ...prev, background: true }));
        },
        [background]
    );

    const _drawCharacter = useCallback(
        async (canvas: fabric.Canvas) => {
            if (characters) {
                await Promise.all(
                    characters.map((el) =>
                        drawImage({
                            canvas,
                            src: `${process.env.REACT_APP_SOL}/images/D1/${el.src}.${el.extension}`,
                            attr: { ...el.position, ...el.transform, ...el.attr },
                            id: el.id,
                            type: el.imageDivisionCode
                        })
                    )
                );
                const objects = canvas.getObjects();
                characters.forEach((character, i) => {
                    const target = objects.find((object) => object.data.id === character.id);
                    if (target) target.moveTo(zIndex.image + i);
                });
            }
            setComplete((prev) => ({ ...prev, character: true }));
        },
        [characters]
    );

    const _drawImage = useCallback(
        async (canvas: fabric.Canvas) => {
            if (images) {
                await Promise.all(
                    images.map((el) =>
                        drawImage({
                            canvas,
                            src: `${process.env.REACT_APP_SOL}/images/D1/${el.src}.${el.extension}`,
                            attr: { ...el.position, ...el.transform, ...el.attr },
                            id: el.id,
                            type: el.imageDivisionCode
                        })
                    )
                );
                const objects = canvas.getObjects();
                images.forEach((image, i) => {
                    const target = objects.find((object) => object.data.id === image.id);
                    if (target) {
                        target.moveTo(zIndex.image + i);
                        if (image.imageDivisionCode === '02') {
                            target.data.sprite = animation.sprite({ object: target, frameCount: Number(image.frame) });
                        }
                    }
                });
            }
            setComplete((prev) => ({ ...prev, image: true }));
        },
        [images]
    );

    const _drawScripts = useCallback(
        (canvas: fabric.Canvas) => {
            if (scripts) {
                scripts.forEach((el) => {
                    if (el.text) {
                        const target = scriptData.find(({ textId }) => textId === el.text?.src);
                        if (target) {
                            drawScript({
                                id: el.id,
                                canvas: canvas,
                                script: locale === 'ko' ? target.textKo : target.textEn,
                                attr: el.textbox && el.textbox[locale],
                                styles: el.textStyles && el.textStyles[locale]
                            });
                        }
                    }
                    if (el.bubble) {
                        const { type, ko, en } = el.bubble;
                        if (type === 'shape') {
                            drawBubble({
                                canvas,
                                id: el.id,
                                attr: locale === 'ko' ? { ...ko.transform, ...ko.position, ...ko.attr } : { ...en.transform, ...en.position, ...en.attr }
                            });
                        }
                    }
                    const objects = canvas.getObjects();
                    scripts.forEach((script, i) => {
                        const bubbleObj = objects.find((object) => object.data.id === script.id + '-bubble');
                        const scriptObj = objects.find((object) => object.data.id === script.id);
                        if (bubbleObj) bubbleObj.moveTo(zIndex.bubble + i);
                        if (scriptObj) scriptObj.moveTo(zIndex.script + i);
                    });
                });
            }
        },
        [locale, scriptData, scripts]
    );

    useEffect(() => {
        if (!canvas && canvasRef.current) {
            const _canvas = new fabric.Canvas(canvasRef.current, { selection: false, defaultCursor: 'pointer' });
            // background 그리기
            _drawBackground(_canvas);
            // backdrop 그리기
            if (sceneType === 'popup') drawBackdrop({ canvas: _canvas });
            // character 그리기
            _drawCharacter(_canvas);
            // image 그리기
            _drawImage(_canvas);
            // script 그리기
            _drawScripts(_canvas);

            _canvas.on('mouse:down', (e) => {});
            _canvas.on('mouse:move', (e) => {});
            _canvas.on('mouse:up', (e) => {
                const { target } = e;
                dispatch(setCurrentDialog(id));

                if (target) {
                    // BASIC
                    if (['01'].includes(target.data.type)) {
                        dispatch(setCurrentTarget({ type: 'image', object: target }));
                        dispatch(setNavi('background'));
                        _canvas.renderAll();
                    }
                    // SPRITE
                    if (['02'].includes(target.data.type)) {
                        dispatch(setCurrentTarget({ type: 'sprite', object: target }));
                        dispatch(setNavi('background'));
                        _canvas.renderAll();
                    }
                    // CHARACTER
                    if (['05'].includes(target.data.type)) {
                        dispatch(setCurrentTarget({ type: 'character', object: target }));
                        dispatch(setNavi('background'));
                        _canvas.renderAll();
                    }
                    // SCRIPT
                    if (['text'].includes(target.data.type)) {
                        dispatch(setCurrentTarget({ type: 'text', object: target }));
                        dispatch(setNavi('script'));
                        _canvas.renderAll();
                    }
                    // BUBBLE
                    if (['bubble'].includes(target.data.type)) {
                        dispatch(setCurrentTarget({ type: 'bubble', object: target }));
                        dispatch(setNavi('script'));
                        _canvas.renderAll();
                    }
                    return;
                }
                dispatch(setCurrentTarget({ type: '' }));
                _canvas.renderAll();
            });

            dispatch(addRender({ [id]: _canvas }));
            setCanvas(_canvas);
        }
    }, [canvas, id, dispatch, background, characters, images, sceneType, _drawCharacter, _drawImage, locale, scripts, _drawBackground, _drawScripts]);

    useEffect(() => {
        if (complete.background && complete.character && complete.image) onComplete?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [complete.background, complete.character, complete.image]);

    return <canvas ref={canvasRef} width='1024px' height='768px'></canvas>;
}
