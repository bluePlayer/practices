function runTests(qunit, frnConstr, phaser, jq) {
    'use strict';

    var utils = frnConstr.Utility,
        frnConst = frnConstr.Const,
        frnConstGr = frnConst.Graphics,
        frnConstApp = frnConst.Application,
        frnConstAppFrnData = frnConstApp.FrnData;

    qunit.module("Test createDefaultDataObject()");

    qunit.test("The returned object should contain all necessary fields and they should have default values.", function(assert) {
        var constObject = frnConstr.createDefaultDataObject(),
            expected = true,
            calculated = utils.isTruthy(constObject);

        assert.ok(calculated, "expected: " + expected + ", calculated: " + calculated);
    });

    qunit
        .cases
        .init([
            {propName: 'millsPerPixel', value: frnConstAppFrnData.millsPerPixel.DEFAULT_VAL},
            {propName: 'millsPerPixelForDepth', value: frnConstAppFrnData.millsPerPixelForDepth.DEFAULT_VAL},
            {propName: 'cupboardWidth', value: frnConstAppFrnData.cupboardWidth.DEFAULT_VAL},
            {propName: 'cupboardHeight', value: frnConstAppFrnData.cupboardHeight.DEFAULT_VAL},
            {propName: 'cupboardDepth', value: frnConstAppFrnData.cupboardDepth.DEFAULT_VAL},
            {propName: 'leftShelveWidth', value: frnConstAppFrnData.leftShelveWidth.DEFAULT_VAL},
            {propName: 'rightShelveWidth', value: frnConstAppFrnData.rightShelveWidth.DEFAULT_VAL},
            {propName: 'thickness', value: frnConstAppFrnData.thickness.DEFAULT_VAL}
        ])
        .test("The returned object should contain all necessary fields and they should have default values. (Numeric values)", function (parameters, assert) {
            var calculated = frnConstr.createDefaultDataObject();

            assert.ok(utils.isTruthy(calculated[parameters.propName]), "expected: true");
            assert.equal(calculated[parameters.propName], frnConstAppFrnData[parameters.propName].DEFAULT_VAL, ", expected: true");
        });

    qunit
        .cases
        .init([
            {propName: 'floorChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_FLOOR_IS_DRAWN, chkBoxName: 'DEFAULT_FLOOR_IS_DRAWN'},
            {propName: 'ceilingChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_CEILING_IS_DRAWN, chkBoxName: 'DEFAULT_LEFT_SHELVE_IS_DRAWN'},
            {propName: 'leftShelveChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_LEFT_SHELVE_IS_DRAWN, chkBoxName: 'DEFAULT_LEFT_SHELVE_IS_DRAWN'},
            {propName: 'rightShelveChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_RIGHT_SHELVE_IS_DRAWN, chkBoxName: 'DEFAULT_RIGHT_SHELVE_IS_DRAWN'},
            {propName: 'rearChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_REAR_WALL_IS_DRAWN, chkBoxName: 'DEFAULT_REAR_WALL_IS_DRAWN'},
            {propName: 'standLeftChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_STAND_LEFT_IS_DRAWN, chkBoxName: 'DEFAULT_STAND_LEFT_IS_DRAWN'},
            {propName: 'standRightChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_STAND_RIGHT_IS_DRAWN, chkBoxName: 'DEFAULT_STAND_RIGHT_IS_DRAWN'},
            {propName: 'standChkBox', value: frnConstAppFrnData.checkBoxes.DEFAULT_STAND_IS_DRAWN, chkBoxName: 'DEFAULT_STAND_IS_DRAWN'}
        ])
        .test("The returned object should contain all necessary fields and they should have default values. (Checkboxes)", function (parameters, assert) {
            var calculated = frnConstr.createDefaultDataObject();

            assert.ok(utils.isTruthy(calculated[parameters.propName]), "expected: true");
            assert.equal(calculated[parameters.propName], frnConstAppFrnData.checkBoxes[parameters.chkBoxName], ", expected: true");
        });

    qunit.test("FrnConstr data object must have default CSS color.", function(assert) {
        var calculated = frnConstr.createDefaultDataObject();

        assert.ok(utils.isTruthy(calculated.shelveCssColor), "expected: true");
        assert.equal(calculated.shelveCssColor, frnConstApp.DEFAULT_MATERIAL_COLOR, ", expected: true");
    });

    qunit.module("Const object tests");

    qunit.test("Form fields should be set to default values after pressing resetForm() function.", function(assert) {
        var constObject = frnConst,
            expected = true,
            calculated = utils.isTruthy(constObject);

        assert.ok(calculated, "expected: " + expected + ", calculated: " + calculated);
    });

    qunit.module("getFormDataArray()");

    qunit.test("The returned object should contain all form fields", function(assert) {
        var i = 0,
            calculated = frnConstr.getFormDataArray();

        for (i = 0; i < calculated.length; i += 1) {
            assert.ok(utils.isTruthy(calculated[i])," calculated: " + JSON.stringify(calculated[i]));
        }
    });

    qunit
        .cases
        .init([
             {inputName: 'millsPerPixel', value: 7},
             {inputName: 'millsPerPixelForDepth', value: 16},
             {inputName: 'cupboardWidth', value: 3000},
             {inputName: 'cupboardHeight', value: 2500},
             {inputName: 'cupboardDepth', value: 700},
             {inputName: 'thickness', value: 30},
             {inputName: 'leftShelveWidth', value: 250},
             {inputName: 'rightShelveWidth', value: 250},

             {inputName: 'standLeftChkBox', value: 'on'},
             {inputName: 'rearChkBox', value: 'on'},
             {inputName: 'rightShelveChkBox', value: 'on'},
             {inputName: 'leftShelveChkBox', value: 'on'},
             {inputName: 'floorChkBox', value: 'on'},
             {inputName: 'ceilingChkBox', value: 'on'},
             {inputName: 'standRightChkBox', value: 'on'},
             {inputName: 'standChkBox', value: 'on'}
        ])
        .test("The returned object should contain all form fields with default values", function (params, assert) {
            var i = 0,//jq("#constrForm").serializeArray()
                html = jq.parseHTML(qunit.config.fixture),
                nodeNames = [],
                calculated = jq.parseHTML(qunit.config.fixture);//frnConstr.getFormDataArray();


jq.each( html, function( i, el ) {
  nodeNames[ i ] = "<li>" + el.nodeName + "</li>";
});
console.dir(nodeNames);
            for (i = 0; i < calculated.length; i += 1) {
console.log(calculated[i].nodeName);
                if (calculated[i].nodeName === params.inputName) {
                    assert.equal(calculated[i].value, params.value, " calculated: " + JSON.stringify(calculated[i]) + ", expected: " + JSON.stringify(params));
                }

            }
        });

    qunit.module("setDataObject(data)");

    qunit
        .cases
        .init([
             {field: 'millsPerPixel', value: 7},
             {field: 'millsPerPixelForDepth', value: 16},
             {field: 'fullWidth', value: 3000},
             {field: 'cupboardWidth', value: 2500},
             {field: 'cupboardHeight', value: 2500},
             {field: 'cupboardDepth', value: 700},
             {field: 'thickness', value: 30},
             {field: 'leftShelveWidth', value: 250},
             {field: 'rightShelveWidth', value: 250},
             {field: 'maxNumOfShelves', value: 25},
             {field: 'maxNumOfInnerShelves', value: 25},
             {field: 'maxNumOfBeams', value: 25},

             {field: 'standLeftChkBox', value: true},
             {field: 'rearChkBox', value: true},
             {field: 'rightShelveChkBox', value: true},
             {field: 'leftShelveChkBox', value: true},
             {field: 'floorChkBox', value: true},
             {field: 'ceilingChkBox', value: true},
             {field: 'standRightChkBox', value: true},
             {field: 'standChkBox', value: true}
        ])
        .test("The returned fcdo object should contain all fields from the form and maxNumOfShelves, maxNumOfInnerShelves, maxNumOfBeams, fullWidth", function (params, assert) {
            var item = null,
                data = frnConstr.getFormDataArray(),
                calculated = frnConstr.setDataObject(data);

            for (item in calculated) {

                if (calculated.hasOwnProperty(item) && item === params.field) {
                    assert.ok(utils.isTruthy(calculated[item])," calculated: " + JSON.stringify(calculated[item]) + ", expected: true");
                    assert.equal(calculated[item], params.value, " calculated: " + JSON.stringify(calculated[item]) + ", expected: " + params.value);
                }

            }
        });

    qunit.module("resetForm()", {
        // TODO check this
        before: function () {
            jq.ajax({
                url: 'http://127.0.0.1:8081/phaser-framework/projects/FurnitureConstructor/dev/index.html',
                dataType: 'html',
                success: function(html) {
                    var form = jq(html).find("form"),
                        elem = jq(html).find("input");

                    jq(form).append(elem);
                    jq('#qunit-fixture').append("<div id=\"gameContainer\"><\/div>");
                    jq('#qunit-fixture').append(form);
                }
            });
        }
    });

    qunit.test("Form fields should be set to default values after pressing resetForm() function.", function(assert) {
        var defMillsPerPixel = frnConstApp.FrnData.millsPerPixel.DEFAULT_VAL,
            defMillsPerPixelForDepth = frnConstApp.FrnData.millsPerPixelForDepth.DEFAULT_VAL,
            defCupboardWidth = frnConstApp.FrnData.cupboardWidth.DEFAULT_VAL,
            defCupboardHeight = frnConstApp.FrnData.cupboardHeight.DEFAULT_VAL,
            defCupboardDepth = frnConstApp.FrnData.cupboardDepth.DEFAULT_VAL,
            defLeftShelveWidth = frnConstApp.FrnData.leftShelveWidth.DEFAULT_VAL,
            defRightShelveWidth = frnConstApp.FrnData.rightShelveWidth.DEFAULT_VAL,
            defThickness = frnConstApp.FrnData.thickness.DEFAULT_VAL;

        jq("#millsPerPixel").val(frnConstApp.FrnData.millsPerPixel.MAX_VAL);
        jq("#millsPerPixelForDepth").val(frnConstApp.FrnData.millsPerPixelForDepth.MAX_VAL);
        jq("#cupboardWidth").val(frnConstApp.FrnData.cupboardWidth.MAX_VAL);
        jq("#cupboardHeight").val(frnConstApp.FrnData.cupboardHeight.MAX_VAL);
        jq("#cupboardDepth").val(frnConstApp.FrnData.cupboardDepth.MAX_VAL);
        jq("#leftShelveWidth").val(frnConstApp.FrnData.leftShelveWidth.MAX_VAL);
        jq("#rightShelveWidth").val(frnConstApp.FrnData.rightShelveWidth.MAX_VAL);
        jq("#thickness").val(frnConstApp.FrnData.thickness.MAX_VAL);

        frnConstr.InitFrnConstrForm.resetForm();

        assert.equal(defMillsPerPixel, jq("#millsPerPixel").val(), "expected: " + defMillsPerPixel + ", calculated: " + jq("#millsPerPixel").val());
        assert.equal(defMillsPerPixelForDepth, jq("#millsPerPixelForDepth").val(), "expected: " + defMillsPerPixelForDepth + ", calculated: " + jq("#millsPerPixelForDepth").val());
        assert.equal(defCupboardWidth, jq("#cupboardWidth").val(), "expected: " + defCupboardWidth + ", calculated: " + jq("#cupboardWidth").val());
        assert.equal(defCupboardHeight, jq("#cupboardHeight").val(), "expected: " + defCupboardHeight + ", calculated: " + jq("#cupboardHeight").val());
        assert.equal(defCupboardDepth, jq("#cupboardDepth").val(), "expected: " + defCupboardDepth + ", calculated: " + jq("#cupboardDepth").val());
        assert.equal(defLeftShelveWidth, jq("#leftShelveWidth").val(), "expected: " + defLeftShelveWidth + ", calculated: " + jq("#leftShelveWidth").val());
        assert.equal(defRightShelveWidth, jq("#rightShelveWidth").val(), "expected: " + defRightShelveWidth + ", calculated: " + jq("#rightShelveWidth").val());
        assert.equal(defThickness, jq("#thickness").val(), "expected: " + defThickness + ", calculated: " + jq("#thickness").val());
    });
}

runTests(QUnit, window.FrnConstr, Phaser, $);
