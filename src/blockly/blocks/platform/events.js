import Blockly from 'blockly';

const type = 'event';

// start
Blockly.Blocks[`${type}_start`] = {
    init: function () {
        this.jsonInit({
            message0: '시작하기',
            extensions: ['shape_hat', 'event_blocks']
        });
    }
};
Blockly.JavaScript[`${type}_start`] = function () {
    const code = { type: 'start' };
    return JSON.stringify(code) + ';';
};

// keyboard 누르기
Blockly.Blocks[`${type}_keyboard`] = {
    init: function () {
        this.jsonInit({
            message0: "%1 키를 눌렀을 때",
            args0: [{
                type: "field_dropdown",
                name: "keyboard",
                options: [
                    [
                        "space",
                        "space"
                    ],
                    [
                        "enter",
                        "enter"
                    ],
                    [
                        "↑",
                        "arrow_up"
                    ],
                    [
                        "↓",
                        "arrow_down"
                    ],
                    [
                        "→",
                        "arrow_right"
                    ],
                    [
                        "←",
                        "arrow_left"
                    ]
                ],
            }],
            extensions: ['shape_hat', 'event_blocks']
        })
    }
};

Blockly.JavaScript[`${type}_keyboard`] = function (block) {
    const keyboard = block.getFieldValue('keyboard');

    const code = { type: 'start' , push: keyboard};
    return JSON.stringify(code) + ';';
};

// start
Blockly.Blocks[`${type}_mouse`] = {
    init: function () {
        this.jsonInit({
            message0: '마우스를 클릭했을 때',
            extensions: ['shape_hat', 'event_blocks']
        });
    }
};
Blockly.JavaScript[`${type}_mouse`] = function () {
    const code = { type: 'start', push: 'mouse'};
    return JSON.stringify(code) + ';';
};

let option = [['none', 'none']];

Blockly.Blocks[`${type}_mouse_objects`] = {
    init: function () {
        this.appendDummyInput('dummy').appendField(new Blockly.FieldDropdown(() => option), 'objects');
        this.jsonInit({
            message0: '오브젝트를 클릭했을 때',
            tooltip: '제어할 오브젝트를 선택하세요.',
            extensions: ['shape_hat', 'event_blocks']
        });
    },
    setOptions(_option) {
        option = _option;
    }
};

Blockly.JavaScript[`${type}_mouse_objects`] = function (block) {
    const code = { type: 'objects' };

    return JSON.stringify(code) + ';';
};