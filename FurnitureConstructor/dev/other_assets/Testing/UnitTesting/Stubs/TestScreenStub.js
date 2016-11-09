window.UnitTests.namespace('UnitTestsStub.TestScreenStub', window.UnitTests.UnitTestsStub, (function (unitTests) {'use strict';

    var testScreen = null,
        allObjectsFadedOut = true;
    
    return {
        initStub: function (tsObject) {
            testScreen = tsObject;
            testScreen.init();
            testScreen.clearScreenState();
            testScreen.create = function () {
                testScreen.screenObjects = UnitTests.UnitTestsUtils.FadeInOutUtils.createAllCardBoxesOnStage(WML);
            };
            return testScreen;
        },
        checkMinAlpha = function () {
            testScreen.screenObjects.forEach(function (item){
                if (item.alpha !== 0) {
                    allObjectsFadedOut = allObjectsFadedOut && false;
                }
            }, testScreen, false, {});
        };
    };
    }(window.UnitTests)));