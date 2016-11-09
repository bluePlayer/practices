window.FrnConstr.namespace('TieStubs', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        emptySlotObject = frnConstr.DefaultSlotMatrixStubs.emptySlotObject,
        HBF_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBF_SlotObject;

    return {

        topRow_maxNumShelves2_maxNumOfBeams2: [
            [HBF_SlotObject, HBF_SlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        bottomRow_maxNumShelves2_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [HBF_SlotObject, HBF_SlotObject]
        ],

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

        drwRange_Empty_maxNumShelves3_maxNumOfBeams5: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        drwRange_Empty_maxNumShelves4_maxNumOfBeams5: [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        drwRange_Empty_maxNumShelves5_maxNumOfBeams5: [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        drwRange_Empty_maxNumShelves5_maxNumOfBeams6: [
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
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
