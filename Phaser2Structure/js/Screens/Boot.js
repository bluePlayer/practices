window.MyGame.namespace('Boot', window.MyGame.State, (function (game) {'use strict';
    var gameObject = null;

    return {

        init: function () {
            gameObject = game.gameObject;
            gameObject.input.maxPointers = 1;
            gameObject.stage.disableVisibilityChange = true;

            if (gameObject.device.desktop) {
                gameObject.scale.pageAlignHorizontally = true;
            } else {
                gameObject.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                gameObject.scale.setMinMax(game.Const.STAGE_HEIGHT, game.Const.STAGE_HEIGHT, game.Const.STAGE_WIDTH, game.Const.STAGE_HEIGHT);
                gameObject.scale.forceLandscape = true;
                gameObject.scale.pageAlignHorizontally = true;
            }
        },

        preload: function () {
            gameObject.stage.backgroundColor = game.Const.BACKGROUND_COLOR;
            game.loadAtlasJSONHash('GUI_ATLAS', null, 'assets/images/UI/guiAtlas.png', 'assets/settings/guiAtlas.json');
        },

        create: function () {
            gameObject.state.start(game.Preloader.KEY);
            gameObject.state.clearCurrentState();
        },

        shutdown: function () {
            gameObject = null;
        }
    };
    }(window.MyGame)));
