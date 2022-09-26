import Blockly from 'blockly';

// 블록의 형태
Blockly.Extensions.register('shape_statement', function () {
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
});

Blockly.Extensions.register('shape_hat', function () {
    this.setInputsInline(true);
    this.setNextStatement(true, null);
});

Blockly.Extensions.register('shape_end', function () {
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
});

Blockly.Extensions.register('shape_loop', function () {
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
});

// 블록의 themes에 해당하는 것 지정
Blockly.Extensions.register('list_blocks', function () {
    this.setStyle('list_blocks');
});

Blockly.Extensions.register('logic_blocks', function () {
    this.setStyle('logic_blocks');
});

Blockly.Extensions.register('loop_blocks', function () {
    this.setStyle('loop_blocks');
});

Blockly.Extensions.register('text_blocks', function () {
    this.setStyle('text_blocks');
});

Blockly.Extensions.register('colour_blocks', function () {
    this.setStyle('colour_blocks');
});

Blockly.Extensions.register('event_blocks', function () {
    this.setStyle('event_blocks');
});

Blockly.Extensions.register('motion_blocks', function () {
    this.setStyle('motion_blocks');
});

////////////////////////////////////////////////////////////////////////////////////
Blockly.Extensions.register('start_end_blocks', function () {
    this.setStyle('start_end_blocks');
});

Blockly.Extensions.register('motion1_blocks', function () {
    this.setStyle('motion1_blocks');
});

Blockly.Extensions.register('motion2_blocks', function () {
    this.setStyle('motion2_blocks');
});

Blockly.Extensions.register('motion3_blocks', function () {
    this.setStyle('motion3_blocks');
});

Blockly.Extensions.register('motion4_blocks', function () {
    this.setStyle('motion4_blocks');
});

Blockly.Extensions.register('motion5_blocks', function () {
    this.setStyle('motion5_blocks');
});

Blockly.Extensions.register('motion6_blocks', function () {
    this.setStyle('motion6_blocks');
});

Blockly.Extensions.register('motion7_blocks', function () {
    this.setStyle('motion7_blocks');
});

Blockly.Extensions.register('motion8_blocks', function () {
    this.setStyle('motion8_blocks');
});

Blockly.Extensions.register('motion9_blocks', function () {
    this.setStyle('motion9_blocks');
});

Blockly.Extensions.register('motion10_blocks', function () {
    this.setStyle('motion10_blocks');
});

Blockly.Extensions.register('motion11_blocks', function () {
    this.setStyle('motion11_blocks');
});

Blockly.Extensions.register('motion12_blocks', function () {
    this.setStyle('motion12_blocks');
});

Blockly.Extensions.register('motion13_blocks', function () {
    this.setStyle('motion13_blocks');
});

Blockly.Extensions.register('direction_blocks', function () {
    this.setStyle('direction_blocks');
});

Blockly.Extensions.register('control_blocks', function () {
    this.setStyle('control_blocks');
});
