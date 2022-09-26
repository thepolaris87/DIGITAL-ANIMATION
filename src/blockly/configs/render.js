import Blockly from 'blockly';

const CustomConstantsProvider = function () {
    // Set up all of the constants from the base provider.
    // 상수들은 blockly/core/renderers/common/constants.js에서 필요한 상수 넣기
    CustomConstantsProvider.superClass_.constructor.call(this);

    this.NOTCH_WIDTH = 20;

    this.NOTCH_HEIGHT = 10;

    this.CORNER_RADIUS = 2;

    this.TAB_HEIGHT = 8;

    this.TAB_WIDTH = 8;
};
Blockly.utils.object.inherits(CustomConstantsProvider, Blockly.blockRendering.ConstantProvider);

const CustomRenderer = function (name) {
    CustomRenderer.superClass_.constructor.call(this, name);
    CustomRenderer.prototype.makeConstants_ = function () {
        return new CustomConstantsProvider();
    };
};
Blockly.utils.object.inherits(CustomRenderer, Blockly.blockRendering.Renderer);

CustomConstantsProvider.prototype.makeRectangularPreviousConn = function () {
    var width = this.NOTCH_WIDTH;
    var height = this.NOTCH_HEIGHT;

    /**
     * Since previous and next connections share the same shape
     * you can define a function to generate the path for both.
     */
    function makeMainPath(dir) {
        return Blockly.utils.svgPaths.line([
            Blockly.utils.svgPaths.point(0, height),
            Blockly.utils.svgPaths.point(dir * width, 0),
            Blockly.utils.svgPaths.point(0, -height)
        ]);
    }
    var pathLeft = makeMainPath(1);
    var pathRight = makeMainPath(-1);

    return {
        width: width,
        height: height,
        pathLeft: pathLeft,
        pathRight: pathRight
    };
};
CustomConstantsProvider.prototype.makeRectangularInputConn = function () {
    var width = this.TAB_WIDTH;
    var height = this.TAB_HEIGHT;

    /**
     * Since input and output connections share the same shape you can
     * define a function to generate the path for both.
     */
    function makeMainPath(up) {
        return Blockly.utils.svgPaths.line([
            Blockly.utils.svgPaths.point(-width, 0),
            Blockly.utils.svgPaths.point(0, -1 * up * height),
            Blockly.utils.svgPaths.point(width, 0)
        ]);
    }

    var pathUp = makeMainPath(1);
    var pathDown = makeMainPath(-1);

    return {
        width: width,
        height: height,
        pathDown: pathDown,
        pathUp: pathUp
    };
};

CustomConstantsProvider.prototype.init = function () {
    CustomConstantsProvider.superClass_.init.call(this);
    // Add calls to create shape objects for the new connection shapes.
    this.RECT_PREV_NEXT = this.makeRectangularPreviousConn();
    this.RECT_INPUT_OUTPUT = this.makeRectangularInputConn();
};

CustomConstantsProvider.prototype.shapeFor = function (connection) {
    // switch (connection.type) {
    //     case Blockly.INPUT_VALUE:
    //     case Blockly.OUTPUT_VALUE:
    //         return this.RECT_INPUT_OUTPUT;
    //     case Blockly.PREVIOUS_STATEMENT:
    //     case Blockly.NEXT_STATEMENT:
    //         return this.RECT_PREV_NEXT;
    //     default:
    //         throw Error('Unknown connection type');
    // }
    var checks = connection.getCheck();
    switch (connection.type) {
        case Blockly.INPUT_VALUE:
        case Blockly.OUTPUT_VALUE:
            // Includes doesn't work in IE.
            if (checks && checks.indexOf('Number') !== -1) {
                return this.RECT_INPUT_OUTPUT;
            }
            if (checks && checks.indexOf('String') !== -1) {
                return this.RECT_INPUT_OUTPUT;
            }
            return this.PUZZLE_TAB;
        case Blockly.PREVIOUS_STATEMENT:
        case Blockly.NEXT_STATEMENT:
            return this.NOTCH;
        default:
            throw Error('Unknown type');
    }
};

Blockly.blockRendering.register('custom_renderer', CustomRenderer);
