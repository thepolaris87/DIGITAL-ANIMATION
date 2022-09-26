import Blockly from 'blockly';

// import './custom_trashcan';
class NewConstantsProvider extends Blockly.blockRendering.ConstantProvider {
    constructor(root, style, constants) {
        super(root);
        this.NOTCH_WIDTH = 15;
        this.NOTCH_HEIGHT = 0;
        this.CORNER_RADIUS = 16;
        this.NOTCH_OFFSET_LEFT = 30;
        this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT;
        this.STATEMENT_BOTTOM_SPACER = 0;
        this.STATEMENT_INPUT_PADDING_LEFT = 20;
        this.SPACER_DEFAULT_HEIGHT = 15;
        this.MIN_BLOCK_HEIGHT = 60;
        this.EMPTY_INLINE_INPUT_PADDING = 14.5;
        this.EMPTY_INLINE_INPUT_HEIGHT = this.TAB_HEIGHT + 11;
        this.EXTERNAL_VALUE_INPUT_PADDING = 2;
        this.EMPTY_STATEMENT_INPUT_HEIGHT = this.MIN_BLOCK_HEIGHT;
        this.FIELD_BORDER_RECT_RADIUS = 16;
        this.FIELD_BORDER_RECT_HEIGHT = 24;
        this.FIELD_BORDER_RECT_X_PADDING = 10;
        this.FIELD_BORDER_RECT_Y_PADDING = 10;
        this.FIELD_DROPDOWN_SVG_ARROW_PADDING = this.FIELD_BORDER_RECT_X_PADDING;
        this.FIELD_DROPDOWN_SVG_ARROW_SIZE = 5;
        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 30;
    }
    makeNotch() {
        const width = this.NOTCH_WIDTH;
        const height = this.NOTCH_HEIGHT;
        const innerWidth = this.NOTCH_WIDTH;
        const outerWidth = (width - innerWidth) / 2;

        function makeMainPath(dir) {
            return Blockly.utils.svgPaths.line([
                Blockly.utils.svgPaths.point(dir * outerWidth, 0),
                Blockly.utils.svgPaths.point(dir * innerWidth, 0),
                Blockly.utils.svgPaths.point(dir * outerWidth, 0)
            ]);
        }
        const pathLeft = makeMainPath(1);
        const pathRight = makeMainPath(-1);

        return {
            type: this.SHAPES.NOTCH,
            width: width,
            height: height,
            pathLeft: pathLeft,
            pathRight: pathRight
        };
    }

    makeInsideCorners() {
        const radius = this.CORNER_RADIUS + 2;
        const innerTopLeftCorner = Blockly.utils.svgPaths.arc('a', '0 0,0', radius, Blockly.utils.svgPaths.point(-radius, radius));
        const innerBottomLeftCorner = Blockly.utils.svgPaths.arc('a', '0 0,0', radius, Blockly.utils.svgPaths.point(radius, radius));
        return {
            width: radius,
            height: radius,
            pathTop: innerTopLeftCorner,
            pathBottom: innerBottomLeftCorner
        };
    }

    createDom(svg, tagName, selector) {
        this.injectCSS_(tagName, selector);
        this.defs_ = dom.createSvgElement(Svg.DEFS, {}, svg);
        const embossFilter = dom.createSvgElement(Svg.FILTER, { id: 'blocklyEmbossFilter' + this.randomIdentifier }, this.defs_);
        dom.createSvgElement(Svg.FEGAUSSIANBLUR, { in: 'SourceAlpha', stdDeviation: 1, result: 'blur' }, embossFilter);
        const feSpecularLighting = dom.createSvgElement(
            Svg.FESPECULARLIGHTING,
            {
                in: 'blur',
                surfaceScale: 1,
                specularConstant: 0.5,
                specularExponent: 10,
                'lighting-color': 'white',
                result: 'specOut'
            },
            embossFilter
        );

        dom.createSvgElement(Svg.FEPOINTLIGHT, { x: -5000, y: -10000, z: 20000 }, feSpecularLighting);
        dom.createSvgElement(
            Svg.FECOMPOSITE,
            {
                in: 'specOut',
                in2: 'SourceAlpha',
                operator: 'in',
                result: 'specOut'
            },
            embossFilter
        );
        dom.createSvgElement(
            Svg.FECOMPOSITE,
            {
                in: 'SourceGraphic',
                in2: 'specOut',
                operator: 'arithmetic',
                k1: 0,
                k2: 1,
                k3: 1,
                k4: 0
            },
            embossFilter
        );
        this.embossFilterId = embossFilter.id;
        this.embossFilter_ = embossFilter;

        const disabledPattern = dom.createSvgElement(
            Svg.PATTERN,
            {
                id: 'blocklyDisabledPattern' + this.randomIdentifier,
                patternUnits: 'userSpaceOnUse',
                width: 10,
                height: 10
            },
            this.defs_
        );
        dom.createSvgElement(Svg.RECT, { width: 10, height: 10, fill: '#aaa' }, disabledPattern);
        dom.createSvgElement(Svg.PATH, { d: 'M 0 0 L 10 10 M 10 0 L 0 10', stroke: '#cc0' }, disabledPattern);
        this.disabledPatternId = disabledPattern.id;
        this.disabledPattern_ = disabledPattern;

        this.createDebugFilter();

        const dTop =
            'M54,0 h-54 v20 c1.08,-4.94,6.2,-8.15,11.29,-6.61 l0.16,0.05 c2.02,2.47,7.22,6.16,20.15,6.26 v0 c0,-0.06,0.01,-0.13,0.01,-0.19l0.48,0.15l0,0.05 c0.02,0,0.04,0,0.06,0 c15.02,-0.07,24.41,-5.02,20.92,-12.36 z M18.5,10 c0,-7,28,-7,28,0c0,7,-28,7,-28,0';
        const dTopStart = 'M54,0 h-54 v20 c1.08,-4.94,6.2,-8.15,11.29,-6.61 l21,6.5 a15,-13,0,0,1,18.8,-15 z';
        const dHall1 = 'M18.5,10 c0,-7,28,-7,28,0c0,7,-28,7,-28,0';
        const dHall2 = 'M18.5,14 c0,-7,28,-7,28,0c0,7,-28,7,-28,0';
        const patternBlock = [
            { id: 'patternStartEnd', class: 'startend', color: ['#b00a0b', '#e11415', '#ff2121'] },
            { id: 'patternStart', class: 'start', color: ['#b00a0b', '#e11415', '#ff2121'] },
            { id: 'patternMotion1', class: 'motion1', color: ['#ff8f00', '#ffa600', '#ffd000'] },
            { id: 'patternMotion2', class: 'motion2', color: ['#0642ff', '#0a5bff', '#0d6aff'] },
            { id: 'patternMotion3', class: 'motion3', color: ['#308d00', '#50a700', '#6bbd00'] },
            { id: 'patternMotion4', class: 'motion4', color: ['#eb2185', '#f7349b', '#ff47ae'] },
            { id: 'patternMotion5', class: 'motion5', color: ['#8010ff', '#9f28ff', '#b136ff'] },
            { id: 'patternMotion6', class: 'motion6', color: ['#1a8bff', '#32a0ff', '#51bcff'] },
            { id: 'patternMotion7', class: 'motion7', color: ['#8d562f', '#c07b43', '#d69745'] },
            { id: 'patternMotion8', class: 'motion8', color: ['#020066', '#4500b2', '#5a0fea'] },
            { id: 'patternMotion9', class: 'motion9', color: ['#e52b2a', '#ff8f29', '#ffac52'] },
            { id: 'patternMotion10', class: 'motion10', color: ['#2a9386', '#49cebe', '#7fd6d0'] },
            { id: 'patternMotion11', class: 'motion11', color: ['#006300', '#007500', '#008c00'] },
            { id: 'patternMotion12', class: 'motion12', color: ['#202020', '#2e2e2e', '#3b3b3b'] },
            { id: 'patternMotion13', class: 'motion13', color: ['#7f0085', '#ad008f', '#cf20c1'] },
            { id: 'patternDirection', class: 'direction', color: ['#808080', '#999999', '#a6a6a6'] },
            { id: 'patternControl', class: 'control', color: ['#b2b2b2', '#cccccc', '#e5e5e5'] }
        ];

        const makePatternFn = (id, _class, color) => {
            const pattern = dom.createSvgElement(
                Svg.PATTERN,
                {
                    id,
                    patternUnits: 'userSpaceOnUse',
                    width: 1000,
                    height: 1000
                },
                this.defs_
            );
            dom.createSvgElement(Svg.RECT, { x: 0, y: 0, width: 32.5, height: 1000, fill: color[0] }, pattern);
            dom.createSvgElement(Svg.RECT, { x: 32.5, y: 0, width: 967.5, height: 1000, fill: color[1] }, pattern);
            dom.createSvgElement(Svg.PATH, { d: dHall1, fill: color[0] }, pattern);
            dom.createSvgElement(Svg.PATH, { d: dHall2, fill: color[1] }, pattern);
            dom.createSvgElement(
                Svg.PATH,
                {
                    d: dTop,
                    class: _class,
                    fill: color[2]
                },
                pattern
            );

            this.patternId = pattern.id;
            this.pattern_ = pattern;
        };

        patternBlock.map((el, i) => {
            if (i > 1) {
                makePatternFn(el.id, el.class, el.color);
            }
        });

        const patternStartEnd = dom.createSvgElement(
            Svg.PATTERN,
            {
                id: 'patternStartEnd',
                patternUnits: 'userSpaceOnUse',
                width: 1000,
                height: 1000
            },
            this.defs_
        );

        dom.createSvgElement(Svg.RECT, { x: 0, y: 0, width: 32.5, height: 1000, fill: patternBlock[0].color[0] }, patternStartEnd);
        dom.createSvgElement(Svg.RECT, { x: 32.5, y: 0, width: 967.5, height: 1000, fill: patternBlock[0].color[1] }, patternStartEnd);
        dom.createSvgElement(Svg.PATH, { d: dHall1, fill: patternBlock[0].color[0] }, patternStartEnd);
        dom.createSvgElement(Svg.PATH, { d: dHall2, fill: patternBlock[0].color[1] }, patternStartEnd);
        dom.createSvgElement(
            Svg.PATH,
            {
                d: dTop,
                class: 'startend',
                fill: patternBlock[0].color[2]
            },
            patternStartEnd
        );
        this.patternStartEndId = patternStartEnd.id;
        this.patternStartEnd_ = patternStartEnd;

        const patternStart = dom.createSvgElement(
            Svg.PATTERN,
            {
                id: 'patternStart',
                patternUnits: 'userSpaceOnUse',
                width: 1000,
                height: 1000
            },
            this.defs_
        );

        dom.createSvgElement(Svg.RECT, { x: 0, y: 0, width: 32.5, height: 1000, fill: patternBlock[0].color[0] }, patternStart);
        dom.createSvgElement(Svg.RECT, { x: 32.5, y: 0, width: 967.5, height: 1000, fill: patternBlock[0].color[1] }, patternStart);
        dom.createSvgElement(
            Svg.PATH,
            {
                d: dTopStart,
                class: 'start',
                fill: patternBlock[0].color[2]
            },
            patternStart
        );
        this.patternStartId = patternStart.id;
        this.patternStart_ = patternStart;
    }
    getCSS_(selector) {
        return [
            /* eslint-disable indent */
            /* clang-format off */
            // Text.
            selector + ' .blocklyText, ',
            selector + ' .blocklyFlyoutLabelText {',
            'font: ' + this.FIELD_TEXT_FONTWEIGHT + ' ' + this.FIELD_TEXT_FONTSIZE + 'pt ' + this.FIELD_TEXT_FONTFAMILY + ';',
            '}',

            // Fields.
            // selector + ' .blocklyText {',
            // 'fill: #fff;',
            // '}',

            // 테두리
            selector + ' .blocklyText:not(.blocklyDropdownText) {',
            'fill: white;',
            'text-shadow: -2px 0px #00000033, 0px 2px #00000033, 2px 0px #00000033, 0px -2px #00000033;',
            // 'text-shadow: 2px 0px #00000033, 1.8478px 0.7854px #00000033, 1.4142px 1.4142px #00000033, 0.7854px 1.8478px #00000033, 0px 2px #00000033, -0.7854px 1.8478px #00000033, -1.4142px 1.4142px #00000033, -1.8478px 0.7854px #00000033, -2px 0px #00000033, -1.8478px -0.7854px #00000033, -1.4142px -1.4142px #00000033, -0.7854px -1.8478px #00000033, 0px -2px #00000033, 0.7854px -1.8478px #00000033, 1.4142px -1.4142px #00000033, 1.8478px -0.7854px #00000033;',
            // 'text-shadow: 2px 0px #0000000D, 1.8478px 0.7854px #0000000D, 1.4142px 1.4142px #0000000D, 0.7854px 1.8478px #0000000D, 0px 2px #0000000D, -0.7854px 1.8478px #0000000D, -1.4142px 1.4142px #0000000D, -1.8478px 0.7854px #0000000D, -2px 0px #0000000D, -1.8478px -0.7854px #0000000D, -1.4142px -1.4142px #0000000D, -0.7854px -1.8478px #0000000D, 0px -2px #0000000D, 0.7854px -1.8478px #0000000D, 1.4142px -1.4142px #0000000D, 1.8478px -0.7854px #0000000D;',
            'transform: translate(0px,2px);',
            '}',
            // selector + ' .blocklyNonEditableText>rect,',
            // selector + ' .blocklyEditableText>rect {',
            // 'fill: ' + this.FIELD_BORDER_RECT_COLOUR + ';',
            // 'fill-opacity: .6;',
            // 'stroke: none;',
            // '}',
            '.blocklyEditableText>rect, .blocklyEditableText>text {transform: translate(0px,1px);}',
            selector + ' .blocklyEditableText>rect {',
            'fill: white;',
            'fill-opacity: 1;',
            'stroke: none;',
            '}',
            selector + ' .blocklyNonEditableText>text,',
            selector + ' .blocklyEditableText>text {',
            'fill: #000;',
            '}',
            '.blocklyDisabled>.blocklyEditableText>.blocklyDropdownText {',
            'opacity: 0.5;',
            '}',
            '.blocklyDisabled>g>image {',
            'opacity: 0.5;',
            '}',

            // icon
            '.blocklyDraggable>g>image { transform : scale(1.2, 1.2) translate(-5px, -1px); }',

            // dropdown
            '.blocklyDraggable.>blocklyEditableText>rect { transform : translate(0,-1px); }',

            // dropdownfield 강제 !important
            '.blocklyMenuItem { min-width: 0 !important; font: bold 11.2pt NanumSquare !important;padding: 6px 13.75px !important;}',
            '.blocklyDropdownMenu .blocklyMenuItem {padding-left: 13.7px !important;}',
            '.blocklyMenuItemCheckbox {height: 0px !important;width: 0px !important; position: absolute !important;}',
            '.blocklyMenuItemSelected .blocklyMenuItemCheckbox {margin-left: 0px !important; }',
            '.blocklyMenuItemSelected>.blocklyMenuItemContent { color : #6574FF !important;}',
            '.blocklyMenuItemHighlight { background-color: rgba(0,0,0,0) !important;}',
            '.blocklyDropDownDiv {border: none !important; box-shadow: none !important; border-radius: 12px !important; transform: translate(0.9px, -21.5px) !important; padding: 0px !important; background-color: #EFEFEF !important;}',
            '.blocklyArrowTop {border: none !important;}',
            '.blocklyDropDownArrow { width: 0px !important; height: 0px !important;}',

            // Flyout labels.
            selector + ' .blocklyFlyoutLabelText {',
            'fill: #000;',
            '}',

            // Bubbles.
            selector + ' .blocklyText.blocklyBubbleText {',
            'fill: #000;',
            '}',

            // Editable field hover.
            selector + ' .blocklyEditableText:not(.editing):hover>rect {',
            'stroke: #fff;',
            'stroke-width: 2;',
            '}',

            // Text field input.
            selector + ' .blocklyHtmlInput {',
            'font-family: ' + this.FIELD_TEXT_FONTFAMILY + ';',
            'font-weight: ' + this.FIELD_TEXT_FONTWEIGHT + ';',
            '}',

            selector + ' .blocklyHighlightedConnectionPath {',
            'stroke: none;',
            '}',

            // Replaceable highlight.
            selector + ' .blocklyReplaceable .blocklyPath {',
            'fill-opacity: .5;',
            '}',
            selector + ' .blocklyReplaceable .blocklyPathLight,',
            selector + ' .blocklyReplaceable .blocklyPathDark {',
            'display: none;',
            '}',

            // Insertion marker.
            selector + ' .blocklyInsertionMarker>.blocklyPath {',
            'fill-opacity: ' + this.INSERTION_MARKER_OPACITY + ';',
            'stroke: none;',
            '}',
            selector + ' .blocklyInsertionMarker>.blocklyCustomTopShadow {',
            'stroke-width: 0;',
            'stroke: none;',
            '}',
            '.blocklyDisabled>.blocklyCustomTopShadow {',
            'opacity: 0.1;',
            '}',
            '.blocklyDisabled>.blocklyCustomBottomShadow {',
            'opacity: 0.8;',
            '}',
            '.blocklyDisabled>.blocklyCustomStatementShadow {',
            'opacity: 0.8;',
            '}',

            '.blocklyFlyout>.blocklyFlyoutBackground {',
            'stroke: #E4D9CF;',
            'stroke-width: 2px;',
            '}'

            /* clang-format on */
            /* eslint-enable indent */
        ];
    }
}
class NewRenderInfo extends Blockly.blockRendering.RenderInfo {
    constructor(renderer, block) {
        super(renderer, block);
        this.height = 0;
        this.width = 0;
        this.statementEdge = 16;
        this.topRow = new NewTopRow(this.constants_);
        this.bottomRow = new NewBottomRow(this.constants_);
    }
    addElemSpacing_() {
        for (let i = 0, row; (row = this.rows[i]); i++) {
            const oldElems = row.elements;
            row.elements = [];
            if (row.startsWithElemSpacer()) {
                const a = new Blockly.blockRendering.InRowSpacer(this.constants_, this.getInRowSpacing_(null, oldElems[0]));
                a.width = a.width + 60;
                row.elements.push(a);
            }
            if (!oldElems.length) {
                continue;
            }
            for (let e = 0; e < oldElems.length - 1; e++) {
                row.elements.push(oldElems[e]);
                const spacing = this.getInRowSpacing_(oldElems[e], oldElems[e + 1]);
                // 바꾼것 (마지막 아이콘 직전 space 더 넓게)
                if (e === oldElems.length - 2) {
                    const b = new Blockly.blockRendering.InRowSpacer(this.constants_, spacing);
                    b.width = b.width + 20;
                    row.elements.push(b);
                } else {
                    row.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, spacing));
                }
            }
            row.elements.push(oldElems[oldElems.length - 1]);
            if (row.endsWithElemSpacer()) {
                // 바꾼것
                const c = new Blockly.blockRendering.InRowSpacer(this.constants_, this.getInRowSpacing_(oldElems[oldElems.length - 1], null));
                c.width = c.width + 8;
                row.elements.push(c);
            }
        }
    }
}
class NewTopRow extends Blockly.blockRendering.TopRow {
    hasLeftSquareCorner(block) {
        const hasHat = (block.hat ? block.hat === 'cap' : this.constants_.ADD_START_HATS) && !block.outputConnection && !block.previousConnection;
        return !!block.outputConnection || hasHat;
    }
    hasRightSquareCorner(block) {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}
class NewBottomRow extends Blockly.blockRendering.BottomRow {
    hasLeftSquareCorner(block) {
        return !!block.outputConnection;
    }
    hasRightSquareCorner(block) {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}
class NewDrawer extends Blockly.blockRendering.Drawer {
    _block
    _info
    constructor(block, info) {        
        super(block, info);
        this._block = block;
        this._info = info;
    }
    draw() {
        this.hideHiddenIcons_();
        this.drawOutline_();
        this.drawInternals_();

        this.block_.pathObject.setPath(this.outlinePath_ + '\n' + this.inlinePath_);
        if (this.info_.RTL) {
            this.block_.pathObject.flipRTL();
        }
        if (Blockly.blockRendering.debug.isDebuggerEnabled()) {
            this.block_.renderingDebugger.drawDebug(this.block_, this.info_);
        }
        this.recordSizeOnBlock_();
    }
    drawOutline_() {
        this.drawTop_();
        
        for (let r = 1; r < this.info_.rows.length - 1; r++) {
            const row = this.info_.rows[r];
            if (row.hasJaggedEdge) {
                this.drawJaggedEdge_(row);
            } else if (row.hasStatement) {
                this.drawStatementInput_(row);
            } else if (row.hasExternalInput) {
                this.drawValueInput_(row);
            } else {
                // 바꾼것 (모서리 부분에 맞춰서 가장 크도록)
                if (!this.info_.rows[r - 1].hasStatement) {
                    this.drawRightSideRow_(row);
                }
            }
        }
        this.drawBottom_();
        this.drawLeft_();
    }
    drawTop_() {
        const topRow = this.info_.topRow;
        const elements = topRow.elements;

        this.positionPreviousConnection_();
        this.outlinePath_ += Blockly.utils.svgPaths.moveBy(topRow.xPos, this.info_.startY);
        let shadowTopPath = Blockly.utils.svgPaths.moveBy(16, 2.8);
        for (let i = 0, elem; (elem = elements[i]); i++) {
            if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
                this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.topLeft;
            } else if (Blockly.blockRendering.Types.isRightRoundedCorner(elem)) {
                this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.topRight;
                shadowTopPath += Blockly.utils.svgPaths.lineOnAxis('h', -3);
                shadowTopPath += 'a 13.7,13.7,0,0,1,16,16';
            } else if (Blockly.blockRendering.Types.isPreviousConnection(elem) && elem instanceof Blockly.blockRendering.Connection) {
                this.outlinePath_ += elem.shape.pathLeft;
                shadowTopPath += elem.shape.pathLeft;
            } else if (Blockly.blockRendering.Types.isHat(elem)) {
                this.outlinePath_ += this.constants_.START_HAT.path;
            } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
                this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', elem.width);
                shadowTopPath += Blockly.utils.svgPaths.lineOnAxis('h', elem.width);
            }
        }

        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('v', topRow.height);
        this.block_.pathObject.setShadowTop(shadowTopPath);
    }
    drawStatementInput_(row) {
        const input = row.getLastInput();
        const x = input.xPos + input.notchOffset + input.shape.width;

        // 바꾼것
        let shadowStatementPath = Blockly.utils.svgPaths.moveBy(input.xPos + 18.5, 50);

        shadowStatementPath += 'l28,0 0,10 c0,7,-28,7,-28,0 z';
        this.block_.pathObject.setShadowStatement(shadowStatementPath);

        const innerTopLeftCorner =
            input.shape.pathRight +
            Blockly.utils.svgPaths.lineOnAxis('h', -(input.notchOffset - this.constants_.INSIDE_CORNERS.width)) +
            this.constants_.INSIDE_CORNERS.pathTop;

        const innerHeight = row.height - 2 * this.constants_.INSIDE_CORNERS.height;
        // 바꾼것
        this.outlinePath_ +=
            'a16,16,0,0,1,-16,16' +
            Blockly.utils.svgPaths.lineOnAxis('H', x) +
            innerTopLeftCorner +
            Blockly.utils.svgPaths.lineOnAxis('v', innerHeight) +
            this.constants_.INSIDE_CORNERS.pathBottom +
            Blockly.utils.svgPaths.lineOnAxis('H', row.xPos + row.width - 4) +
            'a4,4,0,0,1,4,4';

        this.positionStatementInputConnection_(row);
    }
    drawRightSideRow_(row) {
        if (row.yPos + row.height - this.constants_.CORNER_RADIUS >= 0) {
            this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('V', row.yPos + row.height - this.constants_.CORNER_RADIUS);
        }
    }
    drawBottom_() {
        const bottomRow = this.info_.bottomRow;
        const elems = bottomRow.elements;
        this.positionNextConnection_();

        let shadowBottomPath;
        if (this.info_.rows.length > 5) {
            shadowBottomPath = Blockly.utils.svgPaths.moveBy(18.5, bottomRow.yPos + 11);
        } else {
            shadowBottomPath = Blockly.utils.svgPaths.moveBy(18.5, bottomRow.yPos + 9.5);
        }
        shadowBottomPath += 'l28,0 0,8 c0,7,-28,7,-28,0 z';
        this.block_.pathObject.setShadowBottom(shadowBottomPath);

        let rightCornerYOffset = 0;
        let outlinePath = '';

        for (let i = elems.length - 1, elem; (elem = elems[i]); i--) {
            if (Blockly.blockRendering.Types.isNextConnection(elem) && elem instanceof Blockly.blockRendering.Connection) {
                outlinePath += elem.shape.pathRight;
            } else if (Blockly.blockRendering.Types.isLeftSquareCorner(elem)) {
                outlinePath += Blockly.utils.svgPaths.lineOnAxis('H', bottomRow.xPos);
            } else if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
                outlinePath += this.constants_.OUTSIDE_CORNERS.bottomLeft;
            } else if (Blockly.blockRendering.Types.isRightRoundedCorner(elem)) {
                outlinePath += this.constants_.OUTSIDE_CORNERS.bottomRight;
                rightCornerYOffset = this.constants_.OUTSIDE_CORNERS.rightHeight;
            } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
                outlinePath += Blockly.utils.svgPaths.lineOnAxis('h', elem.width * -1);
            }
        }

        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('V', bottomRow.baseline - 14);
        this.outlinePath_ += outlinePath;
    }
}

const { dom, Svg } = Blockly.utils;
class NewPathObject extends Blockly.blockRendering.PathObject {
    constructor(root, style, constants) {
        super(root, style, constants);

        this.svgShadow = dom.createSvgElement(Svg.PATH, { class: 'blocklyCustomTopShadow', fill: 'none' }, root);
        this.svgShadowBottom = dom.createSvgElement(Svg.PATH, { class: 'blocklyCustomBottomShadow', fill: 'none' }, root);
        this.svgShadowStatement = dom.createSvgElement(Svg.PATH, { class: 'blocklyCustomStatementShadow', fill: 'none' }, root);
    }
    setShadowTop(d) {
        this.svgShadow.setAttribute('d', d);
    }
    setShadowBottom(d) {
        this.svgShadowBottom.setAttribute('d', d);
    }
    setShadowStatement(d) {
        this.svgShadowStatement.setAttribute('d', d);
    }
    applyColour(block) {
        this.svgPath.setAttribute('stroke', this.style.colourTertiary);
        this.svgPath.setAttribute('fill', this.style.colourPrimary);

        block.type === 'CODING_CONTROL_START' && this.svgPath.setAttribute('style', 'fill:url(#patternStart)');
        block.type === 'CODING_CONTROL_END' && this.svgPath.setAttribute('style', 'fill:url(#patternStartEnd)');
        this.style.colourPrimary === '#ffa600' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion1)');
        this.style.colourPrimary === '#0a5bff' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion2)');
        this.style.colourPrimary === '#50a700' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion3)');
        this.style.colourPrimary === '#f7349b' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion4)');
        this.style.colourPrimary === '#9f28ff' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion5)');
        this.style.colourPrimary === '#32a0ff' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion6)');
        this.style.colourPrimary === '#c07b43' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion7)');
        this.style.colourPrimary === '#4500b2' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion8)');
        this.style.colourPrimary === '#ff8f29' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion9)');
        this.style.colourPrimary === '#49cebe' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion10)');
        this.style.colourPrimary === '#007500' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion11)');
        this.style.colourPrimary === '#2e2e2e' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion12)');
        this.style.colourPrimary === '#ad008f' && this.svgPath.setAttribute('style', 'fill:url(#patternMotion13)');
        this.style.colourPrimary === '#999999' && this.svgPath.setAttribute('style', 'fill:url(#patternDirection)');
        this.style.colourPrimary === '#cccccc' && this.svgPath.setAttribute('style', 'fill:url(#patternControl)');

        this.svgPath.setAttribute('stroke-width', '2.5');

        this.svgShadow.setAttribute('stroke-width', '3');
        this.svgShadow.setAttribute('stroke-linecap', 'round');
        this.svgShadow.setAttribute('stroke', this.style.colourSecondary);

        block.type !== 'coding_control_end' && this.svgShadowBottom.setAttribute('fill', this.style.colourTertiary);

        this.svgShadowStatement.setAttribute('fill', this.style.colourTertiary);

        this.updateShadow_(block.isShadow());
        this.updateDisabled_(!block.isEnabled() || block.getInheritedDisabled());
    }
}

class NewRenderer extends Blockly.minimalist.Renderer {
    constructor(name) {
        super(name);
    }
    makeConstants_() {
        return new NewConstantsProvider();
    }
    makePathObject(root, style) {
        return new NewPathObject(root, style, this.constants_);
    }
    makeDrawer_(block, info) {
        return new NewDrawer(block, info);
    }
    makeRenderInfo_(block) {
        return new NewRenderInfo(this, block);
    }
}

Blockly.blockRendering.register('newRenderer', NewRenderer);
