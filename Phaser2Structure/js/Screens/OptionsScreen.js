window.MyGame.namespace('OptionsScreen', window.MyGame.Screen, (function (game) {'use strict';
    var gameObject = null,
        thisObject = null,
        woodBg = null,
        optionsTitle = null,
        mainMenuButton = null,
        moveCardsText = null,
        moveCardsCheckBox = null,
        showArrowsText = null,
        showArrowsCheckBox = null,
        muteOnOffButton = null,
        soundText = null;

    return {

        init: function () {
            thisObject = this;
            gameObject = game.gameObject;
            thisObject.screenObjects = gameObject.add.group();
        },

        create: function () {

            woodBg = gameObject.add.sprite(0, 0, game.ImageAssetKeys.GUIDES_AND_BACKGROUNDS_ATLAS, 'woodBg.jpg');
            thisObject.screenObjects.add(woodBg);

            optionsTitle = gameObject.add.sprite(235, 15, game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'optionsTitle.png');
            thisObject.screenObjects.add(optionsTitle);

            mainMenuButton =
                game.GoToScreen.Button(game.MainMenuScreen.KEY, thisObject.screenObjects, 235, 430, game.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject,
                                        null, null, null, null, 3, 2, 2, 3);
            thisObject.screenObjects.add(mainMenuButton);

            moveCardsText = gameObject.add.text(150, 100, 'Move cards ', game.Utility.getTextStyle20());
            thisObject.screenObjects.add(moveCardsText);

            moveCardsCheckBox = gameObject.add.sprite(400, 95, game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
            moveCardsCheckBox.inputEnabled = true;
            moveCardsCheckBox.events.onInputDown.add(function () {
                var gameObject = this;
                    if (gameObject.getMoveCards()) {
                        gameObject.disableMoveCards();
                        moveCardsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                    } else {
                        gameObject.enableMoveCards();
                        moveCardsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
                    }
            }, game);
            thisObject.screenObjects.add(moveCardsCheckBox);

            if (game.getMoveCards()) {
                moveCardsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
            } else {
                moveCardsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
            }

            showArrowsText = gameObject.add.text(150, 150, 'Show arrows ', game.Utility.getTextStyle20());
            thisObject.screenObjects.add(showArrowsText);

            showArrowsCheckBox = gameObject.add.sprite(400, 145, game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
            showArrowsCheckBox.inputEnabled = true;
            showArrowsCheckBox.events.onInputDown.add(function () {
                var gameObject = this;
                    if (gameObject.getShowArrows()) {
                        gameObject.disableShowArrows();
                        showArrowsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                    } else {
                        gameObject.enableShowArrows();
                        showArrowsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
                    }
            }, game);
            thisObject.screenObjects.add(showArrowsCheckBox);

            if (game.getShowArrows()) {
                showArrowsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
            } else {
                showArrowsCheckBox.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
            }

            soundText = gameObject.add.text(150, 200, 'Sound ', game.Utility.getTextStyle20());
            thisObject.screenObjects.add(soundText);

            muteOnOffButton = gameObject.add.sprite(400, 195, game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'muteOff.png');
            muteOnOffButton.inputEnabled = true;
            muteOnOffButton.events.onInputDown.add(thisObject.muteOnOffSound, game);
            thisObject.screenObjects.add(muteOnOffButton);
                                                        
            if (gameObject.sound.mute) {
                muteOnOffButton.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'muteOff.png');
            } else {
                muteOnOffButton.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'muteOn.png');
            }

            game.fadeInGroup(thisObject.screenObjects);
        },

        muteOnOffSound: function () {
            var gameObject = this,
                gameObject = gameObject.gameObject;

            if (gameObject.sound.mute) {
                muteOnOffButton.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'muteOn.png');
                gameObject.sound.mute = false;
            } else {
                muteOnOffButton.loadTexture(game.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'muteOff.png');
                gameObject.sound.mute = true;
            }
        },
    };
    }(window.MyGame)));
