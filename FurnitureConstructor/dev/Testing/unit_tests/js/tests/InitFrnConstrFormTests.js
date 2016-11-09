function runTests(qunit, frnConstr, phaser, jq) {
    'use strict';

    var utils = frnConstr.Utility,
        frnConst = frnConstr.Const,
        frnConstGr = frnConst.Graphics,
        frnConstApp = frnConst.Application;

    qunit.module("getDataArray()");

    qunit
        .cases
        .init([
            {fieldId: "#enteriorButton"},
            {fieldId: "#exteriorButton"},
            {fieldId: "#sendButton"},
            {fieldId: "#generateButton"},
            {fieldId: "#resetConstrFormButton"},
            {fieldId: "#saveProgressButton"},
            {fieldId: "#deleteProgressButton"},
            {fieldId: "#addLeftShelveButton"},
            {fieldId: "#addRightShelveButton"},
            {fieldId: "#floorChkBox"},
            {fieldId: "#ceilingChkBox"},
            {fieldId: "#leftShelveChkBox"},
            {fieldId: "#rightShelveChkBox"},
            {fieldId: "#rearChkBox"},
            {fieldId: "#standLeftChkBox"},
            {fieldId: "#standRightChkBox"},
            {fieldId: "#standChkBox"},
            {fieldId: "#millsPerPixel"},
            {fieldId: "#millsPerPixelForDepth"},
            {fieldId: "#cupboardWidth"},
            {fieldId: "#cupboardHeight"},
            {fieldId: "#cupboardDepth"},
            {fieldId: "#leftShelveWidth"},
            {fieldId: "#rightShelveWidth"},
            {fieldId: "#thickness"}
        ])
        .test("getDataArray() should contain specific input field data from the init form, expected: true",
            function (parameters, assert) {
                var expected = true,
                    calculated = utils.isTruthy(jq(parameters.fieldId));

                assert.ok(calculated, "expected: " + expected + ", calculated: " + calculated);
            });

    // TODO remove this or fix it
    qunit.module("resetForm()", {
        // TODO check this
        /*before: function () {
            jq.ajax({
                url: 'http://localhost:8081/phaser-framework/projects/FurnitureConstructor/dev/index.html',
                dataType: 'html',
                success: function(html) {
                    var form = jq(html).find("form"),
                        elem = jq(html).find("input");

                    jq(form).append(elem);
                    jq('#qunit-fixture').append("<div id=\"gameContainer\"><\/div>");
                    jq('#qunit-fixture').append(form);
                }
            });
        }*/
    });

    qunit
        .cases
        .init([
            {fieldId: "millsPerPixel"},
            {fieldId: "millsPerPixelForDepth"},
            {fieldId: "cupboardWidth"},
            {fieldId: "cupboardHeight"},
            {fieldId: "cupboardDepth"},
            {fieldId: "leftShelveWidth"},
            {fieldId: "rightShelveWidth"},
            {fieldId: "thickness"}
        ])
        .test("Form fields should be set to default values after pressing resetForm() function. Testing numbered fields",
            function (parameters, assert) {
                var defaultValue = frnConstApp.FrnData[parameters.fieldId].DEFAULT_VAL,
                hashFieldId = "#" + parameters.fieldId,
                calculated = 0;

                jq(hashFieldId).val(frnConstApp.FrnData[parameters.fieldId].MAX_VAL);

                frnConstr.InitFrnConstrForm.resetForm();

                calculated = jq(hashFieldId).val();
                assert.equal(calculated, defaultValue, "expected: " + defaultValue + ", calculated: " + calculated);
         });

    qunit
        .cases
        .init([
            {fieldId: "#floorChkBox"},
            {fieldId: "#ceilingChkBox"},
            {fieldId: "#leftShelveChkBox"},
            {fieldId: "#rightShelveChkBox"},
            {fieldId: "#rearChkBox"},
            {fieldId: "#standLeftChkBox"},
            {fieldId: "#standRightChkBox"},
            {fieldId: "#standChkBox"}
        ])
        .test("Form fields should be set to default values after pressing resetForm() function. Testing checkboxe fields",
            function (parameters, assert) {
                var defaultValue = true,
                    calculated = false;

                jq(parameters.fieldId).prop("checked", false);

                frnConstr.InitFrnConstrForm.resetForm();

                calculated = jq(parameters.fieldId).prop("checked");
                assert.ok(calculated, "expected: " + defaultValue + ", calculated: " + calculated);
            });

    // TODO fix this test or remove it. Some of the functions were moved to FrnConstr.js
    qunit.test("initForm(rendering)", function(assert) {
        var renderingExpected = phaser.HEADLESS,
            renderingCalcluated = 0;

        frnConstr.InitFrnConstrForm.initForm(renderingExpected);

        renderingCalcluated = frnConstr.InitFrnConstrForm.getRendering();
        assert.equal(renderingCalcluated, renderingExpected, "rendering expected: " + renderingExpected + ", rendering calculated: " + renderingCalcluated);
    });
}

runTests(QUnit, window.FrnConstr, Phaser, $);
