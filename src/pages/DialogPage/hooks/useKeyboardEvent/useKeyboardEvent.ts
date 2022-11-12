import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import useBold from './useBold';
import useCopy from './useCopy';
import useCopyEffect from './useCopyEffect';
import useCut from './useCut';
import useDelete from './useDelete';
import useItalic from './useItalic';
import useLinethorugh from './useLinethorugh';
import useMove from './useMove';
import usePaste from './usePaste';
import usePasteEffect from './usePasteEffect';
import useSave from './useSave';
import useScale from './useScale';
import useSelectAll from './useSelectAll';
import useUnderline from './useUnderline';

export default function useKeyboardEvent() {
    const { clip, effectClip } = useSelector(selectDialog);
    const { copy } = useCopy();
    const { paste } = usePaste();
    const { delete: _delete } = useDelete();
    const { bold } = useBold();
    const { italic } = useItalic();
    const { underline } = useUnderline();
    const { linethrough } = useLinethorugh();
    const { move } = useMove();
    const { scale } = useScale();
    const { selectAll } = useSelectAll();
    const { copyEffect } = useCopyEffect();
    const { pasteEffect } = usePasteEffect();
    const { save } = useSave();
    const { cut } = useCut();

    // KEY EVENT
    const keyEventHandler = useCallback(
        (e: KeyboardEvent) => {
            const activeElement = document.activeElement;
            if (!activeElement?.hasAttribute('data-fabric-hiddentextarea') && !activeElement?.classList.contains('dialog-canvas-container')) return;
            const { ctrlKey, metaKey, code, shiftKey } = e;
            // COPY
            if (code === 'KeyC' && (ctrlKey || metaKey) && !shiftKey) copy();
            // PASTE
            if (code === 'KeyV' && (ctrlKey || metaKey) && !shiftKey && clip) paste();
            // DELETE
            if (code === 'Delete' || code === 'Backspace') _delete(code);
            // BOLD
            if (code === 'KeyB' && (ctrlKey || metaKey)) bold();
            // ITALIC
            if (code === 'KeyI' && (ctrlKey || metaKey)) italic();
            // UNDERLINE
            if (code === 'KeyU' && (ctrlKey || metaKey)) underline();
            // LINETHROUGH
            if (code === 'KeyX' && (ctrlKey || metaKey) && shiftKey) linethrough();
            // MOVE
            if (code === 'ArrowRight') move(shiftKey ? 1 : 10, 0);
            if (code === 'ArrowLeft') move(shiftKey ? -1 : -10, 0);
            if (code === 'ArrowUp') move(0, shiftKey ? -1 : -10);
            if (code === 'ArrowDown') move(0, shiftKey ? 1 : 10);
            // SCALE
            if (code === 'Equal' || code === 'NumpadAdd') scale(0.05);
            if (code === 'Minus' || code === 'NumpadSubtract') scale(-0.05);
            // SELECT ALL
            if (code === 'KeyA' && (ctrlKey || metaKey)) {
                e.preventDefault();
                selectAll();
            }
            // COPY EFFECT
            if (code === 'KeyC' && (ctrlKey || metaKey) && shiftKey) {
                e.preventDefault();
                copyEffect();
            }
            // PASTE EFFECT
            if (code === 'KeyV' && (ctrlKey || metaKey) && effectClip && shiftKey) pasteEffect();
            // SAVE
            if (code === 'KeyS' && (ctrlKey || metaKey)) {
                e.preventDefault();
                save();
            }
            // CUT
            if (code === 'KeyX' && (ctrlKey || metaKey)) cut();
        },
        [clip, effectClip, copy, paste, _delete, bold, italic, underline, linethrough, move, scale, selectAll, copyEffect, pasteEffect, save, cut]
    );

    useEffect(() => {
        window.addEventListener('keydown', keyEventHandler);
        const container = document.getElementsByClassName('dialog-canvas-container');
        Array.from(container).forEach((canvas) => {
            canvas.setAttribute('tabIndex', '0');
        });
        return () => {
            window.removeEventListener('keydown', keyEventHandler);
        };
    }, [keyEventHandler]);

    return;
}
