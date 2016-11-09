function runTests(qunit, frnConstr, phaser, window) {
    'use strict';

    var utils = frnConstr.Utility,
        frnConst = frnConstr.Const,
        frnConstGr = frnConst.Graphics,
        frnConstApp = frnConst.Application,
        frnConstAppKeys = frnConstApp.Keys,
        pdUtils = frnConstr.ProcessDataUtility,
        ismUtils = frnConstr.InnerSlotMatrixUtility,

        // stubs
        horzBaffleStubs = frnConstr.HorzBaffleStubs,
        horzBeamStubs = frnConstr.HorzBeamStubs,
        vertBaffleStubs = frnConstr.VertBaffleStubs,
        vertBeamStubs = frnConstr.VertBeamStubs,
        tieStubs = frnConstr.TieStubs,
        hangerStubs = frnConstr.HangerStubs,
        defaultSlotMatrixStubs = frnConstr.DefaultSlotMatrixStubs,
        emptySlotObject = defaultSlotMatrixStubs.emptySlotObject,

        // mocks
        fcdo = frnConstr.getFrnConstrDataObject(),

        /**
         * @method logForInnerShelveSlotMatrix
         * @param {object} details contains:
         * result:boolean,
         * actual: object, expected: object,
         * message: string, source: string, module: string, name: string,
         * runtime: number
         */
        logForInnerShelveSlotMatrix = function (details) {
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

    qunit.log(logForInnerShelveSlotMatrix);

    qunit.module("defaultSlotDataObject()");

    qunit.test("parts array should be non empty containing preset value of parts (4 is max currently)", function(assert) {
        var calculated = ismUtils.defaultSlotDataObject(),
            maxNumOfPartsPerSlot = frnConstApp.InnerPartsMatrix.numOfPartsPerSlot,
            expected = [frnConstApp.Keys.EMPTY_SLOT_KEY, frnConstApp.Keys.EMPTY_SLOT_KEY, frnConstApp.Keys.EMPTY_SLOT_KEY, frnConstApp.Keys.EMPTY_SLOT_KEY];

        assert.ok(utils.isTruthy(calculated)," calculated: " + JSON.stringify(calculated) + ", expected: true");
        assert.equal(calculated.length, maxNumOfPartsPerSlot, "expected: " + maxNumOfPartsPerSlot + ", calculated: " + calculated.length);
        assert.deepEqual(calculated, expected, "expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
    });

    qunit.module("defaultInnerPartsMatrix(maxNumOfInnerShelves, maxNumOfBeams)",
        {
            before: function () {
                defaultSlotMatrixStubs.emptyMatrix_rows2_cols2 = [
                    [emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject]
                ];
            }
        });

    qunit
        .cases
        .init([
            {maxNumOfShelves: 2, maxNumOfBeams: 2, expected: defaultSlotMatrixStubs.emptyMatrix_rows2_cols2}
        ])
        .test("should return two dimesinal array containing default data slot objects", function (params, assert) {
            var calculated = ismUtils.defaultInnerPartsMatrix(params.maxNumOfShelves, params.maxNumOfBeams);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("searchHorzBflBelow(innerPartsSlotMatrix, row, col, numRows, numCols)");

    qunit
        .cases
        .init([
            /*
             * //============================== vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 ====================//
             */
            {t: 1, row: 0, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 2, row: 1, col: 1, matrixStubName: 'vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            /*
             * //============================== vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 ====================//
             */
            {t: 3, row: 0, col: 1, matrixStubName: 'vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 1},
            {t: 4, row: 1, col: 2, matrixStubName: 'vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 1},
            {t: 5, row: 1, col: 1, matrixStubName: 'vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 1},
            /*
             * //============================== vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 ====================//
             */
            {t: 6, row: 0, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 7, row: 0, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 8, row: 1, col: 1, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: 3},
            {t: 9, row: 0, col: 1, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: 3},
            /*
             * //============================== vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 ====================//
             */
            {t: 10, row: 0, col: 0, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            {t: 11, row: 0, col: 0, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            {t: 12, row: 0, col: 1, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            {t: 13, row: 0, col: 1, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            {t: 14, row: 2, col: 1, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            /*
             * //============================== vertBflRange_maxNumShelves6_maxNumOfBeams5 ====================//
             */
            {t: 15, row: 2, col: 0, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 3},
            {t: 16, row: 3, col: 1, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 5},
            {t: 17, row: 5, col: 2, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 6},
            {t: 18, row: 0, col: 3, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 2},
            {t: 19, row: 0, col: 4, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 1},
            {t: 20, row: 4, col: 4, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 5},
            {t: 21, row: 2, col: 2, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 6},
            /*
             * //============================== vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3 ====================//
             */
            {t: 22, row: 0, col: 1, matrixStubName: 'vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3', expected: 1},
            {t: 23, row: 1, col: 0, matrixStubName: 'vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 24, row: 0, col: 0, matrixStubName: 'vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3', expected: 2},
            /*
             * //============================== vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3 ====================//
             */
            {t: 25, row: 0, col: 1, matrixStubName: 'vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3', expected: 1},
            {t: 26, row: 1, col: 0, matrixStubName: 'vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3', expected: 1},
            /*
             * //============================== vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 ====================//
             */
            {t: 27, row: 0, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 28, row: 1, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: 3},
            {t: 29, row: 2, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: 3},
            /*
             * //============================== vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 ====================/
             */
            {t: 30, row: 0, col: 0, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            {t: 31, row: 1, col: 0, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            {t: 32, row: 2, col: 1, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: 2},
            /*
             * //============================== vertBflRange_maxNumShelves6_maxNumOfBeams5 ====================/
             */
            {t: 33, row: 2, col: 0, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 3},
            {t: 34, row: 4, col: 0, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 5},
            {t: 35, row: 2, col: 0, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 3},
            {t: 36, row: 4, col: 0, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 5},
            {t: 37, row: 4, col: 0, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 5},
            {t: 38, row: 1, col: 2, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 2},
            {t: 39, row: 4, col: 2, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 6},
            {t: 40, row: 5, col: 3, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 5},
            {t: 41, row: 3, col: 3, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: 5}
        ])
        .test("The new matrix should have changed rows as given in the params", function (params, assert) {
            var matrixStub = horzBaffleStubs[params.matrixStubName],
                calculated = ismUtils.searchHorzBflBelow(matrixStub, params.row, params.col);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("slotContainsPart(partsArray, partName)");

    qunit
        .cases
        .init([
            {
                t: 1,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: false
            },
            {
                t: 2,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: true
            },
            {
                t: 3,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: true
            },
            {
                t: 4,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: true
            },
            {
                t: 5,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: true
            },
            {
                t: 6,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: true
            },
            {
                t: 7,
                parts: [frnConstAppKeys.HORZ_BEAM_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.SHOES_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: false
            }
        ])
        .test("Should return true if a slot contains at least one horizontal baffle and false if none or if horzBaffle key is true", function (params, assert) {
            var calculated = ismUtils.slotContainsPart(params.parts, params.partType);

            assert.equal(calculated, params.expected, "Test: " + params.t + "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("isFullSlot(slotObject)");

    qunit
        .cases
        .init([
            {t: 1, parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: false},
            {t: 2, parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: false},
            {t: 3, parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: false},
            {t: 4, parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BEAM_KEY], expected: false},
            {t: 5, parts: [frnConstAppKeys.VERT_BEAM_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: false},
            {t: 6, parts: [frnConstAppKeys.DRAWER_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.TIE_KEY], expected: true}
        ])
        .test("Should return true if a slot contains no empty parts i.e all slot parts are filled.", function (params, assert) {
            var calculated = ismUtils.isFullSlot(params.parts);

            assert.deepEqual(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("isEmptySlot(parts)");

    qunit
        .cases
        .init([
            {parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: true},
            {parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: false},
            {parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: false},
            {parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BEAM_KEY], expected: false},
            {parts: [frnConstAppKeys.VERT_BEAM_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY], expected: false},
            {parts: [frnConstAppKeys.DRAWER_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.TIE_KEY], expected: false}
        ])
        .test("Should return true if a slot contains no parts i.e all slot parts are empty.", function (params, assert) {
            var calculated = ismUtils.isEmptySlot(params.parts);

            assert.deepEqual(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("makePartsArray(partsCount, partType)");

    qunit
        .cases
        .init([
            {partsCount: 3, partType: "hello", expected: ["hello", "hello", "hello"]},
            {partsCount: 0, partType: "hello", expected: []},
            {partsCount: 4, partType: "hello", expected: ["hello", "hello", "hello", "hello"]},
            {partsCount: 2, partType: "hello", expected: ["hello", "hello"]}
        ])
        .test("Should return array containing given number of elements with the specified part type", function (params, assert) {
            var calculated = ismUtils.makePartsArray(params.partsCount, params.partType);

            assert.equal(calculated.length, params.partsCount, "expected: " + params.partsCount + ", calculated: " + calculated.length);
            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("searchRangeForTieShoesTrouser(innerPartsSlotMatrix, row, col)");

    qunit
        .cases
        .init([
            /*
             * //============================= drwRange_Empty_maxNumShelves3_maxNumOfBeams5 ================================//
             */
            {t: 1, row: 0, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves3_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 2, row: 0, col: 1, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves3_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 3, row: 0, col: 2, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves3_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 4, row: 1, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves3_maxNumOfBeams5', expected: {row: 1, col: 0, numCols: 3}},
            {t: 5, row: 2, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves3_maxNumOfBeams5', expected: {row: 2, col: 0, numCols: 3}},
            {t: 6, row: 3, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves3_maxNumOfBeams5', expected: {row: 3, col: 0, numCols: 3}},
            {t: 7, row: 4, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves3_maxNumOfBeams5', expected: {row: 4, col: 0, numCols: 3}},
            /*
             * //============================= drwRange_Empty_maxNumShelves4_maxNumOfBeams5 ================================//
             */
            {t: 8, row: 0, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves4_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 9, row: 0, col: 1, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves4_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 10, row: 0, col: 2, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves4_maxNumOfBeams5', expected: {row: 0, col: 1, numCols: 3}},
            {t: 11, row: 0, col: 3, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves4_maxNumOfBeams5', expected: {row: 0, col: 1, numCols: 3}},
            {t: 12, row: 1, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves4_maxNumOfBeams5', expected: {row: 1, col: 0, numCols: 3}},
            {t: 13, row: 2, col: 3, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves4_maxNumOfBeams5', expected: {row: 2, col: 1, numCols: 3}},
            {t: 14, row: 4, col: 3, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves4_maxNumOfBeams5', expected: {row: 4, col: 1, numCols: 3}},
            /*
             * //============================= drwRange_Empty_maxNumShelves5_maxNumOfBeams5 ================================//
             */
            {t: 15, row: 0, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 16, row: 0, col: 1, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 17, row: 0, col: 2, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams5', expected: {row: 0, col: 0, numCols: 3}},
            {t: 18, row: 0, col: 3, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams5', expected: {row: 0, col: 2, numCols: 3}},
            {t: 19, row: 0, col: 4, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams5', expected: {row: 0, col: 2, numCols: 3}},
            {t: 20, row: 4, col: 4, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams5', expected: {row: 4, col: 2, numCols: 3}},
            /*
             * //============================= drwRange_Empty_maxNumShelves5_maxNumOfBeams6 ================================//
             */
            {t: 21, row: 0, col: 0, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams6', expected: {row: 0, col: 0, numCols: 3}},
            {t: 22, row: 0, col: 1, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams6', expected: {row: 0, col: 0, numCols: 3}},
            {t: 23, row: 0, col: 2, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams6', expected: {row: 0, col: 0, numCols: 3}},
            {t: 24, row: 0, col: 3, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams6', expected: {row: 0, col: 3, numCols: 3}},
            {t: 25, row: 0, col: 4, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams6', expected: {row: 0, col: 3, numCols: 3}},
            {t: 26, row: 0, col: 5, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams6', expected: {row: 0, col: 3, numCols: 3}},
            {t: 27, row: 4, col: 5, width: 3, height: 5, matrixStubName: 'drwRange_Empty_maxNumShelves5_maxNumOfBeams6', expected: {row: 4, col: 3, numCols: 3}}
        ])
        .test("Should return object of shape: {row, col, numCols}", function (params, assert) {
            var matrixStub = tieStubs[params.matrixStubName],
                calculated = ismUtils.searchRangeForTieShoesTrouser(matrixStub, params.row, params.col, params.width, params.height);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("addPart(slotObject, partType)");

    qunit
        .cases
        .init([
            {
                t: 1,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY,
                    frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY],
                partType: frnConstAppKeys.EMPTY_SLOT_KEY,
                expected: false
            },
            {
                t: 2,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY,
                    frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: false
            },
            {
                t: 3,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 4,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 5,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 6,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 7,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 8,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 9,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 10,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 11,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.DRAWER_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.DRAWER_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            }
        ])
        .test("Should return false if the slot is full or if EMPTY_SLOT_KEY is sent. Otherwise object with containing part inside \"parts\" array. If part is already contained, it returns the same object.", function (params, assert) {
            var calculated = ismUtils.addPart(params.parts, params.partType);

            if (typeof calculated === 'object') {
                assert.deepEqual(calculated, params.expected, "Test: " + params.t + ", expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
            } else {
                assert.notOk(calculated, "Test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
            }
        });

    qunit.module("removePart(slotObject, partType)");

    qunit
        .cases
        .init([
            {
                t: 1,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY],
                partType: frnConstAppKeys.EMPTY_SLOT_KEY,
                expected: false
            },
            {
                t: 2,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY],
                partType: frnConstAppKeys.EMPTY_SLOT_KEY,
                expected: false
            },
            {
                t: 3,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY],
                partType: frnConstAppKeys.EMPTY_SLOT_KEY,
                expected: false
            },
            {
                t: 4,
                parts: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: false
            },
            {
                t: 5,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: false
            },
            {
                t: 6,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY]
            },
            {
                t: 7,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: [frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY]
            },
            {
                t: 8,
                parts: [frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY],
                partType: frnConstAppKeys.HORZ_BAFFLE_KEY,
                expected: [frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY]
            },
            {
                t: 9,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            },
            {
                t: 10,
                parts: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.VERT_BAFFLE_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY],
                partType: frnConstAppKeys.VERT_BAFFLE_KEY,
                expected: [frnConstAppKeys.HORZ_BAFFLE_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.EMPTY_SLOT_KEY, frnConstAppKeys.HORZ_BAFFLE_KEY]
            }
        ])
        .test("Should return false if the slot is empty or if the element is not contained or if EMPTY_SLOT_KEY is sent. Otherwise array with containing part removed from \"parts\" array.", function (params, assert) {
            var calculated = ismUtils.removePart(params.parts, params.partType);

            if (typeof calculated === 'object') {
                assert.deepEqual(calculated, params.expected, "Test: " + params.t + ", expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
            } else {
                assert.notOk(calculated, "Test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
            }
        });

    qunit.module("searchVertBflLeft(innerPartsSlotMatrix, row, col, numRows)");

    qunit
        .cases
        .init([
            /*
             * //========================== leftCol_maxNumShelves2_maxNumOfBeams2 ===========================//
             */
            {t: 1, row: 0, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},
            {t: 2, row: 0, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},
            {t: 3, row: 1, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},
            {t: 4, row: 1, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},

            {t: 5, row: 0, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},
            {t: 6, row: 0, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},
            {t: 7, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},
            {t: 8, row: 1, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},

            {t: 9, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},
            {t: 10, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},
            {t: 11, row: 1, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},
            {t: 12, row: 1, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 0},
            /*
             * //========================== leftCol_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 13, row: 0, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 14, row: 0, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 15, row: 0, col: 2, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 16, row: 1, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 17, row: 1, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 18, row: 1, col: 2, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},

            {t: 19, row: 0, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 20, row: 0, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 21, row: 0, col: 2, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 22, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 23, row: 1, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 24, row: 1, col: 2, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},

            {t: 25, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 26, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 27, row: 0, col: 2, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 28, row: 1, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 29, row: 1, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 30, row: 1, col: 2, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            /*
             * //========================== rightCol_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 31, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 32, row: 0, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 33, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 34, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 35, row: 1, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 36, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},

            {t: 37, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 38, row: 0, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 39, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 40, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 41, row: 1, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 42, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            /*
             * //========================== rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 43, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 44, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 45, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 46, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 47, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 48, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            /*
             * //========================== rightCol_top1Row_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 49, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 50, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 51, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 52, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},

            {t: 53, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 54, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 55, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 56, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 0},
            /*
             * //========================== horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 57, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 58, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 59, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 60, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 61, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 62, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},

            {t: 63, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 64, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 65, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 66, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 67, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 68, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            /*
             * //========================== horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 69, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 70, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 71, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 72, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 73, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 74, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},

            {t: 75, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 76, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 77, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 78, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 79, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 0},
            {t: 80, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            /*
             * //========================== horzBflRange_maxNumShelves4_maxNumOfBeams6 ===========================//
             */
            {t: 81, row: 0, col: 0, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 0},
            {t: 82, row: 0, col: 1, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 0},
            {t: 83, row: 0, col: 2, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 0},
            {t: 84, row: 2, col: 3, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 2},
            {t: 85, row: 2, col: 5, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 2},
            {t: 86, row: 0, col: 5, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},

            {t: 87, row: 0, col: 0, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 0},
            {t: 88, row: 0, col: 1, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 0},
            {t: 89, row: 0, col: 2, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 0},
            {t: 90, row: 2, col: 3, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 2},
            {t: 91, row: 2, col: 5, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 2},
            {t: 92, row: 0, col: 5, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},
            /*
             * //========================== rightCol_maxNumShelves3_maxNumOfBeams2 ===========================//
             */
            {t: 93, row: 0, col: 0, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 0},
            {t: 94, row: 0, col: 1, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 95, row: 1, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 0},
            {t: 96, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},

            {t: 97, row: 0, col: 0, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 0},
            {t: 98, row: 0, col: 1, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 90, row: 1, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 0},
            {t: 100, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1}
        ])
        .test("Should return index of the first slot that contains vertical baffle left from the current slot below the mouse cursor", function (params, assert) {
            var matrixStub = vertBaffleStubs[params.matrixStubName],
                calculated = ismUtils.searchVertBflLeft(matrixStub, params.row, params.col, params.numRows);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("searchVertBflRight(innerPartsSlotMatrix, row, col, numRows, numCols, rightWallOn)");

    qunit
        .cases
        .init([
            /*
             * //========================== leftCol_maxNumShelves2_maxNumOfBeams2 ===========================//
             */
            {t: 1, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 2, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 3, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},

            {t: 4, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 5, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 6, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},

            {t: 7, row: 0, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},
            {t: 8, row: 0, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},
            {t: 9, row: 1, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},
            {t: 10, row: 1, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: -1},

            {t: 11, row: 0, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 12, row: 0, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 13, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 14, row: 1, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},

            {t: 15, row: 1, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            {t: 16, row: 1, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: 2},
            /*
             * //========================== leftCol_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 17, row: 0, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 18, row: 0, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 19, row: 0, col: 2, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 20, row: 1, col: 0, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 21, row: 1, col: 1, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},
            {t: 22, row: 1, col: 2, numRows: 0, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: -1},

            {t: 23, row: 0, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 24, row: 0, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 25, row: 0, col: 2, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 26, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 27, row: 1, col: 1, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 28, row: 1, col: 2, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},

            {t: 29, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 30, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 31, row: 0, col: 2, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 32, row: 1, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 33, row: 1, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 34, row: 1, col: 2, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: 3},
            /*
             * //========================== rightCol_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 35, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 36, row: 0, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 37, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 38, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 39, row: 1, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 40, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},

            {t: 41, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 42, row: 0, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 43, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 44, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 45, row: 1, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 46, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: 2},
            /*
             * //========================== rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 47, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 48, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 49, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 50, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 51, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 52, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            /*
             * //========================== rightCol_top1Row_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 53, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 54, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 55, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 56, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 57, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 58, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 59, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 60, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_top1Row_maxNumShelves2_maxNumOfBeams3', expected: 3},
            /*
             * //========================== horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 61, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 62, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 63, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 64, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 65, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 66, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 3},

            {t: 67, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 68, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 69, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 70, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 71, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 72, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            /*
             * //========================== horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 ===========================//
             */
            {t: 73, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 74, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 75, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 76, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 77, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 78, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},

            {t: 79, row: 0, col: 0, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 80, row: 0, col: 1, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 81, row: 0, col: 2, numRows: 2, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 3},
            {t: 82, row: 1, col: 0, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 83, row: 1, col: 1, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            {t: 84, row: 1, col: 2, numRows: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: 2},
            /*
             * //========================== horzBflRange_maxNumShelves4_maxNumOfBeams6 ===========================//
             */
            {t: 85, row: 0, col: 0, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},
            {t: 86, row: 0, col: 1, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},
            {t: 87, row: 0, col: 2, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},
            {t: 88, row: 2, col: 3, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 6},
            {t: 89, row: 2, col: 5, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 6},
            {t: 90, row: 0, col: 5, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 6},

            {t: 91, row: 0, col: 0, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},
            {t: 92, row: 0, col: 1, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},
            {t: 93, row: 0, col: 2, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 4},
            {t: 94, row: 2, col: 3, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 6},
            {t: 95, row: 2, col: 5, numRows: 2, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 6},
            {t: 96, row: 0, col: 5, numRows: 4, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: 6},
            /*
             * //========================== rightCol_maxNumShelves3_maxNumOfBeams2 ===========================//
             */
            {t: 97, row: 0, col: 0, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 98, row: 0, col: 1, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 99, row: 1, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 100, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},

            {t: 101, row: 0, col: 0, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 102, row: 0, col: 1, numRows: 3, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 103, row: 1, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1},
            {t: 104, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: 1}
        ])
        .test("Should return index of the first slot that contains vertical baffle right from the current slot below the mouse cursor", function (params, assert) {
            var matrixStub = vertBaffleStubs[params.matrixStubName],
                calculated = ismUtils.searchVertBflRight(matrixStub, params.row, params.col, params.numRows);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("searchRangeForHanger(innerPartsSlotMatrix, row, col)");

    qunit
        .cases
        .init([
            /*
             * //========================================== leftCol_maxNumShelves2_maxNumOfBeams2 ===============================================//
             */
            {t: 1, row: 0, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 0, col: 0, numCols: 2}},
            {t: 2, row: 0, col: 1, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 0, col: 1, numCols: 1}},
            {t: 3, row: 1, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 1, col: 0, numCols: 2}},
            {t: 4, row: 1, col: 1, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 1, col: 1, numCols: 1}},
            /*
             * //========================================== rightCol_maxNumShelves2_maxNumOfBeams2 ===============================================//
             */
            {t: 5, row: 0, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 0, col: 0, numCols: 2}},
            {t: 6, row: 0, col: 1, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 0, col: 1, numCols: 1}},
            {t: 7, row: 1, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 1, col: 0, numCols: 2}},
            {t: 8, row: 1, col: 1, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: {row: 1, col: 1, numCols: 1}},
            /*
             * //========================================== leftCol_maxNumShelves2_maxNumOfBeams3 ===============================================//
             */
            {t: 9, row: 0, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 0, numCols: 3}},
            {t: 10, row: 0, col: 1, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 1, numCols: 2}},
            {t: 11, row: 0, col: 2, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 2, numCols: 1}},
            {t: 12, row: 1, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 0, numCols: 3}},
            {t: 13, row: 1, col: 1, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 1, numCols: 2}},
            {t: 14, row: 1, col: 2, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 2, numCols: 1}},
            /*
             * //========================================== horzBflRange_maxNumShelves10_maxNumOfBeams6 ===============================================//
             */
            {t: 15, row: 0, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 0, col: 0, numCols: frnConstGr.HANGER_WIDTH}},
            {t: 16, row: 0, col: 2, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 0, col: 2, numCols: frnConstGr.HANGER_WIDTH}},
            {t: 17, row: 0, col: 3, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 0, col: 3, numCols: 3}},
            {t: 18, row: 0, col: 4, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 0, col: 4, numCols: 2}},
            {t: 19, row: 0, col: 5, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 0, col: 5, numCols: 1}},
            {t: 20, row: 3, col: 0, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 3, col: 0, numCols: frnConstGr.HANGER_WIDTH}},
            {t: 21, row: 3, col: 2, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 3, col: 2, numCols: frnConstGr.HANGER_WIDTH}},
            {t: 22, row: 3, col: 3, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 3, col: 3, numCols: 3}},
            {t: 23, row: 3, col: 4, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 3, col: 4, numCols: 2}},
            {t: 24, row: 3, col: 5, width: frnConstGr.HANGER_WIDTH, matrixStubName: 'horzBflRange_maxNumShelves10_maxNumOfBeams6', expected: {row: 3, col: 5, numCols: 1}}
        ])
        .test("Searches column range for hanger. It is not dependent or left/right walls", function (params, assert) {
            var matrixStub = vertBaffleStubs[params.matrixStubName],
                calculated = ismUtils.searchRangeForHanger(matrixStub, params.row, params.col, params.width);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("HorzBaffleStubs - searchEmptySpaceForHanger(innerPartsSlotMatrix, row, col, numCols, leftWallOn, rightWallOn, partWidth, partHeight)");

    qunit
        .cases
        .init([
            /*
             * //======================================= topRow_maxNumShelves2_maxNumOfBeams2 ===============================//
             */
            {t: 1, row: 0, col: 0, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2', expected: false},
            {t: 2, row: 0, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2', expected: false},
            {t: 3, row: 1, col: 0, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2', expected: false},
            /*
             * //======================================= topRow_maxNumShelves3_maxNumOfBeams2 ===============================//
             */
            {t: 4, row: 0, col: 0, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 5, row: 0, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 6, row: 1, col: 0, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            /*
             * //======================================= bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 ===============================//
             */
            {t: 7, row: 0, col: 0, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: false},
            {t: 8, row: 0, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: false},
            {t: 9, row: 1, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: false}
        ])
        .test("Determines wheter the hanger will be drawn or not. Must have horizontal baffle above.", function (params, assert) {
            var matrixStub = horzBaffleStubs[params.matrixStubName],
                calculated = ismUtils.searchEmptySpaceForHanger(matrixStub, params.row, params.col, params.numCols, params.width, params.height);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("HangerStubs - searchEmptySpaceForHanger(innerPartsSlotMatrix, row, col, numCols, leftWallOn, rightWallOn, partWidth, partHeight)");

    qunit
        .cases
        .init([
            /*
             * //======================================= topRow_maxNumShelves6_maxNumOfBeams5 ===============================//
             */
            {t: 1, row: 0, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: true},
            {t: 2, row: 0, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: true},
            {t: 3, row: 0, col: 2, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: true},
            {t: 4, row: 1, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 5, row: 2, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 6, row: 3, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},

            {t: 7, row: 0, col: 0, numCols: 3, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 8, row: 0, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 9, row: 0, col: 2, numCols: 1, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 10, row: 1, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 11, row: 2, col: 1, numCols: 3, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 12, row: 3, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            /*
             * //======================================= bottomRow_maxNumShelves6_maxNumOfBeams5 ===============================//
             */
            {t: 13, row: 0, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 14, row: 0, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 15, row: 0, col: 2, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 16, row: 1, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 17, row: 2, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 18, row: 3, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},

            {t: 19, row: 0, col: 0, numCols: 3, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 20, row: 0, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 21, row: 0, col: 2, numCols: 1, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 22, row: 1, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 23, row: 2, col: 1, numCols: 3, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            {t: 24, row: 3, col: 1, numCols: 2, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams5', expected: false},
            /*
             * //======================================= middleRow_maxNumShelves8_maxNumOfBeams5 ===============================//
             */
            {t: 25, row: 0, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            {t: 26, row: 0, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            {t: 27, row: 0, col: 2, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            {t: 28, row: 2, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: true},
            {t: 29, row: 2, col: 2, numCols: 3,                       width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            {t: 30, row: 2, col: 3, numCols: 2,                       width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            {t: 31, row: 4, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            {t: 32, row: 4, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            {t: 33, row: 4, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'middleRow_maxNumShelves8_maxNumOfBeams5', expected: false},
            /*
             * //======================================= mixed_maxNumShelves8_maxNumOfBeams8 ===============================//
             */
            {t: 34, row: 0, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 35, row: 0, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 36, row: 0, col: 2, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 37, row: 2, col: 1, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: true},
            {t: 38, row: 2, col: 2, numCols: 3,                       width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 39, row: 2, col: 3, numCols: 2,                       width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 40, row: 2, col: 4, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: true},
            {t: 41, row: 4, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 42, row: 4, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 43, row: 4, col: 0, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false},
            {t: 44, row: 0, col: 2, numCols: frnConstGr.HANGER_WIDTH, width: frnConstGr.HANGER_WIDTH, height: frnConstGr.HANGER_HEIGHT, matrixStubName: 'mixed_maxNumShelves8_maxNumOfBeams8', expected: false}
        ])
        .test("Determines wheter the hanger will be drawn or not. Must have horizontal baffle above.", function (params, assert) {
            var matrixStub = hangerStubs[params.matrixStubName],
                calculated = ismUtils.searchEmptySpaceForHanger(matrixStub, params.row, params.col, params.numCols, params.width, params.height);

            assert.equal(calculated, params.expected, "expected: " + params.expected + ", calculated: " + calculated);
        });

    /* TODO add these tests for addAreaOfParts() and remove them after
     * qunit.module("addHorzBaffle(innerPartsSlotMatrix, row, col, numCols)");

    qunit
        .cases
        .init([
            {row: 0, col: 0, numCols: 2, maxNumOfShelves: 2, maxNumOfBeams: 2, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2'},
            {row: 1, col: 0, numCols: 2, maxNumOfShelves: 2, maxNumOfBeams: 2, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams2'},
            {row: 0, col: 0, numCols: 2, maxNumOfShelves: 3, maxNumOfBeams: 2, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2'},
            {row: 2, col: 0, numCols: 2, maxNumOfShelves: 3, maxNumOfBeams: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2'},
            {row: 1, col: 1, numCols: 2, maxNumOfShelves: 2, maxNumOfBeams: 3, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3'},
            {row: 1, col: 0, numCols: 3, maxNumOfShelves: 2, maxNumOfBeams: 3, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams3'}
        ])
        .test("The new matrix should have changed rows as given in the params", function (params, assert) {
            var innerPartsSlotMatrix = ismUtils.defaultInnerPartsMatrix(params.maxNumOfShelves, params.maxNumOfBeams),
                calculated = ismUtils.addHorzBaffle(innerPartsSlotMatrix, params.row, params.col, params.numCols),
                expected = horzBaffleStubs[params.matrixStubName];

            assert.deepEqual(calculated, expected, "expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
        });

        qunit.module("addVertBaffle(innerPartsSlotMatrix, row, col, numRows)");

    qunit
        .cases
        .init([
            {row: 0, col: 0, numRows: 2, maxNumOfShelves: 2, maxNumOfBeams: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2'},
            {row: 0, col: 1, numRows: 2, maxNumOfShelves: 2, maxNumOfBeams: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2'},
            {row: 0, col: 1, numRows: 3, maxNumOfShelves: 3, maxNumOfBeams: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2'},
            {row: 1, col: 1, numRows: 2, maxNumOfShelves: 3, maxNumOfBeams: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2'},
            {row: 0, col: 0, numRows: 2, maxNumOfShelves: 2, maxNumOfBeams: 3, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3'},
            {row: 0, col: 2, numRows: 2, maxNumOfShelves: 2, maxNumOfBeams: 3, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3'},
            {row: 1, col: 2, numRows: 1, maxNumOfShelves: 2, maxNumOfBeams: 3, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3'}
        ])
        .test("The new matrix should have changed cols as given in the params", function (params, assert) {
            var innerPartsSlotMatrix = ismUtils.defaultInnerPartsMatrix(params.maxNumOfShelves, params.maxNumOfBeams),
                calculated = ismUtils.addVertBaffle(innerPartsSlotMatrix, params.row, params.col, params.numRows),
                expected = vertBaffleStubs[params.matrixStubName];

            assert.deepEqual(calculated, expected, "expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
        });

        qunit.module("addHorzBeam(innerPartsSlotMatrix, row, col, numCols)");

    qunit
        .cases
        .init([
            {t: 1, row: 0, col: 0, numCols: 2, maxNumOfShelves: 2, maxNumOfBeams: 2, matrixStubName: 'fullHorzBeam_maxNumShelves2_maxNumOfBeams2'},
            {t: 2, row: 1, col: 0, numCols: 2, maxNumOfShelves: 2, maxNumOfBeams: 2, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams2'},
            {t: 3, row: 0, col: 0, numCols: 2, maxNumOfShelves: 3, maxNumOfBeams: 2, matrixStubName: 'fullHorzBeam_maxNumShelves3_maxNumOfBeams2'},
            {t: 4, row: 2, col: 0, numCols: 2, maxNumOfShelves: 3, maxNumOfBeams: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2'},
            {t: 5, row: 1, col: 1, numCols: 2, maxNumOfShelves: 2, maxNumOfBeams: 3, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3'},
            {t: 6, row: 1, col: 0, numCols: 3, maxNumOfShelves: 2, maxNumOfBeams: 3, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams3'},
            {t: 7, row: 0, col: 1, numCols: 1, maxNumOfShelves: 6, maxNumOfBeams: 2, matrixStubName: 'topRow_maxNumShelves6_maxNumOfBeams2'},
            {t: 8, row: 1, col: 0, numCols: 2, maxNumOfShelves: 6, maxNumOfBeams: 3, matrixStubName: 'bottomRow_maxNumShelves6_maxNumOfBeams3'}
        ])
        .test("The new matrix should contain horizontal beam where specified", function (params, assert) {
            var defaultInnerPartsSlotMatrix = ismUtils.defaultInnerPartsMatrix(params.maxNumOfShelves, params.maxNumOfBeams),
                calculated = ismUtils.addHorzBeam(defaultInnerPartsSlotMatrix, params.row, params.col, params.numCols),
                expected = horzBeamStubs[params.matrixStubName];

            assert.deepEqual(calculated, expected, "expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
        });
     */
    qunit.module("addAreaOfParts(slotObject, partType) - Fills the matrix with specific part in a given area, partType = HORZ_BAFFLE_KEY", {
        before: function () {

        },
        after: function () {
            console.log("hello vlade");
        }
    });

    qunit.test("emptyMatrix_rows2_cols2, topRow_AllAccess_maxNumShelves2_maxNumOfBeams2", function (assert) {
        var givenMatrix = defaultSlotMatrixStubs.emptyMatrix_rows2_cols2,
            expectedMatrix = horzBaffleStubs.topRow_AllAccess_maxNumShelves2_maxNumOfBeams2(),
            calculated = null,
            done = assert.async();

        setTimeout(function() {
            calculated = ismUtils.addAreaOfParts(givenMatrix, 0, 0, 1, 2, frnConstApp.Keys.HORZ_BAFFLE_KEY);
            assert.deepEqual(calculated, expectedMatrix, "expected: " + JSON.stringify(expectedMatrix) + ", calculated: " + JSON.stringify(calculated));
            done();
        }, 500);
    });

    qunit.test("emptyMatrix_rows2_cols2, bottomRow_AllAccess_maxNumShelves2_maxNumOfBeams2", function (assert) {
        var givenMatrix = defaultSlotMatrixStubs.emptyMatrix_rows2_cols2,
            expectedMatrix = horzBaffleStubs.bottomRow_AllAccess_maxNumShelves2_maxNumOfBeams2(),
            calculated = null,
            done = assert.async();

        setTimeout(function() {
            calculated = ismUtils.addAreaOfParts(givenMatrix, 1, 0, 1, 2, frnConstApp.Keys.HORZ_BAFFLE_KEY);
            assert.deepEqual(
                calculated, expectedMatrix,
                "expected: " + JSON.stringify(expectedMatrix) + ", calculated: " + JSON.stringify(calculated));
            done();
        }, 500);

    });

    qunit.test("emptyMatrix_rows6_cols6, stairsTD_AllAccess_maxNumShelves6_maxNumOfBeams6", function (assert) {
        var givenMatrix = defaultSlotMatrixStubs.emptyMatrix_rows6_cols6(),
            expectedMatrix = horzBaffleStubs.stairsTD_AllAccess_maxNumShelves6_maxNumOfBeams6(),
            partType = frnConstApp.Keys.HORZ_BAFFLE_KEY,
            calculated = null,
            done = assert.async();

        setTimeout(function() {
            calculated = ismUtils.addAreaOfParts(givenMatrix, 0, 0, 6, 1, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 1, 1, 5, 1, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 2, 2, 4, 1, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 3, 3, 3, 1, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 4, 4, 2, 1, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 5, 5, 1, 1, partType);

            assert.deepEqual(
                calculated, expectedMatrix,
                "expected: " + JSON.stringify(expectedMatrix) + ", calculated: " + JSON.stringify(calculated));

            done();
        }, 500);
    });

    qunit.test("emptyMatrix_rows6_cols6, stairsBU_AllAccess_maxNumShelves6_maxNumOfBeams6", function(assert) {
        var givenMatrix = defaultSlotMatrixStubs.emptyMatrix_rows6_cols6(),
            expectedMatrix = horzBaffleStubs.stairsBU_AllAccess_maxNumShelves6_maxNumOfBeams6(),
            partType = frnConstApp.Keys.HORZ_BAFFLE_KEY,
            calculated = null,
            done = assert.async();

        setTimeout(function() {
            calculated = ismUtils.addAreaOfParts(givenMatrix, 0, 0, 1, 6, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 1, 1, 1, 5, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 2, 2, 1, 4, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 3, 3, 1, 3, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 4, 4, 1, 2, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 5, 5, 1, 1, partType);

            assert.deepEqual(
                calculated, expectedMatrix,
                "expected: " + JSON.stringify(expectedMatrix) + ", calculated: " + JSON.stringify(calculated));

            done();
        }, 500);
    });

    qunit.test("emptyMatrix_rows6_cols6, square_AllAccess_maxNumShelves6_maxNumOfBeams6", function(assert) {
        var givenMatrix = defaultSlotMatrixStubs.emptyMatrix_rows6_cols6(),
            expectedMatrix = horzBaffleStubs.square_AllAccess_maxNumShelves6_maxNumOfBeams6(),
            partType = frnConstApp.Keys.HORZ_BAFFLE_KEY,
            calculated = null,
            done = assert.async();

        setTimeout(function() {
            calculated = ismUtils.addAreaOfParts(givenMatrix, 0, 0, 1, 6, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 1, 0, 5, 1, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 1, 5, 5, 1, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 5, 1, 1, 4, partType);

            assert.deepEqual(
                calculated, expectedMatrix,
                "expected: " + JSON.stringify(expectedMatrix) + ", calculated: " + JSON.stringify(calculated));

            done();
        }, 500);
    });

    qunit.test("emptyMatrix_rows6_cols6, twoRects_AllAccess_maxNumShelves6_maxNumOfBeams6", function(assert) {
        var givenMatrix = defaultSlotMatrixStubs.emptyMatrix_rows6_cols6(),
            expectedMatrix = horzBaffleStubs.twoRects_AllAccess_maxNumShelves6_maxNumOfBeams6(),
            partType = frnConstApp.Keys.HORZ_BAFFLE_KEY,
            calculated = null,
            done = assert.async();

        setTimeout(function() {
            calculated = ismUtils.addAreaOfParts(givenMatrix, 0, 0, 4, 2, partType);
            calculated = ismUtils.addAreaOfParts(calculated, 2, 3, 3, 3, partType);

            assert.deepEqual(
                calculated, expectedMatrix,
                "expected: " + JSON.stringify(expectedMatrix) + ", calculated: " + JSON.stringify(calculated));

            done();
        }, 500);
    });

    qunit.module("addColumns(innerPartsSlotMatrix, col, colShift, ceilOn, floorOn)", {
        before: function () {

        },

        beforeEach: function () {
            var emptySlotObject = [],
                HBF_Slot = [],
                emptyMatrix_rows2_cols2 = [],
                emptyMatrix_rows2_cols3 = [],
                emptyMatrix_rows2_cols4 = [],
                emptyMatrix_rows3_cols2 = [],

                emptyMatrix_rows2_cols9 = [],
                emptyMatrix_FloorOn_rows2_cols9 = [],
                emptyMatrix_CeilOn_FloorOn_rows2_cols9 = [],
                emptyMatrix_CeilOn_rows2_cols9 = [],

                emptyMatrix_rows3_cols3 = [],
                emptyMatrix_FloorOn_rows3_cols3 = [],
                emptyMatrix_CeilOn_FloorOn_rows3_cols3 = [],
                emptyMatrix_CeilOn_rows3_cols3 = [],

                emptyMatrix_rows3_cols6 = [],
                emptyMatrix_FloorOn_rows3_cols6 = [],
                emptyMatrix_CeilOn_rows3_cols6 = [],
                emptyMatrix_CeilOn_FloorOn_rows3_cols6 = [];

            this.emptySlotObject = [
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY];
            emptySlotObject = this.emptySlotObject;

            this.HBF_Slot = [
                frnConstAppKeys.HORZ_BAFFLE_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY];
            HBF_Slot = this.HBF_Slot;

            this.emptyMatrix_rows2_cols2 = [
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_rows2_cols2 = this.emptyMatrix_rows2_cols2;

            this.emptyMatrix_rows3_cols2 = [
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_rows3_cols2 = this.emptyMatrix_rows3_cols2;

            this.emptyMatrix_rows3_cols3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_rows3_cols3 = this.emptyMatrix_rows3_cols3;

            this.emptyMatrix_FloorOn_rows3_cols3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, HBF_Slot]
            ];
            emptyMatrix_FloorOn_rows3_cols3 = this.emptyMatrix_FloorOn_rows3_cols3;

            this.emptyMatrix_CeilOn_FloorOn_rows3_cols3 = [
                [emptySlotObject, emptySlotObject, HBF_Slot],
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, HBF_Slot]
            ];
            emptyMatrix_CeilOn_FloorOn_rows3_cols3 = this.emptyMatrix_CeilOn_FloorOn_rows3_cols3;

            this.emptyMatrix_CeilOn_rows3_cols3 = [
                [emptySlotObject, emptySlotObject, HBF_Slot],
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_CeilOn_rows3_cols3 = this.emptyMatrix_CeilOn_rows3_cols3;

            this.emptyMatrix_rows3_cols6 = [
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_rows3_cols6 = this.emptyMatrix_rows3_cols6;

            this.emptyMatrix_FloorOn_rows3_cols6 = [
                [emptySlotObject, emptySlotObject, emptySlotObject,     emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject,     emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, HBF_Slot,            HBF_Slot,        HBF_Slot,        HBF_Slot]
            ];
            emptyMatrix_FloorOn_rows3_cols6 = this.emptyMatrix_FloorOn_rows3_cols6;

            this.emptyMatrix_CeilOn_rows3_cols6 = [
                [emptySlotObject, emptySlotObject, HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_CeilOn_rows3_cols6 = this.emptyMatrix_CeilOn_rows3_cols6;

            this.emptyMatrix_CeilOn_FloorOn_rows3_cols6 = [
                [emptySlotObject, emptySlotObject, HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot]
            ];
            emptyMatrix_CeilOn_FloorOn_rows3_cols6 = this.emptyMatrix_CeilOn_FloorOn_rows3_cols6;

            this.emptyMatrix_rows2_cols3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_rows2_cols3 = this.emptyMatrix_rows2_cols3;

            this.emptyMatrix_rows2_cols4 = [
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_rows2_cols4 = this.emptyMatrix_rows2_cols4;

            this.emptyMatrix_rows2_cols9 = [
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_rows2_cols9 = this.emptyMatrix_rows2_cols9;

            this.emptyMatrix_FloorOn_rows2_cols9 = [
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject,    emptySlotObject,    emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, HBF_Slot,        HBF_Slot,           HBF_Slot,           HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot]
            ];
            emptyMatrix_FloorOn_rows2_cols9 = this.emptyMatrix_FloorOn_rows2_cols9;

            this.emptyMatrix_CeilOn_rows2_cols9 = [
                [emptySlotObject, emptySlotObject, HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot,        HBF_Slot],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
            ];
            emptyMatrix_CeilOn_rows2_cols9 = this.emptyMatrix_CeilOn_rows2_cols9;

            this.emptyMatrix_CeilOn_FloorOn_rows2_cols9 = [
                [emptySlotObject, emptySlotObject, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot],
                [emptySlotObject, emptySlotObject, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot, HBF_Slot]
            ];
            emptyMatrix_CeilOn_FloorOn_rows2_cols9 = this.emptyMatrix_CeilOn_FloorOn_rows2_cols9;
        },

        afterEach: function () {
            this.emptySlotObject = null;
            this.HBF_Slot = null;

            this.emptyMatrix_rows2_cols2 = null;
            this.emptyMatrix_rows2_cols3 = null;
            this.emptyMatrix_rows2_cols4 = null;
            this.emptyMatrix_rows3_cols2 = null;

            this.emptyMatrix_rows2_cols9 = null;
            this.emptyMatrix_FloorOn_rows2_cols9 = null;
            this.emptyMatrix_CeilOn_rows2_cols9 = null;
            this.emptyMatrix_CeilOn_FloorOn_rows2_cols9 = null;

            this.emptyMatrix_rows3_cols3 = null;
            this.emptyMatrix_FloorOn_rows3_cols3 = null;
            this.emptyMatrix_CeilOn_rows3_cols3 = null;
            this.emptyMatrix_CeilOn_FloorOn_rows3_cols3 = null;

            this.emptyMatrix_rows3_cols6 = null;
            this.emptyMatrix_FloorOn_rows3_cols6 = null;
            this.emptyMatrix_CeilOn_rows3_cols6 = null;
            this.emptyMatrix_CeilOn_FloorOn_rows3_cols6 = null;

        }
    });

    qunit
        .cases
        .init([
            {t: 1, numCols: 1, ceilOn: false, floorOn: false, matrixStubName: 'emptyMatrix_rows2_cols2', expected: 'emptyMatrix_rows2_cols3'},
            {t: 2, numCols: 2, ceilOn: false, floorOn: false, matrixStubName: 'emptyMatrix_rows2_cols2', expected: 'emptyMatrix_rows2_cols4'},

            {t: 3, numCols: 7, ceilOn: false, floorOn: false, matrixStubName: 'emptyMatrix_rows2_cols2', expected: 'emptyMatrix_rows2_cols9'},
            {t: 4, numCols: 7, ceilOn: false, floorOn: true, matrixStubName: 'emptyMatrix_rows2_cols2', expected: 'emptyMatrix_FloorOn_rows2_cols9'},
            {t: 5, numCols: 7, ceilOn: true, floorOn: true, matrixStubName: 'emptyMatrix_rows2_cols2', expected: 'emptyMatrix_CeilOn_FloorOn_rows2_cols9'},
            {t: 6, numCols: 7, ceilOn: true, floorOn: false, matrixStubName: 'emptyMatrix_rows2_cols2', expected: 'emptyMatrix_CeilOn_rows2_cols9'},

            {t: 7, numCols: 1, ceilOn: false, floorOn: false, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_rows3_cols3'},
            {t: 8, numCols: 1, ceilOn: false, floorOn: true, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_FloorOn_rows3_cols3'},
            {t: 9, numCols: 1, ceilOn: true, floorOn: true, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_CeilOn_FloorOn_rows3_cols3'},
            {t: 10, numCols: 1, ceilOn: true, floorOn: false, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_CeilOn_rows3_cols3'},

            {t: 11, numCols: 4, ceilOn: false, floorOn: false, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_rows3_cols6'},
            {t: 12, numCols: 4, ceilOn: false, floorOn: true, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_FloorOn_rows3_cols6'},
            {t: 13, numCols: 4, ceilOn: true, floorOn: true, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_CeilOn_FloorOn_rows3_cols6'},
            {t: 14, numCols: 4, ceilOn: true, floorOn: false, matrixStubName: 'emptyMatrix_rows3_cols2', expected: 'emptyMatrix_CeilOn_rows3_cols6'}

        ])
        .test("", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                expected = this[params.expected],
                calculated = ismUtils.addColumns(matrixStub, params.numCols, params.ceilOn, params.floorOn);

            assert.deepEqual(calculated, expected, "Test: " + params.t + ", expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
        });

}

runTests(QUnit, FrnConstr, Phaser, window);
