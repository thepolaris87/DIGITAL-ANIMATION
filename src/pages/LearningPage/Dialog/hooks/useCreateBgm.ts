import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectLearning } from '../../../../slices/learning';
import { sound } from '../../../../utils/util';

export default function useCreateBgm() {    
    const { data, render, complete } = useSelector(selectLearning);
    const bgms = useMemo(() => {
        if (!complete || !render || !data) return;
        const _bgms: (Partial<ReturnType<typeof sound>> & { src: string })[] = [];
        data.dialog.forEach((data) => {
            if (data.scene.bgm) {
                const _sound = { ...sound(data.scene.bgm.src), src: data.scene.bgm.src };
                _sound.audio.loop = true;
                _bgms.push({ ..._sound, src: data.scene.bgm.src });
            } else {
                _bgms.push({ src: 'none' });
            }
        });
        return _bgms;
    }, [complete, render, data]);

    return { bgms };
}
