export const wait = (delay: number = 0) => new Promise((resolve) => setTimeout(resolve, delay));

export const getPointInMatrixForm = ({ startPoint = { x: 0, y: 0 }, rows = 1, columns = 1, gap = { x: 0, y: 0 }, center = true }) => {
    const point: { x: number; y: number }[][] = [];
    const offset = { x: center ? -gap.x * 0.5 * (columns - 1) : 0, y: center ? -gap.y * 0.5 * (rows - 1) : 0 };
    for (let i = 0; i < rows; i++) {
        point[i] = [];
        for (let j = 0; j < columns; j++) {
            const [x, y] = [startPoint.x + gap.x * j + offset.x, startPoint.y + offset.y + gap.y * (i - 1)];
            point[i][j] = { x, y };
        }
    }
    return point;
};

export const flattenArray = (arr: any[][]) => {
    let newArray: any[] = [];
    arr.forEach((el) => {
        newArray = newArray.concat(el);
    });

    return newArray;
};

type parsing = (el: any) => any;
export const parsingData: parsing = (el: any) => {
    if (JSON.stringify(el) === '{}') {
        return '';
    }
    if (el.inputs !== undefined && el.next === undefined) {
        const inputsElement = el.inputs.DO.block;
        if (el.type === 'coding_control_R') {
            const fieldsElement = el.fields.TIMES;
            return el.type + '(' + fieldsElement + '){' + parsingData(inputsElement) + '}';
        } else {
            return el.type + '{' + parsingData(inputsElement) + '}';
        }
    }
    if (el.inputs !== undefined && el.next !== undefined) {
        const inputsElement = el.inputs.DO.block;
        const nextElement = el.next.block;
        if (el.type === 'coding_control_R') {
            const fieldsElement = el.fields.TIMES;
            return el.type + '(' + fieldsElement + '){' + parsingData(inputsElement) + '}_' + parsingData(nextElement);
        } else {
            return el.type + '{' + parsingData(inputsElement) + '}_' + parsingData(nextElement);
        }
    }
    if (el.fields === undefined && el.next !== undefined) {
        const nextElement = el.next.block;
        return el.type + '_' + parsingData(nextElement);
    }
    if (el.fields !== undefined && el.next === undefined && Object.keys(el.fields)[0] === 'number') {
        const fieldsElement = el.fields.number;
        return el.type + '(' + fieldsElement + ')';
    }
    if (el.fields !== undefined && el.next !== undefined && Object.keys(el.fields)[0] === 'number') {
        const nextElement = el.next.block;
        const fieldsElement = el.fields.number;
        return el.type + '(' + fieldsElement + ')_' + parsingData(nextElement);
        // if (el.fields !== undefined && Object.keys(el.fields)[0] === 'number') {
        //     const fieldsElement = el.fields.number;
        //     if (el.next !== undefined) {
        //         const nextElement = el.next.block;
        //         return el.type + '(' + fieldsElement + ')_' + parsingData(nextElement);
        //     } else {
        //         return el.type + '(' + fieldsElement + ')';
        //     }
    } else {
        return el.type;
    }
};

// blocks = [{category: 'ACTION', type: 'coding_motios_S'}..]

export const makeConfig0 = ({ category, blocks }: { category?: boolean; blocks: { category: string; id: string }[] }) => {
    const kind = Boolean(category) ? 'categoryToolbox' : 'flyoutToolbox';

    if (blocks !== [] && kind === 'categoryToolbox') {
        const categoryName = Array.from(new Set(blocks.map((el) => el.category)));
        const contents = categoryName.map((el) => {
            const list = blocks.filter((el2) => el2.category === el);
            const kind = 'category';
            const name = el;
            const categorystyle = `${el}_category`;
            const contents_ = list.map((el) => ({
                kind: 'block',
                type: el.id
            }));
            const empty = {
                kind: 'label',
                text: ''
            };
            const sep = {
                kind: 'sep',
                gap: '50'
            };
            const contents: { kind: string; gap?: string; type?: string; text?: string }[] = [empty];
            for (let i = 0; i < contents_.length; i += 1) {
                contents.push(sep);
                contents.push(contents_[i]);
            }

            return { kind, name, categorystyle, contents };
        });
        return { kind, contents };
    }
    if (blocks !== [] && kind === 'flyoutToolbox') {
        const contents_ = blocks.map(({ id }) => ({ kind: 'block', type: id }));
        const empty = {
            kind: 'label',
            text: ''
        };
        const sep = {
            kind: 'sep',
            gap: '50'
        };
        const contents: { kind: string; gap?: string; type?: string; text?: string }[] = [empty];
        for (let i = 0; i < contents_.length; i += 1) {
            contents.push(sep);
            contents.push(contents_[i]);
        }

        return { kind, contents };
        // const _constents = [{ kind: 'category', name: 'toolbox', categorystyle: 'toolbox_category', contents }];
        // const _kind = 'categoryToolbox';
        // return { kind: _kind, contents: _constents };
    }
};

// export const makeConfig = ({ category, blocks }: { category?: boolean; blocks: { category: string; id: string }[] }) => {


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

export const parseText = (text: string) => {
    if (!text) return '';
    const replace = [
        { search: /\$c001\{(.*?)\}/g, replace: '<span style="color:red;">$1</span>' },
        { search: /\$cb001\{(.*?)\}/g, replace: '<span style="color:red;font-weight:800;">$1</span>' },
        { search: /\$c002\{(.*?)\}/g, replace: '<span style="color:blue;">$1</span>' },
        { search: /\$cb002\{(.*?)\}/g, replace: '<span style="color:blue;font-weight:800;">$1</span>' },        
    ];
    const result = replace.reduce((p, c) => p.replace(c.search, c.replace), text);
    return result;
};
