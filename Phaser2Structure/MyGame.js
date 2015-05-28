window.MyGame = window.MyGame || (function(wmlWindowObject) {'use strict';
    var windowObject = wmlWindowObject,
        thisObject = null,
        score = 0,
        currentLevel = 1,
        gameProgress = 1,
        levelPointsArray = [],
        firstVisit = true,
        STAGE_WIDTH = 640,
        STAGE_HEIGHT = 480,
        HTML_CONTAINER = 'gameContainer',
        preloader = null;

    return {

        Exceptions: {},

        Const: {},

        Events: {},

        gameObject = new Phaser.Game(STAGE_WIDTH, STAGE_HEIGHT, Phaser.AUTO, HTML_CONTAINER),

        gamePreloader: null,

        createGamePreloader: function() {
            var preloader;
            // create preloader
            return preloader;
        },

        SoundAssetKeys: {},

        ImageAssetKeys: {},

        getFirstVisit: function() {
            return firstVisit;
        },

        getScore: function() {
            return score;
        },

        getGameProgress: function() {
            return gameProgress;
        },

        getCurrentLevel: function() {
            return currentLevel;
        },

        setCurrentLevel: function(levelNum) {
            if (levelNum < 0) {
                currentLevel = 0;
            } else if (levelNum > thisObject.Const.LEVELS_COUNT - 1) {
                currentLevel = thisObject.Const.LEVELS_COUNT - 1;
            } else {
                currentLevel = levelNum;
            }
            return currentLevel;
        },

        updateScore: function() {
            var i = 0,
                helper = 0;
            for (i = 0; i < levelPointsArray.length; i += 1) {
                helper += levelPointsArray[i];
            }
            score = helper;
        },

        incrCurrentLevel: function() {
            if (currentLevel < thisObject.Const.LEVELS_COUNT - 1) {
                currentLevel += 1;
            }
            return currentLevel;
        },

	decrCurrentLevel: function () {
            if (currentLevel > 0) {
                currentLevel -= 1;
            }
            return currentLevel;
        },

	incrementGameProgress: function () {
            if (gameProgress < thisObject.Const.LEVELS_COUNT) {
                gameProgress += 1;
            }
            return gameProgress;
        },

	fadeOutGroup: function (groupObject) {
            var tween = null;

            groupObject.forEach(function (item) {
                var wmlObject = this;

                tween = wmlObject.gameObject.add.tween(item).to({ alpha: 0 }, wmlObject.Const.FADE_DURATION, wmlObject.Const.TWEEN_LINEAR, true);
            }, thisObject);
            return tween;
        },

	fadeInGroup: function (groupObject) {
            var tween = null;

            groupObject.forEach(function (item) {
                var wmlObject = this;

                item.alpha = 0;
                tween = wmlObject.gameObject.add.tween(item).to({ alpha: 1 }, wmlObject.Const.FADE_DURATION, wmlObject.Const.TWEEN_LINEAR, true);
            }, thisObject);
            return tween;
        },

	setLevelPoints: function (levelNum, points) {
            if (levelNum >= 0  && levelNum < thisObject.Const.LEVELS_COUNT) {
                levelPointsArray[levelNum] = points;
            }
        },

	getLevelPointsArray: function () {
            return levelPointsArray.slice();
        },

        clearLevelPointsArray: function () {
            var i = 0;
            levelPointsArray = [];
            for (i = 0; i < thisObject.Const.LEVELS_COUNT; i += 1) {
                levelPointsArray.push(0);
            }
        },

	addConstant: function (MyObject, constantName, constantValue) {
            if (constantValue === undefined || constantValue === null) {
                constantValue = constantName;
            }
            if (MyObject === null || MyObject === undefined) {
                MyObject = {};
            }
            Object.defineProperty(MyObject, constantName, {
                configurable: false,
                enumerable: true,
                value: constantValue,
                writable: false
            });
        },

        loadAtlasJSONHash: function (keyName, keyValue, sheetUrl, sheetConfigUrl) {
            thisObject.addConstant(thisObject.ImageAssetKeys, keyName, keyValue);
            game.load.atlasJSONHash(thisObject.ImageAssetKeys[keyName], sheetUrl, sheetConfigUrl);
        },

        loadSpriteSheet: function (keyName, keyValue, url, width, height, numOfFrames) {
            thisObject.addConstant(thisObject.ImageAssetKeys, keyName, keyValue);
            game.load.spritesheet(thisObject.ImageAssetKeys[keyName], url, width, height, numOfFrames);
        },

        loadImage: function (keyName, keyValue, url) {
            thisObject.addConstant(thisObject.ImageAssetKeys, keyName, keyValue);
            game.load.image(thisObject.ImageAssetKeys[keyName], url);
        },

        loadAudio: function (keyName, keyValue, arrayOfUrls) {
            thisObject.addConstant(thisObject.SoundAssetKeys, keyName, keyValue);
            game.load.audio(thisObject.SoundAssetKeys[keyName], arrayOfUrls, true);
        },

        namespace: function (namespaceStr, inheritObject, newObject) {
            var parts = namespaceStr.split('.'),
                helpObject = Object.create(inheritObject),
                wmlObject = this,
                i = 0,
                prop = {};

            if (inheritObject === null || inheritObject === undefined) {
                inheritObject = {};
            }

            if (parts[0] === wmlObject.Const.GAME_NAME) {
                parts = parts.slice(1);
            }

            for (i = 0; i < parts.length; i += 1) {
                if (wmlObject[parts[i]] === undefined) {
                    for (prop in newObject) {
                        if (newObject.hasOwnProperty(prop)) {
                            helpObject[prop] = newObject[prop];
                        }
                    }
                    wmlObject[parts[i]] = helpObject;
                }
                wmlObject = wmlObject[parts[i]];
            }
            return wmlObject;
        },

        loadStorageData: function () {
            var i = 0,
                storageFirstVisit = null,
                storageScore = null,
                storageGameProgress = null,
                storagePointsArray = null,
                helperArray = [];

            storageFirstVisit = windowObject.localStorage.getItem('firstVisit');
            if (storageFirstVisit === null) {
                windowObject.localStorage.setItem('firstVisit', firstVisit);
            } else {
                firstVisit = false;
                windowObject.localStorage.setItem('firstVisit', firstVisit);
            }

            storageScore = windowObject.localStorage.getItem('score');
            if (storageScore === null) {
                windowObject.localStorage.setItem('score', score);
            } else {
                score = parseInt(storageScore, 10);
            }

            storageGameProgress = windowObject.localStorage.getItem('gameProgress');
            if (storageGameProgress === null) {
                windowObject.localStorage.setItem('gameProgress', gameProgress);
            } else {
                gameProgress = parseInt(storageGameProgress, 10);
            }

            storagePointsArray = windowObject.localStorage.getItem('levelPointsArray');
            if (storagePointsArray === null) {
                thisObject.clearLevelPointsArray();
                windowObject.localStorage.setItem('levelPointsArray', levelPointsArray);
            } else {
                helperArray = storagePointsArray.split(',');
                for (i = 0; i < thisObject.Const.LEVELS_COUNT; i += 1) {
                    levelPointsArray.push(parseInt(helperArray[i], 10));
                }
            }
        },

        addNewGameState: function (stateObject, stateKeyName) {
            thisObject.addConstant(stateObject, 'KEY', stateKeyName);
            game.state.add(stateObject.KEY, stateObject);
        },

	init: function (configObject) {
            var i = 0,
                storageScore = null,
                storageGameProgress = null,
                storagePointsArray = null,
                helperArray = [];

            config = configObject;
            thisObject = this;

            thisObject.addConstant(thisObject.Const, 'GAME_NAME', 'MyGame');
            thisObject.addConstant(thisObject.Const, 'VERSION', '1.0.0');
            thisObject.addConstant(thisObject.Const, 'STAGE_WIDTH', STAGE_WIDTH);
            thisObject.addConstant(thisObject.Const, 'STAGE_HEIGHT', STAGE_HEIGHT);
            thisObject.addConstant(thisObject.Const, 'LOWER_HEIGHT', LOWER_HEIGHT);
            thisObject.addConstant(thisObject.Const, 'TWEEN_LINEAR', 'Linear');
            thisObject.addConstant(thisObject.Const, 'FADE_DURATION', 500);
            thisObject.addConstant(thisObject.Const, 'LEVELS_COUNT', 21);
            thisObject.addConstant(thisObject.Const, 'LEVELS_PER_ROW', 7);
            thisObject.addConstant(thisObject.Const, 'BACKGROUND_COLOR', '#C0C0C0');
            thisObject.addConstant(thisObject.Const, 'BLOG_LINK', 'http://mygameblog.com');
            thisObject.addConstant(thisObject.Const, 'BLOG_NAME', 'MyBlogName');
            thisObject.addConstant(thisObject.Const, 'GAME_LINK', 'http://mygamelink.com//');
            thisObject.addConstant(thisObject.Const, 'GAME_LINK_NAME', 'Game Link Name');
            thisObject.addConstant(thisObject.Const, 'TWITTER_URL', null);
            thisObject.addConstant(thisObject.Const, 'FACEBOOK_URL', null);
            thisObject.addConstant(thisObject.Const, 'BLOG_URL', null);
            thisObject.addConstant(thisObject.Const, 'TIMER_DELAY', 1000);
            thisObject.addConstant(thisObject.Const, 'LOOP_DELAY', 100);

            thisObject.addNewGameState(thisObject.Boot, 'BOOT');
            thisObject.addNewGameState(thisObject.Preloader, 'PRELOADER');
            thisObject.addNewGameState(thisObject.MainMenuScreen, 'MAIN_MENU_SCREEN');
            thisObject.addNewGameState(thisObject.LevelsScreen, 'LEVELS_SCREEN');
            thisObject.addNewGameState(thisObject.HelpScreen, 'HELP_SCREEN');
            thisObject.addNewGameState(thisObject.GameScreen, 'GAME_SCREEN');
            thisObject.addNewGameState(thisObject.BreakPointScreen, 'BREAK_POINT_SCREEN');
            thisObject.addNewGameState(thisObject.OptionsScreen, 'OPTIONS_SCREEN');
            thisObject.addNewGameState(thisObject.GameOverScreen, 'GAME_OVER_SCREEN');
            thisObject.addNewGameState(thisObject.TestScreen, 'TEST_SCREEN');

            thisObject.loadStorageData();

            game.state.start(thisObject.Boot.KEY);
        }
    };
}(window));
