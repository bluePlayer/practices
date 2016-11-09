function runTests(qunit, frnConstrObj, phaser) {
    'use strict';

    var utils = frnConstrObj.Utility,
        frnConst = frnConstrObj.Const,
        frnConstGr = frnConst.Graphics,
        frnConstApp = frnConst.Application,
        frnConstAppKeys = frnConstApp.Keys,
        y = frnConstGr.DEFAULT_GRAPHIC_Y,
        millsPerPixelForDepth = frnConstApp.FrnData.millsPerPixelForDepth.DEFAULT_VAL,
        millPerPixel = frnConstApp.FrnData.millsPerPixel.DEFAULT_VAL,
        cupboardHeight = frnConstApp.FrnData.cupboardHeight.DEFAULT_VAL,
        cupboardHeightPx = utils.convertMillsToPixels(cupboardHeight, millPerPixel),
        cupboardDepth = frnConstApp.FrnData.cupboardDepth.DEFAULT_VAL,
        cupboardDepthPx = utils.convertMillsToPixels(cupboardDepth, millsPerPixelForDepth),
        halfCupboardDepthPx = utils.decimalRound((cupboardDepthPx / 2), frnConst.DECIMAL_ROUND_EXP),
        halfCupboardHeightPx = utils.decimalRound((cupboardHeightPx / 2), frnConst.DECIMAL_ROUND_EXP),
        halfRearHeightPx = cupboardHeightPx - cupboardDepthPx,
        lowerYBound = 0,
        upperYBound = 0,
        hashColorKey = "",
        defaultColorShiftPercent = frnConstGr.DEFAULT_COLOR_SHIFT_PERCENT,
        forInAssertFunction = null,
        listColorsInArray = null,
        logMyProperties = function () {
            console.log("UtilityTests - Mills per pixel: " + millPerPixel +
                        ", mills per pixel for depth: " + millsPerPixelForDepth +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", rearHeight/2: " + halfRearHeightPx +
                        ", lowerY: " + lowerYBound +
                        ", upperY: " + upperYBound);
        },

        /**
         * @method logForInnerShelveSlotMatrix
         * @param {object} details contains:
         * result:boolean,
         * actual: object, expected: object,
         * message: string, source: string, module: string, name: string,
         * runtime: number
         */
        logForUtilityTests = function (details) {
            var loc = "",
                output = "";

            if (details.result) {
                return;
            }

            loc = details.module + ": " + details.name + ": ";
            output = "FAILED: " + loc + (details.message ? details.message + ", " : "");

            if (details.actual) {
                output += "expected: " + details.expected + ", actual: " + details.actual;
            }

            if (details.source) {
                output += details.source;
            }

            console.log(output);
        };

    qunit.log(logForUtilityTests);

    qunit.module("countNodesInObject(obj)");
    // TODO countNodesInObject(obj) is not working - fix it
    qunit
        .cases
        .init([
            {obj: {node1: 1, node2: 2, node3: 3}, expected: 0},
            {obj: {node1: {node4: 4}, node2: 2, node3: 3}, expected: 1},
            {obj: {node1: {node4: 4}, node2: 2, node3: {node5:5 , node6: 6}}, expected: 2},
            {obj: {node1: {node4: {node8: 8}}, node2: 2, node3: {node5: {node7: 7} , node6: {node9: 9}}}, expected: 4}
        ])
        .test("Counts how many subobjects are there in the given one. Should traverse the whole object tree.", function (params, assert) {
            var calculated = utils.countNodesInObject(params.obj);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("rowOrColSet(rowOrCol, numOfRowsOrCols)");

    qunit
        .cases
        .init([
            {rowOrCol: 5, numOfRowsOrCols: 10, expected: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
            {rowOrCol: 3, numOfRowsOrCols: 10, expected: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
            {rowOrCol: 2, numOfRowsOrCols: 10, expected: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
            {rowOrCol: 0, numOfRowsOrCols: 10, expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {rowOrCol: 7, numOfRowsOrCols: 5,  expected: [7, 8, 9, 10, 11]},
            {rowOrCol: 9, numOfRowsOrCols: 3,  expected: [9, 10, 11]},
            {rowOrCol: 6, numOfRowsOrCols: 5,  expected: [6, 7, 8, 9, 10]},
            {rowOrCol: 6, numOfRowsOrCols: 2,  expected: [6, 7]},
            {rowOrCol: 4, numOfRowsOrCols: 8,  expected: [4, 5, 6, 7, 8, 9, 10, 11]},
            {rowOrCol: 7, numOfRowsOrCols: 7,  expected: [7, 8, 9, 10, 11, 12, 13]},
            {rowOrCol: 8, numOfRowsOrCols: 8,  expected: [8, 9, 10, 11, 12, 13, 14, 15]}
        ])
        .test("Should return an array of indexes starting with rowOrCol sequentially to numOfRowsOrCols.", function (params, assert) {
            var calculated = utils.rowOrColSet(params.rowOrCol, params.numOfRowsOrCols);

            assert.deepEqual(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("rowOrColShiftMax(rowOrCol, numOfRowsOrCols, maxValue)");

    qunit
        .cases
        .init([
            {rowOrCol: 5, numOfRowsOrCols: 10, maxValue: 3, expected: 3},
            {rowOrCol: 3, numOfRowsOrCols: 10, maxValue: 3, expected: 3},
            {rowOrCol: 2, numOfRowsOrCols: 10, maxValue: 3, expected: 3},
            {rowOrCol: 0, numOfRowsOrCols: 10, maxValue: 3, expected: 3},
            {rowOrCol: 7, numOfRowsOrCols: 10, maxValue: 3, expected: 2},
            {rowOrCol: 9, numOfRowsOrCols: 10, maxValue: 3, expected: 0},
            {rowOrCol: 6, numOfRowsOrCols: 10, maxValue: 3, expected: 3},
            {rowOrCol: 6, numOfRowsOrCols: 10, maxValue: 5, expected: 3},
            {rowOrCol: 4, numOfRowsOrCols: 10, maxValue: 5, expected: 5},
            {rowOrCol: 7, numOfRowsOrCols: 10, maxValue: 5, expected: 2},
            {rowOrCol: 8, numOfRowsOrCols: 10, maxValue: 5, expected: 1}
        ])
        .test("Should return number of max. value of rows/columns or number of rows/columns until numOfRowsOrCols.", function (params, assert) {
            var calculated = utils.rowOrColShiftMax(params.rowOrCol, params.numOfRowsOrCols, params.maxValue);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("rowOrColShiftMin(rowOrCol, minValue)");

    qunit
        .cases
        .init([
            {rowOrCol: 5, minValue: 3, expected: 3},
            {rowOrCol: 3, minValue: 3, expected: 3},
            {rowOrCol: 2, minValue: 3, expected: 2},
            {rowOrCol: 0, minValue: 3, expected: 0},
            {rowOrCol: 9, minValue: 3, expected: 3},
            {rowOrCol: 10, minValue: 3, expected: 3},
            {rowOrCol: 9, minValue: 10, expected: 9}

        ])
        .test("Should return number of min. value of rows/columns or number of rows/columns until zero.", function (params, assert) {
            var calculated = utils.rowOrColShiftMin(params.rowOrCol, params.minValue);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("zeroBasedRange(value, minRange, maxRange)");

    qunit
        .cases
        .init([
            {value: 5, minRange: 0, maxRange: 10, expected: 5},
            {value: -5, minRange: 0, maxRange: 10, expected: 0},
            {value: 12, minRange: 0, maxRange: 10, expected: 10},
            {value: 10, minRange: 0, maxRange: 10, expected: 10},
            {value: 0, minRange: 0, maxRange: 10, expected: 0},
            {value: 5, minRange: 2, maxRange: 10, expected: 5},
            {value: -5, minRange: 2, maxRange: 10, expected: 2},
            {value: 12, minRange: 2, maxRange: 10, expected: 10},
            {value: 10, minRange: 2, maxRange: 10, expected: 10},
            {value: 2, minRange: 2, maxRange: 10, expected: 2},
            {value: 5.5, minRange: 0, maxRange: 10, expected: 5.5},
            {value: -5.5, minRange: 0, maxRange: 10, expected: 0},
            {value: 12.12, minRange: 0, maxRange: 10, expected: 10},
            {value: 10.1, minRange: 0, maxRange: 10, expected: 10},
            {value: 0, minRange: 0, maxRange: 10, expected: 0},
            {value: 5.5, minRange: 2, maxRange: 10, expected: 5.5},
            {value: -5.5, minRange: 2, maxRange: 10, expected: 2},
            {value: 12.12, minRange: 2, maxRange: 10, expected: 10},
            {value: 10.1, minRange: 2, maxRange: 10, expected: 10},
            {value: 2.2, minRange: 2, maxRange: 10, expected: 2.2}
        ])
        .test("should return minRange for lower value, maxRange - 1 for above value and given value if in range (minRange <= value < maxRange)", function (params, assert) {
            var calculated = utils.zeroBasedRange(params.value, params.minRange, params.maxRange);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("bubleSort(array, sortType), -1 is ASCENDING, 1 is DESCENDING");

    qunit
        .cases
        .init([
            {array: [1, 2, 9, 3, 4, 5, 6, 7, 8, 0], sortType: phaser.Group.SORT_ASCENDING, expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {array: [1, 9, 9, 3, 3, 5, 6, 7, 7, 0], sortType: phaser.Group.SORT_ASCENDING, expected: [0, 1, 3, 3, 5, 6, 7, 7, 9, 9]},
            {array: [-1, 0, -2, -9, -3, -8, -4, -7, -5, -6], sortType: phaser.Group.SORT_ASCENDING, expected: [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0]},
            {array: [-1, 0, -2, -9, -8, -8, -4, -4, -5, -5], sortType: phaser.Group.SORT_ASCENDING, expected: [-9, -8, -8, -5, -5, -4, -4, -2, -1, 0]},
            {array: [5, -5, -4, 4, -3, 3, -2, 2, 1, -1, 0], sortType: phaser.Group.SORT_ASCENDING, expected: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]},
            {array: [-5, -5, -4, 4, -3, -3, -2, 2, 1, -1, 0], sortType: phaser.Group.SORT_ASCENDING, expected: [-5, -5, -4, -3, -3, -2, -1, 0, 1, 2, 4]},
            {array: [1.1, 2.2, 9.9, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 0], sortType: phaser.Group.SORT_ASCENDING, expected: [0, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9]},
            {array: [1, 2, 9, 3, 4, 5, 6, 7, 8, 0], sortType: phaser.Group.SORT_DESCENDING, expected: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]},
            {array: [1, 0, 2, 9, 9, 8, 4, 4, 6, 6], sortType: phaser.Group.SORT_DESCENDING, expected: [9, 9, 8, 6, 6, 4, 4, 2, 1, 0]},
            {array: [-1, 0, -2, -9, -3, -8, -4, -7, -5, -6], sortType: phaser.Group.SORT_DESCENDING, expected: [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]},
            {array: [5, -5, -4, 4, -3, 3, -2, 2, 1, -1, 0], sortType: phaser.Group.SORT_DESCENDING, expected: [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5]},
            {array: [5, -5, 4, 4, -3, 3, 2, 2, 1, -1, 0], sortType: phaser.Group.SORT_DESCENDING, expected: [5, 4, 4, 3, 2, 2, 1, 0, -1, -3, -5]},
            {array: [-5, -5, 4, -4, -3, -3, 2, 2, 1, -1, 0], sortType: phaser.Group.SORT_DESCENDING, expected: [4, 2, 2, 1, 0, -1, -3, -3, -4, -5, -5]},
            {array: [1.1, 2.2, 9.9, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 0], sortType: phaser.Group.SORT_DESCENDING, expected: [9.9, 8.8, 7.7, 6.6, 5.5, 4.4, 3.3, 2.2, 1.1, 0]}
        ])
        .test("", function (parameters, assert) {
            var calculated = utils.bubleSort(parameters.array, parameters.sortType);

            assert.deepEqual(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    qunit.module("makeShelveDataObject(x, y, shiftX, shiftY, frameHeight, halfCupboardDepth, rearHeight, thickness)");

    qunit.module("convertTwoDimIndexesToOneDimIndex(cols, currentRow, currentCol)");
    qunit
        .cases
        .init([
            {twoDimArray: [[9, 8, 7], [6, 5, 4], [3, 2, 1]]},
            {twoDimArray: [[9, 8, 7], [6, 5, 4], [3, 2, 1], [0, -1, -2]]},
            {twoDimArray: [[9, 8, 7, 6], [5, 4, 3, 2], [1, 0, -1 , -2]]}
        ])
        .test("should convert two-dim array index [i][j] to one-dim array index [k]", function (parameters, assert) {
            var calculated = 0,
                expected = 0,
                i = 0, j = 0, k = 0,
                twoDimArray = parameters.twoDimArray,
                oneDimArray = [],
                cols = twoDimArray[0].length;

            for (i = 0; i < twoDimArray.length; i += 1) {
                for (j = 0; j < twoDimArray[i].length; j += 1, k += 1) {
                    oneDimArray.push(twoDimArray[i][j]);

                }
            }

            k = 0;
            for (i = 0; i < twoDimArray.length; i += 1) {
                for (j = 0; j < twoDimArray[i].length; j += 1, k += 1) {
                    calculated = oneDimArray[utils.convertTwoDimIndexesToOneDimIndex(cols, i, j)];
                    expected = oneDimArray[k];
                    assert.equal(calculated, expected, "expected: " + expected + ", calculated: " + calculated);
                }
            }

        });

    qunit.module("validateNumericFrnData(dataType, value)");

    // validation tests for millimeters per pixel
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: 5, expected: 5},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: "5", expected: 5},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.MILLS_PER_PIXEL_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: 8, expected: 8},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: "8", expected: 8},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: 8.123456, expected: 8.123456},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: "8.123456", expected: 8.123456},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: 11, expected: 10},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_KEY, value: "11", expected: 10}
        ])
        .test("Mills per Pixel(min = 7, max = 10, default = 7)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    // validation tests for millimeters per pixel for depth
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: 11, expected: 16},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: "11", expected: 16},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: 18, expected: 18},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: "18", expected: 18},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: 18.123456, expected: 18.123456},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: "18.123456", expected: 18.123456},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: 23, expected: 20},
             {dataType: frnConstApp.Keys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value: "23", expected: 20}
        ])
        .test("Mills per Pixel for Depth(min = 16, max = 20, default = 16)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    // validation tests for cupboard width
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: 500, expected: 700},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: "500", expected: 700},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.CUPBOARD_WIDTH_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: 1345, expected: 1345},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: "1345", expected: 1345},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: 1345.12345, expected: 1345.12345},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: "1345.12345", expected: 1345.12345},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: 5500, expected: 5000},
             {dataType: frnConstApp.Keys.CUPBOARD_WIDTH_KEY, value: "5500", expected: 5000}
        ])
        .test("Cupboard Width(min = 700, max = 5000, default = 3000)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    // validation tests for cupboard height
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: 500, expected: 1000},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: "500", expected: 1000},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.CUPBOARD_HEIGHT_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: 1345, expected: 1345},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: "1345", expected: 1345},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: 1345.12345, expected: 1345.12345},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: "1345.12345", expected: 1345.12345},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: 3500, expected: 3000},
             {dataType: frnConstApp.Keys.CUPBOARD_HEIGHT_KEY, value: "3500", expected: 3000}
        ])
        .test("Cupboard Height(min = 1000, max = 3000, default = 2500)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    // validation tests for cupboard depth
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: 150, expected: 500},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: "150", expected: 500},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.CUPBOARD_DEPTH_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: 675, expected: 675},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: "675", expected: 675},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: 675.12345, expected: 675.12345},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: "675.12345", expected: 675.12345},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: 1500, expected: 1000},
             {dataType: frnConstApp.Keys.CUPBOARD_DEPTH_KEY, value: "1500", expected: 1000}
        ])
        .test("Cupboard Depth(min = 500, max = 1000, default = 700)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    // validation tests for left shelve width
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: 100, expected: 150},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: "100", expected: 150},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: 350, expected: 350},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: "350", expected: 350},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: 350.12345, expected: 350.12345},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: "350.12345", expected: 350.12345},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: 700, expected: 500},
             {dataType: frnConstApp.Keys.LEFT_SHELVE_WIDTH_KEY, value: "700", expected: 500}
        ])
        .test("Left Shelve Width(min = 150, max = 500, default = 250)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    // validation tests for right shelve width
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: 100, expected: 150},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: "100", expected: 150},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: 350, expected: 350},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: "350", expected: 350},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: 350.12345, expected: 350.12345},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: "350.12345", expected: 350.12345},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: 700, expected: 500},
             {dataType: frnConstApp.Keys.RIGHT_SHELVE_WIDTH_KEY, value: "700", expected: 500}
        ])
        .test("Right Shelve Width(min = 150, max = 500, default = 250)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    // validation tests for thickness
    qunit
        .cases
        .init([
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: 3, expected: 5},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: "3", expected: 5},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: "~!@#$%^*()", expected: frnConstApp.FrnData[frnConstApp.Keys.THICKNESS_KEY].DEFAULT_VAL},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: 35, expected: 35},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: "35", expected: 35},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: 35.12345, expected: 35.12345},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: "35.12345", expected: 35.12345},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: 60, expected: 50},
             {dataType: frnConstApp.Keys.THICKNESS_KEY, value: "60", expected: 50}
        ])
        .test("Thickness(min = 5, max = 50, default = 30)", function (parameters, assert) {
            var calculated = utils.validateNumericFrnData(parameters.dataType, parameters.value);

            assert.equal(calculated, parameters.expected, "expected: " + parameters.expected + ", calculated: " + calculated);
        });

    qunit.module("isTruthy(value) function");

    qunit.test("value = true", function(assert) {
        var expected = true,
            calculated = utils.isTruthy(true);
        assert.ok(calculated, "expected: " + expected + ", calculated: " + calculated);
    });

    qunit
        .cases
        .init([
             {value: false},
             {value: ""},
             {value: undefined},
             {value: null},
             {value: 0},
             {value: NaN}
        ])
        .test("", function (params, assert) {
            var calculated = utils.isTruthy(params.value);

            assert.notOk(calculated, "calculated: " + calculated + ", value: " + params.value);
        });

    qunit.module("getRGBHexValue(hashString, length)");

    qunit
        .cases
        .init([
             {t: 1, hashString: '#abcdef', length: frnConstGr.NUM_OF_COLOR_DIGITS, expected: "abcdef"},
             {t: 2, hashString: 'abcdef', length: frnConstGr.NUM_OF_COLOR_DIGITS, expected: "abcdef"},
             {t: 3, hashString: 'abcde#fghijx0123456789aaa', length: frnConstGr.NUM_OF_COLOR_DIGITS, expected: "abcdef"},
             {t: 4, hashString: "122';;344#fghijx0123456789aaa", length: frnConstGr.NUM_OF_COLOR_DIGITS, expected: "122344"},
             {t: 5, hashString: "@#$%caf**fee?;,;/'", length: frnConstGr.NUM_OF_COLOR_DIGITS, expected: "caffee"},
             {t: 6, hashString: "avf", length: frnConstGr.NUM_OF_COLOR_DIGITS, expected: "0000af"},

             {t: 7, hashString: "a", length: frnConstGr.NUM_OF_COLOR_CHANNEL_DIGITS, expected: "0a"},
             {t: 8, hashString: "3a", length: frnConstGr.NUM_OF_COLOR_CHANNEL_DIGITS, expected: "3a"}
        ])
        .test("Returns string which contains only alpha-numeric chars of the given length. Spec. chars are avoided and chars above the length are ommited.", function (params, assert) {
            var calculated = utils.getRGBHexValue(params.hashString, params.length);

            assert.equal(calculated, params.expected, "test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("getDarkerHexColor(rgbString, prcnt)");

    qunit
        .cases
        .init([
            {name: 'MAT_DARK_BLUE', hashValue: "3d6990", percent: defaultColorShiftPercent, expected: "3034988"},
            {name: 'MAT_BLACK', hashValue: "000000", percent: defaultColorShiftPercent, expected: "000000"},
            {name: 'BACKGROUND_COLOR', hashValue: "C0C0C0", percent: defaultColorShiftPercent, expected: "9474192"},
            {name: 'MAT_DARK_BLUE', hashValue: "#3d6990", percent: defaultColorShiftPercent, expected: "3034988"},
            {name: 'MAT_ANTIQUE_WHITE', hashValue: "#efcf9f", percent: defaultColorShiftPercent, expected: "11770743"},
            {name: 'MAT_BLACK', hashValue: "#000000", percent: defaultColorShiftPercent, expected: "0"},
            {name: 'MAT_WHITE', hashValue: "#ffffff", percent: defaultColorShiftPercent, expected: "12566463"},
            {name: 'MAT_DARK_BROWN', hashValue: "#3b1901", percent: defaultColorShiftPercent, expected: "2888449"},
            {name: 'MAT_GREY', hashValue: "#9c9c9c", percent: defaultColorShiftPercent, expected: "7697781"},
            {name: 'MAT_RED', hashValue: "#bf1717", percent: defaultColorShiftPercent, expected: "9376017"},
            {name: 'MAT_PURPLE', hashValue: "#ff00f7", percent: defaultColorShiftPercent, expected: "12517561"},
            {name: 'MAT_GREEN', hashValue: "#569922", percent: defaultColorShiftPercent, expected: "4289306"},
            {name: 'MAT_VIOLET', hashValue: "#744c78", percent: defaultColorShiftPercent, expected: "5716314"},
            {name: 'MAT_BROWN', hashValue: "#8b592b", percent: defaultColorShiftPercent, expected: "6832928"},
            {name: 'MAT_ORANGE', hashValue: "#f77511", percent: defaultColorShiftPercent, expected: "12146701"},
            {name: 'MAT_YELLOW', hashValue: "#ffd000", percent: defaultColorShiftPercent, expected: "12557312"},
            {name: 'MAT_BLUE', hashValue: "#01a2dd", percent: defaultColorShiftPercent, expected: "96934"},
            {name: 'DOOR_BLACK', hashValue: "#211e1e", percent: defaultColorShiftPercent, expected: "1644311"},
            {name: 'DOOR_LIGHT_GRAY', hashValue: "#bdb9b9", percent: defaultColorShiftPercent, expected: "9341835"},
            {name: 'DOOR_BROWN', hashValue: "#573d2a", percent: defaultColorShiftPercent, expected: "4271648"},
            {name: 'DOOR_LIGHT_BROWN', hashValue: "#ccbc56", percent: defaultColorShiftPercent, expected: "10063169"},
            {name: 'DOOR_GRAY', hashValue: "#696969", percent: defaultColorShiftPercent, expected: "5197647"}
        ])
        .test("Should calculate hex/decimal value out of CSS value ", function (params, assert) {
            var calculated = utils.getDarkerHexColor(params.hashValue, params.percent);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("getHexColor(hashString)");

    qunit
        .cases
        .init([
            {t: 1, name: '', hashValue: "#abcdef", expected: parseInt("abcdef", 16)},
            {t: 2, name: '', hashValue: "#123456", expected: parseInt("123456", 16)},
            {t: 3, name: '', hashValue: "#123abc", expected: parseInt("123abc", 16)},
            {t: 4, name: '', hashValue: "123abc", expected: parseInt("123abc", 16)},
            {t: 5, name: 'MAT_DARK_BLUE', hashValue: "#3d6990", expected: "4024720"},
            {t: 6, name: 'MAT_ANTIQUE_WHITE', hashValue: "#efcf9f", expected: "15716255"},
            {t: 7, name: 'MAT_BLACK', hashValue: "#000000", expected: "0"},
            {t: 8, name: 'MAT_WHITE', hashValue: "#ffffff", expected: "16777215"},
            {t: 9, name: 'MAT_DARK_BROWN', hashValue: "#3b1901", expected: "3873025"},
            {t: 10, name: 'MAT_GREY', hashValue: "#9c9c9c", expected: "10263708"},
            {t: 11, name: 'MAT_RED', hashValue: "#bf1717", expected: "12523287"},
            {t: 12, name: 'MAT_PURPLE', hashValue: "#ff00f7", expected: "16711927"},
            {t: 13, name: 'MAT_GREEN', hashValue: "#569922", expected: "5675298"},
            {t: 14, name: 'MAT_VIOLET', hashValue: "#744c78", expected: "7621752"},
            {t: 15, name: 'MAT_BROWN', hashValue: "#8b592b", expected: "9132331"},
            {t: 16, name: 'MAT_ORANGE', hashValue: "#f77511", expected: "16217361"},
            {t: 17, name: 'MAT_YELLOW', hashValue: "#ffd000", expected: "16764928"},
            {t: 18, name: 'MAT_BLUE', hashValue: "#01a2dd", expected: "107229"},
            {t: 19, name: 'DOOR_BLACK', hashValue: "#211e1e", expected: "2170398"},
            {t: 20, name: 'DOOR_LIGHT_GRAY', hashValue: "#bdb9b9", expected: "12433849"},
            {t: 21, name: 'DOOR_BROWN', hashValue: "#573d2a", expected: "5717290"},
            {t: 22, name: 'DOOR_LIGHT_BROWN', hashValue: "#ccbc56", expected: "13417558"},
            {t: 23, name: 'DOOR_GRAY', hashValue: "#696969", expected: "6908265"}
        ])
        .test("Should calculate hex value out of CSS value ", function (params, assert) {
            var calculated = utils.getHexColor(params.hashValue);

            assert.equal(calculated, params.expected, "test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("getColor(colorType, hashColor)");

    qunit
        .cases
        .init([
            {
                t: 1, colorType: 'MATERIAL_COLOR_KEY', hashColor: frnConstGr.Colors.Material.MAT_BLACK,
                colorName: 'DARK_GRAY_1', expected: frnConstGr.Colors.DARK_GRAY_1
            },
            {
                t: 2, colorType: 'DARKER_COLOR_KEY',   hashColor: frnConstGr.Colors.Material.MAT_BLACK,
                colorName: 'DEFAULT_EDGE_COLOR', expected: frnConstGr.Colors.DEFAULT_EDGE_COLOR
            },
            {
                t: 3, colorType: 'EDGE_COLOR_KEY', hashColor: frnConstGr.Colors.Material.MAT_BLACK,
                colorName: 'MATTERHORN', expected: frnConstGr.Colors.MATTERHORN
            },
            {
                t: 4, colorType: 'default', hashColor: frnConstGr.Colors.Material.MAT_BLACK,
                colorName: 'MATTERHORN', expected: frnConstGr.Colors.MATTERHORN
            },
            {
                t: 5, colorType: 'MATERIAL_COLOR_KEY', hashColor: frnConstGr.Colors.Material.MAT_DARK_BLUE,
                colorName: 'DARK_BLUE', expected: utils.getHexColor(frnConstGr.Colors.Material.MAT_DARK_BLUE)
            },
            {
                t: 6, colorType: 'DARKER_COLOR_KEY', hashColor: frnConstGr.Colors.Material.MAT_DARK_BLUE,
                colorName: 'DARK_BLUE', expected: utils.getDarkerHexColor(frnConstGr.Colors.Material.MAT_DARK_BLUE, frnConstGr.DEFAULT_COLOR_SHIFT_PERCENT)
            },
            {
                t: 7, colorType: 'EDGE_COLOR_KEY', hashColor: frnConstGr.Colors.Material.MAT_DARK_BLUE,
                colorName: 'DARK_BLUE', expected: frnConstGr.Colors.DEFAULT_EDGE_COLOR
            }
        ])
        .test("Should calculate hex value out of CSS value ", function (params, assert) {
            var calculated = utils.getColor(frnConstAppKeys[params.colorType], params.hashColor);

            assert.equal(calculated, params.expected, "test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated + ", color name: " + params.colorName);
        });

    qunit.module("getDarkerStringColor(rgbString, prcnt)");

    qunit
        .cases
        .init([
            {t: 1, rgbString: "#ffffff", percent: 0, expected: "000000"},
            {t: 1, rgbString: "#ffffff", percent: 25, expected: "404040"},
            {t: 1, rgbString: "#ffffff", percent: 50, expected: "808080"},
            {t: 1, rgbString: "#ffffff", percent: 75, expected: "BFBFBF"},
            {t: 1, rgbString: "#3d6990", percent: 75, expected: "2E4F6C"}
        ])
        .test("Should return string representation of the given percent darker color", function (params, assert) {
            var calculated = utils.getDarkerStringColor(params.rgbString, params.percent).toUpperCase();

            assert.equal(calculated, params.expected, "test: " + params.t + ", given: " + params.rgbString + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("decimalRound(value, exp)");

    qunit
        .cases
        .init([
            {t: 1, value: "276.3465", digit: -3, expected: "276.347"},
            {t: 2, value: "276.3464", digit: -3,  expected: "276.346"}
        ])
        .test("Returns decimal round to the given ", function (params, assert) {
            var calculated = utils.decimalRound(params.value, params.digit);

            assert.equal(params.expected, calculated, "test: " + params.t + ", value: " + params.value + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("decimalFloor(value, exp)");

    qunit
        .cases
        .init([
            {t: 1, value: "276.346999", digit: -3, expected: "276.346"}
        ])
        .test("Returns decimal round to the given ", function (params, assert) {
            var calculated = utils.decimalFloor(params.value, params.digit);

            assert.equal(params.expected, calculated, "test: " + params.t + ", value: " + params.value + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("decimalCeil(value, exp)");

    qunit
        .cases
        .init([
            {t: 1, value: "276.346999", digit: -3, expected: "276.347"}
        ])
        .test("Returns decimal round to the given ", function (params, assert) {
            var calculated = utils.decimalCeil(params.value, params.digit);

            assert.equal(params.expected, calculated, "test: " + params.t + ", value: " + params.value + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("isTopCornerShelvesDrawn(lowerYBound, upperYBound, y)");

    lowerYBound = y + halfCupboardDepthPx;
    upperYBound = y + halfCupboardHeightPx;

    qunit.test("y is equal to lowerYBound. (lowerYBound <=  y < upperYbound). expected = true.", function(assert) {
        var expected = true,
            calculated = utils.isTopCornerShelvesDrawn(lowerYBound, upperYBound, lowerYBound);

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.test("y is equal to upperYBound. (lowerYBound <=  y < upperYbound). expected = false.", function(assert) {
        var expected = false,
            calculated = utils.isTopCornerShelvesDrawn(lowerYBound, upperYBound, upperYBound);

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.test("y is lower than lowerYBound. (lowerYBound <=  y < upperYbound). expected = false.", function(assert) {
        var expected = false,
            calculated = utils.isTopCornerShelvesDrawn(lowerYBound, upperYBound, lowerYBound - 2);

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.test("y is between lowerYBound and upperYBound. (lowerYBound <=  y < upperYbound). expected = true.", function(assert) {
        var expected = true,
            calculated = utils.isTopCornerShelvesDrawn(lowerYBound, upperYBound, lowerYBound + utils.decimalRound(upperYBound / 2, frnConst.DECIMAL_ROUND_EXP));

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.module("isRectShelveDrawn(midPoint, y)");

    qunit.test("y is equal to midPoint. (midPoint ==  y). expected = true.", function(assert) {
        var y = upperYBound,
            midPoint = upperYBound,
            expected = true,
            calculated = utils.isRectShelveDrawn(midPoint, y);

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", midPoint: " + midPoint);
    });

    qunit.test("y is not equal to midPoint. (midPoint !=  y). expected = false.", function(assert) {
        var y = upperYBound,
            midPoint = utils.decimalRound(y / 2, frnConst.DECIMAL_ROUND_EXP),
            expected = false,
            calculated = utils.isRectShelveDrawn(midPoint, y);

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", midPoint: " + midPoint);
    });

    qunit.module("isBottomCornerShelvesDrawn(lowerYBound, upperYBound, y)");

    lowerYBound = utils.decimalRound(y + halfCupboardHeightPx, frnConst.DECIMAL_ROUND_EXP);
    upperYBound = utils.decimalRound(lowerYBound + halfRearHeightPx, frnConst.DECIMAL_ROUND_EXP);

    qunit.test("y equal to lowerYBound. (lowerYBound <  y <= upperYbound). expected = false.", function(assert) {
        var expected = false,
            calculated = utils.isBottomCornerShelvesDrawn(lowerYBound, upperYBound, lowerYBound);

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", halfRearHeight: " + halfRearHeightPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.test("y equal to upperYBound. (lowerYBound <  y <= upperYbound). expected = true.", function(assert) {
        var expected = true,
            calculated = utils.isBottomCornerShelvesDrawn(lowerYBound, upperYBound, upperYBound);

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.test("y is between lowerYBound and upperYBound. (lowerYBound <  y <= upperYbound). expected = true.", function(assert) {
        var expected = true,
            calculated = utils.isBottomCornerShelvesDrawn(lowerYBound, upperYBound, lowerYBound + utils.decimalRound(halfRearHeightPx / 2, frnConst.DECIMAL_ROUND_EXP));

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.test("y is bigger than upperYBound. (lowerYBound <  y <= upperYbound). expected = false.", function(assert) {
        var expected = false,
            calculated = utils.isBottomCornerShelvesDrawn(lowerYBound, upperYBound, upperYBound + utils.decimalRound(halfRearHeightPx / 2, frnConst.DECIMAL_ROUND_EXP));

        assert.equal(calculated,
                        expected,
                        "Calculated: " + calculated +
                        ", expected: " + expected +
                        ", y: " + y +
                        ", height: " + cupboardHeightPx +
                        ", depth: " + cupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", lowerY: " + lowerYBound +
                        " upperY: " + upperYBound);
    });

    qunit.module("percentToSample(percent, sum)");

    qunit
        .cases
        .init([
            {t: 1, percent: 0, sum: 100, expected: 0},
            {t: 2, percent: 100, sum: 100, expected: 100},
            {t: 3, percent: 50, sum: 100, expected: 50},
            {t: 4, percent: -10, sum: 100, expected: 10},
            {t: 5, percent: 10, sum: -100, expected: 10},
            {t: 6, percent: 23.456, sum: 2000, expected: 469.12},
            {t: 7, percent: 2333.45678, sum: 2000, expected: 46669.136},
            {t: 8, percent: 233.456899, sum: 2000, expected: 4669.138},
            {t: 9, percent: -233.456899, sum: 2000, expected: 4669.138}
        ])
        .test("Returns decimal round to the given ", function (params, assert) {
            var calculated = utils.percentToSample(params.percent, params.sum);

            assert.equal(calculated,
                            params.expected,
                            "test: " + params.t +
                            ", calculated: " + calculated +
                            ", expected: " + params.expected +
                            ", percent: " + params.percent + "%" +
                            ", sum: " + params.sum);
        });

    qunit.module("sampleToPercent(sample, sum)");

    qunit
        .cases
        .init([
            {t: 1, sample: 0, sum: 100, expected: 0},
            {t: 2, sample: 100, sum: 100, expected: 100},
            {t: 3, sample: 50, sum: 100, expected: 50},
            {t: 4, sample: -65, sum: 100, expected: 65},
            {t: 5, sample: 65, sum: -100, expected: 65},
            {t: 6, sample: -65, sum: -100, expected: 65},
            {t: 7, sample: 23.456, sum: 2000, expected: 1.173},
            {t: 8, sample: 233.4568976, sum: 2000, expected: 11.673},
            {t: 9, sample: 2334.568976, sum: 2000, expected: 116.728}
        ])
        .test("Returns decimal round to the given ", function (params, assert) {
            var calculated = utils.sampleToPercent(params.sample, params.sum);

            assert.equal(calculated,
                params.expected,
                "test: " + params.t +
                ", calculated: " + calculated +
                ", expected: " + params.expected +
                ", percent: " + params.sample + "%" +
                ", sum: " + params.sum);
        });

    qunit.module("Testing Parameterized.js plugin");

    qunit.cases
            .init([{a: 1, b: 2, expected: 3}, {a: 4, b: 5, expected: 9}, {a: -5, b: 5, expected: 0}])
            .test("test sum(a, b)", function (parameters, assert) {
                var sum = parameters.a + parameters.b;

                assert.equal(sum, parameters.expected, "expected: " + parameters.expected + ", calculated: " + sum);
            });
}

runTests(QUnit, FrnConstr, Phaser);
