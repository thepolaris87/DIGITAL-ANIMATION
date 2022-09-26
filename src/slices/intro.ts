import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export const effects = [
    { value: 'dealy', display: 'DEALY' },
    { value: 'fadeIn', display: 'FADE IN' },
    { value: 'fadeOut', display: 'FADE OUT' },
    { value: 'blink', display: 'BLINK' },
    { value: 'zoomIn', display: 'ZOOM IN' },
    { value: 'zoomOut', display: 'ZOOM OUT' }
];
export type POSITION = { top?: number; left?: number };
export type TRANSFORM = { angle?: number; scaleX?: number; scaleY?: number; flipX?: boolean; flipY?: boolean };
export type ATTR = { width?: number; height?: number; opacity?: number; rx?: number; ry?: number };
export type EFFECT = 'dealy' | 'fadeIn' | 'fadeOut' | 'blink' | 'zoomIn' | 'zoomOut';
export type TTSBASICFORM = { src: string; extension: string; soundDivisionCode: string };
export type TEXTBASICFROM = { src: string; textDivisionCode: string };
export type SCRIPTBASICFORM = {
    id: string;
    text?: TEXTBASICFROM;
    textbox?: {
        ko: { top: number; left: number; width: number; angle: number };
        en: { top: number; left: number; width: number; angle: number };
    };
    textStyles?: { ko: any; en: any };
    tts?: { ko: TTSBASICFORM; en: TTSBASICFORM };
    bubble?: {
        type: string;
        src?: string;
        ko: { position?: POSITION; transform?: TRANSFORM; attr?: ATTR };
        en: { position?: POSITION; transform?: TRANSFORM; attr?: ATTR };
    };
    speaker?: {
        src: string;
        ko: { name: string; position?: POSITION; transform?: TRANSFORM; attr?: ATTR };
        en: { name: string; position?: POSITION; transform?: TRANSFORM; attr?: ATTR };
    };
    speakerStyles?: { ko: any; en: any };
};
export type IMAGEBASICFORM = {
    id: string;
    src: string;
    extension: string;
    width?: string;
    height?: string;
    imageDivisionCode?: string;
    frame?: string;
    effects?: {
        type: EFFECT;
        duration: number;
        interval?: number;
        opacity?: number;
    }[];
    position?: POSITION;
    transform?: TRANSFORM;
    attr?: ATTR;
};

export type DATA = {
    dialogId: string;
    dialogType?: 'communication' | 'popup';
    background?: IMAGEBASICFORM;
    scripts?: SCRIPTBASICFORM[];
    characters?: IMAGEBASICFORM[];
    images?: IMAGEBASICFORM[];
    bgm?: { src: string; extension: string; soundDivisionCode: string };
    master?: { background: IMAGEBASICFORM; images: IMAGEBASICFORM[] };
};

type STATE = {
    currentDialog: string;
    currentTarget: { type: string; [key: string]: any };
    data: DATA[];
    navi: 'background' | 'script';
    render: { [sceneId: string]: fabric.Canvas };
    open: { formatting: boolean; animating: boolean };
    locale: 'ko' | 'en';
    viewType: 'single' | 'multi';
    clip?: { type: string; data: IMAGEBASICFORM } | undefined;
};

const name = 'intro';

const initialState: STATE = {
    currentDialog: '',
    currentTarget: { type: '' },
    data: [],
    navi: 'script',
    render: {},
    open: { formatting: false, animating: false },
    locale: 'ko',
    viewType: 'single'
};

const slice = createSlice({
    name,
    initialState,
    reducers: {
        init: () => initialState,
        setData: (state, action: PayloadAction<DATA[] | undefined>) => {
            const { payload } = action;
            if (payload) state.data = payload;
            else state.data = [];
        },
        setNavi: (state, action: PayloadAction<'background' | 'script'>) => {
            const { payload } = action;
            state.navi = payload;
            return state;
        },
        addDialog: (state, action: PayloadAction<string>) => {
            const { payload } = action;
            const data: DATA = { dialogId: payload, dialogType: 'communication', scripts: [] };
            state.data.push(data);
            return state;
        },
        deleteDialog: (state, action: PayloadAction<string>) => {
            const { payload } = action;
            state.data = state.data.filter(({ dialogId }) => dialogId !== payload);
            delete state.render[payload];
            state.currentDialog = '';
            return state;
        },
        setCurrentDialog: (state, action: PayloadAction<string>) => {
            const { payload } = action;
            state.currentDialog = payload;
            Object.entries(state.render).forEach(([key, canvas]) => {
                if (key !== payload) {
                    canvas.discardActiveObject();
                    canvas.renderAll();
                }
            });

            return state;
        },
        addRender: (state, action: PayloadAction<{ [id: string]: fabric.Canvas }>) => {
            const { payload } = action;
            state.render = Object.assign(state.render, payload);
            return state;
        },
        setBackground: (state, action: PayloadAction<IMAGEBASICFORM>) => {
            const { payload } = action;
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) el.background = payload;
                return el;
            });
            return state;
        },
        setImages: (state, action: PayloadAction<IMAGEBASICFORM[]>) => {
            const { payload } = action;
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) el.images = payload;
                return el;
            });
            return state;
        },
        setCharacters: (state, action: PayloadAction<IMAGEBASICFORM[]>) => {
            const { payload } = action;
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) el.characters = payload;
                return el;
            });
            return state;
        },
        setEffects: (state, action: PayloadAction<{ type: EFFECT; duration: number }[]>) => {
            const { payload } = action;
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) {
                    const images = el.images?.find((el) => el.id === state.currentTarget.object.data.id);
                    const characters = el.characters?.find((el) => el.id === state.currentTarget.object.data.id);
                    if (images) images.effects = payload;
                    if (characters) characters.effects = payload;
                }
                return el;
            });
            return state;
        },
        setBGM: (state, action: PayloadAction<{ src: string; extension: string; soundDivisionCode: string }>) => {
            const { payload } = action;
            state.data.map((el) => {
                if (el.dialogId === state.currentDialog) el.bgm = payload;
                return el;
            });
            return state;
        },
        setCurrentTarget: (state, action: PayloadAction<{ type: string; [key: string]: any }>) => {
            const { payload } = action;
            state.currentTarget = payload;
            return state;
        },
        setDialogType: (state, action: PayloadAction<'communication' | 'popup'>) => {
            const { payload } = action;
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) el.dialogType = payload;
                return el;
            });
            return state;
        },
        setOpen: (state, action: PayloadAction<{ formatting: boolean; animating: boolean }>) => {
            const { payload } = action;
            state.open = payload;
            return state;
        },
        setLocale: (state, action: PayloadAction<'ko' | 'en'>) => {
            const { payload } = action;
            state.locale = payload;
            return state;
        },
        setClip: (state, action: PayloadAction<{ type: string; data: IMAGEBASICFORM }>) => {
            const { payload } = action;
            state.clip = payload;
            return state;
        },
        addScript: (state, action: PayloadAction<SCRIPTBASICFORM>) => {
            const { payload } = action;
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) return { ...el, scripts: [...(el.scripts || []), payload] };
                return el;
            });
            return state;
        },
        removeScripts: (state) => {
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) el.scripts = [];
                return el;
            });
            return state;
        },
        setScripts: (state, action: PayloadAction<{ id: string; key: keyof SCRIPTBASICFORM; data: SCRIPTBASICFORM[keyof SCRIPTBASICFORM] }>) => {
            const { payload } = action;
            state.data = state.data.map((el) => {
                if (el.dialogId === state.currentDialog) return { ...el, scripts: el.scripts?.map((el) => (el.id === payload.id ? { ...el, [payload.key]: payload.data } : el)) };
                return el;
            });
            return state;
        },
        setViewType: (state, action: PayloadAction<'single' | 'multi'>) => {
            const { payload } = action;
            state.viewType = payload;
            return state;
        }
    }
});

export const {
    init,
    setData,
    setNavi,
    addDialog,
    deleteDialog,
    setCurrentDialog,
    setImages,
    setCharacters,
    setBGM,
    addRender,
    setCurrentTarget,
    setDialogType,
    setOpen,
    setBackground,
    setEffects,
    setLocale,
    setClip,
    addScript,
    removeScripts,
    setScripts,
    setViewType
} = slice.actions;

export const selectIntro = (state: RootState) => state.intro;

export default slice.reducer;
