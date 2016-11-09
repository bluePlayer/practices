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
        };

    qunit.log(logForInnerShelveSlotMatrix);

    qunit.module("makeInnerPartsMatrix(fcdo, slotMatrix)", {
        before: function () {
            var emptySlotObject = [];
            // stubs
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
        },
        beforeEach: function () {
            var defaultSlotMatrixStubs = this.defaultSlotMatrixStubs,
                emptySlotObject = this.emptySlotObject,
                HBF_SlotObject = this.HBF_SlotObject,
                HBF_VBF_SlotObject = this.HBF_VBF_SlotObject,
                VBF_SlotObject = this.VBF_SlotObject,

                emptyMatrix_rows3_cols3 = this.emptyMatrix_rows3_cols3,
                emptyMatrix_rows3_cols4 = this.emptyMatrix_rows3_cols4,
                emptyMatrix_rows4_cols3 = this.emptyMatrix_rows4_cols3;

            this.matrix_rows3_cols3 = {
                defaultMatrix: [
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noCeil: [
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noFloor: [
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject]
                ],

                noLeftWall: [
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noCeilNoFloor: [
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject]
                ],

                noCeilNoLeftWall: [
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noFloorNoLeftWall: [
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject]
                ],

                noCeilNoFloorNoLeftWall: emptyMatrix_rows3_cols3
            };

            this.matrix_rows3_cols4 = {
                defaultMatrix: [
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noCeil: [
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noFloor: [
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
                ],

                noLeftWall: [
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noCeilNoFloor: [
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
                ],

                noCeilNoLeftWall: [
                    [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noFloorNoLeftWall: [
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
                ],

                noCeilNoFloorNoLeftWall: emptyMatrix_rows3_cols4
            };

            this.matrix_rows4_cols3 = {
                defaultMatrix: [
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noCeil: [
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noFloor: [
                    [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject]
                ],

                noLeftWall: [
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noCeilNoFloor: [
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject],
                    [VBF_SlotObject, emptySlotObject, emptySlotObject]
                ],

                noCeilNoLeftWall: [
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
                ],

                noFloorNoLeftWall: [
                    [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject],
                    [emptySlotObject, emptySlotObject, emptySlotObject]
                ],

                noCeilNoFloorNoLeftWall: emptyMatrix_rows4_cols3
            };

        },

        afterEach: function () {
            this.emptySlotObject = null;
            this.HBF_SlotObject = null;
            this.VBF_SlotObject = null;
            this.HBF_VBF_SlotObject = null;

            this.emptyMatrix_rows3_cols3 = null;
            this.emptyMatrix_rows3_cols4 = null;
            this.emptyMatrix_rows4_cols3 = null;

            this.matrix_rows3_cols3 = null;
            this.matrix_rows3_cols4 = null;
            this.matrix_rows4_cols3 = null;
        }
    });

    qunit
        .cases
        .init([
            {t: 1, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'defaultMatrix'},
            {t: 2, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: false, floorOn: true, leftWallOn: true, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'noCeil'},
            {t: 3, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: false, leftWallOn: true, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'noFloor'},
            {t: 4, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: false, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'noLeftWall'},
            {t: 5, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: false, floorOn: false, leftWallOn: true, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'noCeilNoFloor'},
            {t: 6, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: false, floorOn: true, leftWallOn: false, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'noCeilNoLeftWall'},
            {t: 7, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: false, leftWallOn: false, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'noFloorNoLeftWall'},
            {t: 8, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: false, floorOn: false, leftWallOn: false, matrixStubName: 'matrix_rows3_cols3', matrixStubType: 'noCeilNoFloorNoLeftWall'},

            {t: 9, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: true, floorOn: true, leftWallOn: true, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'defaultMatrix'},
            {t: 10, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: false, floorOn: true, leftWallOn: true, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'noCeil'},
            {t: 11, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: true, floorOn: false, leftWallOn: true, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'noFloor'},
            {t: 12, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: true, floorOn: true, leftWallOn: false, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'noLeftWall'},
            {t: 13, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: false, floorOn: false, leftWallOn: true, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'noCeilNoFloor'},
            {t: 14, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: false, floorOn: true, leftWallOn: false, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'noCeilNoLeftWall'},
            {t: 15, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: true, floorOn: false, leftWallOn: false, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'noFloorNoLeftWall'},
            {t: 16, maxNumOfInnerShelves: 3, maxNumOfBeams: 4, ceilOn: false, floorOn: false, leftWallOn: false, matrixStubName: 'matrix_rows3_cols4', matrixStubType: 'noCeilNoFloorNoLeftWall'},

            {t: 17, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'defaultMatrix'},
            {t: 18, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: false, floorOn: true, leftWallOn: true, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'noCeil'},
            {t: 19, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: true, floorOn: false, leftWallOn: true, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'noFloor'},
            {t: 20, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: false, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'noLeftWall'},
            {t: 21, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: false, floorOn: false, leftWallOn: true, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'noCeilNoFloor'},
            {t: 22, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: false, floorOn: true, leftWallOn: false, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'noCeilNoLeftWall'},
            {t: 23, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: true, floorOn: false, leftWallOn: false, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'noFloorNoLeftWall'},
            {t: 24, maxNumOfInnerShelves: 4, maxNumOfBeams: 3, ceilOn: false, floorOn: false, leftWallOn: false, matrixStubName: 'matrix_rows4_cols3', matrixStubType: 'noCeilNoFloorNoLeftWall'}
        ])
        .test("Should create default matrix with ceiling/floor and left wall depending on how they are enabled", function (params, assert) {
            var expected = this[params.matrixStubName][params.matrixStubType],
                defaultMatrix = ismUtils.defaultInnerPartsMatrix(params.maxNumOfInnerShelves, params.maxNumOfBeams),
                calculated = ismUtils.makeInnerPartsMatrix(params.ceilOn, params.floorOn, params.leftWallOn, defaultMatrix, params.maxNumOfInnerShelves, params.maxNumOfBeams);

            assert.deepEqual(calculated, expected, "Test: " + params.t + ", expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
        });

    qunit
        .cases
        .init([
            {matrixObject: {}, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true},
            {matrixObject: true, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true},
            {matrixObject: false, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true},
            {matrixObject: NaN, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true},
            {matrixObject: undefined, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true},
            {matrixObject: 0, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true},
            {matrixObject: null, maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true},
            {matrixObject: [], maxNumOfInnerShelves: 3, maxNumOfBeams: 3, ceilOn: true, floorOn: true, leftWallOn: true}
        ])
        .test("Should create default matrix if the given matrix argument is non-truthy or empty array", function (params, assert) {
            var expected = this.matrix_rows3_cols3.defaultMatrix,
                calculated = ismUtils.makeInnerPartsMatrix(params.ceilOn, params.floorOn, params.leftWallOn, params.matrixObject, params.maxNumOfInnerShelves, params.maxNumOfBeams);

            assert.deepEqual(calculated, expected, "expected: " + JSON.stringify(expected) + ", calculated: " + JSON.stringify(calculated));
        });

}

runTests(QUnit, FrnConstr, Phaser, window);
