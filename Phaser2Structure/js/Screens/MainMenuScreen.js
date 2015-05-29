window.MyGame.namespace('MainMenuScreen', window.MyGame.Screen, (function (game) {'use strict';
    var thisObject = null,
        gameObject = null,
        mainMenuBg = null,
        playButton = null,
        helpButton = null,
        optionsButton = null;

    return {

        init: function () {
            thisObject = this;
            gameObject = game.gameObject;
            thisObject.screenObjects = gameObject.add.group();
        },

        create: function () {

            mainMenuBg = gameObject.add.sprite(0, 0, wml.ImageAssetKeys.STORY_BACKGROUNDS_ATLAS, 'mainMenuBg.png');
            thisObject.screenObjects.add(mainMenuBg);

            playButton =
                wml.GoToScreen.Button(wml.LevelsScreen.KEY, thisObject.screenObjects, 235, 230, wml.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject,
                                        null, null, null, null, 5, 4, 4, 5);
            thisObject.screenObjects.add(playButton);

            optionsButton = wml.GoToScreen.Button(wml.OptionsScreen.KEY, thisObject.screenObjects, 235, 290, wml.ImageAssetKeys.STANDARD_BUTTONS_SHEET, 
                                        thisObject, null, null, null, null, 9, 8, 8, 9);
            thisObject.screenObjects.add(optionsButton);

            helpButton =
                wml.GoToScreen.Button(wml.HelpScreen.KEY, thisObject.screenObjects, 235, 350, wml.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject,
                                        null, null, null, null, 7, 6, 6, 7);
            thisObject.screenObjects.add(helpButton);

            wml.fadeInGroup(thisObject.screenObjects);
        },

        shutdown: function () {
            thisObject.screenObjects = null;
            gameObject = null;
        }
    };
    }(window.MyGame)));
