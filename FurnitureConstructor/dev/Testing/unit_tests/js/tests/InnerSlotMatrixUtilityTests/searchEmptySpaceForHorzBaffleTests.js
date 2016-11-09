function runTests(qunit, frnConstr, phaser, window) {
    'use strict';

    var utils = frnConstr.Utility,
        frnConst = frnConstr.Const,
        frnConstGr = frnConst.Graphics,
        frnConstApp = frnConst.Application,
        frnConstAppKeys = frnConstApp.Keys,
        pdUtils = frnConstr.ProcessDataUtility,
        ismUtils = frnConstr.InnerSlotMatrixUtility,

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
        },
        before = function () {
            var emptySlotObject = [];

            this.emptySlotObject = [
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY];
            emptySlotObject = this.emptySlotObject;

            this.HBF_SlotObject = [
                frnConstAppKeys.HORZ_BAFFLE_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY
                ];

            this.HBM_SlotObject = [
                frnConstAppKeys.HORZ_BEAM_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY
                ];

            this.HBF_VBF_SlotObject = [
                frnConstAppKeys.HORZ_BAFFLE_KEY,
                frnConstAppKeys.VERT_BAFFLE_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY
            ];

            this.VBF_SlotObject = [
                frnConstAppKeys.VERT_BAFFLE_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY,
                frnConstAppKeys.EMPTY_SLOT_KEY
            ];

            this.emptyMatrix_rows3_cols3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];

            this.emptyMatrix_rows3_cols4 = [
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
            ];

            this.emptyMatrix_rows4_cols3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];
        };

    qunit.log(logForInnerShelveSlotMatrix);

    qunit.module("searchEmptySpaceForHorzBaffle(innerPartsSlotMatrix, row, col, numCols) against horzBaffleStubs", {
        before: before,

        beforeEach: function () {
            var defaultSlotMatrixStubs = this.defaultSlotMatrixStubs,
                emptySlotObject = this.emptySlotObject,
                HBF_SlotObject = this.HBF_SlotObject,
                HBF_VBF_SlotObject = this.HBF_VBF_SlotObject,
                VBF_SlotObject = this.VBF_SlotObject,

                emptyMatrix_rows3_cols3 = this.emptyMatrix_rows3_cols3,
                emptyMatrix_rows3_cols4 = this.emptyMatrix_rows3_cols4,
                emptyMatrix_rows4_cols3 = this.emptyMatrix_rows4_cols3;

            this.topRow_maxNumShelves2_maxNumOfBeams2 = {};
            this.bottomRow_maxNumShelves2_maxNumOfBeams2 = {};
            this.topRow_maxNumShelves3_maxNumOfBeams2 = {};
            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = {};
            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = {};
            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = {};
            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = {};

            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = {};
            this.horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = {};
            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4 = {};
            this.horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = {};
            this.horzBflRange_maxNumShelves4_maxNumOfBeams6 = {};

            this.topRow_maxNumShelves2_maxNumOfBeams2 = [
                [HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject]
            ];

            this.bottomRow_maxNumShelves2_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject]
            ];

            this.topRow_maxNumShelves3_maxNumOfBeams2 = [
                [HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject]
            ];

            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject]
            ];

            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, HBF_SlotObject, HBF_SlotObject]
            ];

            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
            ];

            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = [
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];
        },

        afterEach: function () {

            this.topRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.topRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = null;

            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4 = null;
            this.horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.horzBflRange_maxNumShelves4_maxNumOfBeams6 = null;

            this.topRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.topRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = null;
        }
    });

    qunit
        .cases
        .init([
            {t: 1, row: 0, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2', expected: false},
            {t: 2, row: 1, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2', expected: true},

            {t: 3, row: 0, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams2', expected: true},
            {t: 4, row: 1, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams2', expected: false},

            {t: 5, row: 0, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 6, row: 1, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 7, row: 2, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 8, row: 0, col: 1, numCols: 1, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 9, row: 1, col: 1, numCols: 1, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: true},

            {t: 10, row: 0, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 11, row: 1, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 12, row: 2, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 13, row: 1, col: 1, numCols: 1, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 14, row: 2, col: 1, numCols: 1, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: false},

            {t: 15, row: 0, col: 0, numCols: 3, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 16, row: 0, col: 0, numCols: 2, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 17, row: 1, col: 1, numCols: 3, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: false},
            {t: 18, row: 1, col: 0, numCols: 1, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: true},

            {t: 19, row: 0, col: 0, numCols: 3, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 20, row: 1, col: 0, numCols: 3, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 21, row: 0, col: 0, numCols: 3, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams3_2', expected: false},
            {t: 22, row: 1, col: 0, numCols: 3, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams3_2', expected: true}
        ])
        .test("true for horizontal baffle = true, false for horizontal baffle = false or if no part slots ar available", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                calculated =
                    ismUtils
                        .searchEmptySpaceForHorzBaffle(
                            matrixStub,
                            params.row,
                            params.col,
                            params.numCols);

            assert.equal(calculated, params.expected, "Test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("searchEmptySpaceForHorzBaffle(innerPartsSlotMatrix, row, col, numCols) against horzBeamStubs", {
        before: before,

        beforeEach: function () {
            var defaultSlotMatrixStubs = this.defaultSlotMatrixStubs,
                emptySlotObject = this.emptySlotObject,
                HBF_SlotObject = this.HBF_SlotObject,
                HBM_SlotObject = this.HBM_SlotObject,
                HBF_VBF_SlotObject = this.HBF_VBF_SlotObject,
                VBF_SlotObject = this.VBF_SlotObject;

            this.topRow_maxNumShelves2_maxNumOfBeams2 = [
                [HBM_SlotObject, HBM_SlotObject],
                [emptySlotObject, emptySlotObject]
            ];

            this.bottomRow_maxNumShelves2_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [HBM_SlotObject, HBM_SlotObject]
            ];

            this.topRow_maxNumShelves3_maxNumOfBeams2 = [
                [HBM_SlotObject, HBM_SlotObject],
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject]
            ];

            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject],
                [HBM_SlotObject, HBM_SlotObject]
            ];

            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, HBM_SlotObject, HBM_SlotObject]
            ];

            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [HBM_SlotObject, HBM_SlotObject, HBM_SlotObject]
            ];

            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = [
                [HBM_SlotObject, HBM_SlotObject, HBM_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];
        },

        afterEach: function () {
            this.topRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.topRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = null;

            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4 = null;
            this.horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.horzBflRange_maxNumShelves4_maxNumOfBeams6 = null;

            this.topRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.topRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = null;
        }
    });

    qunit
        .cases
        .init([
            {t: 1, row: 0, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2', expected: false},
            {t: 2, row: 1, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams2', expected: true},

            {t: 3, row: 0, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams2', expected: true},
            {t: 4, row: 1, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams2', expected: false},

            {t: 5, row: 0, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 6, row: 1, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 7, row: 2, col: 0, numCols: 2, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 8, row: 0, col: 1, numCols: 1, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 9, row: 1, col: 1, numCols: 1, matrixStubName: 'topRow_maxNumShelves3_maxNumOfBeams2', expected: true},

            {t: 10, row: 0, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 11, row: 1, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 12, row: 2, col: 0, numCols: 2, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 13, row: 1, col: 1, numCols: 1, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 14, row: 2, col: 1, numCols: 1, matrixStubName: 'bottomRow_maxNumShelves3_maxNumOfBeams2', expected: false},

            {t: 15, row: 0, col: 0, numCols: 3, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 16, row: 0, col: 0, numCols: 2, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 17, row: 1, col: 1, numCols: 3, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: false},
            {t: 18, row: 1, col: 0, numCols: 1, matrixStubName: 'bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3', expected: true},

            {t: 19, row: 0, col: 0, numCols: 3, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 20, row: 1, col: 0, numCols: 3, matrixStubName: 'bottomRow_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 21, row: 0, col: 0, numCols: 3, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams3_2', expected: false},
            {t: 22, row: 1, col: 0, numCols: 3, matrixStubName: 'topRow_maxNumShelves2_maxNumOfBeams3_2', expected: true}
        ])
        .test("true for horizontal beam = true, false for horizontal beams = false or if no part slots ar available", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                calculated =
                    ismUtils
                        .searchEmptySpaceForHorzBaffle(
                            matrixStub,
                            params.row,
                            params.col,
                            params.numCols);

            assert.equal(calculated, params.expected, "Test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("searchRangeForHorzBaffle(innerPartsSlotMatrix, row, col) against vertBaffleStubs", {
        before: before,
        beforeEach: function () {
            var defaultSlotMatrixStubs = this.defaultSlotMatrixStubs,
                emptySlotObject = this.emptySlotObject,
                HBF_SlotObject = this.HBF_SlotObject,
                HBM_SlotObject = this.HBM_SlotObject,
                HBF_VBF_SlotObject = this.HBF_VBF_SlotObject,
                VBF_SlotObject = this.VBF_SlotObject;

            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = [
                [VBF_SlotObject, emptySlotObject, VBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];

            this.horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [VBF_SlotObject, emptySlotObject, VBF_SlotObject]
            ];

            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4 = [
                [VBF_SlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
            ];

            this.horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = [
                [VBF_SlotObject, VBF_SlotObject],
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject]
            ];

            this.horzBflRange_maxNumShelves4_maxNumOfBeams6 = [
                [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
                [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
                [VBF_SlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject],
                [VBF_SlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject]
            ];

            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = [
                [VBF_SlotObject, emptySlotObject, VBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];
        },

        afterEach: function () {
            this.topRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.topRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = null;

            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4 = null;
            this.horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.horzBflRange_maxNumShelves4_maxNumOfBeams6 = null;

            this.topRow_maxNumShelves2_maxNumOfBeams2 = null;
            this.topRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.bottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.topRow_maxNumShelves2_maxNumOfBeams3_2 = null;
        }
    });

    qunit
        .cases
        .init([
            {t: 1, row: 0, col: 1, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 0, numCols: 2}},
            {t: 2, row: 1, col: 1, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 0, numCols: 3}},

            {t: 3, row: 0, col: 1, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 0, numCols: 3}},
            {t: 4, row: 1, col: 1, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 0, numCols: 2}},

            {t: 5, row: 0, col: 2, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4', expected: {row: 0, col: 0, numCols: 3}},
            {t: 6, row: 1, col: 3, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4', expected: {row: 1, col: 0, numCols: 4}},

            {t: 7, row: 0, col: 0, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 0, col: 0, numCols: 1}},
            {t: 8, row: 2, col: 0, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 2, col: 0, numCols: 2}},

            {t: 9, row: 0, col: 3, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 0, col: 0, numCols: 4}},
            {t: 10, row: 1, col: 5, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 1, col: 4, numCols: 2}},
            {t: 11, row: 1, col: 4, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 1, col: 4, numCols: 2}},
            {t: 12, row: 2, col: 2, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 2, col: 2, numCols: 4}},
            {t: 13, row: 2, col: 4, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 2, col: 2, numCols: 4}},
            {t: 14, row: 3, col: 0, leftWallOn: true, rightWallOn: true, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 3, col: 0, numCols: 2}},

            {t: 15, row: 0, col: 1, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 0, numCols: 2}},
            {t: 16, row: 1, col: 1, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 0, numCols: 3}},

            {t: 17, row: 0, col: 1, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 0, numCols: 3}},
            {t: 18, row: 1, col: 1, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 0, numCols: 2}},

            {t: 19, row: 0, col: 2, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4', expected: {row: 0, col: 0, numCols: 3}},
            {t: 20, row: 1, col: 3, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4', expected: {row: 1, col: 0, numCols: 4}},

            {t: 21, row: 0, col: 0, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 0, col: 0, numCols: 1}},
            {t: 22, row: 2, col: 0, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 2, col: 0, numCols: 2}},

            {t: 23, row: 0, col: 3, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 0, col: 0, numCols: 4}},
            {t: 24, row: 1, col: 5, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 1, col: 4, numCols: 2}},
            {t: 25, row: 1, col: 4, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 1, col: 4, numCols: 2}},
            {t: 26, row: 2, col: 2, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 2, col: 2, numCols: 4}},
            {t: 27, row: 2, col: 4, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 2, col: 2, numCols: 4}},
            {t: 28, row: 3, col: 0, leftWallOn: false, rightWallOn: false, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: {row: 3, col: 0, numCols: 2}}

        ])
        .test("The new matrix should have changed cols as given in the params", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                calculated = ismUtils.searchRangeForHorzBaffle(matrixStub, params.row, params.col, params.leftWallOn, params.rightWallOn);

            assert.deepEqual(calculated, params.expected, "Test: " + params.t + ", expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });
}

runTests(QUnit, FrnConstr, Phaser, window);
