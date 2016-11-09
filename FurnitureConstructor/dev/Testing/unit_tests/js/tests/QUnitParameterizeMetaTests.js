function runTests(qunit) {
    'use strict';

   var logMyProperties = function () {
        console.log("QUnit Parametrize Plugin Meta Tests");
   };

    qunit.log(logMyProperties);

    qunit.module("QUnit Parametrize Plugin Meta Tests() - Sequential");

    qunit
        .cases
        .init([
            {param1: 50},
            {param1: 200},
            {param1: 300}
        ])
        .sequential([
            {param2: 100},
            null,
            {param2: 150}
        ])
        .test("Meta tests for QUnit Parametrize plugin", function (params, assert) {
            console.dir(params);
            assert.equal(params.param1, params.param2,"");
        });

    qunit.module("QUnit Parametrize Plugin Meta Tests() - Combinatorial");

    qunit
        .cases
        .init([
            {param1: 50}
        ])
        .combinatorial([
            {param2: 100},
            {param2: 150},
            {param2: 50}
        ])
        .test("Meta tests for QUnit Parametrize plugin", function (params, assert) {
            console.dir(params);
            assert.equal(params.param1, params.param2,"");
        });
}

runTests(QUnit);
