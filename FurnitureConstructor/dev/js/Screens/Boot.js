window.FrnConstr.namespace('Boot', window.FrnConstr.State, (function (frnConstr, phaser) {'use strict';
    var gameObject = null;

    return {

        init: function () {
            gameObject = frnConstr.gameObject;
            gameObject.input.maxPointers = 1;
            gameObject.stage.disableVisibilityChange = true;

            if (gameObject.device.desktop) {
                gameObject.scale.pageAlignHorizontally = true;
            } else {
                gameObject.scale.scaleMode = phaser.ScaleManager.SHOW_ALL;
                gameObject.scale.setMinMax(frnConstr.Const.STAGE_HEIGHT, frnConstr.Const.LOWER_HEIGHT, frnConstr.Const.STAGE_WIDTH, frnConstr.Const.STAGE_HEIGHT);
                gameObject.scale.forceLandscape = true;
                gameObject.scale.pageAlignHorizontally = true;
            }
        },

        preload: function () {
            gameObject.stage.backgroundColor = frnConstr.Const.Graphics.Colors.BACKGROUND_COLOR;
            frnConstr.loadAtlasJSONHash('OTHER_GUI_ASSETS_ATLAS', null, 'assets/images/UI/otherGuiAssetsSheet.png', 'assets/settings/otherGuiAssetsHash.json');
        },

        create: function () {
            gameObject.state.start(frnConstr.Preloader.KEY);
            gameObject.state.clearCurrentState();
        },

        shutdown: function () {
            gameObject = null;
        }
    };
    }(window.FrnConstr, Phaser)));
