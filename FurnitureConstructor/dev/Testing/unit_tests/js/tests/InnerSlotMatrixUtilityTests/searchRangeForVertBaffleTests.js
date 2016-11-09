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
        defaultSlotMatrixStubs = frnConstr.DefaultSlotMatrixStubs,
        horzBaffleStubs = frnConstr.HorzBaffleStubs,
        horzBeamStubs = frnConstr.HorzBeamStubs,
        vertBaffleStubs = frnConstr.VertBaffleStubs,
        vertBeamStubs = frnConstr.VertBeamStubs,
        HBF_SlotObject = defaultSlotMatrixStubs.HBF_SlotObject,
        VBF_SlotObject = defaultSlotMatrixStubs.VBF_SlotObject,
        VBM_SlotObject = defaultSlotMatrixStubs.VBM_SlotObject,
        emptySlotObject = defaultSlotMatrixStubs.emptySlotObject,

        vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = [],
        vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = [],
        vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = [],
        vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 = [],
        vertBflRange_maxNumShelves6_maxNumOfBeams5 = [],

        leftCol_maxNumShelves2_maxNumOfBeams2 = [],
        rightCol_maxNumShelves2_maxNumOfBeams2 = [],
        rightCol_maxNumShelves3_maxNumOfBeams2 = [],
        rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2 = [],
        leftCol_maxNumShelves2_maxNumOfBeams3 = [],
        rightCol_maxNumShelves2_maxNumOfBeams3 = [],
        rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3 = [],

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

            this.VBM_SlotObject = [
                frnConstAppKeys.VERT_BEAM_KEY,
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

    qunit.module("searchRangeForVertBaffle(innerPartsSlotMatrix, row, col) against horzBaffleStubs stubs", {
        before: before,

        beforeEach: function () {
            this.vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = [
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];

            this.vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
            ];

            this.vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = [
                [HBF_SlotObject, emptySlotObject],
                [HBF_SlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject]
            ];

            this.vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 = [
                [HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject]
            ];

            this.vertBflRange_maxNumShelves6_maxNumOfBeams5 = [
                [HBF_SlotObject,  HBF_SlotObject,  HBF_SlotObject,  emptySlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject, HBF_SlotObject,  HBF_SlotObject,  emptySlotObject],
                [HBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_SlotObject],
                [HBF_SlotObject,  HBF_SlotObject,  emptySlotObject, HBF_SlotObject,  HBF_SlotObject]
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
            /*
             * //=============================== vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 ========================//
             */
            {t: 1, row: 0, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 0, numRows: 2}},
            {t: 2, row: 1, col: 1, matrixStubName: 'vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 1, numRows: 2}},
            /*
             * //=============================== vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 ========================//
             */
            {t: 3, row: 0, col: 1, matrixStubName: 'vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 0, col: 1, numRows: 1}},
            {t: 4, row: 1, col: 2, matrixStubName: 'vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: {row: 1, col: 2, numRows: 0}},
            /*
             * //=============================== vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 ========================//
             */
            {t: 5, row: 0, col: 0, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 0, col: 0, numRows: 1}},
            {t: 6, row: 1, col: 1, matrixStubName: 'vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 0, col: 1, numRows: 3}},
            /*
             * //=============================== vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 ========================//
             */
            {t: 7, row: 0, col: 0, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 0, col: 0, numRows: 2}},
            {t: 8, row: 1, col: 1, matrixStubName: 'vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2', expected: {row: 0, col: 1, numRows: 2}},
            /*
             * //=============================== vertBflRange_maxNumShelves6_maxNumOfBeams5 ========================//
             */
            {t: 9, row: 2, col: 0, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: {row: 0, col: 0, numRows: 3}},
            {t: 10, row: 3, col: 1, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: {row: 0, col: 1, numRows: 5}},
            {t: 11, row: 5, col: 2, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: {row: 2, col: 2, numRows: 4}},
            {t: 12, row: 0, col: 3, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: {row: 0, col: 3, numRows: 2}},
            {t: 13, row: 0, col: 4, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: {row: 0, col: 4, numRows: 1}},
            {t: 14, row: 4, col: 4, matrixStubName: 'vertBflRange_maxNumShelves6_maxNumOfBeams5', expected: {row: 4, col: 4, numRows: 1}}
        ])
        .test("Should return object with row and column and number of rows, from row to (row + numRows)", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                calculated = ismUtils.searchRangeForVertBaffle(matrixStub, params.row, params.col);

            assert.deepEqual(calculated, params.expected, "Test: " + params.t + ", expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit.module("searchEmptySpaceForVertBaffle(innerPartsSlotMatrix, row, col, numRows) against vertBaffleStubs stubs", {
        before: before,

        beforeEach: function () {
            this.leftCol_maxNumShelves2_maxNumOfBeams2 = [
                [VBF_SlotObject, emptySlotObject],
                [VBF_SlotObject, emptySlotObject]
            ];

            this.rightCol_maxNumShelves2_maxNumOfBeams2 = [
                [emptySlotObject, VBF_SlotObject],
                [emptySlotObject, VBF_SlotObject]
            ];

            this.rightCol_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, VBF_SlotObject],
                [emptySlotObject, VBF_SlotObject],
                [emptySlotObject, VBF_SlotObject]
            ];

            this.rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, VBF_SlotObject],
                [emptySlotObject, VBF_SlotObject]
            ];

            this.leftCol_maxNumShelves2_maxNumOfBeams3 = [
                [VBF_SlotObject, emptySlotObject, emptySlotObject],
                [VBF_SlotObject, emptySlotObject, emptySlotObject]
            ];

            this.rightCol_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, VBF_SlotObject],
                [emptySlotObject, emptySlotObject, VBF_SlotObject]
            ];

            this.rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, VBF_SlotObject]
            ];
        },

        afterEach: function () {
            this.leftCol_maxNumShelves2_maxNumOfBeams2 = null;
            this.rightCol_maxNumShelves2_maxNumOfBeams2 = null;
            this.rightCol_maxNumShelves3_maxNumOfBeams2 = null;
            this.rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2 = null;
            this.leftCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.rightCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3 = null;
        }
    });

    qunit
        .cases
        .init([
            {t: 1, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: false},
            {t: 2, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: true},

            {t: 3, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: true},
            {t: 4, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: false},

            {t: 5, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 6, row: 1, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 7, row: 2, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 8, row: 0, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 9, row: 1, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},

            {t: 10, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 11, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 12, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 13, row: 2, col: 1, numRows: 1, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 14, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: true},

            {t: 15, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: false},
            {t: 16, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 17, row: 1, col: 2, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 18, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 19, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 20, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 21, row: 0, col: 0, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 22, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 23, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: false},
            {t: 24, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: true},

            {t: 25, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: true},
            {t: 26, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: false},

            {t: 27, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 28, row: 1, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 29, row: 2, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 30, row: 0, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 31, row: 1, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},

            {t: 32, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 33, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 34, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 35, row: 2, col: 1, numRows: 1, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 36, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: true},

            {t: 37, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: false},
            {t: 38, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 39, row: 1, col: 2, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 40, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 41, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 42, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 43, row: 0, col: 0, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 44, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: false}
        ])
        .test("true for vertical baffle/beam = true, false for vertical baffle/beam = false or if no part slots are available", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                calculated = ismUtils.searchEmptySpaceForVertBaffle(matrixStub, params.row, params.col, params.numRows);

            assert.equal(calculated, params.expected, "Test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
        });

    qunit.module("searchEmptySpaceForVertBaffle(innerPartsSlotMatrix, row, col, numRows) against vertBeamStubs stubs", {
        before: before,

        beforeEach: function () {
            this.leftCol_maxNumShelves2_maxNumOfBeams2 = [
                [VBM_SlotObject, emptySlotObject],
                [VBM_SlotObject, emptySlotObject]
            ];

            this.rightCol_maxNumShelves2_maxNumOfBeams2 = [
                [emptySlotObject, VBM_SlotObject],
                [emptySlotObject, VBM_SlotObject]
            ];

            this.rightCol_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, VBM_SlotObject],
                [emptySlotObject, VBM_SlotObject],
                [emptySlotObject, VBM_SlotObject]
            ];

            this.rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [emptySlotObject, VBM_SlotObject],
                [emptySlotObject, VBM_SlotObject]
            ];

            this.leftCol_maxNumShelves2_maxNumOfBeams3 = [
                [VBM_SlotObject, emptySlotObject, emptySlotObject],
                [VBM_SlotObject, emptySlotObject, emptySlotObject]
            ];

            this.rightCol_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, VBM_SlotObject],
                [emptySlotObject, emptySlotObject, VBM_SlotObject]
            ];

            this.rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, VBM_SlotObject]
            ];
        },

        afterEach: function () {
            this.leftCol_maxNumShelves2_maxNumOfBeams2 = null;
            this.rightCol_maxNumShelves2_maxNumOfBeams2 = null;
            this.rightCol_maxNumShelves3_maxNumOfBeams2 = null;
            this.rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2 = null;
            this.leftCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.rightCol_maxNumShelves2_maxNumOfBeams3 = null;
            this.rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3 = null;
        }
    });

    qunit
        .cases
        .init([
            {t: 1, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: false},
            {t: 2, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams2', expected: true},

            {t: 3, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: true},
            {t: 4, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams2', expected: false},

            {t: 5, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 6, row: 1, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 7, row: 2, col: 1, numRows: 2, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 8, row: 0, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 9, row: 1, col: 1, numRows: 1, matrixStubName: 'rightCol_maxNumShelves3_maxNumOfBeams2', expected: false},

            {t: 10, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 11, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 12, row: 1, col: 1, numRows: 2, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 13, row: 2, col: 1, numRows: 1, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: false},
            {t: 14, row: 1, col: 0, numRows: 1, matrixStubName: 'rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2', expected: true},

            {t: 15, row: 0, col: 0, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: false},
            {t: 16, row: 0, col: 1, numRows: 2, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 17, row: 1, col: 2, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 18, row: 1, col: 0, numRows: 1, matrixStubName: 'leftCol_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 19, row: 0, col: 0, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 20, row: 0, col: 2, numRows: 2, matrixStubName: 'rightCol_maxNumShelves2_maxNumOfBeams3', expected: false},

            {t: 21, row: 0, col: 0, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 22, row: 1, col: 2, numRows: 1, matrixStubName: 'rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3', expected: false}
        ])
        .test("true for vertical beam = true, false for vertical beam = false or if no part slots ar available", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                calculated = ismUtils.searchEmptySpaceForVertBaffle(matrixStub, params.row, params.col, params.numRows);

            assert.equal(calculated, params.expected, "Test: " + params.t + ", expected: " + params.expected + ", calculated: " + calculated);
        });
}

runTests(QUnit, FrnConstr, Phaser, window);