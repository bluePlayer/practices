function runTests(qunit, frnConstrObj) {
    'use strict';

    qunit.module("Enteriror Screen Tests");

    qunit.test("Testing frame width. It must be equal to: cupboardDepth + rearWallWidth + thickness * 2", function(assert) {
        var width = 3000;
        assert.equal(3000, width, "TODO: this test is not finished!");
    });

}

runTests(QUnit);