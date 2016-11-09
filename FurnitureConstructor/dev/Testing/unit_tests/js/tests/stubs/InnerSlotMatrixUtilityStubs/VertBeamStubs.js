window.FrnConstr.namespace('VertBeamStubs', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        emptySlotObject = frnConstr.DefaultSlotMatrixStubs.emptySlotObject,
        VBM_SlotObject = frnConstr.DefaultSlotMatrixStubs.VBM_SlotObject;

    return {

        leftCol_maxNumShelves2_maxNumOfBeams2: [
            [VBM_SlotObject, emptySlotObject],
            [VBM_SlotObject, emptySlotObject]
        ],

        rightCol_maxNumShelves2_maxNumOfBeams2: [
            [emptySlotObject, VBM_SlotObject],
            [emptySlotObject, VBM_SlotObject]
        ],

        rightCol_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, VBM_SlotObject],
            [emptySlotObject, VBM_SlotObject],
            [emptySlotObject, VBM_SlotObject]
        ],

        rightCol_btm2Rows_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, VBM_SlotObject],
            [emptySlotObject, VBM_SlotObject]
        ],

        leftCol_maxNumShelves2_maxNumOfBeams3: [
            [VBM_SlotObject, emptySlotObject, emptySlotObject],
            [VBM_SlotObject, emptySlotObject, emptySlotObject]
        ],

        rightCol_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, VBM_SlotObject],
            [emptySlotObject, emptySlotObject, VBM_SlotObject]
        ],

        rightCol_btm1Row_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject, VBM_SlotObject]
        ]
    };
    }(window.FrnConstr, Phaser)));
