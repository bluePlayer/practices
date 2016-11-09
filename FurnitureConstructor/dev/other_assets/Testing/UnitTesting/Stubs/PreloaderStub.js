window.UnitTests.namespace('UnitTestsStub.PreloaderStub', window.UnitTests.UnitTestsStub, (function (unitTests) {'use strict';

    var graphicsConst = WML.Const.Graphics,
        preSettings = {
            labelXPos: graphicsConst.LOADING_LABEL_X_POS,
            labelYPos: graphicsConst.LOADING_LABEL_Y_POS,
            labelImgKey: WML.Const.LOADING_LABEL_IMG_KEY,
            barXPos: graphicsConst.LOADING_BAR_X_POS,
            barYPos: graphicsConst.LOADING_BAR_Y_POS,
            prldBottomStartXY:  graphicsConst.PRELOADER_BOTTOM_START_XY,
            prdlBottomWidth: graphicsConst.PRELOADER_BOTTOM_WIDTH,
            prdlBottomHeight: graphicsConst.PRELOADER_BOTTOM_HEIGHT,
            prldTopStartXY:  graphicsConst.PRELOADER_TOP_START_XY,
            prdlTopWidth: graphicsConst.PRELOADER_TOP_WIDTH,
            prdlTopHeight: graphicsConst.PRELOADER_TOP_HEIGHT,
            matterHornColor: graphicsConst.MATTERHORN_COLOR,
            darkGrayColor: graphicsConst.DARK_GRAY_COLOR,
            alpha100: graphicsConst.ALPHA_100_PERCENT,
            otherGuiAssetsAtlas: WML.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS
        };

    return {
        initializePreloader: function () {

            var preloader = {
                ready: false,
                loadingTween: null,
                loadingLabel: null,
                loadingObjects: null,
                preloaderBottom: null,
                preloaderTop: null   
            };
            
            preloader.loadingObjects = game.add.group();
            preloader.loadingLabel = game.add.sprite(preSettings.labelXPos, preSettings.labelYPos, preSettings.otherGuiAssetsAtlas, preSettings.labelImgKey);
            preloader.loadingObjects.add(preloader.loadingLabel);
            
            preloader.preloaderBottom = game.add.graphics(preSettings.barXPos, preSettings.barYPos);
            preloader.preloaderBottom.beginFill(preSettings.matterHornColor, preSettings.alpha100);
            preloader.preloaderBottom.drawRect(preSettings.prldBottomStartXY, preSettings.prldBottomStartXY, preSettings.prdlBottomWidth, preSettings.prdlBottomHeight);
            preloader.loadingObjects.add(preloader.preloaderBottom);

            preloader.preloaderTop = game.add.graphics(preSettings.barXPos, preSettings.barYPos);
            preloader.preloaderTop.beginFill(preSettings.darkGrayColor, preSettings.alpha100);
            preloader.preloaderTop.drawRect(preSettings.prldTopStartXY,preSettings.prldTopStartXY, preSettings.prdlTopWidth, preSettings.prdlTopHeight);
            preloader.loadingObjects.add(preloader.preloaderTop);
            
            return preloader;
        }
    };
    }(window.UnitTests)));