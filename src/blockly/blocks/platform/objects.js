import Blockly from 'blockly';
import { objectJS } from '../../utils/blockToJS';

export const TYPE = 'object';
let option = [['none', 'none']];

Blockly.Blocks['object_select'] = {
    init: function () {
        this.jsonInit({
            message0: '오브젝트 선택',
            tooltip: '제어할 오브젝트를 선택하세요.',
            extensions: ['shape_statement', 'list_blocks']
        });
        this.appendDummyInput('dummy').appendField(new Blockly.FieldDropdown(() => option), 'objects');
    },
    setOptions(_option) {
        option = _option;
    }
};

Blockly.JavaScript['object_select'] = function (block) {
    const id = block.getFieldValue('objects');
    const data = { type: TYPE, value: id };
    const code = objectJS(data) + '\n';
    return code;
};
