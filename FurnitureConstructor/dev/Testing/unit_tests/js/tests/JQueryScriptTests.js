function runTests(qunit, jq, frnConstrObj) {
    'use strict';

    // prevent early starting od QUnit
    qunit.config.autostart = false;

    // load index.html input elements and load them inside the qunit-fixture div element for testing
    jq.ajax({
        url : 'http://localhost:8081/projects/FurnitureConstructor/dev/index.html',
        dataType : 'html',
        success : function(html) {

            // find specific elements you want...
            var elem = jq(html).find("input");
            jq('#qunit-fixture').append(elem);
            qunit.start();
        }
    });

    qunit.test("Testing \"Reset to Defaults\" button. All values should be set to defaults once reset button is pressed!", function(assert) {
        var defaultCupboardWidth = frnConstrObj.Const.Application.DEFAULT_CUPBOARD_WIDTH,
            maxCupboardWidth = frnConstrObj.Const.Application.MAX_CUPBOARD_WIDTH;

        jq("#cupboardWidth").val(maxCupboardWidth);

        jq("#resetConstrFormButton").click();

        assert.equal(jq("#cupboardWidth").val(), defaultCupboardWidth, "Default cupboard width must be: " + defaultCupboardWidth);
    });

}

runTests(QUnit, $, FrnConstr);
