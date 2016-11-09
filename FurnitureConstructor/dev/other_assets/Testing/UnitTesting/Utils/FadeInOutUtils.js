window.UnitTests.namespace('UnitTestsUtils.FadeInOutUtils', window.UnitTests.UnitTestsUtils, (function (unitTests) {'use strict';

    return {
        createAllCardBoxesOnStage: function (wml, screen) {
            var k = 1, j = 0, i = 0,
                gameObject = wml.gameObject,
                upFrame = null,
                overFrame = null,
                outFrame = null,
                downFrame = null,
                box = null,
                boxes = gameObject.add.group();

            for (i = 0; i < 7; i += 1) {
                for (j = 0; j < 3; j += 1) {
                    overFrame = 'box' + k + '_over.png';
                    downFrame = 'box' + k + '_up.png';
                    outFrame = downFrame;
                    box = gameObject.add.button(i * 75, j * 75, wml.ImageAssetKeys.BOXES_ATLAS, function () {}, gameObject, overFrame, outFrame, downFrame, outFrame);
                    k += 1;
                    boxes.add(box);
                    box = null;
                    upFrame = null;
                    overFrame = null;
                    outFrame = null;
                    downFrame = null;
                }
            }
            
            return boxes;
        }
    };
    }(window.UnitTests)));