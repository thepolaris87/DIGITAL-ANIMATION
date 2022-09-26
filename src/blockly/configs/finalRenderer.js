import Blockly from 'blockly';
const { dom, Svg, svgPaths } = Blockly.utils;
class NewConstantsProvider extends Blockly.zelos.ConstantProvider {
    constructor(root, style, constants) {
        super(root);
        this.GRID_UNIT = 4;
        this.SMALL_PADDING = this.GRID_UNIT;
        this.MEDIUM_PADDING = 2 * this.GRID_UNIT;
        this.MEDIUM_LARGE_PADDING = 3 * this.GRID_UNIT;
        this.LARGE_PADDING = 4 * this.GRID_UNIT;

        // 변경
        this.CORNER_RADIUS = 4 * this.GRID_UNIT;

        // 변경
        this.NOTCH_WIDTH = 5 * this.GRID_UNIT;
        this.NOTCH_HEIGHT = 2 * this.GRID_UNIT;
        this.NOTCH_OFFSET_LEFT = 1 * this.CORNER_RADIUS;

        this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT;
        // this.STATEMENT_INPUT_NOTCH_OFFSET = 50;
        // 변경
        this.MIN_BLOCK_WIDTH = 2 * this.GRID_UNIT;
        this.MIN_BLOCK_HEIGHT = 4 * this.GRID_UNIT;

        // 변경
        this.EMPTY_STATEMENT_INPUT_HEIGHT = 2 * this.CORNER_RADIUS;

        this.TAB_OFFSET_FROM_TOP = 0;
        this.TOP_ROW_MIN_HEIGHT = this.CORNER_RADIUS;
        // this.TOP_ROW_MIN_HEIGHT = 0;
        this.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;

        this.BOTTOM_ROW_MIN_HEIGHT = this.CORNER_RADIUS;
        this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;
        // 여기
        this.STATEMENT_BOTTOM_SPACER = -this.CORNER_RADIUS + 8;

        this.EMPTY_INLINE_INPUT_PADDING = 4 * this.GRID_UNIT;
        this.EMPTY_INLINE_INPUT_HEIGHT = 8 * this.GRID_UNIT;

        this.DUMMY_INPUT_MIN_HEIGHT = 8 * this.GRID_UNIT;
        this.DUMMY_INPUT_SHADOW_MIN_HEIGHT = 6 * this.GRID_UNIT;

        // 변경
        this.FIELD_BORDER_RECT_RADIUS = 4 * this.GRID_UNIT;
        this.FIELD_BORDER_RECT_HEIGHT = 6 * this.GRID_UNIT;
        this.FIELD_BORDER_RECT_X_PADDING = 2.5 * this.GRID_UNIT;
        this.FIELD_BORDER_RECT_Y_PADDING = 2 * this.GRID_UNIT;

        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 8 * this.GRID_UNIT;
        this.FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW = true;
        this.FIELD_DROPDOWN_COLOURED_DIV = true;
        this.FIELD_DROPDOWN_SVG_ARROW = true;
        this.FIELD_DROPDOWN_SVG_ARROW_PADDING = this.FIELD_BORDER_RECT_X_PADDING;
        this.FIELD_TEXTINPUT_BOX_SHADOW = true;

        this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH = 12 * this.GRID_UNIT;
    }

    setFontConstants_(theme) {
        super.setFontConstants_(theme);

        // 변경
        this.FIELD_TEXT_HEIGHT = 4 * this.GRID_UNIT;
        this.FIELD_BORDER_RECT_HEIGHT = this.FIELD_TEXT_HEIGHT + this.FIELD_BORDER_RECT_Y_PADDING * 2;
        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = this.FIELD_BORDER_RECT_HEIGHT;
    }

    makeHexagonal() {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;

        function makeMainPath(height, up, right) {
            const halfHeight = height / 2;
            const width = halfHeight > maxWidth ? maxWidth : halfHeight;
            const forward = up ? -1 : 1;
            const direction = right ? -1 : 1;
            const dy = (forward * height) / 2;

            return svgPaths.lineTo(-direction * width, dy) + svgPaths.lineTo(direction * width, dy);
        }

        return {
            type: this.SHAPES.HEXAGONAL,
            isDynamic: true,
            width: function (height) {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height: function (height) {
                return height;
            },
            connectionOffsetY: function (connectionHeight) {
                return connectionHeight / 2;
            },
            connectionOffsetX: function (connectionWidth) {
                return -connectionWidth;
            },
            pathDown: function (height) {
                return makeMainPath(height, false, false);
            },
            pathUp: function (height) {
                return makeMainPath(height, true, false);
            },
            pathRightDown: function (height) {
                return makeMainPath(height, false, true);
            },
            pathRightUp: function (height) {
                return makeMainPath(height, false, true);
            }
        };
    }

    makeRounded() {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        const maxHeight = maxWidth * 2;

        function makeMainPath(blockHeight, up, right) {
            const remainingHeight = blockHeight > maxHeight ? blockHeight - maxHeight : 0;
            const height = blockHeight > maxHeight ? maxHeight : blockHeight;
            const radius = height / 2;
            return (
                svgPaths.arc('a', '0 0,1', radius, svgPaths.point((up ? -1 : 1) * radius, (up ? -1 : 1) * radius)) +
                svgPaths.lineOnAxis('v', (right ? 1 : -1) * remainingHeight) +
                svgPaths.arc('a', '0 0,1', radius, svgPaths.point((up ? 1 : -1) * radius, (up ? -1 : 1) * radius))
            );
        }

        return {
            type: this.SHAPES.ROUND,
            isDynamic: true,
            width: function (height) {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height: function (height) {
                return height;
            },
            connectionOffsetY: function (connectionHeight) {
                return connectionHeight / 2;
            },
            connectionOffsetX: function (connectionWidth) {
                return -connectionWidth;
            },
            pathDown: function (height) {
                return makeMainPath(height, false, false);
            },
            pathUp: function (height) {
                return makeMainPath(height, true, false);
            },
            pathRightDown: function (height) {
                return makeMainPath(height, false, true);
            },
            pathRightUp: function (height) {
                return makeMainPath(height, false, true);
            }
        };
    }

    makeSquared() {
        const radius = this.CORNER_RADIUS;

        function makeMainPath(height, up, right) {
            const innerHeight = height - radius * 2;
            return (
                svgPaths.arc('a', '0 0,1', radius, svgPaths.point((up ? -1 : 1) * radius, (up ? -1 : 1) * radius)) +
                svgPaths.lineOnAxis('v', (right ? 1 : -1) * innerHeight) +
                svgPaths.arc('a', '0 0,1', radius, svgPaths.point((up ? 1 : -1) * radius, (up ? -1 : 1) * radius))
            );
        }

        return {
            type: this.SHAPES.SQUARE,
            isDynamic: true,
            width: function (_height) {
                return radius;
            },
            height: function (height) {
                return height;
            },
            connectionOffsetY: function (connectionHeight) {
                return connectionHeight / 2;
            },
            connectionOffsetX: function (connectionWidth) {
                return -connectionWidth;
            },
            pathDown: function (height) {
                return makeMainPath(height, false, false);
            },
            pathUp: function (height) {
                return makeMainPath(height, true, false);
            },
            pathRightDown: function (height) {
                return makeMainPath(height, false, true);
            },
            pathRightUp: function (height) {
                return makeMainPath(height, false, true);
            }
        };
    }

    makeNotch() {
        const width = this.NOTCH_WIDTH;
        const height = this.NOTCH_HEIGHT;

        const halfWidth = width / 2;

        function makeMainPath(dir) {
            let flag;
            dir === 1 && (flag = '1 0 0 ');
            dir === -1 && (flag = '0 0 1 ');
            return svgPaths.arc('a', flag, halfWidth, `${dir * halfWidth} ${height}`) + svgPaths.arc('a', flag, halfWidth, `${dir * halfWidth} ${-height}`);
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

    getCSS_(selector) {
        return [
            /* eslint-disable indent */
            // Text.
            selector + ' .blocklyText,',
            selector + ' .blocklyFlyoutLabelText {',
            'font: ' + this.FIELD_TEXT_FONTWEIGHT + ' ' + this.FIELD_TEXT_FONTSIZE + 'pt ' + this.FIELD_TEXT_FONTFAMILY + ';',
            '}',

            // Fields.
            selector + ' .blocklyText {',
            'fill: #fff;',
            '}',
            selector + ' .blocklyNonEditableText>rect:not(.blocklyDropdownRect),',
            selector + ' .blocklyEditableText>rect:not(.blocklyDropdownRect) {',
            'fill: ' + this.FIELD_BORDER_RECT_COLOUR + ';',
            '}',
            selector + ' .blocklyNonEditableText>text,',
            selector + ' .blocklyEditableText>text,',
            selector + ' .blocklyNonEditableText>g>text,',
            selector + ' .blocklyEditableText>g>text {',
            'fill: #575E75;',
            '}',

            '.blocklyDropdownRect {stroke-width : 0px; }',

            // dropdown
            '.blocklyDraggable.>blocklyEditableText>rect { transform : translate(0,-1px); stroke-width : 0px;}',

            // dropdownfield 강제 !important
            '.blocklyMenuItem { min-width: 0 !important; font: bold 11.2pt NanumSquare !important;padding: 6px 15px !important;}',
            // '.blocklyDropdownMenu .blocklyMenuItem {padding-left: 16.4px !important;}',
            '.blocklyMenuItemCheckbox {height: 0px !important;width: 0px !important; position: absolute !important;}',
            '.blocklyMenuItemSelected .blocklyMenuItemCheckbox {margin-left: 0px !important; }',
            '.blocklyMenuItemSelected>.blocklyMenuItemContent { color : #6574FF !important;}',
            '.blocklyMenuItemHighlight { background-color: rgba(0,0,0,0) !important;}',
            '.blocklyDropDownDiv {border: none !important; box-shadow: none !important; border-radius: 12px !important; transform: translate(0px, -22px) !important; padding: 0px !important; background-color: #EFEFEF !important;}',
            '.blocklyArrowTop {border: none !important;}',
            '.blocklyDropDownArrow { width: 0px !important; height: 0px !important;}',

            // Flyout labels.
            selector + ' .blocklyFlyoutLabelText {',
            'fill: #575E75;',
            '}',

            // Bubbles.
            selector + ' .blocklyText.blocklyBubbleText {',
            'fill: #575E75;',
            '}',

            // Editable field hover.
            selector + ' .blocklyDraggable:not(.blocklyDisabled)',
            ' .blocklyEditableText:not(.editing):hover>rect,',
            selector + ' .blocklyDraggable:not(.blocklyDisabled)',
            ' .blocklyEditableText:not(.editing):hover>.blocklyPath {',
            'stroke: #fff;',
            'stroke-width: 1pt;',
            '}',

            // Text field input.
            selector + ' .blocklyHtmlInput {',
            'font-family: ' + this.FIELD_TEXT_FONTFAMILY + ';',
            'font-weight: ' + this.FIELD_TEXT_FONTWEIGHT + ';',
            'color: #575E75;',
            '}',

            // Dropdown field.
            // selector + ' .blocklyDropdownText {',
            // 'fill: #fff !important;',
            // '}',

            // Widget and Dropdown Div
            selector + '.blocklyWidgetDiv .goog-menuitem,',
            selector + '.blocklyDropDownDiv .goog-menuitem {',
            'font-family: ' + this.FIELD_TEXT_FONTFAMILY + ';',
            '}',
            // selector + '.blocklyDropDownDiv .goog-menuitem-content {',
            // 'color: #fff;',
            // '}',

            // Connection highlight.
            selector + ' .blocklyHighlightedConnectionPath {',
            'stroke: ' + this.SELECTED_GLOW_COLOUR + ';',
            '}',

            // Disabled outline paths.
            selector + ' .blocklyDisabled > .blocklyOutlinePath {',
            'fill: url(#blocklyDisabledPattern' + this.randomIdentifier + ')',
            '}',

            // Insertion marker.
            selector + ' .blocklyInsertionMarker {',
            'visibility: hidden;',
            '}',

            '.blocklyFlyout>.blocklyFlyoutBackground {',
            'stroke: #E4D9CF;',
            'stroke-width: 2px;',
            '}'
            /* eslint-enable indent */
        ];
    }
}
class NewRenderInfo extends Blockly.zelos.RenderInfo {
    constructor(renderer, block) {
        super(renderer, block);
        this._block = block;
        this._renderer = renderer;

        // no space block style name
        this.fieldBlocks = ['condition_blocks'];
    }
    addElemSpacing_() {
        for (let i = 0, row; (row = this.rows[i]); i++) {
            const oldElems = row.elements;
            row.elements = [];
            if (row.startsWithElemSpacer()) {
                // 앞부분 space
                row.elements.push(
                    new Blockly.blockRendering.InRowSpacer(this.constants_, Boolean(this.fieldBlocks.find((el) => el === this._block.styleName_)) ? 0 : 50)
                );
            }
            if (!oldElems.length) {
                continue;
            }
            for (let e = 0; e < oldElems.length - 1; e++) {
                row.elements.push(oldElems[e]);
                const spacing = this.getInRowSpacing_(oldElems[e], oldElems[e + 1]);
                row.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, spacing));
            }
            row.elements.push(oldElems[oldElems.length - 1]);
            if (row.endsWithElemSpacer()) {
                // 뒷부분 space
                row.elements.push(
                    new Blockly.blockRendering.InRowSpacer(this.constants_, Boolean(this.fieldBlocks.find((el) => el === this._block.styleName_)) ? 0 : 50)
                );
            }
        }
    }

    populateTopRow_() {
        const hasPrevious = !!this.block_.previousConnection;
        const hasHat = (this.block_.hat ? this.block_.hat === 'cap' : this.constants_.ADD_START_HATS) && !this.outputConnection && !hasPrevious;

        let cornerClass = this.topRow.hasLeftSquareCorner(this.block_) ? Blockly.blockRendering.SquareCorner : Blockly.blockRendering.RoundCorner;
        this.topRow.elements.push(new cornerClass(this.constants_));

        if (hasHat) {
            const hat = new Blockly.blockRendering.Hat(this.constants_);
            this.topRow.elements.push(hat);
            this.topRow.capline = hat.ascenderHeight;
        } else if (hasPrevious) {
            this.topRow.hasPreviousConnection = true;
            this.topRow.connection = new Blockly.blockRendering.PreviousConnection(
                this.constants_,
                /** @type {!RenderedConnection} */
                (this.block_.previousConnection)
            );
            this.topRow.elements.push(this.topRow.connection);
        }

        const precedesStatement = this.block_.inputList.length && this.block_.inputList[0].type === Blockly.inputTypes.STATEMENT;

        if (precedesStatement && !this.block_.isCollapsed()) {
            this.topRow.minHeight = this.constants_.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT;
        } else if (Boolean(this.fieldBlocks.find((el) => el === this._block.styleName_)) | !this.topRow.hasPreviousConnection) {
            // 필드 toprow space 조절
            this.topRow.minHeight = 5;
        } else {
            this.topRow.minHeight = this.constants_.TOP_ROW_MIN_HEIGHT;
        }

        cornerClass = this.topRow.hasRightSquareCorner(this.block_) ? Blockly.blockRendering.SquareCorner : Blockly.blockRendering.RoundCorner;
        this.topRow.elements.push(new cornerClass(this.constants_, 'right'));
    }

    populateBottomRow_() {
        this.bottomRow.hasNextConnection = !!this.block_.nextConnection;
        const followsStatement = this.block_.inputList.length && this.block_.inputList[this.block_.inputList.length - 1].type === Blockly.inputTypes.STATEMENT;

        if (followsStatement) {
            this.bottomRow.minHeight = this.constants_.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT;
        } else if (Boolean(this.fieldBlocks.find((el) => el === this._block.styleName_))) {
            // 필드 bottomrow space 조절
            this.bottomRow.minHeight = 5;
        } else {
            this.bottomRow.minHeight = this.constants_.BOTTOM_ROW_MIN_HEIGHT;
        }

        const leftSquareCorner = this.bottomRow.hasLeftSquareCorner(this.block_);

        if (leftSquareCorner) {
            this.bottomRow.elements.push(new Blockly.blockRendering.SquareCorner(this.constants_));
        } else {
            this.bottomRow.elements.push(new Blockly.blockRendering.RoundCorner(this.constants_));
        }

        if (this.bottomRow.hasNextConnection) {
            this.bottomRow.connection = new Blockly.blockRendering.NextConnection(
                this.constants_,
                /** @type {!RenderedConnection} */ (this.block_.nextConnection)
            );
            this.bottomRow.elements.push(this.bottomRow.connection);
        }

        const rightSquareCorner = this.bottomRow.hasRightSquareCorner(this.block_);

        if (rightSquareCorner) {
            this.bottomRow.elements.push(new Blockly.blockRendering.SquareCorner(this.constants_, 'right'));
        } else {
            this.bottomRow.elements.push(new Blockly.blockRendering.RoundCorner(this.constants_, 'right'));
        }
    }

    getSpacerRowHeight_(prev, next) {
        if (Blockly.blockRendering.Types.isTopRow(prev) && Blockly.blockRendering.Types.isBottomRow(next)) {
            return this.constants_.EMPTY_BLOCK_SPACER_HEIGHT;
        }
        const followsStatement = Blockly.blockRendering.Types.isInputRow(prev) && prev.hasStatement;
        const precedesStatement = Blockly.blockRendering.Types.isInputRow(next) && next.hasStatement;

        if (precedesStatement || followsStatement) {
            // const cornerHeight = this.constants_.INSIDE_CORNERS.rightHeight || 0;
            // 바꾼 것.
            const height = Math.max(this.constants_.NOTCH_HEIGHT, 20);
            // 원래
            // const height = Math.max(this.constants_.NOTCH_HEIGHT, cornerHeight);
            return precedesStatement && followsStatement ? Math.max(height, this.constants_.DUMMY_INPUT_MIN_HEIGHT) : height;
        }
        if (Blockly.blockRendering.Types.isTopRow(prev)) {
            const topRow = /** @type {!TopRow} */ (prev);
            if (!topRow.hasPreviousConnection && (!this.outputConnection || this.hasStatementInput)) {
                return Math.abs(this.constants_.NOTCH_HEIGHT - this.constants_.CORNER_RADIUS);
            }
            return this.constants_.NO_PADDING;
        }
        if (Blockly.blockRendering.Types.isBottomRow(next)) {
            const bottomRow = /** @type {!BottomRow} */ (next);
            if (!this.outputConnection) {
                const topHeight =
                    Math.max(this.topRow.minHeight, Math.max(this.constants_.NOTCH_HEIGHT, this.constants_.CORNER_RADIUS)) - this.constants_.CORNER_RADIUS;
                return topHeight;
            } else if (!bottomRow.hasNextConnection && this.hasStatementInput) {
                return Math.abs(this.constants_.NOTCH_HEIGHT - this.constants_.CORNER_RADIUS);
            }
            return this.constants_.NO_PADDING;
        }
        return this.constants_.MEDIUM_PADDING;
    }
}

class NewDrawer extends Blockly.zelos.Drawer {
    constructor(block, info) {
        super(block, info);
        this._block = block;
        this._info = info;
        this.shadowRightG = [];
        this.shadowBottomG = [];
    }

    drawOutline_() {
        if (
            // field 부분
            this.info_.outputConnection &&
            this.info_.outputConnection.isDynamicShape &&
            !this.info_.hasStatementInput &&
            !this.info_.bottomRow.hasNextConnection
        ) {
            this.drawFlatTop_();
            this.drawRightDynamicConnection_();
            this.drawFlatBottom_();
            this.drawLeftDynamicConnection_();
        } else {
            this.drawOutline__();
        }
    }

    drawOutline__() {
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
                this.drawRightSideRow_(row);
            }
        }

        this.drawBottom_();
        this.drawLeft_();

        // 그림자
        this.shadowRightG.forEach((el, i) => this.block_.pathObject.setShadowRight(el, i));
        this.shadowBottomG.forEach((el, i) => {
            if ((this.shadowBottomG.length - 1 === i) & (this.shadowBottomG.length === 1)) {
                this.block_.pathObject.setShadowBottom(el, i);
            } else if (this.shadowBottomG.length - 1 !== i) {
                this.block_.pathObject.setShadowBottom(el, i);
            }
        });
    }

    drawRightSideRow_(row) {
        let rightPath = Blockly.utils.svgPaths.moveBy(this.info_.width - 1, row.yPos + row.height - 1);

        if (row.height <= 0) return;
        if (Blockly.blockRendering.Types.isSpacer(row)) {
            const spacerRow = /** @type {!SpacerRow} */ (row);
            if (spacerRow.precedesStatement || spacerRow.followsStatement) {
                const cornerHeight = Math.max(this.constants_.INSIDE_CORNERS.rightHeight, 0);
                const remainingHeight = spacerRow.height - (spacerRow.precedesStatement ? cornerHeight : 0);

                rightPath += remainingHeight > 0 ? svgPaths.lineOnAxis('V', spacerRow.yPos + remainingHeight) : '';
                this.outlinePath_ +=
                    (spacerRow.followsStatement ? this.constants_.INSIDE_CORNERS.pathBottomRight : '') +
                    (remainingHeight > 0 ? svgPaths.lineOnAxis('V', spacerRow.yPos + remainingHeight) : '') +
                    (spacerRow.precedesStatement ? this.constants_.INSIDE_CORNERS.pathTopRight : '');
                return;
            }
        }
        this.outlinePath_ += svgPaths.lineOnAxis('V', row.yPos + row.height);

        rightPath += 'a8,12,0,0,1,-8,12';
        if (row.height > row.minHeight) {
            rightPath += svgPaths.lineOnAxis('v', -row.height - this.constants_.CORNER_RADIUS);
        } else {
            rightPath += svgPaths.lineOnAxis('v', -row.height - this.constants_.CORNER_RADIUS - 4);
        }
        rightPath += 'a8,8,1,0,0,-6,-7 ';
        rightPath += 'a16,16,0,0,1,14,16';

        if (Blockly.blockRendering.Types.isSpacer(row)) return;
        this.shadowRightG.push(rightPath);
    }

    drawStatementInput_(row) {
        const input = /** @type {!StatementInput} */ (row.getLastInput());
        const x = input.xPos + input.notchOffset + input.shape.width;
        const innerTopLeftCorner =
            input.shape.pathRight +
            svgPaths.lineOnAxis('h', -(input.notchOffset - this.constants_.INSIDE_CORNERS.width)) +
            this.constants_.INSIDE_CORNERS.pathTop;

        const innerHeight = row.height - 2 * this.constants_.INSIDE_CORNERS.height;

        const innerBottomLeftCorner =
            this.constants_.INSIDE_CORNERS.pathBottom +
            svgPaths.lineOnAxis('h', input.notchOffset - this.constants_.INSIDE_CORNERS.width) +
            (input.connectedBottomNextConnection ? '' : input.shape.pathLeft);

        this.outlinePath_ +=
            svgPaths.lineOnAxis('H', x) +
            innerTopLeftCorner +
            svgPaths.lineOnAxis('v', innerHeight) +
            innerBottomLeftCorner +
            svgPaths.lineOnAxis('H', row.xPos + row.width);

        this.positionStatementInputConnection_(row);

        // add left shadow
        let rightPath = Blockly.utils.svgPaths.moveBy(this.info_.width - this.constants_.CORNER_RADIUS - 1, row.yPos - 1);
        rightPath += 'a10,8,0,0,1,10,-5 a5,4,0,0,1,4,-2.5 l0,-7 z';
        this.shadowRightG.push(rightPath);
        // bottom shadow
        let bottomPath = Blockly.utils.svgPaths.moveBy(this.info_.width - this.constants_.CORNER_RADIUS, row.yPos - 1);
        bottomPath +=
            svgPaths.lineOnAxis('H', x) +
            innerTopLeftCorner +
            svgPaths.lineOnAxis('v', -this.constants_.CORNER_RADIUS - 1) +
            svgPaths.arc('a', '0 0,1', 8, svgPaths.point(8, -8)) +
            svgPaths.lineOnAxis('H', this.info_.width - this.constants_.CORNER_RADIUS - 1) +
            svgPaths.arc('a', '1 0,0', 8, svgPaths.point(8, -8)) +
            'l2,12 a10,8,0,0,1,-10,5';
        this.shadowBottomG.push(bottomPath);
    }

    drawBottom_() {
        const bottomRow = this.info_.bottomRow;
        const elems = bottomRow.elements;
        this.positionNextConnection_();

        let rightCornerYOffset = 0;
        let outlinePath = '';
        let shadowPath = '';
        for (let i = elems.length - 1, elem; (elem = elems[i]); i--) {
            if (Blockly.blockRendering.Types.isNextConnection(elem) && elem instanceof Blockly.blockRendering.Connection) {
                outlinePath += elem.shape.pathRight;
                shadowPath += elem.shape.pathRight;
            } else if (Blockly.blockRendering.Types.isLeftSquareCorner(elem)) {
                outlinePath += svgPaths.lineOnAxis('H', bottomRow.xPos);
                shadowPath += svgPaths.lineOnAxis('H', bottomRow.xPos);
            } else if (Blockly.blockRendering.Types.isLeftRoundedCorner(elem)) {
                outlinePath += this.constants_.OUTSIDE_CORNERS.bottomLeft;
            } else if (Blockly.blockRendering.Types.isRightRoundedCorner(elem)) {
                outlinePath += this.constants_.OUTSIDE_CORNERS.bottomRight;
                rightCornerYOffset = this.constants_.OUTSIDE_CORNERS.rightHeight;
            } else if (Blockly.blockRendering.Types.isSpacer(elem)) {
                outlinePath += svgPaths.lineOnAxis('h', elem.width * -1);
                shadowPath += svgPaths.lineOnAxis('h', elem.width * -1);
            }
        }

        this.outlinePath_ += svgPaths.lineOnAxis('V', bottomRow.baseline - rightCornerYOffset);
        this.outlinePath_ += outlinePath;

        let leftPath = Blockly.utils.svgPaths.moveBy(1, bottomRow.yPos - 1);

        leftPath += 'a8,12,1,0,0,8,12' + svgPaths.lineOnAxis('v', -bottomRow.yPos - 4) + 'a8,8,0,0,1,6,-7 a16,16,1,0,0,-14,16 z';
        this.block_.pathObject.setShadowLeft(leftPath);

        let bottomPath = Blockly.utils.svgPaths.moveBy(bottomRow.width - this.constants_.CORNER_RADIUS, bottomRow.yPos + this.constants_.CORNER_RADIUS);
        bottomPath +=
            shadowPath +
            'a10,8,0,0,1,-10,-5 l2,-12 a8,8,1,0,0,8,8' +
            svgPaths.lineOnAxis('H', bottomRow.width - this.constants_.CORNER_RADIUS) +
            'a8,8,1,0,0,8,-8 l2,12 a10,8,0,0,1,-10,5';

        this.shadowBottomG.push(bottomPath);
    }
}

class NewPathObject extends Blockly.zelos.PathObject {
    constructor(root, style, constants) {
        super(root, style, constants);
        this.shadowRight = dom.createSvgElement(Svg.G, { class: 'customShadowRightGroup' }, root);
        this.shadowLeft = dom.createSvgElement(Svg.PATH, { class: 'customShadowLeft', fill: 'none' }, root);
        this.shadowBottom = dom.createSvgElement(Svg.G, { class: 'customShadowBottomGroup' }, root);
    }

    initChild(g) {
        if (g.length > 0) {
            g.forEach((el) => dom.removeNode(el));
        }
    }

    setShadowRight(d, i) {
        const findClass = this.shadowRight.querySelectorAll(`.customShadowRight_${i}`);
        this.initChild(findClass);

        const newShadowRignt = dom.createSvgElement(Svg.PATH, { class: `customShadowRight_${i}` }, this.shadowRight);
        newShadowRignt.setAttribute('d', d);
        newShadowRignt.setAttribute('stroke-width', '1');
        newShadowRignt.setAttribute('stroke-linecap', 'round');
        newShadowRignt.setAttribute('stroke', this.style.colourSecondary);
        newShadowRignt.setAttribute('fill', this.style.colourSecondary);
    }
    setShadowBottom(d, i) {
        const findClass = this.shadowBottom.querySelectorAll(`.customShadowBottom_${i}`);
        this.initChild(findClass);

        const newShadowBottom = dom.createSvgElement(Svg.PATH, { class: `customShadowBottom_${i}` }, this.shadowBottom);
        newShadowBottom.setAttribute('d', d);
        newShadowBottom.setAttribute('stroke-width', '1');
        newShadowBottom.setAttribute('stroke-linecap', 'round');
        newShadowBottom.setAttribute('stroke', this.style.colourTertiary);
        newShadowBottom.setAttribute('fill', this.style.colourTertiary);
    }
    setShadowLeft(d) {
        this.shadowLeft.setAttribute('d', d);
        this.shadowLeft.setAttribute('stroke-width', '1');
        this.shadowLeft.setAttribute('stroke-linecap', 'round');
        this.shadowLeft.setAttribute('stroke', this.style.colourSecondary);
        this.shadowLeft.setAttribute('fill', this.style.colourSecondary);
    }
}

class NewRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }
    makeConstants_() {
        return new NewConstantsProvider();
    }
    makePathObject(root, style) {
        return new NewPathObject(root, style, this.constants_);
    }
    makeRenderInfo_(block) {
        return new NewRenderInfo(this, block);
    }
    makeDrawer_(block, info) {
        return new NewDrawer(block, info);
    }
}

Blockly.blockRendering.register('finalRenderer', NewRenderer);
