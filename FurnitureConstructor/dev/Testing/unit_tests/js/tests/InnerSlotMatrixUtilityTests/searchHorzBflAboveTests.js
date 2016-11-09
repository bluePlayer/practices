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

        vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = [],
        vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = [],
        vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = [],
        vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 = [],
        vertBflRange_BottomRow_maxNumShelves3_maxNumOfBeams2 = [],
        vertBflRange_maxNumShelves6_maxNumOfBeams5 = [],
        vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3 = [],
        vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3 = [],

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

    qunit.module("searchHorzBflAbove(innerPartsSlotMatrix, row, col, numCols) against horzBaffleStubs", {
        beforeEach: function () {
            vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 = [
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject]
            ];

            vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
            ];

            vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 = [
                [HBF_SlotObject, emptySlotObject],
                [HBF_SlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject]
            ];

            vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 = [
                [HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject]
            ];

            vertBflRange_BottomRow_maxNumShelves3_maxNumOfBeams2 = [
                [emptySlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject],
                [HBF_SlotObject, HBF_SlotObject]
            ];

            vertBflRange_maxNumShelves6_maxNumOfBeams5 = [
                [HBF_SlotObject,  HBF_SlotObject,  HBF_SlotObject,  emptySlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_SlotObject],
                [emptySlotObject, emptySlotObject, HBF_SlotObject,  HBF_SlotObject,  emptySlotObject],
                [HBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_SlotObject],
                [HBF_SlotObject,  HBF_SlotObject,  emptySlotObject, HBF_SlotObject,  HBF_SlotObject]
            ];

            vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3 = [
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                [emptySlotObject, HBF_SlotObject, emptySlotObject]
            ];

            vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3 = [
                [emptySlotObject, HBF_SlotObject, emptySlotObject],
                [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
            ];
        }
    });

    qunit
        .cases
        .init([
            /*
             * //============================= vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3 =================//
             */
            {t: 1, row: 0, col: 0, matrixStub: vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3, expected: 0},
            {t: 2, row: 1, col: 1, matrixStub: vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3, expected: 0},
            /*
             * //============================= vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3 =================//
             */
            {t: 3, row: 0, col: 1, matrixStub: vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3, expected: 0},
            {t: 4, row: 1, col: 2, matrixStub: vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3, expected: 1},
            /*
             * //============================= vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 =================//
             */
            {t: 5, row: 0, col: 0, matrixStub: vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2, expected: 0},
            {t: 6, row: 1, col: 1, matrixStub: vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2, expected: 0},
            /*
             * //============================= vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 =================//
             */
            {t: 7, row: 0, col: 0, matrixStub: vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2, expected: 0},
            {t: 8, row: 1, col: 1, matrixStub: vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2, expected: 0},
            /*
             * //============================= vertBflRange_maxNumShelves6_maxNumOfBeams5 =================//
             */
            {t: 9, row: 2, col: 0, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            {t: 10, row: 3, col: 1, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            {t: 11, row: 5, col: 2, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 2},
            {t: 12, row: 0, col: 3, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            {t: 13, row: 0, col: 4, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            {t: 14, row: 4, col: 4, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 4},
            {t: 15, row: 1, col: 2, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            /*
             * //============================= vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3 =================//
             */
            {t: 16, row: 0, col: 1, matrixStub: vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3, expected: 0},
            {t: 17, row: 1, col: 0, matrixStub: vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3, expected: 0},
            {t: 18, row: 0, col: 0, matrixStub: vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3, expected: 0},
            /*
             * //============================= vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3 =================//
             */
            {t: 19, row: 0, col: 1, matrixStub: vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3, expected: 0},
            {t: 20, row: 1, col: 0, matrixStub: vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3, expected: 1},
            /*
             * //============================= vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2 =================//
             */
            {t: 21, row: 0, col: 0, matrixStub: vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2, expected: 0},
            {t: 22, row: 1, col: 0, matrixStub: vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2, expected: 1},
            {t: 23, row: 2, col: 0, matrixStub: vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2, expected: 1},
            /*
             * //============================= vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2 =================//
             */
            {t: 24, row: 0, col: 0, matrixStub: vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2, expected: 0},
            {t: 25, row: 1, col: 0, matrixStub: vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2, expected: 0},
            {t: 26, row: 2, col: 1, matrixStub: vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2, expected: 2},
            /*
             * //============================= vertBflRange_maxNumShelves6_maxNumOfBeams5 =================//
             */
            {t: 27, row: 2, col: 0, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            {t: 28, row: 4, col: 0, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 3},
            {t: 29, row: 2, col: 0, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            {t: 30, row: 4, col: 0, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 3},
            {t: 31, row: 4, col: 0, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 3},
            {t: 32, row: 1, col: 2, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 0},
            {t: 33, row: 4, col: 2, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 2},
            {t: 34, row: 5, col: 3, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 5},
            {t: 35, row: 3, col: 3, matrixStub: vertBflRange_maxNumShelves6_maxNumOfBeams5, expected: 2}
        ])
        .test("The new matrix should have changed rows as given in the params", function (params, assert) {
            var //matrixStub = horzBaffleStubs[params.matrixStub],
                calculated = ismUtils.searchHorzBflAbove(params.matrixStub, params.row, params.col);

            assert.deepEqual(calculated, params.expected, "expected: " + JSON.stringify(params.expected) + ", calculated: " + JSON.stringify(calculated));
        });

}

runTests(QUnit, FrnConstr, Phaser, window);
