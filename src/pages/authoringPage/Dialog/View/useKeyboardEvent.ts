import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DATA, selectIntro, setCharacters, setClip, setImages } from '../../../../slices/intro';
import { v4 as uuidv4 } from 'uuid';
import { animation, drawImage, removeObject } from './Canvas/helper';

export default function useKeyboardEvent() {
    const { currentTarget, render, currentDialog, data, clip } = useSelector(selectIntro);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    // COPY
    const _copy = useCallback(
        (target: DATA | undefined) => {
            const position = currentTarget.object && { top: currentTarget.object.top || 0, left: currentTarget.object.left || 0 };
            const transform = currentTarget.object && {
                angle: currentTarget.object.angle || 0,
                scaleX: currentTarget.object.scaleX || 1,
                scaleY: currentTarget.object.scaleY || 1,
                flipX: currentTarget.object.flipX,
                flipY: currentTarget.object.flipY
            };
            if (['character'].includes(currentTarget.type)) {
                const character = target?.characters?.find((el) => el.id === currentTarget.object.data.id);
                character && dispatch(setClip({ type: 'character', data: { ...character, id: 'clip-character', position, transform } }));
            }
            if (['image', 'sprite'].includes(currentTarget.type)) {
                const image = target?.images?.find((el) => el.id === currentTarget.object.data.id);
                image && dispatch(setClip({ type: 'image', data: { ...image, id: 'clip-image', position, transform } }));
            }
            if (['character', 'image', 'sprite'].includes(currentTarget.type)) setMessage(`COPY ${currentTarget.type.toUpperCase()}`);
        },
        [currentTarget, dispatch]
    );

    // PASTE
    const _paste = useCallback(
        (target: DATA | undefined) => {
            if (!clip) return;
            const id = uuidv4();
            drawImage({
                canvas: render[currentDialog],
                // src: `${process.env.REACT_APP_SOL}/images/D1/${clip.data.src}.${clip.data.extension}`,
                src:`/assets/images/${clip.data.src}.${clip.data.extension}`,
                attr: { ...clip.data.position, ...clip.data.transform, ...clip.data.attr },
                id,
                type: clip.data.imageDivisionCode
            })?.then(({ object }) => {
                if (clip.data.imageDivisionCode === '02') object.data.sprite = animation.sprite({ object, frameCount: Number(clip.data.frame) });
            });
            if (['character'].includes(clip.type)) dispatch(setCharacters([...(target?.characters || []), { ...clip.data, id }]));
            if (['image', 'sprite'].includes(clip.type)) dispatch(setImages([...(target?.images || []), { ...clip.data, id }]));
            if (['character', 'image', 'sprite'].includes(clip.type)) setMessage(`PASTE ${clip.type.toUpperCase()}`);
        },
        [clip, dispatch, render, currentDialog]
    );

    // DELETE
    const _delete = useCallback(
        (target: DATA | undefined) => {
            if (['character'].includes(currentTarget.type)) {
                const characters = target?.characters?.filter((el) => el.id !== currentTarget.object.data.id);
                if (characters) {
                    dispatch(setCharacters(characters));
                    removeObject({ canvas: render[currentDialog], id: currentTarget.object.data.id });
                }
            }
            if (['image', 'sprite'].includes(currentTarget.type)) {
                const images = target?.images?.filter((el) => el.id !== currentTarget.object.data.id);
                if (images) {
                    dispatch(setImages(images));
                    removeObject({ canvas: render[currentDialog], id: currentTarget.object.data.id });
                }
            }
            if (['character', 'image', 'sprite'].includes(currentTarget.type)) setMessage(`DELETE ${currentTarget.type.toUpperCase()}`);
        },
        [currentDialog, currentTarget, dispatch, render]
    );

    // BOLD
    const _bold = useCallback(() => {
        if (currentTarget.type !== 'text') return;
        const isBold = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.fontWeight === 'bold');
        (currentTarget.object as fabric.Textbox).setSelectionStyles(
            { fontWeight: isBold ? 'normal' : 'bold' },
            currentTarget.object.selectionStart,
            currentTarget.object.selectionEnd
        );
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    }, [currentTarget]);

    // ITALIC
    const _italic = useCallback(() => {
        if (currentTarget.type !== 'text') return;
        const isItalic = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.fontStyle === 'italic');
        (currentTarget.object as fabric.Textbox).setSelectionStyles(
            { fontStyle: isItalic ? 'normal' : 'italic' },
            currentTarget.object.selectionStart,
            currentTarget.object.selectionEnd
        );
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    }, [currentTarget]);

    // UNDERLINE
    const _underline = useCallback(() => {
        const isUnderline = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.underline);
        (currentTarget.object as fabric.Textbox).setSelectionStyles({ underline: !isUnderline }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    }, [currentTarget]);

    // LINETHROUGH
    const _linethrough = useCallback(() => {
        const isLinethrough = (currentTarget.object as fabric.Textbox)
            .getSelectionStyles(currentTarget.object.selectionStart, currentTarget.object.selectionEnd)
            .every((style) => style.linethrough);
        (currentTarget.object as fabric.Textbox).setSelectionStyles({ linethrough: !isLinethrough }, currentTarget.object.selectionStart, currentTarget.object.selectionEnd);
        (currentTarget.object as fabric.Textbox).canvas?.renderAll();
    }, [currentTarget]);

    // KEY EVENT
    const keyEventHandler = useCallback(
        (e: KeyboardEvent) => {
            const { ctrlKey, metaKey, code, shiftKey } = e;
            const targetData = data.find((el) => el.dialogId === currentDialog);
            // COPY
            if (code === 'KeyC' && (ctrlKey || metaKey)) _copy(targetData);
            // PASTE
            if (code === 'KeyV' && (ctrlKey || metaKey) && clip) _paste(targetData);
            // DELETE
            if (code === 'Delete') _delete(targetData);
            // BOLD
            if (code === 'KeyB' && (ctrlKey || metaKey)) _bold();
            // ITALIC
            if (code === 'KeyI' && (ctrlKey || metaKey)) _italic();
            // UNDERLINE
            if (code === 'KeyU' && (ctrlKey || metaKey)) _underline();
            // LINETHROUGH
            if (code === 'KeyX' && (ctrlKey || metaKey) && shiftKey) _linethrough();
        },
        [currentDialog, data, clip, _copy, _paste, _delete, _bold, _italic, _underline, _linethrough]
    );

    useEffect(() => {
        window.addEventListener('keydown', keyEventHandler);
        return () => window.removeEventListener('keydown', keyEventHandler);
    }, [keyEventHandler]);

    return { message, setMessage };
}
