import Blockly from 'blockly';

// import './custom_trashcan';
class NewConstantsProvider extends Blockly.blockRendering.ConstantProvider {
    constructor(root, style, constants) {
        super(root);
        this.NO_PADDING = 0;
        this.SMALL_PADDING = 3;
        this.MEDIUM_PADDING = 5;
        this.MEDIUM_LARGE_PADDING = 8;
        this.LARGE_PADDING = 10;

        this.TALL_INPUT_FIELD_OFFSET_Y = this.MEDIUM_PADDING;

        this.TAB_HEIGHT = 15;
        this.TAB_OFFSET_FROM_TOP = 5;
        this.TAB_VERTICAL_OVERLAP = 2.5;
        this.TAB_WIDTH = 8;

        this.NOTCH_WIDTH = 15;
        this.NOTCH_HEIGHT = 4;

        this.MIN_BLOCK_WIDTH = 12;

        this.EMPTY_BLOCK_SPACER_HEIGHT = 16;

        this.DUMMY_INPUT_MIN_HEIGHT = this.TAB_HEIGHT;
        this.DUMMY_INPUT_SHADOW_MIN_HEIGHT = this.TAB_HEIGHT;

        this.CORNER_RADIUS = 16;

        this.NOTCH_OFFSET_LEFT = 15;

        this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT;
        this.STATEMENT_BOTTOM_SPACER = 0;
        this.STATEMENT_INPUT_PADDING_LEFT = 20;

        this.BETWEEN_STATEMENT_PADDING_Y = 4;

        this.TOP_ROW_MIN_HEIGHT = this.MEDIUM_PADDING;
        this.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;

        this.BOTTOM_ROW_MIN_HEIGHT = this.MEDIUM_PADDING;
        this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;

        this.ADD_START_HATS = false;

        this.START_HAT_HEIGHT = 15;
        this.START_HAT_WIDTH = 100;

        this.SPACER_DEFAULT_HEIGHT = 15;

        this.MIN_BLOCK_HEIGHT = 24;

        this.EMPTY_INLINE_INPUT_PADDING = 14.5;

        this.EMPTY_INLINE_INPUT_HEIGHT = this.TAB_HEIGHT + 11;
        this.EXTERNAL_VALUE_INPUT_PADDING = 2;

        this.EMPTY_STATEMENT_INPUT_HEIGHT = this.MIN_BLOCK_HEIGHT;

        this.START_POINT = Blockly.utils.svgPaths.moveBy(0, 0);

        this.JAGGED_TEETH_HEIGHT = 12;
        this.JAGGED_TEETH_WIDTH = 6;

        this.FIELD_TEXT_FONTSIZE = 11;
        this.FIELD_TEXT_FONTWEIGHT = 'normal';
        this.FIELD_TEXT_FONTFAMILY = 'sans-serif';
        this.FIELD_TEXT_HEIGHT = -1; // Dynamically set.
        this.FIELD_TEXT_BASELINE = -1; // Dynamically set.
        this.FIELD_BORDER_RECT_RADIUS = 16;
        this.FIELD_BORDER_RECT_HEIGHT = 16;
        this.FIELD_BORDER_RECT_X_PADDING = 5;
        this.FIELD_BORDER_RECT_Y_PADDING = 3;
        this.FIELD_BORDER_RECT_COLOUR = '#fff';
        this.FIELD_TEXT_BASELINE_CENTER = !Blockly.utils.userAgent.IE && !Blockly.utils.userAgent.EDGE;
        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 30;
        this.FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW = false;
        this.FIELD_DROPDOWN_COLOURED_DIV = false;
        this.FIELD_DROPDOWN_SVG_ARROW = true;
        this.FIELD_DROPDOWN_SVG_ARROW_PADDING = this.FIELD_BORDER_RECT_X_PADDING;
        this.FIELD_DROPDOWN_SVG_ARROW_SIZE = 15;
        this.FIELD_TEXTINPUT_BOX_SHADOW = false;
        this.FIELD_COLOUR_FULL_BLOCK = false;
        this.FIELD_COLOUR_DEFAULT_WIDTH = 26;
        this.FIELD_COLOUR_DEFAULT_HEIGHT = this.FIELD_BORDER_RECT_HEIGHT;
        this.FIELD_CHECKBOX_X_OFFSET = this.FIELD_BORDER_RECT_X_PADDING - 3;

        this.SHAPES = { PUZZLE: 1, NOTCH: 2 };
    }

    /**
     * Dispose of this constants provider.
     * Delete all DOM elements that this provider created.
     * @package
     */
    dispose() {
        if (this.embossFilter_) {
            dom.removeNode(this.embossFilter_);
        }
        if (this.disabledPattern_) {
            dom.removeNode(this.disabledPattern_);
        }
        if (this.debugFilter_) {
            dom.removeNode(this.debugFilter_);
        }
        this.cssNode_ = null;
    }

    /**
     * @return {!Object} An object containing sizing and path information about
     *     collapsed block indicators.
     * @package
     */
    makeJaggedTeeth() {
        const height = this.JAGGED_TEETH_HEIGHT;
        const width = this.JAGGED_TEETH_WIDTH;

        const mainPath = Blockly.utils.svgPaths.line([
            Blockly.utils.svgPaths.point(width, height / 4),
            Blockly.utils.svgPaths.point(-width * 2, height / 2),
            Blockly.utils.svgPaths.point(width, height / 4)
        ]);
        return { height: height, width: width, path: mainPath };
    }

    /**
     * @return {!Object} An object containing sizing and path information about
     *     start hats.
     * @package
     */
    makeStartHat() {
        const height = this.START_HAT_HEIGHT;
        const width = this.START_HAT_WIDTH;

        const mainPath = Blockly.utils.svgPaths.curve('c', [
            Blockly.utils.svgPaths.point(30, -height),
            Blockly.utils.svgPaths.point(70, -height),
            Blockly.utils.svgPaths.point(width, 0)
        ]);
        return { height: height, width: width, path: mainPath };
    }

    /**
     * @return {!Object} An object containing sizing and path information about
     *     puzzle tabs.
     * @package
     */
    makePuzzleTab() {
        const width = this.TAB_WIDTH;
        const height = this.TAB_HEIGHT;

        /**
         * Make the main path for the puzzle tab made out of a few curves (c and s).
         * Those curves are defined with relative positions.  The 'up' and 'down'
         * versions of the paths are the same, but the Y sign flips.  Forward and
         * back are the signs to use to move the cursor in the direction that the
         * path is being drawn.
         * @param {boolean} up True if the path should be drawn from bottom to top,
         *     false otherwise.
         * @return {string} A path fragment describing a puzzle tab.
         */
        function makeMainPath(up) {
            const forward = up ? -1 : 1;
            const back = -forward;

            const overlap = 2.5;
            const halfHeight = height / 2;
            const control1Y = halfHeight + overlap;
            const control2Y = halfHeight + 0.5;
            const control3Y = overlap; // 2.5

            const endPoint1 = Blockly.utils.svgPaths.point(-width, forward * halfHeight);
            const endPoint2 = Blockly.utils.svgPaths.point(width, forward * halfHeight);

            return (
                Blockly.utils.svgPaths.curve('c', [
                    Blockly.utils.svgPaths.point(0, forward * control1Y),
                    Blockly.utils.svgPaths.point(-width, back * control2Y),
                    endPoint1
                ]) + Blockly.utils.svgPaths.curve('s', [Blockly.utils.svgPaths.point(width, back * control3Y), endPoint2])
            );
        }

        // c 0,-10  -8,8  -8,-7.5  s 8,2.5  8,-7.5
        const pathUp = makeMainPath(true);
        // c 0,10  -8,-8  -8,7.5  s 8,-2.5  8,7.5
        const pathDown = makeMainPath(false);

        return {
            type: this.SHAPES.PUZZLE,
            width: width,
            height: height,
            pathDown: pathDown,
            pathUp: pathUp
        };
    }

    /**
     * @return {!Object} An object containing sizing and path information about
     *     notches.
     * @package
     */
    makeNotch() {
        const width = this.NOTCH_WIDTH;
        const height = this.NOTCH_HEIGHT;
        const innerWidth = 3;
        const outerWidth = (width - innerWidth) / 2;

        /**
         * Make the main path for the notch.
         * @param {number} dir Direction multiplier to apply to horizontal offsets
         *     along the path. Either 1 or -1.
         * @return {string} A path fragment describing a notch.
         */
        function makeMainPath(dir) {
            return Blockly.utils.svgPaths.line([
                Blockly.utils.svgPaths.point(dir * outerWidth, height),
                Blockly.utils.svgPaths.point(dir * innerWidth, 0),
                Blockly.utils.svgPaths.point(dir * outerWidth, -height)
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

    /**
     * @return {!Object} An object containing sizing and path information about
     *     inside corners.
     * @package
     */
    makeInsideCorners() {
        const radius = this.CORNER_RADIUS;

        const innerTopLeftCorner = Blockly.utils.svgPaths.arc('a', '0 0,0', radius, Blockly.utils.svgPaths.point(-radius, radius));

        const innerBottomLeftCorner = Blockly.utils.svgPaths.arc('a', '0 0,0', radius, Blockly.utils.svgPaths.point(radius, radius));

        return {
            width: radius,
            height: radius,
            pathTop: innerTopLeftCorner,
            pathBottom: innerBottomLeftCorner
        };
    }

    /**
     * @return {!Object} An object containing sizing and path information about
     *     outside corners.
     * @package
     */
    makeOutsideCorners() {
        const radius = this.CORNER_RADIUS;
        /**
         * SVG path for drawing the rounded top-left corner.
         * @const
         */
        const topLeft =
            Blockly.utils.svgPaths.moveBy(0, radius) + Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point(radius, -radius));

        /**
         * SVG path for drawing the rounded top-right corner.
         * @const
         */
        const topRight = Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point(radius, radius));

        /**
         * SVG path for drawing the rounded bottom-left corner.
         * @const
         */
        const bottomLeft = Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point(-radius, -radius));

        /**
         * SVG path for drawing the rounded bottom-right corner.
         * @const
         */
        const bottomRight = Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point(-radius, radius));

        return {
            topLeft: topLeft,
            topRight: topRight,
            bottomRight: bottomRight,
            bottomLeft: bottomLeft,
            rightHeight: radius
        };
    }

    /**
     * Get an object with connection shape and sizing information based on the
     * type of the connection.
     * @param {!RenderedConnection} connection The connection to find a
     *     shape object for
     * @return {!Object} The shape object for the connection.
     * @package
     */
    shapeFor(connection) {
        switch (connection.type) {
            case Blockly.ConnectionType.INPUT_VALUE:
            case Blockly.ConnectionType.OUTPUT_VALUE:
                return this.PUZZLE_TAB;
            case Blockly.ConnectionType.PREVIOUS_STATEMENT:
            case Blockly.ConnectionType.NEXT_STATEMENT:
                return this.NOTCH;
            default:
                throw Error('Unknown connection type');
        }
    }

    /**
     * Create any DOM elements that this renderer needs (filters, patterns, etc).
     * @param {!SVGElement} svg The root of the workspace's SVG.
     * @param {string} tagName The name to use for the CSS style tag.
     * @param {string} selector The CSS selector to use.
     * @suppress {strictModuleDepCheck} Debug renderer only included in
     * playground.
     * @package
     */
    createDom(svg, tagName, selector) {
        this.injectCSS_(tagName, selector);

        /*
    <defs>
      ... filters go here ...
    </defs>
    */
        this.defs_ = dom.createSvgElement(Svg.DEFS, {}, svg);
        /*
      <filter id="blocklyEmbossFilter837493">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="1" specularConstant="0.5"
                            specularExponent="10" lighting-color="white"
                            result="specOut">
          <fePointLight x="-5000" y="-10000" z="20000" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in"
                     result="specOut" />
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
                     k1="0" k2="1" k3="1" k4="0" />
      </filter>
    */
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

        /*
      <pattern id="blocklyDisabledPattern837493" patternUnits="userSpaceOnUse"
               width="10" height="10">
        <rect width="10" height="10" fill="#aaa" />
        <path d="M 0 0 L 10 10 M 10 0 L 0 10" stroke="#cc0" />
      </pattern>
    */
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
    }

    /**
     * Create a filter for highlighting the currently rendering block during
     * render debugging.
     * @private
     */
    createDebugFilter() {
        // Only create the debug filter once.
        if (!this.debugFilter_) {
            const debugFilter = dom.createSvgElement(
                Svg.FILTER,
                {
                    id: 'blocklyDebugFilter' + this.randomIdentifier,
                    height: '160%',
                    width: '180%',
                    y: '-30%',
                    x: '-40%'
                },
                this.defs_
            );
            // Set all gaussian blur pixels to 1 opacity before applying flood
            const debugComponentTransfer = dom.createSvgElement(Svg.FECOMPONENTTRANSFER, { result: 'outBlur' }, debugFilter);
            dom.createSvgElement(Svg.FEFUNCA, { type: 'table', tableValues: '0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1' }, debugComponentTransfer);
            // Color the highlight
            dom.createSvgElement(
                Svg.FEFLOOD,
                {
                    'flood-color': '#ff0000',
                    'flood-opacity': 0.5,
                    result: 'outColor'
                },
                debugFilter
            );
            dom.createSvgElement(
                Svg.FECOMPOSITE,
                {
                    in: 'outColor',
                    in2: 'outBlur',
                    operator: 'in',
                    result: 'outGlow'
                },
                debugFilter
            );
            this.debugFilterId = debugFilter.id;
            this.debugFilter_ = debugFilter;
        }
    }

    /**
     * Inject renderer specific CSS into the page.
     * @param {string} tagName The name of the style tag to use.
     * @param {string} selector The CSS selector to use.
     * @protected
     */
    injectCSS_(tagName, selector) {
        const cssArray = this.getCSS_(selector);
        const cssNodeId = 'blockly-renderer-style-' + tagName;
        this.cssNode_ = /** @type {!HTMLStyleElement} */ (document.getElementById(cssNodeId));
        const text = cssArray.join('\n');
        if (this.cssNode_) {
            // Already injected, update if the theme changed.
            this.cssNode_.firstChild.textContent = text;
            return;
        }
        // Inject CSS tag at start of head.
        const cssNode = /** @type {!HTMLStyleElement} */ (document.createElement('style'));
        cssNode.id = cssNodeId;
        const cssTextNode = document.createTextNode(text);
        cssNode.appendChild(cssTextNode);
        document.head.insertBefore(cssNode, document.head.firstChild);
        this.cssNode_ = cssNode;
    }

    /**
     * Get any renderer specific CSS to inject when the renderer is initialized.
     * @param {string} selector CSS selector to use.
     * @return {!Array<string>} Array of CSS strings.
     * @protected
     */
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
            selector + ' .blocklyText {',
            'fill: #fff;',
            '}',
            selector + ' .blocklyNonEditableText>rect,',
            selector + ' .blocklyEditableText>rect {',
            'fill: ' + this.FIELD_BORDER_RECT_COLOUR + ';',
            'fill-opacity: .6;',
            'stroke: none;',
            '}',
            selector + ' .blocklyNonEditableText>text,',
            selector + ' .blocklyEditableText>text {',
            'fill: #000;',
            '}',

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

            // Selection highlight.
            selector + ' .blocklySelected>.blocklyPath {',
            'stroke: #fc3;',
            'stroke-width: 3px;',
            '}',

            // Connection highlight.
            selector + ' .blocklyHighlightedConnectionPath {',
            'stroke: #fc3;',
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
            '}'
            /* clang-format on */
            /* eslint-enable indent */
        ];
    }
}
class NewRenderInfo extends Blockly.blockRendering.RenderInfo {
    constructor(renderer, block) {
        super(renderer, block);
    }
}
class NewTopRow extends Blockly.blockRendering.TopRow {}
class NewBottomRow extends Blockly.blockRendering.BottomRow {}
class NewDrawer extends Blockly.blockRendering.Drawer {
    constructor(block, info) {
        super(block, info);
    }
}

const { dom, Svg } = Blockly.utils;
class NewPathObject extends Blockly.blockRendering.PathObject {
    constructor(root, style, constants) {
        super(root, style, constants);
    }
}

class NewRenderer1 extends Blockly.minimalist.Renderer {
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

Blockly.blockRendering.register('newRenderer1', NewRenderer1);
