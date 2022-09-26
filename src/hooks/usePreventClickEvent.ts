import { useEffect, useState } from 'react';

export default function usePreventClickEvent() {
    const [prevent, setPrevent] = useState(false);

    useEffect(() => {
        if (document.getElementById('prevent-background')) return;
        const preventBackground = document.createElement('div');
        preventBackground.id = 'prevent-background';
        preventBackground.style.position = 'fixed';
        preventBackground.style.inset = '0';
        preventBackground.style.opacity = '0';

        document.body.appendChild(preventBackground);

        if (prevent) {
            preventBackground.style.pointerEvents = 'auto';
            preventBackground.style.zIndex = 'inherit';
        } else {
            preventBackground.style.zIndex = '-1';
            preventBackground.style.pointerEvents = 'none';
        }

        return () => preventBackground.remove();
    }, [prevent]);

    return { prevent, setPrevent };
}
