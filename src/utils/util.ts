import { fonts } from './const';

export const wait = (delay: number = 0) => new Promise((resolve) => setTimeout(resolve, delay));

export const sound = (src: string) => {
    const audio = new Audio();
    audio.src = src;

    const play = () => {
        audio.play();
    };
    const pause = () => {
        audio.pause();
    };
    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
    };

    return { audio, play, pause, stop };
};

export const postMessage = (data: { code: string; moduleIndex?: number; moduleResult?: number; type?: any }) => {
    if (window !== window.parent) window.parent.postMessage(data, '*');
};

export const preloadFont = () => Promise.all(fonts.map((font) => document.fonts.load(`30px ${font.name}`, '가나다라123456789+*/')));
