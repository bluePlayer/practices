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
        defaultSlotMatrixStubs = frnConstr.DefaultSlotMatrixStubs,
        emptySlotObject = defaultSlotMatrixStubs.emptySlotObject,
        HBF_SlotObject = defaultSlotMatrixStubs.HBF_SlotObject,
        VBF_SlotObject = defaultSlotMatrixStubs.VBF_SlotObject,

        horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = [],
        horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = [],
        horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4 = [],
        horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = [],
        horzBflRange_maxNumShelves4_maxNumOfBeams6 = [],
        horzBflRange_BottomRow_maxNumShelves3_maxNumOfBeams2 = [].

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

    qunit.module("searchEmptySpaceForHorzBeam(innerPartsSlotMatrix, row, col, numCols) against vertBaffleStubs", {
        before: before,

        beforeEach: function () {
            var defaultSlotMatrixStubs = this.defaultSlotMatrixStubs,
                emptySlotObject = this.emptySlotObject,
                HBF_SlotObject = this.HBF_SlotObject,
                HBF_VBF_SlotObject = this.HBF_VBF_SlotObject,
                VBF_SlotObject = this.VBF_SlotObject3;

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

            this.horzBflRange_BottomRow_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [VBF_SlotObject, VBF_SlotObject],
                [VBF_SlotObject, VBF_SlotObject]
            ];

            this.horzBflRange_maxNumShelves4_maxNumOfBeams6 = [
                [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
                [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
                [VBF_SlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject],
                [VBF_SlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject]
            ];
        },

        afterEach: function () {
            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = null;
            this.horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4 = null;
            this.horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = null;
            this.horzBflRange_maxNumShelves4_maxNumOfBeams6 = null;
        }
    });

    qunit
        .cases
        .init([
            {t: 1, row: 0, col: 1, numCols: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 2, row: 1, col: 1, numCols: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3', expected: true},

            {t: 3, row: 0, col: 1, numCols: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: true},
            {t: 4, row: 1, col: 1, numCols: 1, matrixStubName: 'horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3', expected: true},

            {t: 5, row: 0, col: 2, numCols: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4', expected: true},
            {t: 6, row: 1, col: 2, numCols: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4', expected: true},

            {t: 7, row: 0, col: 0, numCols: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: true},
            {t: 8, row: 2, col: 0, numCols: 1, matrixStubName: 'horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2', expected: true},

            {t: 9, row: 0, col: 3, numCols: 1, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: true},
            {t: 10, row: 1, col: 5, numCols: 1, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: true},
            {t: 11, row: 1, col: 4, numCols: 1, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: true},
            {t: 12, row: 2, col: 2, numCols: 1, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: true},
            {t: 13, row: 2, col: 4, numCols: 1, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: true},
            {t: 14, row: 3, col: 0, numCols: 1, matrixStubName: 'horzBflRange_maxNumShelves4_maxNumOfBeams6', expected: true}
        ])
        .test("The new matrix should have changed cols as given in the params", function (params, assert) {
            var matrixStub = this[params.matrixStubName],
                calculated = ismUtils.searchEmptySpaceForHorzBeam(matrixStub, params.row, params.col, params.numCols);

            assert.deepEqual(calculated, params.expected, "Test: " + params.t + ", expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

}

runTests(QUnit, FrnConstr, Phaser, window);
