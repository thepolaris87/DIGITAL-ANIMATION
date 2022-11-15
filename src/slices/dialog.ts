import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export const effects = [
    { value: 'fadeIn', display: 'FADE IN' },
    { value: 'fadeOut', display: 'FADE OUT' },
    { value: 'blink', display: 'BLINK' },
    { value: 'move', display: 'MOVE' },
    { value: 'hidden', display: 'HIDDEN' },
    { value: 'visible', display: 'VISIBLE' },
    { value: 'scale', display: 'SCALE' },
    { value: 'sound', display: 'SOUND' },
    { value: 'brightness', display: 'BRIGHT' },
    { value: 'noise', display: 'NOISE' },
    { value: 'contrast', display: 'CONTRAST' },
    { value: 'saturation', display: 'SATURATION' },
    { value: 'rotate', display: 'ROTATE' }
];

export const totalFilters = ['brightness', 'noise', 'contrast', 'saturation'];
export const transitionEffects = [
    { value: 'disappear', display: 'DISAPPEAR' },
    { value: 'fadeOut', display: 'FADE OUT' },
    { value: 'flyOutLeft', display: 'FLY OUT TO LEFT' },
    { value: 'flyOutRight', display: 'FLY OUT TO RIGHT' },
    { value: 'flyOutTop', display: 'FLY OUT TO TOP' },
    { value: 'flyOutBottom', display: 'FLY OUT TO BOTTOM' }
];
export type DATADIALOG = {
    id: string;
    scene: {
        effect: { type: string; duration: number };
        cutAway: 'click' | 'auto';
        bgm?: { src: string; name: string;  };
    };
    canvas?: { objects: any[]; backgroundImage: any };
    master?: boolean;
};

export type DATAMASTER = {
    id: 'master';
    canvas?: any;
};

export type IMAGEBASICFORM = {
    id: string;
    type: string;
    src: string;
    extension: string;
    imageDivisionCode: string;
    frame: string;
    width: string;
    height: string;
};

export type EFFECTBASICFORM = {
    type: string;
    timeline: number[];
    option?: {
        interval?: number;
        top?: number;
        left?: number;
        scaleX?: number;
        scaleY?: number;
        src?: string;
        extension?: string;
        angle?: number;
        from?: number;
        to?: number;
    };
};

export type STACK = { id: string; data: any[]; index: number };

export type STATE = {
    data: { dialog: DATADIALOG[]; size: { width: number; height: number }; master?: DATAMASTER };
    render?: { [id: string]: fabric.Canvas };
    currentDialog: string;
    currentTarget: { type: string; object?: any; [key: string]: any };
    navi: 'dialogs' | 'objects' | 'master' | 'scene';
    locale: 'ko' | 'en';
    open: { format: boolean; animate: boolean; textAnimate: boolean; masterFrame: boolean };
    viewType: 'single' | 'multi';
    clip?: any;
    effectClip?: EFFECTBASICFORM | EFFECTBASICFORM[];
    snackbarMessage?: string;
    frameType?: 'S' | 'M';
    stacks: STACK[];
};

const name = 'dialog';
const initialState: STATE = {
    data: { dialog: [], size: { width: 1024, height: 768 } },
    currentDialog: '',
    currentTarget: { type: '' },
    navi: 'scene',
    locale: 'ko',
    open: { format: false, animate: false, textAnimate: false, masterFrame: false },
    viewType: 'multi',
    stacks: []
};
const slice = createSlice({
    name,
    initialState,
    reducers: {
        init: () => initialState,
        setData: (state, action: PayloadAction<STATE['data']>) => {
            state.data = action.payload;
            return state;
        },
        addRender: (state, action: PayloadAction<STATE['render']>) => {
            const { payload } = action;
            state.render = Object.assign(state.render || {}, payload);
            return state;
        },
        addDialog: (state, action: PayloadAction<DATADIALOG>) => {
            const { payload } = action;
            state.data.dialog = [...state.data.dialog, payload];

            return state;
        },
        addMaster: (state, action: PayloadAction<DATAMASTER>) => {
            const { payload } = action;
            state.data.master = payload;
            return state;
        },
        deleteDialog: (state, action: PayloadAction<{ id: string }>) => {
            const { payload } = action;
            if (state.data) {
                state.data.dialog = state.data?.dialog?.filter(({ id }) => id !== payload.id);
                delete state?.render?.[payload.id];
                state.currentDialog = '';
            }
            return state;
        },
        setCurrentDialog: (state, action: PayloadAction<STATE['currentDialog']>) => {
            const { payload } = action;
            state.currentDialog = payload;
            Object.entries(state.render || {}).forEach(([key, canvas]) => {
                if (key !== payload) {
                    canvas.discardActiveObject();
                    canvas.renderAll();
                }
            });
            return state;
        },
        setCurrentTarget: (state, action: PayloadAction<STATE['currentTarget']>) => {
            const { payload } = action;
            state.currentTarget = payload;
            return state;
        },
        setNavi: (state, action: PayloadAction<STATE['navi']>) => {
            const { payload } = action;
            if (payload === 'master') {
                state.currentDialog = 'master';
                state.currentTarget = { type: '' };
            }
            state.navi = payload;
            return state;
        },
        setBGM: (state, action: PayloadAction<DATADIALOG['scene']['bgm']>) => {
            const { payload } = action;
            state.data?.dialog?.map((el) => {
                if (el.id === state.currentDialog) {
                    if (!payload?.src && 'bgm' in el.scene) delete el.scene.bgm;
                    else el.scene.bgm = payload;
                }
                return el;
            });
            return state;
        },
        setOpen: (state, action: PayloadAction<STATE['open']>) => {
            const { payload } = action;
            state.open = payload;
            return state;
        },
        setLocale: (state, action: PayloadAction<STATE['locale']>) => {
            const { payload } = action;
            state.locale = payload;
            return state;
        },
        setViewType: (state, action: PayloadAction<STATE['viewType']>) => {
            const { payload } = action;
            state.viewType = payload;
            return state;
        },
        setClip: (state, action: PayloadAction<STATE['clip']>) => {
            const { payload } = action;
            state.clip = payload;
            return state;
        },
        setEffectClip: (state, action: PayloadAction<STATE['effectClip']>) => {
            const { payload } = action;
            state.effectClip = payload;
            return state;
        },
        setControlMaster: (state, action: PayloadAction<DATADIALOG['master']>) => {
            const { payload } = action;
            state.data.dialog.map((el) => {
                if (el.id === state.currentDialog) {
                    if (payload) {
                        el.master = payload;
                    } else {
                        delete el.master;
                    }
                }
                return el;
            });
            return state;
        },
        setSceneEffect: (state, action: PayloadAction<DATADIALOG['scene']['effect']>) => {
            const { payload } = action;
            state.data.dialog.map((el) => {
                if (el.id === state.currentDialog) {
                    if (payload) {
                        el.scene.effect = payload;
                    }
                }
                return el;
            });
            return state;
        },
        setSceneCutaway: (state, action: PayloadAction<DATADIALOG['scene']['cutAway']>) => {
            const { payload } = action;
            state.data.dialog.map((el) => {
                if (el.id === state.currentDialog) {
                    if (payload) {
                        el.scene.cutAway = payload;
                    }
                }
                return el;
            });
        },
        setSnackbarMessage: (state, action: PayloadAction<string>) => {
            const { payload } = action;
            state.snackbarMessage = payload;
            return state;
        },
        setSize: (state, action: PayloadAction<STATE['data']['size']>) => {
            const { payload } = action;
            state.data.size = payload;
            return state;
        },
        setFrameType: (state, action: PayloadAction<STATE['frameType']>) => {
            const { payload } = action;
            state.frameType = payload;
            return state;
        },
        addStack: (state, action: PayloadAction<{ id: string; data: any }>) => {
            const { payload } = action;
            const hasId = state.stacks.find((stack) => stack.id === payload.id);
            if (hasId) {
                state.stacks = state.stacks.map((stack) => {
                    if (stack.id === payload.id) {
                        stack.index = stack.data.length;
                        stack.data = [...stack.data, payload.data];
                    }
                    return stack;
                });
            } else {
                state.stacks = [...state.stacks, { id: payload.id, data: [payload.data], index: 0 }];
            }
            return state;
        },
        changeStackIndex: (state, action: PayloadAction<{ id: string; index: number }>) => {
            const { payload } = action;
            const hasId = state.stacks.find((stack) => stack.id === payload.id);
            if (!hasId) return state;
            state.stacks = state.stacks.map((stack) => {
                if (stack.id === payload.id) stack.index = payload.index;
                return stack;
            });
        }
    }
});

export const {
    init,
    setData,
    setCurrentDialog,
    setCurrentTarget,
    setNavi,
    addRender,
    addDialog,
    deleteDialog,
    setBGM,
    setOpen,
    setLocale,
    setViewType,
    setClip,
    setControlMaster,
    addMaster,
    setSceneEffect,
    setSceneCutaway,
    setSnackbarMessage,
    setEffectClip,
    setSize,
    setFrameType,
    addStack,
    changeStackIndex
} = slice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default slice.reducer;
