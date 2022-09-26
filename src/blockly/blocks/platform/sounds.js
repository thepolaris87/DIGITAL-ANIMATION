import Blockly from 'blockly';
import { parseValue, field_number, input_value } from '../../utils/util';
import { soundJS } from '../../utils/blockToJS';

let option = [['none', 'none']];

const TYPE = 'sound';
const PLAY = 'play';
const NEXT = 'next';

// 소리 재생
Blockly.Blocks[`${TYPE}_${PLAY}`] = {
    init: function () {
        this.jsonInit({
            message0: '소리 재생',
            extensions: ['shape_statement', 'event_blocks']
        });
        this.appendDummyInput('dummy').appendField(new Blockly.FieldDropdown(() => option), 'sounds');
    },
    setOptions(_option) {
        option = _option;
    }
};
Blockly.JavaScript[`${TYPE}_${PLAY}`] = function (block) {
    const id = block.getFieldValue('sounds');
    const data = { type: TYPE, value: id };
    const code = soundJS(data) + '\n';
    return code;
};

// 소리 ?초 동안 재생
Blockly.Blocks[`${TYPE}_${PLAY}_time1`] = {
    init: function () {
        this.jsonInit({
            message0: '소리 %1  %2 초 재생',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VALUE',
                    options: [
                        ['A', '../../assets/sounds/A.mp3'],
                        ['B', '../../assets/sounds/B.mp3'],
                        ['C', '../../assets/sounds/C.mp3'],
                        ['D', '../../assets/sounds/D.mp3']
                    ]
                },
                input_value('time1', 'Number')
            ],
            extensions: ['shape_statement', 'event_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${PLAY}_time1`] = function (block) {
    const time1 = parseValue(Blockly.JavaScript.valueToCode(block, 'time1', Blockly.JavaScript.ORDER_ATOMIC) || '');
    const data = { type: TYPE, attrs: { time1 } };
    // const code = data + '\n';
    return JSON.stringify(data) + ';\n';
};

// 소리 ?초에서 ?초까지 재생
Blockly.Blocks[`${TYPE}_${PLAY}_time2`] = {
    init: function () {
        this.jsonInit({
            message0: '소리 %1  %2 초 ~ %3 초까지 재생',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VALUE',
                    options: [
                        ['A', '../../assets/sounds/A.mp3'],
                        ['B', '../../assets/sounds/B.mp3'],
                        ['C', '../../assets/sounds/C.mp3'],
                        ['D', '../../assets/sounds/D.mp3']
                    ]
                },
                input_value('time1', 'Number'),
                input_value('time2', 'Number')
            ],
            extensions: ['shape_statement', 'event_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${PLAY}_time2`] = function (block) {
    const time1 = parseValue(Blockly.JavaScript.valueToCode(block, 'time1', Blockly.JavaScript.ORDER_ATOMIC) || '');
    const time2 = parseValue(Blockly.JavaScript.valueToCode(block, 'time2', Blockly.JavaScript.ORDER_ATOMIC) || '');
    const data = { type: TYPE, attrs: { time1, time2 } };
    // const code = data + '\n';
    return JSON.stringify(data) + ';\n';
};

// 소리 재생 후 진행
Blockly.Blocks[`${TYPE}_${PLAY}_${NEXT}`] = {
    init: function () {
        this.jsonInit({
            message0: '소리 %1 재생 후 진행',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VALUE',
                    options: [
                        ['A', '../../assets/sounds/A.mp3'],
                        ['B', '../../assets/sounds/B.mp3'],
                        ['C', '../../assets/sounds/C.mp3'],
                        ['D', '../../assets/sounds/D.mp3']
                    ]
                }
            ],
            extensions: ['shape_statement', 'event_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${PLAY}_${NEXT}`] = function () {
    const data = { type: TYPE, attrs: { NEXT } };
    // const code = data + '\n';
    return JSON.stringify(data) + ';\n';
};

// 소리 ?초 동안 재생 후 진행
Blockly.Blocks[`${TYPE}_${PLAY}_time1_${NEXT}`] = {
    init: function () {
        this.jsonInit({
            message0: '소리 %1  %2 초 재생 후 진행',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VALUE',
                    options: [
                        ['A', '../../assets/sounds/A.mp3'],
                        ['B', '../../assets/sounds/B.mp3'],
                        ['C', '../../assets/sounds/C.mp3'],
                        ['D', '../../assets/sounds/D.mp3']
                    ]
                },
                input_value('time1', 'Number')
            ],
            extensions: ['shape_statement', 'event_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${PLAY}_time1_${NEXT}`] = function (block) {
    const time1 = parseValue(Blockly.JavaScript.valueToCode(block, 'time1', Blockly.JavaScript.ORDER_ATOMIC) || '');
    const data = { type: TYPE, attrs: { time1, NEXT } };
    // const code = data + '\n';
    return JSON.stringify(data) + ';\n';
};

// 소리 ?초에서 ?초까지 재생 후 진행
Blockly.Blocks[`${TYPE}_${PLAY}_time2_${NEXT}`] = {
    init: function () {
        this.jsonInit({
            message0: '소리 %1  %2 초 ~ %3 초까지 재생 후 진행',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VALUE',
                    options: [
                        ['A', '../../assets/sounds/A.mp3'],
                        ['B', '../../assets/sounds/B.mp3'],
                        ['C', '../../assets/sounds/C.mp3'],
                        ['D', '../../assets/sounds/D.mp3']
                    ]
                },
                input_value('time1', 'Number'),
                input_value('time2', 'Number')
            ],
            extensions: ['shape_statement', 'event_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_${PLAY}_time2_${NEXT}`] = function (block) {
    const time1 = parseValue(Blockly.JavaScript.valueToCode(block, 'time1', Blockly.JavaScript.ORDER_ATOMIC) || '');
    const time2 = parseValue(Blockly.JavaScript.valueToCode(block, 'time2', Blockly.JavaScript.ORDER_ATOMIC) || '');
    const data = { type: TYPE, attrs: { time1, time2, NEXT } };
    // const code = data + '\n';
    return JSON.stringify(data) + ';\n';
};

// 모든 소리 멈추기
Blockly.Blocks[`${TYPE}_stop`] = {
    init: function () {
        this.jsonInit({
            message0: '모든 소리 멈추기',
            extensions: ['shape_statement', 'event_blocks']
        });
    }
};

Blockly.JavaScript[`${TYPE}_stop`] = function () {
    const data = { type: TYPE, value: 'stop' };
    // const code = data + '\n';
    return JSON.stringify(data) + ';\n';
};

// 볼륨 조절
Blockly.Blocks[`${TYPE}_volume`] = {
    init: function () {
        this.jsonInit({
            message0: '소리 크기를 %1  %% 만큼 바꾸기',
            args0: [field_number('volume', 0, 0, 100)],
            extensions: ['shape_statement', 'event_blocks']
        });
    }
};

Blockly.JavaScript[`${TYPE}_volume`] = function (block) {
    const volume = parseValue(block.getFieldValue('volume'));
    const data = { type: TYPE, attrs: { volume } };
    // const code = data + '\n';
    return JSON.stringify(data) + ';\n';
};
