export const motionJS = (data) => {
    const {
        attrs: { left, top },
        option
    } = data;
    let start = 'await move(';
    let middle = {};
    let end = ');';
    if (left) middle.left = left;
    if (top) middle.top = top;
    if (option) middle = { ...middle, ...option };

    return start + JSON.stringify(middle) + end;
};

export const objectJS = (data) => {
    const { value } = data;
    let start = `selectObject(`;
    let middle = value;
    let end = `);`;
    return start + JSON.stringify(middle) + end;
};

export const soundJS = (data) => {
    const { value } = data;
    let start = `await playAudio(`;
    let middle = value;
    let end = `);`;
    return start + JSON.stringify(middle) + end;
};
