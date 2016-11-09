window.FrnConstr.namespace('DefaultSlotMatrixStubs', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        utils = frnConstr.Utility,
        ismutils = frnConstr.InnerSlotMatrixUtility,
        makeSlotObject = function (part1, part2, part3, part4) {
            return [part1, part2, part3, part4];
        },

        // empty matrix stubs
        emptySlotObject =
            makeSlotObject(
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        // single part stub
        HBF_SlotObject =
            makeSlotObject(
                constAppKeys.HORZ_BAFFLE_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        HBF_AllAccess_SlotObject =
            makeSlotObject(
                constAppKeys.HORZ_BAFFLE_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        HBM_SlotObject =
            makeSlotObject(
                constAppKeys.HORZ_BEAM_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        VBF_SlotObject =
            makeSlotObject(
                constAppKeys.VERT_BAFFLE_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        VBM_SlotObject =
            makeSlotObject(
                constAppKeys.VERT_BEAM_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        DRW_SlotObject =
            makeSlotObject(
                constAppKeys.DRAWER_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        TIE_SlotObject =
            makeSlotObject(
                constAppKeys.TIE_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        SH_SlotObject =
            makeSlotObject(
                constAppKeys.SHOES_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        HGR_SlotObject =
            makeSlotObject(
                constAppKeys.HANGER_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        PTGR_SlotObject =
            makeSlotObject(
                constAppKeys.PANTOGRAPH_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        TRSR_SlotObject =
            makeSlotObject(
                constAppKeys.TROUSER_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        // composite parts stubs
        HBF = {
            HBF: {},
            HBM: {},
            VBF: {},
            VBM: {},
            DRW: {},
            TIE: {},
            SH: {},
            HGR: {},
            PTGR: {},
            TRSR: {}
        },

        HBF_HBM_SlotObject =
            makeSlotObject(
                constAppKeys.HORZ_BEAM_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        HBF_VBF_SlotObject =
            makeSlotObject(
                constAppKeys.HORZ_BAFFLE_KEY,
                constAppKeys.VERT_BAFFLE_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        HBF_DRW_SlotObject =
            makeSlotObject(
                constAppKeys.HORZ_BAFFLE_KEY,
                constAppKeys.DRAWER_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        VBF_DRW_SlotObject =
            makeSlotObject(
                constAppKeys.VERT_BAFFLE_KEY,
                constAppKeys.DRAWER_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        VBF_HBM_SlotObject =
            makeSlotObject(
                constAppKeys.VERT_BAFFLE_KEY,
                constAppKeys.HORZ_BEAM_KEY,
                constAppKeys.EMPTY_SLOT_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        HBF_VBF_DRW_SlotObject =
            makeSlotObject(
                constAppKeys.HORZ_BAFFLE_KEY,
                constAppKeys.VERT_BAFFLE_KEY,
                constAppKeys.DRAWER_KEY,
                constAppKeys.EMPTY_SLOT_KEY),

        // matrix stubs
        emptyMatrix_rows2_cols2 = [
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows3_cols2 = [
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows2_cols3 = [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows3_cols3 = [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows3_cols4 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows4_cols3 = [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows4_cols4 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows4_cols5 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows5_cols4 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows5_cols5 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows5_cols6 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows6_cols5 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        emptyMatrix_rows6_cols6 = [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ];

    return {

        makeSlotObject: makeSlotObject,

        // empty matrix stub
        emptySlotObject: emptySlotObject,

        // single part stubs
        HBF_SlotObject:  HBF_SlotObject,
        HBF_AllAccess_SlotObject: HBF_AllAccess_SlotObject,

        HBM_SlotObject:  HBM_SlotObject,
        VBF_SlotObject:  VBF_SlotObject,
        VBM_SlotObject:  VBM_SlotObject,
        DRW_SlotObject:  DRW_SlotObject,
        TIE_SlotObject:  TIE_SlotObject,
        SH_SlotObject:   SH_SlotObject,
        HGR_SlotObject:  HGR_SlotObject,
        PTGR_SlotObject: PTGR_SlotObject,
        TRSR_SlotObject: TRSR_SlotObject,

        // composite parts stubs
        HBF_VBF_SlotObject: HBF_VBF_SlotObject,
        HBF_DRW_SlotObject: HBF_DRW_SlotObject,

        VBF_HBM_SlotObject: VBF_HBM_SlotObject,
        VBF_DRW_SlotObject: VBF_DRW_SlotObject,

        HBF_VBF_DRW_SlotObject: HBF_VBF_DRW_SlotObject,

        // matrix stubs
        emptyMatrix_rows2_cols2: emptyMatrix_rows2_cols2,
        emptyMatrix_rows3_cols2: emptyMatrix_rows3_cols2,
        emptyMatrix_rows2_cols3: emptyMatrix_rows2_cols3,
        emptyMatrix_rows3_cols3: emptyMatrix_rows3_cols3,
        emptyMatrix_rows3_cols4: emptyMatrix_rows3_cols4,
        emptyMatrix_rows4_cols3: emptyMatrix_rows4_cols3,
        emptyMatrix_rows4_cols4: emptyMatrix_rows4_cols4,
        emptyMatrix_rows4_cols5: emptyMatrix_rows4_cols5,
        emptyMatrix_rows5_cols4: emptyMatrix_rows5_cols4,
        emptyMatrix_rows5_cols5: emptyMatrix_rows5_cols5,
        emptyMatrix_rows5_cols6: emptyMatrix_rows5_cols6,
        emptyMatrix_rows6_cols5: emptyMatrix_rows6_cols5,
        emptyMatrix_rows6_cols6: function () {
            return emptyMatrix_rows6_cols6.slice();
        },

        // TODO generateSlotMatrix(rows, cols, matrixType) - either finish this function or remove it.
        generateSlotMatrix: function (rows, cols, matrixType) {
            var r = 0, c = 0;

            switch (matrixType) {
            case constAppKeys.DEFAULT_SLOT_MATRIX:
                break;
            case constAppKeys.NO_CEIL_DEFAULT_MATRIX:
                break;
            case constAppKeys.NO_FLOOR_DEFAULT_MATRIX:
                break;
            case constAppKeys.NO_LEFT_WALL_DEFAULT_MATRIX:
                break;
            case constAppKeys.NO_CEIL_NO_FLOOR_DEFAULT_MATRIX:
                break;
            case constAppKeys.NO_CEIL_NO_LEFT_WALL_DEFAULT_MATRIX:
                break;
            case constAppKeys.NO_FLOOR_NO_LEFT_WALL_DEFAULT_MATRIX:
                break;
            case constAppKeys.NO_CEIL_NO_FLOOR_NO_LEFT_WALL_DEFAULT_MATRIX:
                break;
            }
        },

        // TODO nonEmptyinnerPartsMatrix_rows3_cols3 - remove or reuse this Stub
        nonEmptyinnerPartsMatrix_rows3_cols3: {
            defaultMatrix: [
                [HBF_VBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
                [VBF_SlotObject, DRW_SlotObject, DRW_SlotObject],
                [HBF_VBF_DRW_SlotObject, DRW_SlotObject, DRW_SlotObject]
            ]
        },

        innerPartsMatrix_rows3_cols3: {
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
        },

        innerPartsMatrix_rows3_cols4: {
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
        },

        innerPartsMatrix_rows4_cols3: {
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
        }
    };
    }(window.FrnConstr, Phaser)));