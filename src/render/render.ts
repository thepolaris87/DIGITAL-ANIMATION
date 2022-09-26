import React from 'react';
import { fabric } from 'fabric';

import * as RT from './types';
import { wait } from '../utils/utils';

/* RENDER */
class Render {
    canvas: fabric.Canvas;
    objects: Array<RT.OBJECTS> = [];
    background: RT.OBJECTS = { id: '', url: '', object: new fabric.Image('') };

    _mouseEventList: Set<RT.EVENTNAME> = new Set();
    _animationObject: any;

    // subscribeList_: Function[] = [];
    // subscribe(fn: Function) {
    //     this.subscribeList_.push(fn);
    //     return () => (this.subscribeList_ = this.subscribeList_.filter((el) => el !== fn));
    // }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = new fabric.Canvas(canvas);
    }

    /* DRAW */
    addImage({ id, url, isFocus = true, option }: RT.ADDIMAGE) {
        return new Promise<{ id: RT.ID; object: RT.OBJECT }>((resolve) => {
            fabric.Image.fromURL(url, (image) => {
                if (!this.canvas || this._idCheck(id)) return;
                this.canvas.add(image);
                image.set({ scaleX: option?.scaleX, scaleY: option?.scaleY, top: option?.top, left: option?.left, angle: option?.rotate });
                this._updateObject({ type: 'add', id, url, object: image });
                isFocus && this.focusObject({ object: image });
                resolve({ id, object: image });
            });
        });
    }
    addBackground({ id, url }: RT.ADDIMAGE) {
        return new Promise<{ id: RT.ID; object: RT.OBJECT }>((resolve) => {
            fabric.Image.fromURL(url, (image) => {
                if (!this.canvas || this._idCheck(id)) return;
                const scaleX = image.width ? this.canvas.getWidth() / image.width : 1;
                const scaleY = image.height ? this.canvas.getHeight() / image.height : 1;
                image.set({ scaleX, scaleY, originX: 'left', originY: 'top' });
                this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas));
                this.background = { id, url, object: image };
                // this._updateObject({ type: 'add', id, url, object: image });
                resolve({ id, object: image });
            });
        });
    }
    addSpriteImage({
        id,
        url,
        frame,
        width: _width,
        height: _height,
        cropX: _cropX,
        cropY: _cropY,
        dx,
        scale = 1,
        totalRow = 1,
        totalColumn = frame,
        startRow = 0,
        startColumn = 0,
        speed = 1
    }: RT.ADDSPRITEIMAGE) {
        return new Promise<
            { id: RT.ID; object: RT.OBJECT; change: ({ row, column, frame }: { row?: number; column?: number; frame?: number }) => void } & ReturnType<
                typeof this._spriteAnimate
            >
        >((resolve) => {
            fabric.Image.fromURL(url, (image) => {
                if (!this.canvas || this._idCheck(id)) return;
                const { width: totalWidth, height: totalHeight } = image as { width: number; height: number };
                const width = _width || totalWidth / totalColumn;
                const height = _height || totalHeight / totalRow;
                const cropX = _cropX || width * (startColumn + 1);
                const cropY = _cropY || height * startRow;
                image.scale(scale);

                const spriteAnimate = this._spriteAnimate({ image, cropX, cropY, width, height, frame, speed, dx });
                const change = ({
                    width: _width = width,
                    height: _height = height,
                    row = startRow,
                    column = startColumn,
                    cropX,
                    cropY,
                    frame,
                    offset = { top: 0, left: 0 }
                }: {
                    width?: number;
                    height?: number;
                    row?: number;
                    column?: number;
                    cropX?: number;
                    cropY?: number;
                    frame?: number;
                    offset?: { top: number; left: number };
                }) => {
                    spriteAnimate.setCrop({ cropX: cropX || width * column, cropY: cropY || height * row + offset.top, frame });
                    this.canvas.renderAll();
                };
                this._updateObject({ type: 'add', id, url, object: image });
                resolve({ id, object: image, change, ...spriteAnimate });
            });
        });
    }

    async addSpriteImage3({ id, url, frameCount, option }: { id: string; url: string; frameCount: number; option: any }) {
        if (!this.canvas || this._idCheck(id)) return;
        const { object } = await this.addImage({ id, url, option });
        const { width } = object as { width: number };
        const cropX = width! / frameCount;

        let currentFrame = 0;
        let interval: ReturnType<typeof setInterval>;
        let isAnimating = false;
        object.set({ cropX: cropX * currentFrame, width: cropX });

        const animate = () => {
            currentFrame += 1;
            currentFrame %= frameCount;
            object.set({ cropX: cropX * currentFrame, width: cropX });
            this.canvas.renderAll();
        };
        const start = () => {
            if (isAnimating) return;
            if (!isAnimating) {
                interval = setInterval(animate, 1000 / frameCount);
                isAnimating = true;
            }
        };

        const stop = () => {
            isAnimating = false;
            clearInterval(interval);
        };

        return { id, object, start, stop };
    }

    async addSpriteImage2({ id, url, scale = 1, width, height, cropX, cropY = 0 }: any) {
        if (!this.canvas || this._idCheck(id)) return;
        const { object } = await this.addImage({ id, url, isFocus: false });
        const frameCount = cropX.length;
        let currentFrame = 0;
        object.scale(scale);
        object.set({ width: object.width!, height: object.height!, cropX: cropX[currentFrame] });

        let interval: ReturnType<typeof setInterval>;

        const animate = () => {
            currentFrame += 1;
            currentFrame %= frameCount;
            object.set({ width, height, cropX: cropX[currentFrame], cropY });

            this.canvas.renderAll();
        };

        const start = () => {
            interval = setInterval(animate, 1000 / frameCount);
        };
        const change = ({ cropX: _cropX, cropY: _cropY }: any) => {
            if (_cropX) cropX = _cropX;
            if (_cropY) cropY = _cropY;
        };

        const stop = () => {
            clearInterval(interval);
        };

        return { start, stop, change };
    }

    uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        const result = this._upload(e);
        if (result) {
            const { id, url } = result;
            return this.addImage({ id, url });
        }
    }
    uploadBackground(e: React.ChangeEvent<HTMLInputElement>) {
        const result = this._upload(e);
        if (result) {
            const { id, url } = result;
            return this.addBackground({ id, url });
        }
    }
    removeImage({ id }: { id: RT.ID }) {
        if (!this.canvas) return;
        const targetObject = this.objects.find((el) => el.id === id);
        if (targetObject) {
            this.canvas.remove(targetObject.object);
            this._updateObject({ type: 'del', id: targetObject.id });
            this.unfocusObject();
        }
    }
    removeBackground() {
        const image = new fabric.Image('');
        this.canvas.setBackgroundImage(image, () => this.canvas.renderAll());
        this.background = { id: '', url: '', object: image };
    }
    removeAll() {
        this.objects.forEach(({ id }) => {
            this.removeImage({ id });
            this.canvas.renderAll();
        });
        // this.canvas.clear();
    }

    /* EVENT */
    addMouseEventListner({ type, listnerFn }: RT.MOUSEEVENT) {
        if (!this.canvas) return;
        if (!this._mouseEventList.has(type)) {
            this.canvas.on(type, (e) => listnerFn(e));
            this._mouseEventList.add(type);
        }
    }

    /* CONTROL */
    unfocusObject() {
        if (!this.canvas) return;
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
    }
    focusObject({ object }: { object: RT.OBJECT }) {
        if (!this.canvas) return;
        this.canvas.setActiveObject(object);
        this.canvas.renderAll();
    }
    moveObjectWithAnim({ object, attrs, option }: RT.MOVEOBJECT & RT.MOVEANIMATTR) {
        if (!this.canvas) return;
        const { onComplete: _onComplete } = option;
        const onComplete = () => {
            if (_onComplete) _onComplete();
            this.initAnim();
        };

        this._animationObject = object.animate(attrs, {
            easing: (currentTime: number, startValue: number, byValue: number, duration: number) => startValue + (currentTime / duration) * byValue,
            ...option,
            onChange: this.canvas.renderAll.bind(this.canvas),
            onComplete
        });
    }
    moveObject({ object, attrs }: RT.MOVEOBJECT & RT.MOVEATTR) {
        if (!this.canvas) return;
        object.set(attrs);
        this.canvas.renderAll();
    }
    effect({ object, effects }: RT.EFFECT) {
        if (!this.canvas) return;
        const originAttr = { scaleX: object.scaleX || 1, scaleY: object.scaleY || 1, angle: object.angle || 0 };
        const effectFn = effects.map((el) => {
            const { duration, left, opacity, rotate: angle, scaleX, scaleY, top } = el;
            const absLeft = Math.abs(Number(left));
            const absTop = Math.abs(Number(top));

            const attrs = {} as { [key: string]: number | string };
            const backAttrs = {} as { [key: string]: number | string };

            object.originX = 'center';
            object.originY = 'center';

            if (absLeft !== 0) {
                attrs.left = left < 0 ? `-=${absLeft}` : `+=${absLeft}`;
                backAttrs.left = left > 0 ? `-=${absLeft}` : `+=${absLeft}`;
            }
            if (absTop !== 0) {
                attrs.top = top < 0 ? `-=${absTop}` : `+=${absTop}`;
                backAttrs.top = top > 0 ? `-=${absTop}` : `+=${absTop}`;
            }
            if (opacity !== 1) {
                attrs.opacity = opacity;
                backAttrs.opacity = 1;
            }
            if (angle !== 0) {
                attrs.angle = angle;
                backAttrs.angle = originAttr.angle;
            }
            if (scaleX !== 1) {
                attrs.scaleX = scaleX;
                backAttrs.scaleX = originAttr.scaleX;
            }

            if (scaleY !== 1) {
                attrs.scaleY = scaleY;
                backAttrs.scaleY = originAttr.scaleY;
            }

            let interval: ReturnType<typeof setInterval>;
            const animate = async () => {
                object.animate(attrs, { duration: Number(duration) * 1000, onChange: this.canvas.renderAll.bind(this.canvas), easing: undefined });
                await wait(Number(duration) * 1000 + 100);
                object.animate(backAttrs, { duration: Number(duration) * 1000, onChange: this.canvas.renderAll.bind(this.canvas), easing: undefined });
            };

            const start = () => {
                animate();
                interval = setInterval(animate, Number(duration) * 2000 + 200);
            };

            const stop = () => {
                clearInterval(interval);
            };

            const once = async () => {
                start();
                await wait(Number(duration) * 2000 + 200);
                stop();
            };

            return { start, stop, once };
        });

        return effectFn;
    }
    cancelAnim() {
        if (!this.canvas || !this._animationObject) return;

        this._animationObject.foreach((el: any) => el().cancel());
        this.initAnim();
    }
    initAnim() {
        this._animationObject = null;
    }

    /* CHANGE */
    _updateObject({ type, id, url, object }: RT.UPDATEOBJECT) {
        if (type === 'add' && id && url && object) this.objects = this.objects.concat({ id, url, object });
        if (type === 'del') this.objects = this.objects.filter((el) => el.id !== id);
        if (type === 'update' && object)
            this.objects = this.objects.map((el) => {
                const target = this.objects.find((el) => el.object.cacheKey === object.cacheKey);
                if (target) el.object = object;
                return el;
            });
        // this.subscribeList_.forEach((el) => el());
    }

    /* UTIL */
    _idCheck(id: RT.ID) {
        const result = this.objects.some((el) => el.id === id);
        return result;
    }
    _upload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        const imageFileRegExp = /\.(svg|png|jpeg|jpg)$/g;
        const fileTypeRegExp = /image\//g;
        if (file) {
            const typeCheck = file.type.match(fileTypeRegExp);
            if (typeCheck) {
                const id = file.name.replace(imageFileRegExp, '');
                if (this._idCheck(id)) return;
                const url = URL.createObjectURL(file);
                return { id, url };
            }
            return false;
        }
        return false;
    }
    _spriteAnimate({ image, width, height, cropX = width, cropY = 0, frame, speed = 1, dx = 1 }: RT.SPRITEANIMATE) {
        let interval: ReturnType<typeof setInterval>;
        let currentFrame = 0;
        let c = 0;

        const animate = () => {
            image.set({ cropX: (cropX + width) * currentFrame, cropY, width, height, selectable: false });
            c += 1;
            if (c % dx === 0) {
                c = 0;
                currentFrame += 1;
                currentFrame %= frame;
            }
            this.canvas.renderAll();
        };

        const start = (duration: number = 1000) => {
            animate();
            const ms = duration / (frame * speed);
            interval = setInterval(animate, ms);
        };

        const stop = (value?: any) => {
            clearInterval(interval);
            // init();
        };

        const setCrop = ({ cropX: _cropX, cropY: _cropY, frame: _frame }: { cropX?: number; cropY?: number; frame?: number }) => {
            stop();
            if (_cropX !== undefined) cropX = _cropX;
            if (_cropY !== undefined) cropY = _cropY;
            if (_frame !== undefined) frame = _frame;
            init();
        };
        const init = () => {
            currentFrame = 0;
            image.set({ cropX, cropY, width, height, selectable: false });
            this.canvas.renderAll();
        };

        this.canvas.add(image);
        animate();

        return { start, stop, init, setCrop };
    }
}

export default Render;
