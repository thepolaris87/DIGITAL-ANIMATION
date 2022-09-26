// RENDER BASIC
export type ID = string;
export type OBJECT = fabric.Image;
export type OBJECTS = { id: string; url: string; object: OBJECT };

// DRAW
export type ADDIMAGE = {
    id: string;
    url: string;
    isFocus?: boolean;
    option?: { width?: number; height?: number; top?: number; left?: number; rotate?: number; scaleX?: number; scaleY?: number };
};
export type ADDSPRITEIMAGE = {
    id: string;
    url: string;
    frame: number;
    totalRow?: number;
    totalColumn?: number;
    width?: number;
    height?: number;
    cropX?: number;
    cropY?: number;
    dx?: number;
    scale?: number;
    startRow?: number;
    startColumn?: number;
    speed?: number;
};
export type UPDATEOBJECT = { type: 'add' | 'del' | 'update'; id?: ID; url?: string; object?: OBJECT };
export type SPRITEANIMATE = { image: fabric.Image; width: number; height: number; frame: number; cropX?: number; cropY?: number; speed?: number; dx?: number };

// CONTROL
export type MOVEOBJECT = { object: OBJECT };
export type MOVEOPTION = { duration: number; onComplete?: () => void; easing?: (curretTime: number, startValue: number, byValue: number, duration: number) => number };
export type MOVEPROPERTY = 'left' | 'top';
export type MOVEATTR = { attrs: { [key in MOVEPROPERTY]?: number } };
export type MOVEANIMATTR = { attrs: { [key in MOVEPROPERTY]?: number | string }; option: MOVEOPTION };
export type EFFECTATTRS = { [key: string]: string | number };
export type EFFECT = { object: fabric.Image; effects: EFFECTATTRS[] };

// EVENT
export type EVENTNAME = 'mouse:down' | 'mouse:up' | 'mouse:move' | 'mouse:up:before' | 'mouse:down:before' | 'mouse:move:before' | 'mouse:dblclick' | 'mouse:over' | 'mouse:out';
export type MOUSEEVENT = {
    type: EVENTNAME;
    listnerFn: (e: fabric.IEvent<MouseEvent>) => void;
};
