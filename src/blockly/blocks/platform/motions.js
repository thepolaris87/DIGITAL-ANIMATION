import Blockly from 'blockly';
import { parseValue, parseDuration, field_number } from '../../utils/util';
import { motionJS } from '../../utils/blockToJS';

export const TYPE = 'motion';
export const MOVE = 'move';
export const MOVEDURATION = 'moveDuration';

const LEFT = 'left';
const TOP = 'top';
const DURATION = 'duration';

/*
    extenstions 에서
    shape: shape_hat, shape_statement, shape_end로 구성
    blocks: 블록에 입힐 스타일 정하기 => themes에 적용된 스타일로 적용됨. ex) text_blocks, colour_blocks
*/

// MOVE LEFT
Blockly.Blocks[`${TYPE}_${MOVE}_${LEFT}`] = {
    init: function () {
        this.jsonInit({
            message0: '현재 위치에서 x: %1 이동',
            args0: [field_number(LEFT)],
            tooltip: 'x 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement', 'motion_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVE}_${LEFT}`] = function (block) {
    const left = parseValue(block.getFieldValue(LEFT));
    const data = { type: MOVE, attrs: { left } };
    const code = motionJS(data) + '\n';
    return code;
};
// MOVE TOP
Blockly.Blocks[`${TYPE}_${MOVE}_${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: '현재 위치에서 y: %1 이동',
            args0: [field_number(TOP)],
            tooltip: 'y 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement', 'motion_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVE}_${TOP}`] = function (block) {
    const top = parseValue(block.getFieldValue(TOP));
    const data = { type: MOVE, attrs: { top } };
    const code = motionJS(data) + '\n';
    return code;
};

// MOVE LEFT TOP
Blockly.Blocks[`${TYPE}_${MOVE}_${LEFT}${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: '현재 위치에서 x: %1 , y: %2 이동',
            args0: [field_number(LEFT), field_number(TOP)],
            tooltip: 'x, y 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement', 'motion_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVE}_${LEFT}${TOP}`] = function (block) {
    const left = parseValue(block.getFieldValue(LEFT));
    const top = parseValue(block.getFieldValue(TOP));
    const data = { type: MOVE, attrs: { left, top } };
    const code = motionJS(data) + '\n';
    return code;
};

// MOVEDURATION LEFT
Blockly.Blocks[`${TYPE}_${MOVEDURATION}_${LEFT}`] = {
    init: function () {
        this.jsonInit({
            message0: '현재 위치에서 %1 초 동안 x: %2 이동',
            args0: [field_number(DURATION), field_number(LEFT)],
            tooltip: 'x 만큼 몇 초 동안 이동할 수를 입력하세요.',
            extensions: ['shape_statement', 'motion_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVEDURATION}_${LEFT}`] = function (block) {
    const left = parseValue(block.getFieldValue(LEFT));
    const duration = parseDuration(block.getFieldValue(DURATION));
    const data = { type: MOVEDURATION, attrs: { left }, option: { duration } };
    const code = motionJS(data) + '\n';
    return code;
};

// MOVEDURATION TOP
Blockly.Blocks[`${TYPE}_${MOVEDURATION}_${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: '현재 위치에서 %1 초 동안 y: %2 이동',
            args0: [field_number(DURATION), field_number(TOP)],
            tooltip: 'y 만큼 몇 초 동안 이동할 수를 입력하세요.',
            extensions: ['shape_statement', 'motion_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVEDURATION}_${TOP}`] = function (block) {
    const duration = parseDuration(block.getFieldValue(DURATION));
    const top = parseValue(block.getFieldValue(TOP));
    const data = { type: MOVEDURATION, attrs: { top }, option: { duration } };
    const code = motionJS(data) + '\n';
    return code;
};

// MOVEDURATION LEFT TOP
Blockly.Blocks[`${TYPE}_${MOVEDURATION}_${LEFT}${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: '현재 위치에서 %1 초 동안 x: %2 , y: %3 이동',
            args0: [field_number(DURATION), field_number(LEFT), field_number(TOP)],
            tooltip: 'x, y 만큼 몇 초 동안 이동할 수를 입력하세요.',
            extensions: ['shape_statement', 'motion_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVEDURATION}_${LEFT}${TOP}`] = function (block) {
    const duration = parseDuration(block.getFieldValue(DURATION));
    const left = parseValue(block.getFieldValue(LEFT));
    const top = parseValue(block.getFieldValue(TOP));
    const data = { type: MOVEDURATION, attrs: { left, top }, option: { duration } };
    const code = motionJS(data) + '\n';
    return code;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Blockly.Blocks[`${TYPE}_${MOVE}_location_${LEFT}`] = {
    init: function () {
        this.jsonInit({
            message0: 'x: %1 , y: %2 에서 x: %3 이동',
            args0: [
                {
                    type: 'field_number',
                    name: 'left_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'left',
                    value: 0
                }
            ],
            tooltip: '지정 위치에서 x 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVE}_location_${LEFT}`] = function (block) {
    var number_left_location = block.getFieldValue('left_location');
    var number_top_location = block.getFieldValue('top_location');
    var number_left = block.getFieldValue('left');
    const code = { type: `${MOVE}`, attrs: { left_locatoion: number_left_location, top_location: number_top_location, left: '+=' + number_left } };
    return JSON.stringify(code) + ';';
};

Blockly.Blocks[`${TYPE}_${MOVE}_location_${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: 'x: %1 , y: %2 에서 y: %3 이동',
            args0: [
                {
                    type: 'field_number',
                    name: 'left_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top',
                    value: 0
                }
            ],
            tooltip: '지정 위치에서 y 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVE}_location_${TOP}`] = function (block) {
    var number_left_location = block.getFieldValue('left_location');
    var number_top_location = block.getFieldValue('top_location');
    var number_top = block.getFieldValue('top');
    const code = { type: `${MOVE}`, attrs: { left_locatoion: number_left_location, top_location: number_top_location, top: '+=' + number_top } };
    return JSON.stringify(code) + ';';
};

Blockly.Blocks[`${TYPE}_${MOVE}_location_${LEFT}${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: 'x: %1 , y: %2 에서 x: %3 , y: %4 이동',
            args0: [
                {
                    type: 'field_number',
                    name: 'left_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'left',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top',
                    value: 0
                }
            ],
            tooltip: '지정 위치에서 x, y 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVE}_location_${LEFT}${TOP}`] = function (block) {
    var number_left_location = block.getFieldValue('left_location');
    var number_top_location = block.getFieldValue('top_location');
    var number_left = block.getFieldValue('left');
    var number_top = block.getFieldValue('top');
    const code = {
        type: `${MOVE}`,
        attrs: { left_locatoion: number_left_location, top_location: number_top_location, left: '+=' + number_left, top: '+=' + number_top }
    };
    return JSON.stringify(code) + ';';
};

Blockly.Blocks[`${TYPE}_${MOVEDURATION}_location_${LEFT}`] = {
    init: function () {
        this.jsonInit({
            message0: 'x: %1 , y: %2 에서  %3 초 동안 x: %4 이동',
            args0: [
                {
                    type: 'field_number',
                    name: 'left_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'duration',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'left',
                    value: 0
                }
            ],
            tooltip: '지정 위치에서 몇 초 동안 x 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVEDURATION}_location_${LEFT}`] = function (block) {
    var number_left_location = block.getFieldValue('left_location');
    var number_top_location = block.getFieldValue('top_location');
    var number_duration = block.getFieldValue('duration');
    var number_left = block.getFieldValue('left');
    const code = {
        type: `${MOVEDURATION}`,
        attrs: { left_locatoion: number_left_location, top_location: number_top_location, left: '+=' + number_left },
        option: { duration: number_duration }
    };
    return JSON.stringify(code) + ';';
};

Blockly.Blocks[`${TYPE}_${MOVEDURATION}_location_${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: 'x: %1 , y: %2 에서  %3 초 동안 y: %4 이동',
            args0: [
                {
                    type: 'field_number',
                    name: 'left_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'duration',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top',
                    value: 0
                }
            ],
            tooltip: '지정 위치에서 몇 초 동안 y 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${MOVEDURATION}_location_${TOP}`] = function (block) {
    var number_left_location = block.getFieldValue('left_location');
    var number_top_location = block.getFieldValue('top_location');
    var number_duration = block.getFieldValue('duration');
    var number_top = block.getFieldValue('top');
    const code = {
        type: `${MOVEDURATION}`,
        attrs: { left_locatoion: number_left_location, top_location: number_top_location, top: '+=' + number_top },
        option: { duration: number_duration }
    };
    return JSON.stringify(code) + ';';
};

Blockly.Blocks[`${TYPE}_${MOVEDURATION}_location_${LEFT}${TOP}`] = {
    init: function () {
        this.jsonInit({
            message0: 'x: %1 , y: %2 에서  %3 초 동안 x: %4 , y: %5 이동',
            args0: [
                {
                    type: 'field_number',
                    name: 'left_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top_location',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'duration',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'left',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'top',
                    value: 0
                }
            ],
            colour: 0,
            tooltip: '지정 위치에서 몇 초 동안 x, y 만큼 이동할 수를 입력하세요.',
            extensions: ['shape_statement']
        });
    }
};

Blockly.JavaScript[`${TYPE}_${MOVEDURATION}_location_${LEFT}${TOP}`] = function (block) {
    var number_left_location = block.getFieldValue('left_location');
    var number_top_location = block.getFieldValue('top_location');
    var number_duration = block.getFieldValue('duration');
    var number_left = block.getFieldValue('left');
    var number_top = block.getFieldValue('top');
    const code = {
        type: `${MOVEDURATION}`,
        attrs: { left_locatoion: number_left_location, top_location: number_top_location, left: '+=' + number_left, top: '+=' + number_top },
        option: { duration: number_duration }
    };
    return JSON.stringify(code) + ';';
};
