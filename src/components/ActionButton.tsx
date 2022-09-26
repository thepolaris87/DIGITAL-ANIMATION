import React, { useMemo, useState } from 'react';
import { playBtn } from '../assets/sounds/button';
import { sound } from '../utils/utils';

export default function ActionButton({ Default, Press, style, onClick }: { Default: React.ReactNode; Press?: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
    const [state, setState] = useState<'default' | 'press'>('default');
    const btnSound = useMemo(() => sound(playBtn), []);

    const onMouseDown = () => {
        btnSound.play();
        setState('press');
    };
    const onMouseUp = () => {
        setState('default');
        onClick?.();
    };
    const onMouseOut = () => {
        setState('default');
    };

    return (
        <div style={{ width: 'fit-content', height: 'fit-content', cursor: 'pointer', ...style }} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseOut={onMouseOut}>
            {state === 'default' && Default}
            {state === 'press' && Press}
        </div>
    );
}
