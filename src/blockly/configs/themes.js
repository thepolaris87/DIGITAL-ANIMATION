import Blockly from 'blockly';
import './custom_category';

Blockly.Themes.newTheme = Blockly.Theme.defineTheme('newTheme', {
    base: Blockly.Themes.Classic,
    categoryStyles: {
        list_category: {
            colour: '#4a148c'
        },
        logic_category: {
            colour: '#8b4513'
        },
        loop_category: {
            colour: '#85E21F'
        },
        text_category: {
            colour: '#FE9B13'
        },
        event_category: {
            colour: '#6d8bd9'
        },
        motion_category: {
            colour: '#124e84'
        },
        control_category: {
            colour: '#cccccc'
        },
        toolbox_category: {
            colour: '#bbb'
        }
    },

    fontStyle: {
        family: 'NanumSquare',
        weight: 'bold',
        size: 16
    },

    blockStyles: {
        list_blocks: {
            colourPrimary: '#4a148c',
            colourSecondary: '#AD7BE9',
            colourTertiary: '#CDB6E9'
        },
        logic_blocks: {
            colourPrimary: '#8b4513',
            colourSecondary: '#ff0000',
            colourTertiary: '#C5EAFF'
        },
        loop_blocks: {
            colourPrimary: '#85E21F',
            colourSecondary: '#ff0000',
            colourTertiary: '#C5EAFF'
        },
        text_blocks: {
            colourPrimary: '#FE9B13',
            colourSecondary: '#ff0000',
            colourTertiary: '#C5EAFF'
        },
        event_blocks: {
            colourPrimary: '#6d8bd9',
            colourSecondary: '#8aa6f1',
            colourTertiary: '#E4E9BE'
        },
        motion_blocks: {
            colourPrimary: '#124e84',
            colourSecondary: '#8aa6f1',
            colourTertiary: '#E4E9BE'
        },
        start_end_blocks: {
            colourPrimary: '#e11415',
            colourSecondary: '#ff2121',
            colourTertiary: '#8e030b'
        },
        motion1_blocks: {
            colourPrimary: '#ffa600',
            colourSecondary: '#ffd000',
            colourTertiary: '#e55200'
        },
        motion2_blocks: {
            colourPrimary: '#0a5bff',
            colourSecondary: '#0d6aff',
            colourTertiary: '#0037a5'
        },
        motion3_blocks: {
            colourPrimary: '#50a700',
            colourSecondary: '#6bbd00',
            colourTertiary: '#276b00'
        },
        motion4_blocks: {
            colourPrimary: '#f7349b',
            colourSecondary: '#ff47ae',
            colourTertiary: '#b7004b'
        },
        motion5_blocks: {
            colourPrimary: '#9f28ff',
            colourSecondary: '#b136ff',
            colourTertiary: '#4a02d3'
        },
        motion6_blocks: {
            colourPrimary: '#32a0ff',
            colourSecondary: '#51bcff',
            colourTertiary: '#025ecc'
        },
        motion7_blocks: {
            colourPrimary: '#c07b43',
            colourSecondary: '#d69745',
            colourTertiary: '#6b4136'
        },
        motion8_blocks: {
            colourPrimary: '#4500b2',
            colourSecondary: '#5a0fea',
            colourTertiary: '#00003d'
        },
        motion9_blocks: {
            colourPrimary: '#ff8f29',
            colourSecondary: '#ffac52',
            colourTertiary: '#a03100'
        },
        motion10_blocks: {
            colourPrimary: '#49cebe',
            colourSecondary: '#7fd6d0',
            colourTertiary: '#355c66'
        },
        motion11_blocks: {
            colourPrimary: '#007500',
            colourSecondary: '#008c00',
            colourTertiary: '#023f02'
        },
        motion12_blocks: {
            colourPrimary: '#2e2e2e',
            colourSecondary: '#3b3b3b',
            colourTertiary: '#161616'
        },
        motion13_blocks: {
            colourPrimary: '#ad008f',
            colourSecondary: '#cf20c1',
            colourTertiary: '#54005b'
        },
        direction_blocks: {
            colourPrimary: '#999999',
            colourSecondary: '#a6a6a6',
            colourTertiary: '#494949'
        },
        control_blocks: {
            colourPrimary: '#cccccc',
            colourSecondary: '#e5e5e5',
            colourTertiary: '#7c7c7c'
        }
    },
    componentStyles: {
        workspaceBackgroundColour: '#fff',
        // toolboxBackgroundColour: '#bbb',
        // toolboxForegroundColour: '#fff',
        // flyoutBackgroundColour: '#aaa',
        // flyoutForegroundColour: '#ccc',
        toolboxBackgroundColour: '#FFFCF8',
        toolboxForegroundColour: '#FFFCF8',
        flyoutBackgroundColour: '#FFFCF8',
        flyoutForegroundColour: '#FFFCF8',
        flyoutOpacity: 0.8,
        insertionMarkerColour: '#fff',
        insertionMarkerOpacity: 0.3,
        scrollbarColour: '#aaa',
        scrollbarOpacity: 0.4,
        cursorColour: '#d0d0d0',
        blackBackground: '#333'
    }
    // startHats: true
});
