function runTests(qunit, frnConstr) {
    'use strict';

    var utils = frnConstr.Utility,
        logForUnderscoreTests = function (details) {
            var loc = "",
                output = "";

            if (details.result) {
                return;
            }

            loc = details.module + ": " + details.name + ": ";
            output = "FAILED: " + loc + (details.message ? details.message + ", " : "");

            if (details.actual) {
                output += "expected: " + details.expected + ", actual: " + details.actual;
            }

            if (details.source) {
                output += details.source;
            }

            console.log(output);
        };

    qunit.log(logForUnderscoreTests);

    qunit.module("Underscore Meta Tests() - size() function");

    qunit
        .cases
        .init([
            /*{
                obj: {
                    param1: 50,
                    param2: {
                        param3: 3,
                        param4: 4
                    },
                    param5: {
                        param6: {
                            param7: 7,
                            param8: {
                                param9: 9,
                                param10: 10
                            }
                        }
                    }
                }
            },
            {
                obj: {
                    param1: {
                        param11: 11,
                        param12: 12
                    },
                    param2: {
                        param3: 3,
                        param4: 4
                    },
                    param5: {
                        param6: {
                            param7: 7,
                            param8: {
                                param9: 9,
                                param10: 10
                            }
                        }
                    }
                }
            },
            {
                obj: {
                    param1: "hello",
                    param2: {
                        param3: 3,
                        param4: [1, 2, 3]
                    },
                    param5: {
                        param6: {
                            param7: 7,
                            param8: {
                                param9: [4, 5, 6],
                                param10: 10
                            }
                        }
                    }
                }
            },*/
            {
                obj: [1, 2, 3]
            }
        ])
        .test("Meta tests for Underscore plugin", function (params, assert) {
            console.log(_.size(params.obj));
            assert.equal(params.param1, params.param2,"");
        });

}

runTests(QUnit, FrnConstr);
