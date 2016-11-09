window.FrnConstr.namespace('InitFrnConstrForm', {}, (function (frnConstr, jq, phaser) {'use strict';
    var frnConst = frnConstr.Const,
        frnConstApp = frnConst.Application;

    return {

        resetForm: function () {
            var frnData = frnConstApp.FrnData;

            jq("#floorChkBox").prop("checked", frnData.checkBoxes.DEFAULT_FLOOR_IS_DRAWN);
            jq("#ceilingChkBox").prop("checked", frnData.checkBoxes.DEFAULT_CEILING_IS_DRAWN);
            jq("#leftShelveChkBox").prop("checked", frnData.checkBoxes.DEFAULT_LEFT_SHELVE_IS_DRAWN);
            jq("#rightShelveChkBox").prop("checked", frnData.checkBoxes.DEFAULT_RIGHT_SHELVE_IS_DRAWN);
            jq("#rearChkBox").prop("checked", frnData.checkBoxes.DEFAULT_REAR_WALL_IS_DRAWN);
            jq("#standLeftChkBox").prop("checked", frnData.checkBoxes.DEFAULT_STAND_LEFT_IS_DRAWN);
            jq("#standRightChkBox").prop("checked", frnData.checkBoxes.DEFAULT_STAND_RIGHT_IS_DRAWN);
            jq("#standChkBox").prop("checked", frnData.checkBoxes.DEFAULT_STAND_IS_DRAWN);

            jq("#millsPerPixel").val(frnData.millsPerPixel.DEFAULT_VAL);
            jq("#millsPerPixelForDepth").val(frnData.millsPerPixelForDepth.DEFAULT_VAL);
            jq("#cupboardWidth").val(frnData.cupboardWidth.DEFAULT_VAL);
            jq("#cupboardHeight").val(frnData.cupboardHeight.DEFAULT_VAL);
            jq("#cupboardDepth").val(frnData.cupboardDepth.DEFAULT_VAL);
            jq("#leftShelveWidth").val(frnData.leftShelveWidth.DEFAULT_VAL);
            jq("#rightShelveWidth").val(frnData.rightShelveWidth.DEFAULT_VAL);
            jq("#thickness").val(frnData.thickness.DEFAULT_VAL);
        },

        initForm: function () {

            jq("#enteriorButton").click(function() {
                frnConstr.gameObject.state.start(frnConstr.EnteriorScreen.KEY);
            });

            jq("#exteriorButton").click(function() {
                frnConstr.gameObject.state.start(frnConstr.ExteriorScreen.KEY);
            });

            jq("#sendButton").click(function() {
                frnConstr.gameObject.state.start(frnConstr.SendApplicationScreen.KEY);
            });

            jq("#generateButton").click(frnConstr.generateWardrobe);

            jq("#saveProgressButton").click(function () {
                frnConstr.saveStorageData(frnConstr.getFrnConstrDataObject());
            });

            jq("#deleteProgressButton").click(function () {
                frnConstr.clearStorageData();
                frnConstr.generateWardrobe();
            });

            jq("#standLeftChkBox").change(function () {
                jq('#leftShelveChkBox').click();
            });

            jq("#resetConstrFormButton").click(this.resetForm);
        }
    };
    }(window.FrnConstr, $, Phaser)));
