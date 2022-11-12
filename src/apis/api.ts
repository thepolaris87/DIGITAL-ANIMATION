import axios from 'axios';

// frame data 조회
export const getFrameData = async ({ frameId }: { frameId: string | undefined }): Promise<any> => {
    const result = await axios.get(`https://sol-api.esls.io/editor/frame/A1/${frameId}`, getConfigure());
    return result.data;
};

// frame data 수정
export const patchFrameData = async ({ frameId, body }: { frameId: string | undefined; body: any }): Promise<any> => {
    const result = await axios.patch(`https://sol-api.esls.io/editor/frame/A1/${frameId}`, body, getConfigure());
    return result.data;
};

// image data 조회
export type GETIMAGE = { extension: 'png' | 'svg'; height: string; imageDivisionCode: string; imageId: string; reference: string; size: string; tags: string; width: string };
export const getImage = async (): Promise<GETIMAGE[]> => {
    const result = await axios.get(`https://sol-api.esls.io/editor/image/A1`, getConfigure());
    return result.data;
};

// text data 조회
export type GETTEXT = { reference: string; textDivisionCode: string; textEn: string; textId: string; textKo: string };
export const getText = async ({ textId = '' }: { textId?: string }): Promise<GETTEXT[]> => {
    const result = await axios.get(`https://sol-api.esls.io/editor/text/A1/${textId}`, getConfigure());
    return result.data;
};

// sound data 조회
export type GETSOUND = { soundId: string; soundDivisionCode: string; duration: string; extension: 'mp3'; size: string; reference: string; tags: string };
export const getSound = async (): Promise<GETSOUND[]> => {
    const result = await axios.get('https://sol-api.esls.io/editor/sound/A1', getConfigure());
    return result.data;
};

// master frame data 조회
export type GETMASTERFRAME = {
    frameId: string;
    frameStatusCode: '01' | '02';
    frameTypeCode: string;
    learningLogicTypeCode: string;
    standardLearningTime: number;
    frameConfig: string;
    textIds: string;
    imageIds: string;
    soundIds: string;
    reference: string;
    description: string;
};
export const getMasterFrame = ({ subjectCode = 'A1' }: { subjectCode: string }): Promise<GETMASTERFRAME[]> =>
    axios.get(`https://sol-api.esls.io/editor/frame/master/${subjectCode}`, getConfigure()).then((r) => r.data);

const getConfigure = () => {
    const accessToken = 'rE_M6Kmix3p7mqOLaXAe';
    return { headers: { Authorization: `Bearer ${accessToken}` } };
};
