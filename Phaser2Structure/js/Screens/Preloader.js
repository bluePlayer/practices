window.MyGame.namespace('Preloader', window.MyGame.Screen, (function (game) {'use strict';
    var gameObject = null,
        parent = null;

    return {

        init: function () {
            parent = this;
            gameObject = game.gameObject;
            game.gamePreloader = game.creategamePreloader();
        },

        preload: function () {

            game.loadAudio('CLICK_SOUND', null, ['assets/audio/basic/ogg/buttonClick.ogg', 'assets/audio/basic/mp3/buttonClick.mp3']);
            game.loadAudio('LEVEL_COMPLETE_SOUND', null, ['assets/audio/basic/ogg/levelComplete.ogg', 'assets/audio/basic/mp3/levelComplete.mp3']);
            // other game sounds

            game.loadAtlasJSONHash('GAME_ATLAS', null, 'assets/images/gameAtlas.png', 'assets/settings/gameAtlas.json');
            // other game atlases

            game.loadSpriteSheet('STANDARD_BUTTONS_SHEET', null, 'assets/images/UI/standardButtonsSheet.png', 152, 38.66, 30);
            // other spritesheets

            parent.load.onFileError.add(function (error) {
                var gameObject = this;

                if (gameObject.debugMode()) {
                    console.log('Error loading file: ' + error);
                }
            }, game);

            parent.load.onFileStart.add(function (param) {
                var gameObject = this;

                if (gameObject.debugMode()) {
                    console.log('Loading files, percent: ' + param + '%');
                }
            }, game);

            parent.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
                var gameObject = this;

                gameObject.gamePreloader.preloaderTop.clear();
                gameObject.gamePreloader.preloaderTop.beginFill(0xA8A8A8, 1);
                gameObject.gamePreloader.preloaderTop.drawRect(2, 2, progress, 11);
                gameObject.gamePreloader.ready = true;
                if (gameObject.debugMode()) {
                    console.dir(arguments);
                }
            }, game);

            parent.load.onLoadStart.add(function (param) {
                var gameObject = this;

                if (gameObject.debugMode()) {
                    console.log('Started loading files: ' + param);
                }
            }, game);

            parent.load.onLoadComplete.add(function () {
                var gameObject = this;

                if (gameObject.debugMode()) {
                    console.log('Finished loading files!');
                }
            }, game);

            parent.load.onPackComplete.add(function () {
                var gameObject = this;

                if (gameObject.debugMode()) {
                    console.log('Finished packing files: ');
                }
            }, game);
        },

        update: function () {
            if (game.gamePreloader.ready === true) {
                game.gamePreloader.loadingTween = gameObject.add.tween(game.gamePreloader.loadingObjects).to({alpha: 0},
                                                                        game.Const.FADE_DURATION, game.Const.TWEEN_LINEAR,
                                                                        true);
                game.gamePreloader.loadingTween.onComplete.add(function () {
                    var gameObject = this;

                    if (gameObject.getFirstVisit()) {
                        gameObject.gameObject.state.start(gameObject.HelpScreen.KEY);
                    } else {
                        gameObject.gameObject.state.start(gameObject.MainMenuScreen.KEY);
                    }
                    gameObject.gameObject.state.clearCurrentState();
                }, game);
                game.gamePreloader.ready = false;
            }
        },

        shutdown: function () {
            gameObject = null;
            parent.clearScreenState();
        }
    };
    }(window.MyGame)));
