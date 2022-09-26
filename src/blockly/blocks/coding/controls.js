import Blockly from 'blockly';
import { control, start_end } from '../../../assets/images/coding/blockIcons';
export const TYPE = 'CODING_CONTROL';
const useData = true;

// // control Repeat
// Blockly.Blocks[`${TYPE}_R`] = {
//     init: function () {
//         this.jsonInit({
//             message0: '캐릭터가 아래 나열한 명령 반복하기',
//             extensions: ['shape_statement', 'loop_blocks']
//         });
//     }
// };
// Blockly.JavaScript[`${TYPE}_R`] = function (block) {
//     // const data = { type: TYPE, attrs: { number } };
//     const code = `Repeat()\n`;
//     return code;
// };

// start
Blockly.Blocks[`${TYPE}_START`] = {
    init: function () {
        this.jsonInit({
            // message0: '시작하기 %1',
            message0: `%{BKY_${TYPE}_START}`,
            args0: [
                {
                    type: 'field_image',
                    src: start_end,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_hat', 'start_end_blocks']
        });
        // this.setMovable(false);
        this.setDeletable(false);
    }
};
Blockly.JavaScript[`${TYPE}_START`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Start()`,
        exec: `Start()`
    };
    if (useData) return JSON.stringify(data) + '\n';
    return `Start()\n`;
};

// End
Blockly.Blocks[`${TYPE}_END`] = {
    init: function () {
        this.jsonInit({
            // message0: '끝내기 %1',
            message0: `%{BKY_${TYPE}_END}`,
            args0: [
                {
                    type: 'field_image',
                    src: start_end,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_end', 'start_end_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_END`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `End()`,
        exec: `End()`
    };
    if (useData) return JSON.stringify(data) + '\n';
    return `End()\n`;
};

/* 실제로 사용 되는 코드 : START */
// control Repeat 3
Blockly.Blocks[`${TYPE}_R`] = {
    init: function () {
        this.jsonInit({
            // message0: '%1 번 반복하기 %2',
            message0: `%{BKY_${TYPE}_R}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'TIMES',
                    options: [
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5']
                    ]
                },
                {
                    type: 'field_image',
                    src: control,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            message1: '%1',
            args1: [
                {
                    type: 'input_statement',
                    name: 'DO'
                }
            ],
            extensions: ['shape_loop', 'control_blocks']
        });
    }
};

Blockly.JavaScript[`${TYPE}_R`] = function (block) {
    // Repeat n times.
    let repeats = String(Number(block.getFieldValue('TIMES')));
    let branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let exec = Blockly.JavaScript.addLoopTrap(branch, block)
        .split('\n')
        .map((el) => el.trimStart())
        .join('\n');

    const data = { displayFn: `Repeat(${repeats})`, exec };
    if (useData) return JSON.stringify(data) + '\n';

    return `Repeat(${repeats}){${branch.replace(/(\s*)/g, '')}}\n`;
};
/* 실제로 사용 되는 코드 : END */

// control Repeat 2
Blockly.Blocks[`${TYPE}_R_2`] = {
    init: function () {
        this.jsonInit({
            // message0: '2 번 반복하기 %1',
            message0: `%{BKY_${TYPE}_R_2}`,
            args0: [
                {
                    type: 'field_image',
                    src: control,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            message1: '%1',
            args1: [
                {
                    type: 'input_statement',
                    name: 'DO'
                }
            ],
            extensions: ['shape_loop', 'control_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_R_2`] = function (block) {
    let branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block)
        .split('\n')
        .map((el) => el.trim())
        .join('\n');

    let exec = '';
    for (let index = 0; index < 2; index++) {
        exec += branch.replace(/^\s*/g, '');
    }
    const data = {
        displayFn: `Repeat(2)('branches')\n`,
        exec
    };
    if (useData) return JSON.stringify(data) + ';';

    return `Repeat(2){${branch.replace(/(\s*)/g, '')}}\n`;
};

// control Repeat 3
Blockly.Blocks[`${TYPE}_R_3`] = {
    init: function () {
        this.jsonInit({
            // message0: '3 번 반복하기 %1',
            message0: `%{BKY_${TYPE}_R_3}`,
            args0: [
                {
                    type: 'field_image',
                    src: control,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            message1: '%1',
            args1: [
                {
                    type: 'input_statement',
                    name: 'DO'
                }
            ],
            extensions: ['shape_loop', 'control_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_R_3`] = function (block) {
    let branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block)
        .split('\n')
        .map((el) => el.trim())
        .join('\n');

    let exec = '';
    for (let index = 0; index < 3; index++) {
        exec += branch.replace(/^\s*/g, '');
    }
    const data = {
        displayFn: `Repeat(3)('branches')\n`,
        exec
    };
    if (useData) return JSON.stringify(data) + ';';

    return `Repeat(3){${branch.replace(/(\s*)/g, '')}}\n`;

    ///////////////////////////////////////////////////
    // const data = { type: TYPE, attrs: { number } };
    /////
    // const code = `Repeat(2)\n`;
    // return code;
};

// control Repeat End
Blockly.Blocks[`${TYPE}_RE`] = {
    init: function () {
        this.jsonInit({
            message0: '반복 끝내기',
            extensions: ['shape_end', 'control_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_RE`] = function (block) {
    // const data = { type: TYPE, attrs: { number } };
    const code = `RepeatEnd()\n`;
    return code;
};
