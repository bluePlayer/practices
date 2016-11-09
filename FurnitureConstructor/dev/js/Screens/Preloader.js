window.FrnConstr.namespace('Preloader', window.FrnConstr.Screen, (function (frnConstr) {'use strict';
    var gameObject = null,
        parent = null;

    return {

        init: function () {
            parent = this;
            gameObject = frnConstr.gameObject;
            frnConstr.frnConstrPreloader = frnConstr.createFrnConstrPreloader();
        },

        preload: function () {

            frnConstr.loadAudio('CLICK_SOUND', null, ['assets/audio/basic/ogg/buttonClick.ogg', 'assets/audio/basic/mp3/buttonClick.mp3']);

            frnConstr.loadAtlasJSONHash('OTHER_GUI_ASSETS_ATLAS', null, 'assets/images/UI/otherGuiAssetsSheet.png', 'assets/settings/otherGuiAssetsHash.json');

            frnConstr.loadSpriteSheet('GUIDE_BUTTONS_SHEET', null, 'assets/images/UI/guideButtonsSheet.png', 100, 40, 8);
            frnConstr.loadSpriteSheet('SOCIAL_BUTTONS_SHEET', null, 'assets/images/UI/socialButtonsSheet.png', 152, 61.5, 4);
            frnConstr.loadSpriteSheet('STANDARD_BUTTONS_SHEET', null, 'assets/images/UI/standardButtonsSheet.png', 152, 38.66, 30);
            frnConstr.loadImage('HORIZONTAL_BAFFLE', null, 'assets/images/UI/HorizontalBaffle.png');
            frnConstr.loadImage('VERTICAL_BAFFLE', null, 'assets/images/UI/VerticalBaffle.png');
            frnConstr.loadImage('SHELVE_SLOT', null, 'assets/images/UI/shelveSlot.png');
            frnConstr.loadImage('HORIZONTAL_BEAM', null, 'assets/images/UI/HorzBeam.png');
            frnConstr.loadImage('VERTICAL_BEAM', null, 'assets/images/UI/VertBeam.png');
            frnConstr.loadImage('DRAWER', null, 'assets/images/UI/Drawer.png');
            frnConstr.loadImage('TIE', null, 'assets/images/UI/Tie.png');
            frnConstr.loadImage('SHOES', null, 'assets/images/UI/Shoes.png');
            frnConstr.loadImage('TROUSER', null, 'assets/images/UI/Trouser.png');
            frnConstr.loadImage('HANGER', null, 'assets/images/UI/Hanger.png');
            frnConstr.loadImage('PANTOGRAPH', null, 'assets/images/UI/Pantograph.png');

            parent.load.onFileError.add(function (error) {
                var frnConstrObject = this;

                if (frnConstrObject.debugMode()) {
                    console.log('Error loading file: ' + error);
                }
            }, frnConstr);

            parent.load.onFileStart.add(function (param) {
                var frnConstrObject = this;

                if (frnConstrObject.debugMode()) {
                    console.log('Loading files, percent: ' + param + '%');
                }
            }, frnConstr);

            parent.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
                var frnConstrObject = this;

                frnConstrObject.frnConstrPreloader.preloaderTop.clear();
                frnConstrObject.frnConstrPreloader.preloaderTop.beginFill(frnConstr.Const.Graphics.Colors.DARK_GRAY, 1);
                frnConstrObject.frnConstrPreloader.preloaderTop.drawRect(2, 2, progress, 11, "preloaderTop");
                frnConstrObject.frnConstrPreloader.ready = true;
                if (frnConstrObject.debugMode()) {
                    console.dir(arguments);
                }
            }, frnConstr);

            parent.load.onLoadStart.add(function (param) {
                var frnConstrObject = this;

                if (frnConstrObject.debugMode()) {
                    console.log('Started loading files: ' + param);
                }
            }, frnConstr);

            parent.load.onLoadComplete.add(function () {
                var frnConstrObject = this;

                if (frnConstrObject.debugMode()) {
                    console.log('Finished loading files!');
                }
            }, frnConstr);

            parent.load.onPackComplete.add(function () {
                var frnConstrObject = this;

                if (frnConstrObject.debugMode()) {
                    console.log('Finished packing files: ');
                }
            }, frnConstr);
        },

        update: function () {
            if (frnConstr.frnConstrPreloader.ready === true) {
                frnConstr.frnConstrPreloader.loadingTween = gameObject.add.tween(frnConstr.frnConstrPreloader.loadingObjects).to({alpha: 0},
                                                                        frnConstr.Const.FADE_DURATION, frnConstr.Const.TWEEN_LINEAR,
                                                                        true);
                frnConstr.frnConstrPreloader.loadingTween.onComplete.add(function () {
                    var frnConstrObject = this;

                    frnConstrObject.gameObject.state.start(frnConstrObject.EnteriorScreen.KEY);
                    frnConstrObject.gameObject.state.clearCurrentState();
                }, frnConstr);
                frnConstr.frnConstrPreloader.ready = false;
            }
        },

        shutdown: function () {
            gameObject = null;
            parent.clearScreenState();
        }
    };
    }(window.FrnConstr)));
