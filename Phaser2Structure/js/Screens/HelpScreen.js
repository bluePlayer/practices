window.MyGame.namespace('HelpScreen', window.MyGame.Screen, (function (game) {'use strict';
    var thisObject = null,
        gameObject = null,
        currentGuide = 0,

        switchImages = function (imageIndex) {
            gameObject.add.tween(guideImages[imageIndex]).to({alpha: 1}, game.Const.FADE_DURATION, game.Const.TWEEN_LINEAR, true);
            switch (imageIndex) {
            case 0:
                guideImages[1].alpha = 0;
                guideImages[2].alpha = 0;
                break;
            case 1:
                guideImages[0].alpha = 0;
                guideImages[2].alpha = 0;
                break;
            case 2:
                guideImages[0].alpha = 0;
                guideImages[1].alpha = 0;
                break;
            }
        },

        nextButton = {
            button: null,
            click: function () {
                var tween = gameObject.add.tween(guideImages[currentGuide]).to({alpha: 0}, game.Const.FADE_DURATION, game.Const.TWEEN_LINEAR, true);

                tween.onComplete.add(function () {
                    if (currentGuide < 2) {
                        currentGuide += 1;
                    }
                    switchImages(currentGuide);
                }, game);
            }
        },

        prevButton = {
            button: null,
            click: function () {
                var tween = gameObject.add.tween(guideImages[currentGuide]).to({alpha: 0}, game.Const.FADE_DURATION, game.Const.TWEEN_LINEAR, true);

                tween.onComplete.add(function () {
                    if (currentGuide > 0) {
                        currentGuide -= 1;
                    }
                    switchImages(currentGuide);
                }, game);
            }
        },

        exitGuideButton = null;

    return {

        init: function () {

            gameObject = game.gameObject;
            thisObject = this;
            thisObject.screenObjects = gameObject.add.group();

        },

        create: function () {

            thisObject.screenObjects = gameObject.add.group();

            nextButton.button =
                game.gameButton.gameButton(530, 441, game.ImageAssetKeys.GUIDE_BUTTONS_SHEET, thisObject, nextButton.click,
                                        null, null, null, null, null, null, 3, 2, 2, 3);
            thisObject.screenObjects.add(nextButton.button);

            prevButton.button =
                game.gameButton.gameButton(10, 441, game.ImageAssetKeys.GUIDE_BUTTONS_SHEET, thisObject, prevButton.click,
                                        null, null, null, null, null, null, 1, 0, 0, 1);
            thisObject.screenObjects.add(prevButton.button);

            exitGuideButton =
                game.GoToScreen.Button(game.MainMenuScreen.KEY, thisObject.screenObjects, 250, 440, game.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject,
                                        null, null, null, null, 21, 20, 20, 21);
            thisObject.screenObjects.add(exitGuideButton);

            thisObject.screenObjects.forEach(function (item) {
                var myGame = this;

                item.alpha = 0;
                if (item.name !== 'marco' && item.name !== 'guide') {
                    myGame.gameObject.add.tween(item).to({alpha: 1}, game.Const.FADE_DURATION, gameObject.Const.TWEEN_LINEAR, true);
                }
            }, game);
        }
    };
    }(window.MyGame)));
