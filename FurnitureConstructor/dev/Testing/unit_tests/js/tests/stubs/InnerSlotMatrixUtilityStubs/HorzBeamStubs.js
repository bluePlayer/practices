window.FrnConstr.namespace('HorzBeamStubs', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        emptySlotObject = frnConstr.DefaultSlotMatrixStubs.emptySlotObject,
        HBF_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBF_SlotObject,
        HBM_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBM_SlotObject,
        VBF_SlotObject = frnConstr.DefaultSlotMatrixStubs.VBF_SlotObject,
        VBM_SlotObject = frnConstr.DefaultSlotMatrixStubs.VBM_SlotObject,
        DRW_SlotObject = frnConstr.DefaultSlotMatrixStubs.DRW_SlotObject,
        TIE_SlotObject = frnConstr.DefaultSlotMatrixStubs.TIE_SlotObject,
        SH_SlotObject = frnConstr.DefaultSlotMatrixStubs.SH_SlotObject,
        HGR_SlotObject = frnConstr.DefaultSlotMatrixStubs.HGR_SlotObject,
        PTGR_SlotObject = frnConstr.DefaultSlotMatrixStubs.PTGR_SlotObject,
        TRSR_SlotObject = frnConstr.DefaultSlotMatrixStubs.TRSR_SlotObject,

        // composite parts stubs
        VBF_DRW_SlotObject = frnConstr.DefaultSlotMatrixStubs.VBF_DRW_SlotObject,
        HBF_VBF_DRW_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBF_VBF_DRW_SlotObject,
        HBF_DRW_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBF_DRW_SlotObject,
        HBF_VBF_SlotObject = frnConstr.DefaultSlotMatrixStubs.HBF_VBF_SlotObject,
        VBF_HBM_SlotObject = frnConstr.DefaultSlotMatrixStubs.VBF_HBM_SlotObject;

    return {

        topRow_maxNumShelves2_maxNumOfBeams2: [
            [HBM_SlotObject, HBM_SlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        fullHorzBeam_maxNumShelves2_maxNumOfBeams2: [
            [HBM_SlotObject, HBM_SlotObject],
            [HBM_SlotObject, HBM_SlotObject]
        ],

        fullHorzBeam_maxNumShelves3_maxNumOfBeams2: [
            [HBM_SlotObject, HBM_SlotObject],
            [HBM_SlotObject, HBM_SlotObject],
            [HBM_SlotObject, HBM_SlotObject]
        ],

        bottomRow_maxNumShelves2_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [HBM_SlotObject, HBM_SlotObject]
        ],

        topRow_maxNumShelves3_maxNumOfBeams2: [
            [HBM_SlotObject, HBM_SlotObject],
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        bottomRow_maxNumShelves3_maxNumOfBeams2: [
            [emptySlotObject, emptySlotObject],
            [emptySlotObject, emptySlotObject],
            [HBM_SlotObject, HBM_SlotObject]
        ],

        bottomRow_middleCol_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [emptySlotObject, HBM_SlotObject, HBM_SlotObject]
        ],

        bottomRow_maxNumShelves2_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [HBM_SlotObject, HBM_SlotObject, HBM_SlotObject]
        ],

        topRow_maxNumShelves2_maxNumOfBeams3_2: [
            [HBM_SlotObject, HBM_SlotObject, HBM_SlotObject],
            [emptySlotObject, emptySlotObject, emptySlotObject]
        ],

        topRow_maxNumShelves6_maxNumOfBeams2: [
            [emptySlotObject, HBM_SlotObject],
            [emptySlotObject, HBM_SlotObject],
            [emptySlotObject, HBM_SlotObject],
            [emptySlotObject, HBM_SlotObject],
            [emptySlotObject, HBM_SlotObject],
            [emptySlotObject, emptySlotObject]
        ],

        bottomRow_maxNumShelves6_maxNumOfBeams3: [
            [emptySlotObject, emptySlotObject, emptySlotObject],
            [HBM_SlotObject,  HBM_SlotObject,  emptySlotObject],
            [HBM_SlotObject,  HBM_SlotObject,  emptySlotObject],
            [HBM_SlotObject,  HBM_SlotObject,  emptySlotObject],
            [HBM_SlotObject,  HBM_SlotObject,  emptySlotObject],
            [HBM_SlotObject,  HBM_SlotObject,  emptySlotObject]
        ],

        // TODO separate the matrix into smaller ones containing all parts
        allParts_maxNumShelves6_maxNumOfBeams3: [
            [HBF_VBF_SlotObject,   HBF_SlotObject,     HBF_SlotObject,  VBF_SlotObject, emptySlotObject],
            [VBF_HBM_SlotObject,   HBM_SlotObject,     HBM_SlotObject,  VBF_SlotObject, emptySlotObject],
            [VBF_SlotObject,       emptySlotObject,    emptySlotObject, VBF_SlotObject, emptySlotObject],
            [HBF_VBF_SlotObject,   HBF_SlotObject,     HBF_SlotObject,  VBF_SlotObject, emptySlotObject],
            [emptySlotObject,      emptySlotObject,    emptySlotObject, VBF_SlotObject, emptySlotObject],
            [HBF_DRW_SlotObject,   DRW_SlotObject,      DRW_SlotObject,   VBF_SlotObject, emptySlotObject],
            [HBF_DRW_SlotObject,   DRW_SlotObject,      DRW_SlotObject,   VBF_SlotObject, emptySlotObject],
            [emptySlotObject,      emptySlotObject,    emptySlotObject, VBF_SlotObject, emptySlotObject]
        ]
    };
    }(window.FrnConstr, Phaser)));
