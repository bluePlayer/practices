window.MyGame.namespace('BreakPointScreen', window.MyGame.Screen, (function (game) {'use strict';
    var thisObject = null,
        gameObject = null,
        levelsButton = null,
        continueButton = null;

    return {
        init: function () {
            thisObject = this;
            gameObject = game.gameObject;
            thisObject.screenObjects = gameObject.add.group();
        },

        create: function () {

            levelsButton = 
                game.GoToScreen.Button(game.LevelsScreen.KEY, thisObject.screenObjects, 250, 440, game.ImageAssetKeys.STANDARD_BUTTONS_SHEET, game, 
                                        null, null, null, null, 17, 16, 16, 17);
            thisObject.screenObjects.add(levelsButton);

            continueButton = game.GoToScreen.Button(game.GameOverScreen.KEY, thisObject.screenObjects, 250, 440, 
                                                    game.ImageAssetKeys.STANDARD_BUTTONS_SHEET, game, null, null, null, null, 25, 24, 24, 25);
            continueButton.visible = false;
            thisObject.screenObjects.add(continueButton);

            game.fadeInGroup(thisObject.screenObjects);
        }
    };
    }(window.MyGame)));
