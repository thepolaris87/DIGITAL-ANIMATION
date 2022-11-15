import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

const name = 'learning';

export type DATA = {
    id: string;
    scene: {
        effect: { type: string; duration: number };
        cutAway: 'click' | 'auto';
        bgm?: { src: string; name: string };
    };
    canvas?: { objects: any[]; backgroundImage: any };
    master?: boolean;
};

export type DATAMASTER = {
    id: 'master';
    canvas?: any;
};

type STATE = {
    data?: { master?: DATAMASTER; dialog: DATA[]; size?: { width: number; height: number } };
    render?: { [id: string]: fabric.Canvas };
    complete?: boolean;
};

const initialState: STATE = {};

const slice = createSlice({
    name,
    initialState,
    reducers: {
        init: () => initialState,
        setData: (state, action: PayloadAction<STATE['data']>) => {
            const { payload } = action;
            state.data = payload;
            return state;
        },
        addRender: (state, action: PayloadAction<STATE['render']>) => {
            const { payload } = action;
            state.render = Object.assign(state.render || {}, payload);
            return state;
        },
        setComplete: (state, action: PayloadAction<STATE['complete']>) => {
            const { payload } = action;
            state.complete = payload;
            return state;
        }
    }
});

export const { init, setData, addRender, setComplete } = slice.actions;
export const selectLearning = (state: RootState) => state.learning;

export default slice.reducer;
