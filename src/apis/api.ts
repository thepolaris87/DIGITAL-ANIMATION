import axios from 'axios';
console.log(process.env.REACT_APP_SOL)
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
export type GETIMAGE = { extension: 'png' | 'svg'; height: string; imageDivisionCode: string; imageId: string; reference: string; size: string; tags: string; width: string };
export const getImage = async (): Promise<GETIMAGE[]> => {
    const result = await axios.get(`${process.env.REACT_APP_SOL}/editor/image/D1`, getConfigure());
    return result.data;
};

// text data 조회
export type GETTEXT = { reference: string; textDivisionCode: string; textEn: string; textId: string; textKo: string };
export const getText = async ({ textId = '' }: { textId?: string }): Promise<GETTEXT[]> => {
    const result = await axios.get(`${process.env.REACT_APP_SOL}/editor/text/D1/${textId}`, getConfigure());
    return result.data;
};

// sound data 조회
export type GETSOUND = { soundId: string; soundDivisionCode: string; duration: string; extension: 'mp3'; size: string; reference: string; tags: string };
export const getSound = async (): Promise<GETSOUND[]> => {
    const result = await axios.get('${process.env.REACT_APP_SOL}/editor/sound/D1', getConfigure());
    return result.data;
};

// learning data 조회
export const getLearningData = ({ frameId }: { frameId: string }) => axios.get(`${process.env.REACT_APP_SOL}/learning/meta/D1/${frameId}`, getConfigure()).then((r) => r.data);

// learning feedback 조회
export const getLearningFeedback = (): Promise<
    {
        feedbackId: string;
        feedbackTypeCode: string;
        feedbackConfig: { title: { ko: string; en: string }; message: { ko: string; en: string }; sound: { ko: string; en: string }; image: string };
        description: string;
    }[]
> => axios.get('${process.env.REACT_APP_SOL}//learning/feedback/D1', getConfigure()).then((r) => r.data);

const getConfigure = () => {
    const accessToken = 'rE_M6Kmix3p7mqOLaXAe';
    return { headers: { Authorization: `Bearer ${accessToken}` } };
};
