import Blockly from 'blockly';
import toolbox from './toolbox';
import './themes';
import './render';

const configuration = {
    toolbox: toolbox,
    renderer: 'custom_renderer',
    theme: Blockly.Themes.newTheme,
    move: { scrollbars: { horizontal: true, vertical: true }, drag: true, wheel: true },
    maxBlocks: 100,
    grid: { spacing: 20, length: 3, colour: '#fff', snap: true },
    trashcan: true,
    zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.8, scaleSpeed: 1.2, pinch: true }
};

export default configuration;
