window.FrnConstr.namespace('VertBaffleStubs', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        emptySlotObject = frnConstr.DefaultSlotMatrixStubs.emptySlotObject,
        VBF_SlotObject = frnConstr.DefaultSlotMatrixStubs.VBF_SlotObject;

    return {

        leftCol_maxNumShelves2_maxNumOfBeams2: [
            [VBF_SlotObject, emptySlotObject],
            [VBF_SlotObject, emptySlotObject]
        ],

        rightCol_maxNumShelves2_maxNumOfBeams2: [
            [emptySlotObject, VBF_SlotObject],
            [emptySlotObject, VBF_SlotObject]
        ],

        rightCol_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, VBF_SlotObject],
            [emptySlotObject, VBF_SlotObject],
            [emptySlotObject, VBF_SlotObject]
        ],

        rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, VBF_SlotObject],
            [emptySlotObject, VBF_SlotObject]
        ],

        leftCol_maxNumShelves2_maxNumOfBeams3: [
            [VBF_SlotObject, emptySlotObject, emptySlotObject],
            [VBF_SlotObject, emptySlotObject, emptySlotObject]
        ],

        rightCol_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, VBF_SlotObject],
            [emptySlotObject, emptySlotObject, VBF_SlotObject]
        ],

        rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, VBF_SlotObject]
        ],

        rightCol_top1Row_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, VBF_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        // range stubs

        horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams3: [
            [VBF_SlotObject, emptySlotObject, VBF_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        horzBflRange_BottomRow_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [VBF_SlotObject, emptySlotObject, VBF_SlotObject]
        ],

        horzBflRange_TopRow_maxNumShelves2_maxNumOfBeams4: [
            [VBF_SlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        horzBflRange_TopRow_maxNumShelves3_maxNumOfBeams2: [
            [VBF_SlotObject, VBF_SlotObject],
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        horzBflRange_BottomRow_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [VBF_SlotObject, VBF_SlotObject],
            [VBF_SlotObject, VBF_SlotObject]
        ],

        horzBflRange_maxNumShelves4_maxNumOfBeams6: [
            [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
            [VBF_SlotObject, emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
            [VBF_SlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject],
            [VBF_SlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        horzBflRange_maxNumShelves10_maxNumOfBeams6: [
            [VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
            [VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
            [VBF_SlotObject,  emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject],
            [VBF_SlotObject,  emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
            [emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject],
            [emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, VBF_SlotObject],
            [emptySlotObject, emptySlotObject, VBF_SlotObject,  emptySlotObject, emptySlotObject, VBF_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, VBF_SlotObject],
            [VBF_SlotObject,  emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject, emptySlotObject]
        ]
    };
    }(window.FrnConstr, Phaser)));
