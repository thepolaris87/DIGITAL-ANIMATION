import axios from 'axios';
import { images, texts, sounds } from './fakeApiData';

// framedata 조회
export const getFrameData = async ({ frameId }: { frameId: string | undefined }): Promise<any> => {
    const result = await axios.get(`${process.env.REACT_APP_SOL}/editor/frame/D1/${frameId}`, getConfigure());
    return result.data;
};

// framedata 수정
export const patchFrameData = async ({ frameId, body }: { frameId: string | undefined; body: any }): Promise<any> => {
    const result = await axios.patch(`${process.env.REACT_APP_SOL}/editor/frame/D1/${frameId}`, body, getConfigure());
    return result.data;
};

// image data 조회
export type GETIMAGE = { extension: string; height: string; imageDivisionCode: string; imageId: string; reference: string; size: string; tags: string; width: string };
export const getImage = async (): Promise<GETIMAGE[]> => {
    // const result = await axios.get(`${process.env.REACT_APP_SOL}/editor/image/D1`, getConfigure());
    // return result.data;
    return images;
};

// text data 조회
export type GETTEXT = { reference: string; textDivisionCode: string; textEn: string; textId: string; textKo: string };
export const getText = async ({ textId = '' }: { textId?: string }): Promise<GETTEXT[]> => {
    // const result = await axios.get(`${process.env.REACT_APP_SOL}/editor/text/D1/${textId}`, getConfigure());
    // return result.data;
    return texts;
};

// sound data 조회
export type GETSOUND = { soundId: string; soundDivisionCode: string; duration: string; extension: string; size: string; reference: string; tags: string };
export const getSound = async (): Promise<GETSOUND[]> => {
    // const result = await axios.get(`${process.env.REACT_APP_SOL}/editor/sound/D1`, getConfigure());
    // return result.data;
    return sounds;
};

const getConfigure = () => {
    const accessToken = 'rE_M6Kmix3p7mqOLaXAe';
    return { headers: { Authorization: `Bearer ${accessToken}` } };
};
