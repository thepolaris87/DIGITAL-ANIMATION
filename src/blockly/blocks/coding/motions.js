import Blockly from 'blockly';
import {
    motion10,
    motion11_door,
    motion11_fix,
    motion11_ice,
    motion12_back,
    motion12_front,
    motion12_off,
    motion12_on,
    motion13,
    motion1_back,
    motion1_front,
    motion2_back,
    motion2_front,
    motion3_around,
    motion3_left,
    motion3_right,
    motion4,
    motion5,
    motion6,
    motion6_snow,
    motion7,
    motion8,
    motion9
} from '../../../assets/images/coding/blockIcons';

export const TYPE = 'CODING_MOTION';
const repeat3 = [1, 2, 3];
const useData = true;

// motion STEP
// Blockly.Blocks[`${TYPE}_S`] = {
Blockly.Blocks[`${TYPE}_S`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞으로 %1 칸 이동하기 %2',
            message0: `%{BKY_${TYPE}_S}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'number',
                    options: [
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6']
                    ]
                },
                {
                    type: 'field_image',
                    src: motion1_front,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion1_blocks']
        });
    }
};
// Blockly.JavaScript[`${TYPE}_S`] = function (block) {
Blockly.JavaScript[`${TYPE}_S`] = function (block) {
    const number = block.getFieldValue('number');
    const data = {
        id: block.id,
        displayFn: `MoveForward(${number})`,
        exec: `MoveForward(${number})`
    };
    if (useData) return JSON.stringify(data) + '\n';
    const code = `MoveForward(${number})\n`;
    return code;
};

// motion STEP 1~3
repeat3.map((el) => {
    Blockly.Blocks[`${TYPE}_S_${el}`] = {
        init: function () {
            this.jsonInit({
                // message0: `앞으로 ${el} 칸 이동하기 %1`,
                message0: `%{BKY_${TYPE}_S_${el}}`,
                args0: [
                    {
                        type: 'field_image',
                        src: motion1_front,
                        width: 30,
                        height: 30,
                        alt: '*'
                    }
                ],
                extensions: ['shape_statement', 'motion1_blocks']
            });
        }
    };
    Blockly.JavaScript[`${TYPE}_S_${el}`] = function (block) {
        const data = {
            id: block.id,
            displayFn: `MoveForward(${el})`,
            exec: `MoveForward(${el})`
        };
        if (useData) return JSON.stringify(data) + '\n';
        const code = `MoveForward(${el})\n`;
        return code;
    };
});

// motion Swim(freestyle)
Blockly.Blocks[`${TYPE}_SWF`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞으로 %1 칸 헤엄치기 %2',
            message0: `%{BKY_${TYPE}_SWF}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'number',
                    options: [
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6']
                    ]
                },
                {
                    type: 'field_image',
                    src: motion2_front,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion2_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SWF`] = function (block) {
    const number = block.getFieldValue('number');
    const data = {
        id: block.id,
        displayFn: `FreestyleSwim(${number})`,
        exec: `FreestyleSwim(${number})`
    };
    if (useData) return JSON.stringify(data) + '\n';
    const code = `FreestyleSwim(${number})\n`;
    return code;
};

// motion Swim(freestyle) 1~3
repeat3.map((el) => {
    Blockly.Blocks[`${TYPE}_SWF_${el}`] = {
        init: function () {
            this.jsonInit({
                // message0: `앞으로 ${el} 칸 헤엄치기 %1`,
                message0: `%{BKY_${TYPE}_SWF_${el}}`,
                args0: [
                    {
                        type: 'field_image',
                        src: motion2_front,
                        width: 30,
                        height: 30,
                        alt: '*'
                    }
                ],
                extensions: ['shape_statement', 'motion2_blocks']
            });
        }
    };
    Blockly.JavaScript[`${TYPE}_SWF_${el}`] = function (block) {
        const data = {
            id: block.id,
            displayFn: `FreestyleSwim(${el})`,
            exec: `FreestyleSwim(${el})`
        };
        if (useData) return JSON.stringify(data) + '\n';
        const code = `FreestyleSwim(${el})\n`;
        return code;
    };
});

// motion STEP Backards
Blockly.Blocks[`${TYPE}_SB`] = {
    init: function () {
        this.jsonInit({
            // message0: '뒤로 %1 칸 이동하기 %2',
            message0: `%{BKY_${TYPE}_SB}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'number',
                    options: [
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6']
                    ]
                },
                {
                    type: 'field_image',
                    src: motion1_back,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion1_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SB`] = function (block) {
    const number = block.getFieldValue('number');
    const data = {
        id: block.id,
        displayFn: `MoveBackward(${number})`,
        exec: `MoveBackward(${number})`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `MoveBackward(${number})\n`;
    return code;
};

// motion STEP Backards 1~3
repeat3.map((el) => {
    Blockly.Blocks[`${TYPE}_SB_${el}`] = {
        init: function () {
            this.jsonInit({
                // message0: `뒤로 ${el} 칸 이동하기 %1`,
                message0: `%{BKY_${TYPE}_SB_${el}}`,
                args0: [
                    {
                        type: 'field_image',
                        src: motion1_back,
                        width: 30,
                        height: 30,
                        alt: '*'
                    }
                ],
                extensions: ['shape_statement', 'motion1_blocks']
            });
        }
    };
    Blockly.JavaScript[`${TYPE}_SB_${el}`] = function (block) {
        const data = {
            id: block.id,
            displayFn: `MoveBackward(${el})`,
            exec: `MoveBackward(${el})`
        };
        if (useData) return JSON.stringify(data) + '\n';
        const code = `MoveBackward(${el})\n`;
        return code;
    };
});

// motion Swim(Backstroke)
Blockly.Blocks[`${TYPE}_SWB`] = {
    init: function () {
        this.jsonInit({
            // message0: '뒤로 %1 칸 헤엄치기 %2',
            message0: `%{BKY_${TYPE}_SWB}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'number',
                    options: [
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6']
                    ]
                },
                {
                    type: 'field_image',
                    src: motion2_back,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion2_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SWB`] = function (block) {
    const number = block.getFieldValue('number');

    const data = {
        id: block.id,
        displayFn: `BackstrokeSwim(${number})`,
        exec: `BackstrokeSwim(${number})`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `BackstrokeSwim(${number})\n`;
    return code;
};

// motion Swim(Backstroke) 1~3
repeat3.map((el) => {
    Blockly.Blocks[`${TYPE}_SWB_${el}`] = {
        init: function () {
            this.jsonInit({
                // message0: `뒤로 ${el} 칸 헤엄치기 %1`,
                message0: `%{BKY_${TYPE}_SWB_${el}}`,
                args0: [
                    {
                        type: 'field_image',
                        src: motion2_back,
                        width: 30,
                        height: 30,
                        alt: '*'
                    }
                ],
                extensions: ['shape_statement', 'motion2_blocks']
            });
        }
    };
    Blockly.JavaScript[`${TYPE}_SWB_${el}`] = function (block) {
        const data = {
            id: block.id,
            displayFn: `BackstrokeSwim(${el})`,
            exec: `BackstrokeSwim(${el})`
        };
        if (useData) return JSON.stringify(data) + '\n';

        const code = `BackstrokeSwim(${el})\n`;
        return code;
    };
});

// motion Turn Right
Blockly.Blocks[`${TYPE}_TR`] = {
    init: function () {
        this.jsonInit({
            // message0: '오른쪽으로 돌기 %1',
            message0: `%{BKY_${TYPE}_TR}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion3_right,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion3_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_TR`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `TurnRight()`,
        exec: `TurnRight()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `TurnRight()\n`;
    return code;
};

// motion Turn Left
Blockly.Blocks[`${TYPE}_TL`] = {
    init: function () {
        this.jsonInit({
            // message0: '왼쪽으로 돌기 %1',
            message0: `%{BKY_${TYPE}_TL}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion3_left,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion3_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_TL`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `TurnLeft()`,
        exec: `TurnLeft()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `TurnLeft()\n`;
    return code;
};

// motion Turn Left
Blockly.Blocks[`${TYPE}_TA`] = {
    init: function () {
        this.jsonInit({
            // message0: '제자리 돌기 %1',
            message0: `%{BKY_${TYPE}_TA}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion3_around,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion3_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_TA`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `TurnAround()`,
        exec: `TurnAround()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `TurnAround()\n`;
    return code;
};

// motion Jump
Blockly.Blocks[`${TYPE}_J`] = {
    init: function () {
        this.jsonInit({
            // message0: '점프하기 %1',
            message0: `%{BKY_${TYPE}_J}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion4,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion4_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_J`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Jump()`,
        exec: `Jump()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Jump()\n`;
    return code;
};

// motion Sliding 1
Blockly.Blocks[`${TYPE}_SD_1`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞으로 1 칸 슬라이딩하기 %1',
            message0: `%{BKY_${TYPE}_SD_1}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion5,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion5_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SD_1`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Slide(1)`,
        exec: `Slide(1)`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Slide(1)\n`;
    return code;
};

// motion Sliding 2
Blockly.Blocks[`${TYPE}_SD_2`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞으로 2 칸 슬라이딩하기 %1',
            message0: `%{BKY_${TYPE}_SD_2}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion5,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion5_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SD_2`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Slide(2)`,
        exec: `Slide(2)`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Slide(2)\n`;
    return code;
};

// motion Sliding 3
Blockly.Blocks[`${TYPE}_SD_3`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞으로 3 칸 슬라이딩하기 %1',
            message0: `%{BKY_${TYPE}_SD_3}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion5,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion5_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SD_3`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Slide(3)`,
        exec: `Slide(3)`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Slide(3)\n`;
    return code;
};

// motion Sliding 2,4,6,8
Blockly.Blocks[`${TYPE}_SD`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞으로 %1 칸 슬라이딩하기 %2',
            message0: `%{BKY_${TYPE}_SD}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'number',
                    options: [
                        ['2', '2'],
                        ['4', '4'],
                        ['6', '6'],
                        ['8', '8']
                    ]
                },
                {
                    type: 'field_image',
                    src: motion5,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion5_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SD`] = function (block) {
    const number = block.getFieldValue('number');

    const data = {
        id: block.id,
        displayFn: `Slide(${number})`,
        exec: `Slide(${number})`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Slide(${number})\n`;
    return code;
};

// motion Shouting
Blockly.Blocks[`${TYPE}_ST`] = {
    init: function () {
        this.jsonInit({
            // message0: '소리치기 %1',
            message0: `%{BKY_${TYPE}_ST}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion13,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion13_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_ST`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Shout()`,
        exec: `Shout()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Shout()\n`;
    return code;
};

// motion Crush Ice
Blockly.Blocks[`${TYPE}_CI`] = {
    init: function () {
        this.jsonInit({
            // message0: '얼음 깨기 %1',
            message0: `%{BKY_${TYPE}_CI}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion6,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion6_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_CI`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `CrushIce()`,
        exec: `CrushIce()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `CrushIce()\n`;
    return code;
};

// motion Clear away the snow
Blockly.Blocks[`${TYPE}_CS`] = {
    init: function () {
        this.jsonInit({
            // message0: '눈 치우기 %1',
            message0: `%{BKY_${TYPE}_CS}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion6_snow,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion6_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_CS`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `RemoveSnow()`,
        exec: `RemoveSnow()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `RemoveSnow()\n`;
    return code;
};

// motion Pick Up
Blockly.Blocks[`${TYPE}_PU`] = {
    init: function () {
        this.jsonInit({
            // message0: '줍기 %1',
            message0: `%{BKY_${TYPE}_PU}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion7,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion7_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_PU`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `PickUp()`,
        exec: `PickUp()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `PickUp()\n`;
    return code;
};

// motion Feed
Blockly.Blocks[`${TYPE}_F`] = {
    init: function () {
        this.jsonInit({
            message0: '캐릭터가 다른캐릭터(팽귄, 물개)에게 먹이주기',
            extensions: ['shape_statement', 'colour_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_F`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Feed()`,
        exec: `Feed()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Feed()\n`;
    return code;
};

// motion Feed It On The Front
Blockly.Blocks[`${TYPE}_FF`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞에 먹이 주기 %1',
            message0: `%{BKY_${TYPE}_FF}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion10,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion10_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_FF`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `FeedItOnTheFront()`,
        exec: `FeedItOnTheFront()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `FeedItOnTheFront()\n`;
    return code;
};

// motion Feed It On The Right
Blockly.Blocks[`${TYPE}_FR`] = {
    init: function () {
        this.jsonInit({
            // message0: '오른쪽에 먹이 주기 %1',
            message0: `%{BKY_${TYPE}_FR}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion10,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion10_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_FR`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `FeedItOnTheRight()`,
        exec: `FeedItOnTheRight()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `FeedItOnTheRight()\n`;
    return code;
};

// motion Feed It On The Left
Blockly.Blocks[`${TYPE}_FL`] = {
    init: function () {
        this.jsonInit({
            // message0: '왼쪽에 먹이 주기 %1',
            message0: `%{BKY_${TYPE}_FL}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion10,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion10_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_FL`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `FeedItOnTheLeft()`,
        exec: `FeedItOnTheLeft()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `FeedItOnTheLeft()\n`;
    return code;
};

// motion Fish
Blockly.Blocks[`${TYPE}_FI`] = {
    init: function () {
        this.jsonInit({
            // message0: '물고기 잡기 %1',
            message0: `%{BKY_${TYPE}_FI}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion9,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion9_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_FI`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Fish()`,
        exec: `Fish()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Fish()\n`;
    return code;
};

// motion Dive
Blockly.Blocks[`${TYPE}_D`] = {
    init: function () {
        this.jsonInit({
            // message0: '다이빙하기 %1',
            message0: `%{BKY_${TYPE}_D}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion8,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion8_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_D`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Dive()`,
        exec: `Dive()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Dive()\n`;
    return code;
};

// motion Turn On
Blockly.Blocks[`${TYPE}_TN`] = {
    init: function () {
        this.jsonInit({
            // message0: '시동 켜기 %1',
            message0: `%{BKY_${TYPE}_TN}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion12_on,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion12_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_TN`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `SwitchOnTheEngine()`,
        exec: `SwitchOnTheEngine()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `SwitchOnTheEngine()\n`;
    return code;
};

// motion Turn Off
Blockly.Blocks[`${TYPE}_TF`] = {
    init: function () {
        this.jsonInit({
            // message0: '시동 끄기 %1',
            message0: `%{BKY_${TYPE}_TF}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion12_off,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion12_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_TF`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `SwitchOffTheEngine()`,
        exec: `SwitchOffTheEngine()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `SwitchOffTheEngine()\n`;
    return code;
};

// motion Drive
Blockly.Blocks[`${TYPE}_DR`] = {
    init: function () {
        this.jsonInit({
            message0: '캐릭터가 썰매 운전하기',
            extensions: ['shape_statement', 'colour_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_DR`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `Drive()`,
        exec: `Drive()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `Drive()\n`;
    return code;
};

// motion Make the gate
Blockly.Blocks[`${TYPE}_MG`] = {
    init: function () {
        this.jsonInit({
            // message0: '대문 만들기 %1',
            message0: `%{BKY_${TYPE}_MG}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion11_door,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion11_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_MG`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `MakeAGate()`,
        exec: `MakeAGate()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `MakeAGate()\n`;
    return code;
};

// motion Stack Ice
Blockly.Blocks[`${TYPE}_SI`] = {
    init: function () {
        this.jsonInit({
            message0: '캐릭터가 이글루를 만들기 위해 얼음 쌓기',
            extensions: ['shape_statement', 'colour_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_SI`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `BuildUpIceBlocks()`,
        exec: `BuildUpIceBlocks()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `BuildUpIceBlocks()\n`;
    return code;
};

// motion Trim the edge
Blockly.Blocks[`${TYPE}_T`] = {
    init: function () {
        this.jsonInit({
            // message0: '얼음 다듬기 %1',
            message0: `%{BKY_${TYPE}_T}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion11_ice,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion11_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_T`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `TrimeIceBlocksWithTheSaw()`,
        exec: `TrimeIceBlocksWithTheSaw()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `TrimeIceBlocksWithTheSaw()\n`;
    return code;
};

// Fix
Blockly.Blocks[`${TYPE}_FIX`] = {
    init: function () {
        this.jsonInit({
            // message0: '이글루 고치기 %1',
            message0: `%{BKY_${TYPE}_FIX}`,
            args0: [
                {
                    type: 'field_image',
                    src: motion11_fix,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion11_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_FIX`] = function (block) {
    const data = {
        id: block.id,
        displayFn: `FixIceBlocks()`,
        exec: `FixIceBlocks()`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `FixIceBlocks()\n`;
    return code;
};

// motion Drive Forward
Blockly.Blocks[`${TYPE}_DF`] = {
    init: function () {
        this.jsonInit({
            // message0: '앞으로 %1 칸 운전하기 %2',
            message0: `%{BKY_${TYPE}_DF}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'number',
                    options: [
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6']
                    ]
                },
                {
                    type: 'field_image',
                    src: motion12_front,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion12_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_DF`] = function (block) {
    const number = block.getFieldValue('number');

    const data = {
        id: block.id,
        displayFn: `DriveForward(${number})`,
        exec: `DriveForward(${number})`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `DriveForward(${number})\n`;
    return code;
};

// motion Drive Forward 1~3
repeat3.map((el) => {
    Blockly.Blocks[`${TYPE}_DF_${el}`] = {
        init: function () {
            this.jsonInit({
                // message0: `앞으로 ${el} 칸 운전하기 %1`,
                message0: `%{BKY_${TYPE}_DF_${el}}`,
                args0: [
                    {
                        type: 'field_image',
                        src: motion12_front,
                        width: 30,
                        height: 30,
                        alt: '*'
                    }
                ],
                extensions: ['shape_statement', 'motion12_blocks']
            });
        }
    };
    Blockly.JavaScript[`${TYPE}_DF_${el}`] = function (block) {
        const data = {
            id: block.id,
            displayFn: `DriveForward(${el})`,
            exec: `DriveForward(${el})`
        };
        if (useData) return JSON.stringify(data) + '\n';

        const code = `DriveForward(${el})\n`;
        return code;
    };
});

// motion Drive Backward
Blockly.Blocks[`${TYPE}_DB`] = {
    init: function () {
        this.jsonInit({
            // message0: '뒤로 %1 칸 운전하기 %2',
            message0: `%{BKY_${TYPE}_DB}`,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'number',
                    options: [
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6']
                    ]
                },
                {
                    type: 'field_image',
                    src: motion12_back,
                    width: 30,
                    height: 30,
                    alt: '*'
                }
            ],
            extensions: ['shape_statement', 'motion12_blocks']
        });
    }
};
Blockly.JavaScript[`${TYPE}_DB`] = function (block) {
    const number = block.getFieldValue('number');

    const data = {
        id: block.id,
        displayFn: `DriveBackward(${number})`,
        exec: `DriveBackward(${number})`
    };
    if (useData) return JSON.stringify(data) + '\n';

    const code = `DriveBackward(${number})\n`;
    return code;
};

// motion Drive Backward 1~3
repeat3.forEach((el) => {
    Blockly.Blocks[`${TYPE}_DB_${el}`] = {
        init: function () {
            this.jsonInit({
                // message0: `뒤로 ${el} 칸 운전하기 %1`,
                message0: `%{BKY_${TYPE}_DB_${el}}`,
                args0: [
                    {
                        type: 'field_image',
                        src: motion12_back,
                        width: 30,
                        height: 30,
                        alt: '*'
                    }
                ],
                extensions: ['shape_statement', 'motion12_blocks']
            });
        }
    };
    Blockly.JavaScript[`${TYPE}_DB_${el}`] = function (block) {
        const data = {
            id: block.id,
            displayFn: `DriveBackward(${el})`,
            exec: `DriveBackward(${el})`
        };
        if (useData) return JSON.stringify(data) + '\n';

        const code = `DriveBackward(${el})\n`;
        return code;
    };
});
