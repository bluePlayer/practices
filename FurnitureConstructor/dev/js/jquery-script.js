function runJqueryScript(jq, frnConstrObj) {'use strict';

    var dataString = null,
        dataArray = null,
        frnConst = frnConstrObj.Const,
        frnConstApp = frnConst.Application,
        init = function() {
            dataString = jq("#constrForm").serialize();
            dataArray = jq("#constrForm").serializeArray();
            frnConstrObj.setDataObject(dataArray);
            frnConstrObj.gameObject.state.start(frnConstrObj.EnteriorScreen.KEY);
        };

    init();

    jq("#enteriorButton").click(function() {
        frnConstrObj.gameObject.state.start(frnConstrObj.EnteriorScreen.KEY);
    });

    jq("#exteriorButton").click(function() {
        frnConstrObj.gameObject.state.start(frnConstrObj.ExteriorScreen.KEY);
    });

    jq("#sendButton").click(function() {
        frnConstrObj.gameObject.state.start(frnConstrObj.SendApplicationScreen.KEY);
    });

    jq("#generateButton").click(init);

    jq("#standLeftChkBox").change(function () {
        jq('#leftShelveChkBox').click();
    });

    jq("#resetConstrFormButton").click(function () {
        var defMillsPerPixel = frnConstApp.FrnData.millsPerPixel.DEFAULT_VAL,
            defMillsPerPixelForDepth = frnConstApp.FrnData.millsPerPixelForDepth.DEFAULT_VAL,
            defCupboardWidth = frnConstApp.FrnData.cupboardWidth.DEFAULT_VAL,
            defCupboardHeight = frnConstApp.FrnData.cupboardHeight.DEFAULT_VAL,
            defCupboardDepth = frnConstApp.FrnData.cupboardDepth.DEFAULT_VAL,
            defLeftShelveWidth = frnConstApp.FrnData.leftShelveWidth.DEFAULT_VAL,
            defRightShelveWidth = frnConstApp.FrnData.rightShelveWidth.DEFAULT_VAL,
            defThickness = frnConstApp.FrnData.thickness.DEFAULT_VAL;

        jq("#millsPerPixel").val(defMillsPerPixel);
        jq("#millsPerPixelForDepth").val(defMillsPerPixelForDepth);
        jq("#cupboardWidth").val(defCupboardWidth);
        jq("#cupboardHeight").val(defCupboardHeight);
        jq("#cupboardDepth").val(defCupboardDepth);
        jq("#leftShelveWidth").val(defLeftShelveWidth);
        jq("#rightShelveWidth").val(defRightShelveWidth);
        jq("#thickness").val(defThickness);
    });

}

runJqueryScript($, FrnConstr);
