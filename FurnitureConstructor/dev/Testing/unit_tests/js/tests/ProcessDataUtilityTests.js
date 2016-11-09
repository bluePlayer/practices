function runTests(qunit, frnConstr, phaser) {
    'use strict';

    var utils = frnConstr.Utility,
        frnConst = frnConstr.Const,
        frnConstGr = frnConst.Graphics,
        frnConstApp = frnConst.Application,
        frnConstAppKeys = frnConstApp.Keys,
        pdUtils = frnConstr.ProcessDataUtility,

        roundExponent = frnConst.DECIMAL_ROUND_EXP,

        defaultFrameX = frnConstGr.DEFAULT_GRAPHIC_X,
        defaultFrameY = frnConstGr.DEFAULT_GRAPHIC_Y,

        defaultMillsPerPixelForDepth = frnConstApp.FrnData.millsPerPixelForDepth.DEFAULT_VAL,
        defaultMillsPerPixel = frnConstApp.FrnData.millsPerPixel.DEFAULT_VAL,

        defaultLeftShelveWidth = frnConstApp.FrnData.leftShelveWidth.DEFAULT_VAL,
        defaultLeftShelveWidthPx = utils.convertMillsToPixels(defaultLeftShelveWidth, defaultMillsPerPixel),

        defaultRightShelveWidth = frnConstApp.FrnData.rightShelveWidth.DEFAULT_VAL,
        defaultRightShelveWidthPx = utils.convertMillsToPixels(defaultRightShelveWidth, defaultMillsPerPixel),

        defaultFullWidth = frnConstApp.FrnData.cupboardWidth.DEFAULT_VAL,
        defaultFullWidthPx = utils.convertMillsToPixels(defaultFullWidth, defaultMillsPerPixel),

        defaultCupboardWidth = (defaultFullWidth - (defaultLeftShelveWidth + defaultRightShelveWidth)),
        defaultCupboardWidthPx = utils.convertMillsToPixels(defaultCupboardWidth, defaultMillsPerPixel),

        defaultCupboardHeight = frnConstApp.FrnData.cupboardHeight.DEFAULT_VAL,
        defaultCupboardHeightPx = utils.convertMillsToPixels(defaultCupboardHeight, defaultMillsPerPixel),
        halfCupboardHeightPx = utils.decimalRound((defaultCupboardHeightPx / 2), frnConst.DECIMAL_ROUND_EXP),

        defaultCupboardDepth = frnConstApp.FrnData.cupboardDepth.DEFAULT_VAL,
        defaultCupboardDepthPx = utils.convertMillsToPixels(defaultCupboardDepth, defaultMillsPerPixelForDepth),
        halfCupboardDepthPx = utils.decimalRound((defaultCupboardDepthPx / 2), frnConst.DECIMAL_ROUND_EXP),

        halfRearHeightPx = defaultCupboardHeightPx - defaultCupboardDepthPx,

        defaultThickness = frnConstApp.FrnData.thickness.DEFAULT_VAL,
        defaultThicknessPx = utils.convertMillsToPixels(defaultThickness, defaultMillsPerPixel),

        defaultMaxNumOfShelves = utils.decimalRound((defaultCupboardHeight / 100), 0),
        defaultMaxNumOfBeams = utils.decimalRound((defaultCupboardWidth / 100), 0),
        defaultShelveShiftFactor =
            utils.decimalRound(((defaultCupboardHeightPx - defaultCupboardDepthPx) / defaultMaxNumOfShelves),
                    frnConst.DECIMAL_ROUND_EXP),

        defaultInnerShelveSlotHeight = utils.decimalRound((defaultCupboardHeightPx / defaultMaxNumOfShelves),
                    frnConst.DECIMAL_ROUND_EXP),

        defaultInnerShelveSlotWidth = utils.decimalRound(((defaultCupboardWidthPx) / defaultMaxNumOfBeams),
                    frnConst.DECIMAL_ROUND_EXP),

        defaultShelveCssColor = frnConst.Application.DEFAULT_MATERIAL_COLOR,

        defaultCurrentMaterialColor = utils.getColor(frnConstApp.Keys.MATERIAL_COLOR_KEY, defaultShelveCssColor),
        defaultCurrentDarkerMatColor = utils.getColor(frnConstApp.Keys.DARKER_COLOR_KEY, defaultShelveCssColor),
        defaultCurrentEdgeColor = utils.getColor(frnConstApp.EDGE_COLOR_KEY, defaultShelveCssColor),
        defaultBorderSize = frnConstGr.DEFAULT_GRAPHICS_BORDER_SIZE,

        lowerYBound = 0,
        upperYBound = 0,
        hashColorKey = "",
        forInAssertFunction = null,
        listColorsInArray = null,

        artmTreeValuesObj = {
            frameX: defaultFrameX,
            frameY: defaultFrameY,
            fullWidthPx: defaultFullWidthPx,
            cupboardWidthPx: defaultCupboardWidthPx,
            cupboardHeightPx: defaultCupboardHeightPx,
            cupboardDepthPx: defaultCupboardDepthPx,
            thicknessPx: defaultThicknessPx,
            leftShelveWidthPx: defaultLeftShelveWidthPx,
            rightShelveWidthPx: defaultRightShelveWidthPx,
            halfCupboardDepthPx: utils.decimalRound((defaultCupboardDepthPx / 2), roundExponent),
            shelveShiftFactor: defaultShelveShiftFactor,

            sumThicknessPx: utils.decimalRound((defaultFullWidthPx + defaultThicknessPx), roundExponent),
            subRightShelveWidthPx: utils.decimalRound((defaultFullWidthPx + defaultThicknessPx - defaultRightShelveWidthPx), roundExponent)
        },

        preProcessDataMsg = "fcdo object must contain all form fields " +
            "and maxNumOfShelves, maxNumOfInnerShelves, maxNumOfBeams, " +
            "fullWidth, thicknessPx, fullWidthPx, cupboardWidthPx, cupboardHeightPx, " +
            "cupboardDepthPx, leftShelveWidthPx, rightShelveWidthPx, frameX, frameY, " +
            "borderSize, currentMaterialColor, currentDarkerMatColor, currentEdgeColor, " +
            "shelveShiftFactor, innerShelveSlotHeight, innerShelveSlotWidth",

        logMyProperties = function () {
            console.log("Mills per pixel: " + defaultMillsPerPixel +
                        ", mills per pixel for depth: " + defaultMillsPerPixelForDepth +
                        ", y: " + defaultFrameY +
                        ", height: " + defaultCupboardHeightPx +
                        ", depth: " + defaultCupboardDepthPx +
                        ", height/2: " + halfCupboardHeightPx +
                        ", depth/2: " + halfCupboardDepthPx +
                        ", rearHeight/2: " + halfRearHeightPx +
                        ", lowerY: " + lowerYBound +
                        ", upperY: " + upperYBound);
        },
        /**
         * @method logForProcessDataUtility
         * @param {object} details contains:
         * result:boolean,
         * actual: object, expected: object,
         * message: string, source: string, module: string, name: string,
         * runtime: number
         */
        logForProcessDataUtility = function (details) {
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

    qunit.log(logForProcessDataUtility);

    qunit.module("preProcessData(fcdo, shelveCssColor, millsPerPixel)");

    qunit
        .cases
        .init([
            {t: 1, field: 'millsPerPixel'},
            {t: 2, field: 'millsPerPixelForDepth'},
            {t: 3, field: 'frameX'},
            {t: 4, field: 'frameY'},
            {t: 5, field: 'fullWidth'},
            {t: 6, field: 'fullWidthPx'},
            {t: 7, field: 'cupboardWidth'},
            {t: 8, field: 'cupboardWidthPx'},
            {t: 9, field: 'cupboardHeight'},
            {t: 10, field: 'cupboardHeightPx'},
            {t: 11, field: 'cupboardDepth'},
            {t: 12, field: 'cupboardDepthPx'},
            {t: 13, field: 'thickness'},
            {t: 14, field: 'thicknessPx'},
            {t: 15, field: 'leftShelveWidth'},
            {t: 16, field: 'leftShelveWidthPx'},
            {t: 17, field: 'rightShelveWidth'},
            {t: 18, field: 'rightShelveWidthPx'},
            {t: 19, field: 'maxNumOfShelves'},
            {t: 20, field: 'maxNumOfInnerShelves'},
            {t: 21, field: 'maxNumOfBeams'},
            {t: 22, field: 'shelveShiftFactor'},
            {t: 23, field: 'innerShelveSlotHeight'},
            {t: 24, field: 'innerShelveSlotWidth'},

            {t: 25, field: 'borderSize'},
            {t: 26, field: 'currentMaterialColor'},
            {t: 27, field: 'currentDarkerMatColor'},
            {t: 28, field: 'currentEdgeColor'},
            {t: 29, field: 'shelveCssColor'},

            {t: 30, field: 'standLeftChkBox'},
            {t: 31, field: 'rearChkBox'},
            {t: 32, field: 'rightShelveChkBox'},
            {t: 33, field: 'leftShelveChkBox'},
            {t: 34, field: 'floorChkBox'},
            {t: 35, field: 'ceilingChkBox'},
            {t: 36, field: 'standRightChkBox'},
            {t: 37, field: 'standChkBox'}
        ])
        .test(preProcessDataMsg, function (params, assert) {
            var expect = 1,
                key = null,
                value = null,
                dataArray = frnConstr.getFormDataArray(),
                fcdo = frnConstr.setDataObject(dataArray),
                propType = true;

            assert.expect(expect);

            fcdo = pdUtils.preProcessData(fcdo, fcdo.shelveCssColor, fcdo.millsPerPixel);

            for (key in fcdo) {
                if (fcdo.hasOwnProperty(key) && key === params.field) {
                    value = fcdo[key];
                    propType = (typeof value === "number" || typeof value === "string" ||
                        typeof value === "object" || typeof value === "boolean");
                    assert.ok(propType, "Test: " + params.t + ", calculated: " + key + ", item: " + value);
                }
            }

        });

    qunit
        .cases
        .init([
            {t: 38, field: 'millsPerPixel', value: defaultMillsPerPixel},
            {t: 39, field: 'millsPerPixelForDepth', value: frnConstApp.FrnData.millsPerPixelForDepth.DEFAULT_VAL},
            {t: 40, field: 'frameX', value: defaultFrameX},
            {t: 41, field: 'frameY', value: defaultFrameY},
            {t: 42, field: 'fullWidth', value: defaultFullWidth},
            {t: 43, field: 'fullWidthPx', value: defaultFullWidthPx},
            {t: 44, field: 'cupboardWidth', value: defaultCupboardWidth},
            {t: 45, field: 'cupboardWidthPx', value: defaultCupboardWidthPx},
            {t: 46, field: 'cupboardHeight', value: defaultCupboardHeight},
            {t: 47, field: 'cupboardHeightPx', value: defaultCupboardHeightPx},
            {t: 48, field: 'cupboardDepth', value: defaultCupboardDepth},
            {t: 49, field: 'cupboardDepthPx', value: defaultCupboardDepthPx},
            {t: 50, field: 'thickness', value: defaultThickness},
            {t: 51, field: 'thicknessPx', value: defaultThicknessPx},
            {t: 52, field: 'leftShelveWidth', value: defaultLeftShelveWidth},
            {t: 53, field: 'leftShelveWidthPx', value: defaultLeftShelveWidthPx},
            {t: 54, field: 'rightShelveWidth', value: defaultRightShelveWidth},
            {t: 55, field: 'rightShelveWidthPx', value: defaultRightShelveWidthPx},
            {t: 56, field: 'maxNumOfShelves', value: defaultMaxNumOfShelves},
            {t: 57, field: 'maxNumOfInnerShelves', value: defaultMaxNumOfShelves},
            {t: 58, field: 'maxNumOfBeams', value: defaultMaxNumOfBeams},
            {t: 59, field: 'shelveShiftFactor', value: defaultShelveShiftFactor},
            {t: 60, field: 'innerShelveSlotHeight', value: defaultInnerShelveSlotHeight},
            {t: 61, field: 'innerShelveSlotWidth', value: defaultInnerShelveSlotWidth},

            {t: 62, field: 'borderSize', value: defaultBorderSize},
            {t: 63, field: 'shelveCssColor', value: defaultShelveCssColor},
            {t: 64, field: 'currentMaterialColor', value: defaultCurrentMaterialColor},
            {t: 65, field: 'currentDarkerMatColor', value: defaultCurrentDarkerMatColor},
            {t: 66, field: 'currentEdgeColor', value: defaultCurrentEdgeColor},

            {t: 67, field: 'standLeftChkBox', value: true},
            {t: 68, field: 'rearChkBox', value: true},
            {t: 69, field: 'rightShelveChkBox', value: true},
            {t: 70, field: 'leftShelveChkBox', value: true},
            {t: 71, field: 'floorChkBox', value: true},
            {t: 72, field: 'ceilingChkBox', value: true},
            {t: 73, field: 'standRightChkBox', value: true},
            {t: 74, field: 'standChkBox', value: true}
        ])
        .test(preProcessDataMsg, function (params, assert) {
            var expect = 1,
                key = null,
                value = null,
                dataArray = frnConstr.getFormDataArray(),
                fcdo = frnConstr.setDataObject(dataArray);

            assert.expect(expect);

            fcdo = pdUtils.preProcessData(fcdo, fcdo.shelveCssColor, fcdo.millsPerPixel);

            for (key in fcdo) {
                if (fcdo.hasOwnProperty(key) && key === params.field) {
                    value = fcdo[key];
                    assert.equal(value, params.value, "Test: " + params.t + ", calculated: " + value + ", expected: " + params.value);
                }
            }

        });

    qunit.module("shelveSlotObject(x, y, shiftX, shiftY, busy)");

    qunit
        .cases
        .init([
            {x: 10, y: 10, shiftX: 100, shiftY: 100, busy: false},
            {x: -10, y: 10, shiftX: 100, shiftY: 100, busy: false},
            {x: 10, y: -10, shiftX: 100, shiftY: 100, busy: false},
            {x: 10, y: 10, shiftX: -100, shiftY: 100, busy: false},
            {x: 10, y: 10, shiftX: 100, shiftY: -100, busy: false},
            {x: 10, y: 10, shiftX: 100, shiftY: 100, busy: true},
            {x: 10.1, y: 10, shiftX: 100, shiftY: 100, busy: false},
            {x: 10.1, y: 10.2, shiftX: 100, shiftY: 100, busy: false},
            {x: 10.1, y: 10, shiftX: 100.3, shiftY: 100, busy: false},
            {x: 10.1, y: 10, shiftX: 100, shiftY: 100.4, busy: false},
            {x: 10.1, y: 10.2, shiftX: 100.3, shiftY: 100.4, busy: true}

        ])
        .test("should return object of the form: {x: Number, y: Number, shiftX: Number, shiftY: Number, busy: true/false}", function (params, assert) {
            var expected = {x: params.x, y: params.y, shiftX: params.shiftX, shiftY: params.shiftY, busy: params.busy},
                calculated = pdUtils.shelveSlotObject(params.x, params.y, params.shiftX, params.shiftY, params.busy);

            assert.deepEqual(calculated, expected, "expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("makeArtmTree(fcdo, decimalRoundExponent)");

    qunit
        .cases
        .init([
            {
                t: 1,
                fcdo: {
                    frameX: defaultFrameX,
                    frameY: defaultFrameY,
                    fullWidthPx: defaultFullWidthPx,
                    cupboardWidthPx: defaultCupboardWidthPx,
                    cupboardHeightPx: defaultCupboardHeightPx,
                    cupboardDepthPx: defaultCupboardDepthPx,
                    thicknessPx: defaultThicknessPx,
                    leftShelveWidthPx: defaultLeftShelveWidthPx,
                    rightShelveWidthPx: defaultRightShelveWidthPx,
                    halfCupboardDepthPx: utils.decimalRound((defaultCupboardDepthPx / 2), -3),
                    shelveShiftFactor: defaultShelveShiftFactor
                },
                roundExponent: -3
            },
            {
                t: 2,
                fcdo: {
                    frameX: 1,
                    frameY: 2,
                    fullWidthPx: 3,
                    cupboardWidthPx: 4,
                    cupboardHeightPx: 5,
                    cupboardDepthPx: 6,
                    thicknessPx: 7,
                    leftShelveWidthPx: 8,
                    rightShelveWidthPx: 9,
                    halfCupboardDepthPx: utils.decimalRound((6 / 2), -3),
                    shelveShiftFactor: 11
                },
                roundExponent: -3
            },
            {
                t: 3,
                fcdo: {
                    frameX: defaultFrameX,
                    frameY: defaultFrameY,
                    fullWidthPx: defaultFullWidthPx,
                    cupboardWidthPx: defaultCupboardWidthPx,
                    cupboardHeightPx: defaultCupboardHeightPx,
                    cupboardDepthPx: defaultCupboardDepthPx,
                    thicknessPx: defaultThicknessPx,
                    leftShelveWidthPx: defaultLeftShelveWidthPx,
                    rightShelveWidthPx: defaultRightShelveWidthPx,
                    halfCupboardDepthPx: utils.decimalRound((defaultCupboardDepthPx / 2), -5),
                    shelveShiftFactor: defaultShelveShiftFactor
                },
                roundExponent: -5
            },
            {
                t: 4,
                fcdo: {
                    frameX: 1,
                    frameY: 2,
                    fullWidthPx: 3,
                    cupboardWidthPx: 4,
                    cupboardHeightPx: 5,
                    cupboardDepthPx: 6,
                    thicknessPx: 7,
                    leftShelveWidthPx: 8,
                    rightShelveWidthPx: 9,
                    halfCupboardDepthPx: utils.decimalRound((6 / 2), -5),
                    shelveShiftFactor: 11
                },
                roundExponent: -5
            },
            {
                t: 5,
                fcdo: {
                    frameX: defaultFrameX,
                    frameY: defaultFrameY,
                    fullWidthPx: defaultFullWidthPx,
                    cupboardWidthPx: defaultCupboardWidthPx,
                    cupboardHeightPx: defaultCupboardHeightPx,
                    cupboardDepthPx: defaultCupboardDepthPx,
                    thicknessPx: defaultThicknessPx,
                    leftShelveWidthPx: defaultLeftShelveWidthPx,
                    rightShelveWidthPx: defaultRightShelveWidthPx,
                    halfCupboardDepthPx: utils.decimalRound((defaultCupboardDepthPx / 2), 0),
                    shelveShiftFactor: defaultShelveShiftFactor
                },
                roundExponent: 0
            },
            {
                t: 6,
                fcdo: {
                    frameX: 1,
                    frameY: 2,
                    fullWidthPx: 3,
                    cupboardWidthPx: 4,
                    cupboardHeightPx: 5,
                    cupboardDepthPx: 6,
                    thicknessPx: 7,
                    leftShelveWidthPx: 8,
                    rightShelveWidthPx: 9,
                    halfCupboardDepthPx: utils.decimalRound((6 / 2), 0),
                    shelveShiftFactor: 11
                },
                roundExponent: 0
            }
        ])
        .test("Checks to see if artmTree object contains the 10 important properties and wheter they contain the right value.", function (params, assert) {
            var expect = 20,
                key = null,
                value = null,
                requiredKeys = [
                    'fullWidthPx',
                    'frameX',
                    'leftShelveWidthPx',
                    'rightShelveWidthPx',
                    'halfCupboardDepthPx',
                    'frameY',
                    'cupboardHeightPx',
                    'cupboardDepthPx',
                    'thicknessPx',
                    'cupboardWidthPx'
                ],
                fcdo = params.fcdo,
                calculated = pdUtils.makeArtmTree(fcdo, params.roundExponent);

            assert.expect(expect);

            requiredKeys.forEach(function (crv, index, arr) {
                assert.ok(utils.isTruthy(calculated[crv]), "Test: " + params.t + ", expected: true, calculated: " + JSON.stringify(calculated[crv]));
                assert.equal(calculated[crv].value, fcdo[crv], crv + " = expected: " + fcdo[crv] + ", calculated: " + calculated[crv].value);
            }, requiredKeys);
        });

    qunit.module("removeVertBafflesBeamsAndHangers(partsArray, maxNumOfBeams)");

    qunit
        .cases
        .init([
            {
                partsArray: [
                    {col: 5, colShift: 6, row: 1, rowShift: 5},
                    {col: 10, colShift: 11, row: 1, rowShift: 10},
                    {col: 11, colShift: 12, row: 3, rowShift: 7},
                    {col: 15, colShift: 16, row: 3, rowShift: 7},
                    {col: 9, colShift: 13, row: 3, rowShift: 7},
                    {col: 7, colShift: 11, row: 3, rowShift: 7}
                ],
                maxNumOfBeams: 11,
                expectedCoords: [
                    {col: 5, colShift: 6, row: 1, rowShift: 5},
                    {col: 10, colShift: 11, row: 1, rowShift: 10},
                    {col: 7, colShift: 11, row: 3, rowShift: 7}
                ]
            }
        ])
        .test("removeVertBafflesBeamsAndHangers(partsArray, maxNumOfBeams)", function (params, assert) {
            var calculated = pdUtils.removeVertBafflesBeamsAndHangers(params.partsArray, params.maxNumOfBeams);

            assert.deepEqual(calculated, params.expectedCoords, "expected: " + JSON.stringify(params.expectedCoords) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("extendHorzBafflesAndBeams(bafflesOrBeamsArray, maxNumOfBeams)");

    qunit
        .cases
        .init([
            {
                bafflesOrBeamsArray: [
                    {col: 0, colShift: 25, row: 1, rowShift: 2},
                    {col: 15, colShift: 25, row: 7, rowShift: 8}
                ],
                maxNumOfBeams: 30,
                expectedCoords: [
                    {col: 0, colShift: 30, row: 1, rowShift: 2},
                    {col: 15, colShift: 30, row: 7, rowShift: 8}
                ]
            }
        ])
        .test("extendHorzBafflesAndBeams(bafflesOrBeamsArray, maxNumOfBeams)", function (params, assert) {
            var calculated = pdUtils.extendHorzBafflesAndBeams(params.bafflesOrBeamsArray, params.maxNumOfBeams);

            assert.deepEqual(calculated, params.expectedCoords, "expected: " + JSON.stringify(params.expectedCoords) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("shrinkHorzBafflesAndBeams(bafflesOrBeamsArray, maxNumOfBeams)");

    qunit
        .cases
        .init([
            {
                bafflesOrBeamsArray: [
                    {col: 0, colShift: 25, row: 1, rowShift: 2},
                    {col: 15, colShift: 25, row: 7, rowShift: 8},
                    {col: 0, colShift: 5, row: 10, rowShift: 11},
                    {col: 5, colShift: 15, row: 11, rowShift: 12},
                    {col: 5, colShift: 10, row: 14, rowShift: 15}
                ],
                maxNumOfBeams: 10,
                expected: [
                    {col: 0, colShift: 10, row: 1, rowShift: 2},
                    {col: 0, colShift: 5, row: 10, rowShift: 11},
                    {col: 5, colShift: 10, row: 11, rowShift: 12},
                    {col: 5, colShift: 10, row: 14, rowShift: 15}
                ]
            }
        ])
        .test("shrinkHorzBafflesAndBeams(bafflesOrBeamsArray, maxNumOfBeams)", function (params, assert) {
            var calculated = pdUtils.shrinkHorzBafflesAndBeams(params.bafflesOrBeamsArray, params.maxNumOfBeams);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("extendDrawerOrPtgrs(drawersOrPtgrsArray, maxNumOfBeams, minWidth, maxWidth)");

    qunit
        .cases
        .init([
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 15, colShift: 27, row: 10, rowShift: 13},
                    {col: 28, colShift: 29, row: 12, rowShift: 14},
                    {col: 10, colShift: 25, row: 12, rowShift: 14},
                    {col: 29, colShift: 30, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 30,
                minWidth: 2,
                maxWidth: 20,
                expected: [
                    {col: 15, colShift: 30, row: 10, rowShift: 13},
                    {col: 28, colShift: 30, row: 12, rowShift: 14},
                    {col: 10, colShift: 30, row: 12, rowShift: 14}
                ]
            },
            {
                drawersOrPtgrsArray: [
                    {col: 12, colShift: 25, row: 1, rowShift: 3},
                    {col: 15, colShift: 24, row: 1, rowShift: 3}
                ],
                maxNumOfBeams: 25,
                minWidth: 2,
                maxWidth: 20,
                expected: [
                    {col: 12, colShift: 25, row: 1, rowShift: 3},
                    {col: 15, colShift: 25, row: 1, rowShift: 3}
                ]
            }
        ])
        .test("", function (params, assert) {
            var calculated = pdUtils.extendDrawerOrPtgrs(params.drawersOrPtgrsArray, params.maxNumOfBeams, params.minWidth, params.maxWidth);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("shrinkDrawersOrPtgrs(drawersOrPtgrsArray, maxNumOfBeams, minWidth, maxWidth)");

    qunit
        .cases
        .init([
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 9, colShift: 16, row: 10, rowShift: 13},
                    {col: 2, colShift: 6, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 10,
                minWidth: 2,
                maxWidth: 20,
                expected: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 10, row: 7, rowShift: 9},
                    {col: 2, colShift: 6, row: 12, rowShift: 14}
                ]
            },
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 9, colShift: 16, row: 10, rowShift: 13},
                    {col: 2, colShift: 6, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 2,
                minWidth: 2,
                maxWidth: 20,
                expected: [
                    {col: 0, colShift: 2, row: 1, rowShift: 3}
                ]
            },
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 12, colShift: 35, row: 10, rowShift: 13},
                    {col: 18, colShift: 20, row: 12, rowShift: 14},
                    {col: 19, colShift: 20, row: 12, rowShift: 14},
                    {col: 0, colShift: 20, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 20,
                minWidth: 2,
                maxWidth: 20,
                expected: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 12, colShift: 20, row: 10, rowShift: 13},
                    {col: 18, colShift: 20, row: 12, rowShift: 14},
                    {col: 0, colShift: 20, row: 12, rowShift: 14}
                ]
            },
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 25, colShift: 35, row: 10, rowShift: 13},
                    {col: 0, colShift: 20, row: 12, rowShift: 14},
                    {col: 5, colShift: 30, row: 12, rowShift: 14},
                    {col: 28, colShift: 30, row: 12, rowShift: 14},
                    {col: 29, colShift: 30, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 30,
                minWidth: 2,
                maxWidth: 20,
                expected: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 25, colShift: 30, row: 10, rowShift: 13},
                    {col: 0, colShift: 20, row: 12, rowShift: 14},
                    {col: 28, colShift: 30, row: 12, rowShift: 14}
                ]
            },

            // pantograph widths
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 12, colShift: 16, row: 10, rowShift: 13},
                    {col: 2, colShift: 8, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 10,
                minWidth: 6,
                maxWidth: 15,
                expected: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 2, colShift: 8, row: 12, rowShift: 14}
                ]
            },
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 9, colShift: 16, row: 10, rowShift: 13},
                    {col: 2, colShift: 6, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 6,
                minWidth: 6,
                maxWidth: 15,
                expected: [
                    {col: 0, colShift: 6, row: 1, rowShift: 3}
                ]
            },
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 12, colShift: 35, row: 10, rowShift: 13},
                    {col: 18, colShift: 20, row: 12, rowShift: 14},
                    {col: 19, colShift: 20, row: 12, rowShift: 14},
                    {col: 0, colShift: 20, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 15,
                minWidth: 6,
                maxWidth: 15,
                expected: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 0, colShift: 15, row: 12, rowShift: 14}
                ]
            },
            {
                drawersOrPtgrsArray: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 25, colShift: 35, row: 10, rowShift: 13},
                    {col: 0, colShift: 15, row: 12, rowShift: 14},
                    {col: 5, colShift: 20, row: 12, rowShift: 14},
                    {col: 22, colShift: 35, row: 12, rowShift: 14},
                    {col: 27, colShift: 35, row: 12, rowShift: 14}
                ],
                maxNumOfBeams: 30,
                minWidth: 6,
                maxWidth: 15,
                expected: [
                    {col: 0, colShift: 10, row: 1, rowShift: 3},
                    {col: 5, colShift: 15, row: 7, rowShift: 9},
                    {col: 0, colShift: 15, row: 12, rowShift: 14},
                    {col: 5, colShift: 20, row: 12, rowShift: 14},
                    {col: 22, colShift: 30, row: 12, rowShift: 14}
                ]
            }
        ])
        .test("", function (params, assert) {
            var calculated = pdUtils.shrinkDrawersOrPtgrs(params.drawersOrPtgrsArray, params.maxNumOfBeams, params.minWidth, params.maxWidth);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });
}

runTests(QUnit, FrnConstr, Phaser);
