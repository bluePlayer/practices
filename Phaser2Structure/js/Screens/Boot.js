window.MyGame.namespace('Boot', window.WML.State, (function (wml) {'use strict';
    var gameObject = null;

    return {

        init: function () {
            gameObject = wml.gameObject;
            gameObject.input.maxPointers = 1;
            gameObject.stage.disableVisibilityChange = true;

            if (gameObject.device.desktop) {
                gameObject.scale.pageAlignHorizontally = true;
            } else {
                gameObject.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                gameObject.scale.setMinMax(wml.Const.STAGE_HEIGHT, wml.Const.STAGE_HEIGHT, wml.Const.STAGE_WIDTH, wml.Const.STAGE_HEIGHT);
                gameObject.scale.forceLandscape = true;
                gameObject.scale.pageAlignHorizontally = true;
            }
        },

        preload: function () {
            gameObject.stage.backgroundColor = wml.Const.BACKGROUND_COLOR;
            wml.loadAtlasJSONHash('GUI_ATLAS', null, 'assets/images/UI/guiAtlas.png', 'assets/settings/guiAtlas.json');
        },

        create: function () {
            gameObject.state.start(wml.Preloader.KEY);
            gameObject.state.clearCurrentState();
        },

        shutdown: function () {
            gameObject = null;
        }
    };
    }(window.WML)));
