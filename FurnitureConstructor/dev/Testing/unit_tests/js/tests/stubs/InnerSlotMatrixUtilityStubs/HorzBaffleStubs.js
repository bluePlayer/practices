window.FrnConstr.namespace('HorzBaffleStubs', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        emptySlotObject = frnConstr.DefaultSlotMatrixStubs.emptySlotObject,
        HBF_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBF_SlotObject,
        HBF_AllAccess_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBF_AllAccess_SlotObject;

    return {

        topRow_maxNumShelves2_maxNumOfBeams2: [
            [HBF_SlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        topRow_AllAccess_maxNumShelves2_maxNumOfBeams2: function () {
            return [
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          emptySlotObject]
            ];
        },

        bottomRow_maxNumShelves2_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject]
        ],

        bottomRow_AllAccess_maxNumShelves2_maxNumOfBeams2: function () {
            return [
                [emptySlotObject,          emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject]
            ];
        },

        topRow_maxNumShelves3_maxNumOfBeams2: [
            [HBF_SlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        bottomRow_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject]
        ],

        bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, HBF_SlotObject, HBF_SlotObject]
        ],

        bottomRow_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
        ],

        topRow_maxNumShelves2_maxNumOfBeams3_2: [
            [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        // range stubs

        vertBflRange_TopRow_maxNumShelves2_maxNumOfBeams3: [
            [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        vertBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
        ],

        vertBflRange_TopRow_maxNumShelves3_maxNumOfBeams2: [
            [HBF_SlotObject, emptySlotObject],
            [HBF_SlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        vertBflRange_TopBtmRow_maxNumShelves3_maxNumOfBeams2: [
            [HBF_SlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject]
        ],

        vertBflRange_BottomRow_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject],
            [HBF_SlotObject, HBF_SlotObject]
        ],

        vertBflRange_maxNumShelves6_maxNumOfBeams5: [
            [HBF_SlotObject,  HBF_SlotObject,  HBF_SlotObject,  emptySlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject, HBF_SlotObject,  HBF_SlotObject,  emptySlotObject],
            [HBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_SlotObject],
            [HBF_SlotObject,  HBF_SlotObject,  emptySlotObject, HBF_SlotObject,  HBF_SlotObject]
        ],

        // TD = Top Down
        stairsTD_AllAccess_maxNumShelves6_maxNumOfBeams6: function () {
            return [
                [HBF_AllAccess_SlotObject, emptySlotObject,          emptySlotObject,           emptySlotObject,          emptySlotObject,          emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, emptySlotObject,           emptySlotObject,          emptySlotObject,          emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject,  emptySlotObject,          emptySlotObject,          emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject,  HBF_AllAccess_SlotObject, emptySlotObject,          emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject,  HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject,  HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject]
            ];
        },

        // BU = Bottom Up
        stairsBU_AllAccess_maxNumShelves6_maxNumOfBeams6: function () {
            return [
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          emptySlotObject,          HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          emptySlotObject,          emptySlotObject,          HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          emptySlotObject,          emptySlotObject,          emptySlotObject,          HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          emptySlotObject,          emptySlotObject,          emptySlotObject,          emptySlotObject,          HBF_AllAccess_SlotObject]
            ];
        },

        square_AllAccess_maxNumShelves6_maxNumOfBeams6: function () {
            return [
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [HBF_AllAccess_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_AllAccess_SlotObject],
                [HBF_AllAccess_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_AllAccess_SlotObject],
                [HBF_AllAccess_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_AllAccess_SlotObject],
                [HBF_AllAccess_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, HBF_AllAccess_SlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject]
            ];
        },

        twoRects_AllAccess_maxNumShelves6_maxNumOfBeams6: function () {
            return [
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, emptySlotObject, emptySlotObject,          emptySlotObject,          emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, emptySlotObject, emptySlotObject,          emptySlotObject,          emptySlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, emptySlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, emptySlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          emptySlotObject,          emptySlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject, HBF_AllAccess_SlotObject],
                [emptySlotObject,          emptySlotObject,          emptySlotObject, emptySlotObject,          emptySlotObject,          emptySlotObject]
            ];
        },

        vertBflRange_TopRow_MiddleBtm_maxNumShelves2_maxNumOfBeams3: [
            [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject],
            [emptySlotObject, HBF_SlotObject, emptySlotObject]
        ],

        vertBflRange_BottomRow_MiddleTop_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, HBF_SlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject, HBF_SlotObject]
        ]
    };
    }(window.FrnConstr, Phaser)));
