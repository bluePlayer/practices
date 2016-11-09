/**
 * Furniture Constructor - a wall cabinet simulator made with Phaser 2.6.1
 * @module FrnConstr
 * @class FrnConstr
 * @main FrnConstr
 * @author Vladimir Zakar aka bluePlayer/spinnerbox. https://github.com/bluePlayer/practices
 */
window.FrnConstr = window.FrnConstr || (function (frnConstrWindowObject, phaser, renderingMode, frnConstr, jq) {'use strict';
    var
        /**
         * windowObject is a reference name for the global object window
         * @property windowObject
         * @private
         * @type Object
         * @default window
         */
        windowObject = frnConstrWindowObject,

        /**
         * Object that contains application configuration.
         * @property config
         * @private
         * @type Object
         * @default null
         */
        config = null,

        /**
         * thisObject is a reference name for the FrnConstr object, so that you don't have to write all the time 'this'.
         * @property thisObject
         * @private
         * @type Object
         * @default null
         */
        thisObject = null,

        validationMessages = "",

        enteriorBitmapData = null,

        exteriorBitmapData = null,

        firstVisit = true,

        appInit = false,

        /**
         * frnConstrDataObject is private variable holding data in JSON object format. This data is generated from data array comming from the html form.
         * @property frnConstrDataObject
         * @private
         * @type Object
         * @default {}
         */
        frnConstrDataObject = {},

        formDataArray = [],

        /**
         * debugMode is private variable that enables logging when true and disables it when false.
         * @property debugMode
         * @private
         * @type Boolean
         * @default true
         */
        debugMode = false,

        /**
         * STAGE_WIDTH is private constant that keeps the value of the stage width = 800.
         * @property STAGE_WIDTH
         * @private
         * @type Integer
         * @default 800
         */
        STAGE_WIDTH = 800,

        /**
         * STAGE_HEIGHT is private constant that keeps the value of the stage height = 600.
         * @property STAGE_HEIGHT
         * @private
         * @type Integer
         * @default 600
         */
        STAGE_HEIGHT = 600,

        /**
         * LOWER_WIDTH is private constant that holds the lowest width when resizing for smalled screens, width = 640
         * @property LOWER_WIDTH
         * @private
         * @type Integer
         * @default 640
         */
        LOWER_WIDTH = 640,

        /**
         * LOWER_HEIGHT is private constant that holds the lowest height when resizing for smalled screens, height = 480
         * @property LOWER_HEIGHT
         * @private
         * @type Integer
         * @default 480
         */
        LOWER_HEIGHT = 480,


        /**
         * HTML_CONTAINER is private constant that holds the name of the div container where should the game be loaded.
         * @property HTML_CONTAINER
         * @private
         * @type String
         * @default 'gameContainer'
         */
        HTML_CONTAINER = 'gameContainer',

         /**
         * LOADING_LABEL_IMG_KEY string key for referencing the "loading label" image when starting the game.
         * @property LOADING_LABEL_IMG_KEY
         * @private
         * @type string
         * @default 'loadingLabel.png'
         */
         LOADING_LABEL_IMG_KEY = 'loadingLabel.png';

    return {

        /**
         * Contains exceptions for handling software errors.
         * @namespace FrnConstr
         * @class Exceptions
         */
        Exceptions: {},

        /**
         * Contains constants created with Object.defineProperty() method in the initialization process of the game.
         * All members of this class are enumerable, non-writable and non-configurable
         * @namespace FrnConstr
         * @class Const
         */
        Const: {
            Graphics: {
                Colors: {
                    Material: {},
                    Doors: {}
                }
            },
            LocalStorage: {},
            Application: {
                Keys: {},
                FrnData: {
                    millsPerPixel: {},
                    millsPerPixelForDepth: {},
                    cupboardWidth: {},
                    cupboardHeight: {},
                    cupboardDepth: {},
                    leftShelveWidth: {},
                    rightShelveWidth: {},
                    thickness: {},
                    checkBoxes: {}
                },
                InnerPartsMatrix: {
                    numOfPartsPerSlot: 4
                }
            },
            Messages: {
                millsPerPixel: {},
                millsPerPixelForDepth: {},
                cupboardWidth: {},
                cupboardHeight: {},
                cupboardDepth: {},
                leftShelveWidth: {},
                rightShelveWidth: {},
                thickness: {}
            },
            Errors: {}
        },

        /**
         * Contains game-wide event listeners.
         * @namespace FrnConstr
         * @class Events
         */
        Events: {},

        /**
         * @class FrnConstr
         */
        frnConstrPreloader: null,

        /**
         * SoundAssetKeys contains constants, string keys for referencing sound objects in the game.
         * @property SoundAssetKeys
         * @private
         * @type Object
         * @default {}
         */
        SoundAssetKeys: {},

        /**
         * ImageAssetKeys contains constants, string keys for referencing image/spritesheet objects in the game.
         * @property ImageAssetKeys
         * @private
         * @type Object
         * @default {}
         */
        ImageAssetKeys: {},

        getFirstVisit: function () {
            return firstVisit;
        },

        getAppInit: function () {
            return appInit;
        },

        appInitFinish: function () {
            appInit = true;
        },

        /**
         * gameObject is a game-wide reference to the Phaser.Game instance created when initializing the game.
         * @property gameObject
         * @private
         * @type Phaser.Game
         * @default game
         */
        //gameObject: game,

        /**
         * Returns current value of debugMode, true or false.
         * @method debugMode
         * @return {Boolean}
         */
        debugMode: function () {
            return debugMode;
        },

        getHtmlContainer: function () {
            return HTML_CONTAINER;
        },


        getEnteriorBmpData: function () {
            return enteriorBitmapData;
        },

        setEnteriorBmpData: function (data) {
            enteriorBitmapData = data;
        },

        getExteriorBmpData: function () {
            return exteriorBitmapData;
        },

        setExteriorBmpData: function (data) {
            exteriorBitmapData = data;
        },

        /**
         * Creates "fading out" animation with specified group of objects. From alpha = 1 to alpha = 0;
         * @method fadeOutGroup
         * @param {Object} groupObject
         */
        fadeOutGroup: function (groupObject) {
            var tween = null;

            groupObject.forEach(function (item) {
                var frnConstrObject = this;

                tween = frnConstrObject.gameObject.add.tween(item).to({ alpha: 0 }, frnConstrObject.Const.FADE_DURATION, frnConstrObject.Const.TWEEN_LINEAR, true);
            }, thisObject);
            return tween;
        },

        /**
         * Creates "fading in" animation with specified group of objects. From alpha = 0 to alpha = 1;
         * @method fadeInGroup
         * @param {Object} groupObject
         */
        fadeInGroup: function (groupObject) {
            var tween = null;

            groupObject.forEach(function (item) {
                var frnConstrObject = this;

                item.alpha = 0;
                tween = frnConstrObject.gameObject.add.tween(item).to({ alpha: 1 }, frnConstrObject.Const.FADE_DURATION, frnConstrObject.Const.TWEEN_LINEAR, true);
            }, thisObject);
            return tween;
        },

        getValidationMsg: function () {
            return validationMessages;
        },

        addValidationMsg: function (msg) {
            validationMessages += msg;
        },

        clearValidationMsgs: function () {
            validationMessages = "";
        },

        setDataObject: function (data) {
            var appConst = this.Const.Application,
                appConstKeys = appConst.Keys;

            frnConstrDataObject = thisObject.createDefaultDataObject();
            validationMessages = "";

            data.forEach(function (crv, index, arr) {
                var name = crv.name,
                    value = crv.value,
                    decimal = this.Utility.toDecimal(value);

                switch (name) {
                    case 'cupboardWidth':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.CUPBOARD_WIDTH_KEY, value);
                        break;
                    case 'cupboardHeight':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.CUPBOARD_HEIGHT_KEY, value);
                        break;
                    case 'cupboardDepth':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.CUPBOARD_DEPTH_KEY, value);
                        break;
                    case 'leftShelveWidth':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.LEFT_SHELVE_WIDTH_KEY, value);
                        break;
                    case 'rightShelveWidth':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.RIGHT_SHELVE_WIDTH_KEY, value);
                        break;
                    case 'millsPerPixel':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.MILLS_PER_PIXEL_KEY, value);
                        break;
                    case 'millsPerPixelForDepth':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.MILLS_PER_PIXEL_FOR_DEPTH_KEY, value);
                        break;
                    case 'thickness':
                        frnConstrDataObject[name] = this.Utility.validateNumericFrnData(appConstKeys.THICKNESS_KEY, value);
                        break;
                    default:
                        frnConstrDataObject[name] = value;
                        break;
                }

            }, this);

            frnConstrDataObject.floorChkBox = this.Utility.isTruthy(frnConstrDataObject.floorChkBox);
            frnConstrDataObject.ceilingChkBox = this.Utility.isTruthy(frnConstrDataObject.ceilingChkBox);
            frnConstrDataObject.rearChkBox = this.Utility.isTruthy(frnConstrDataObject.rearChkBox);
            frnConstrDataObject.leftShelveChkBox = this.Utility.isTruthy(frnConstrDataObject.leftShelveChkBox);
            frnConstrDataObject.rightShelveChkBox = this.Utility.isTruthy(frnConstrDataObject.rightShelveChkBox);
            frnConstrDataObject.standChkBox = this.Utility.isTruthy(frnConstrDataObject.standChkBox);
            frnConstrDataObject.standLeftChkBox = this.Utility.isTruthy(frnConstrDataObject.standLeftChkBox);
            frnConstrDataObject.standRightChkBox = this.Utility.isTruthy(frnConstrDataObject.standRightChkBox);

            frnConstrDataObject.fullWidth = frnConstrDataObject.cupboardWidth;
            frnConstrDataObject.maxNumOfShelves = this.Utility.decimalRound((frnConstrDataObject.cupboardHeight) / 100, 0);

            if (frnConstrDataObject.leftShelveChkBox) {
                if (frnConstrDataObject.cupboardWidth - frnConstrDataObject.leftShelveWidth < appConst.FrnData.cupboardWidth.MIN_VAL) {
                    frnConstrDataObject.leftShelveChkBox = false;
                    validationMessages += this.Const.Messages.LEFT_SHELVE_CANNOT_FIT_MSG + "\n";
                } else {
                    frnConstrDataObject.cupboardWidth -= frnConstrDataObject.leftShelveWidth;
                }
            }

            if (frnConstrDataObject.rightShelveChkBox) {
                if (frnConstrDataObject.cupboardWidth - frnConstrDataObject.rightShelveWidth < appConst.FrnData.cupboardWidth.MIN_VAL) {
                    frnConstrDataObject.rightShelveChkBox = false;
                    validationMessages += this.Const.Messages.RIGHT_SHELVE_CANNOT_FIT_MSG + "\n";
                } else {
                    frnConstrDataObject.cupboardWidth -= frnConstrDataObject.rightShelveWidth;
                }
            }

            frnConstrDataObject.maxNumOfInnerShelves = frnConstrDataObject.maxNumOfShelves;
            frnConstrDataObject.maxNumOfBeams = this.Utility.decimalRound((frnConstrDataObject.cupboardWidth) / 100, 0);

            return frnConstrDataObject;
        },

        getFrnConstrDataObject: function () {
            return frnConstrDataObject;
        },

        getFormDataArray: function () {
            return jq("#constrForm").serializeArray();
        },

        generateWardrobe: function () {
            thisObject.setDataObject(thisObject.getFormDataArray());
        },

        /**
         * addConstant(MyObject, constantName, constantValue) creates new constant in MyObject with constantName as name and
         * constantValue as value. If constantValue is null that the value of the new constant will equal to its name.
         * @method addConstant
         * @param {Object} MyObject object where this constant should be created
         * @param {String} constantName name of the new constant, usually with upper case letters and underscores.
         * @param {Object} constantValue value of the new constant. If set to null the new constant will have the name as the value.
         */
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

        namespace: function (namespaceStr, inheritObject, newObject) {
            var parts = namespaceStr.split('.'),
                helpObject = Object.create((inheritObject === null || inheritObject === undefined) ? {} : inheritObject),
                frnConstrObject = this,
                i = 0,
                prop = {};

            if (parts[0] === frnConstrObject.Const.GAME_NAME) {
                parts = parts.slice(1);
            }

            for (i = 0; i < parts.length; i += 1) {
                if (frnConstrObject[parts[i]] === undefined) {
                    for (prop in newObject) {
                        if (newObject.hasOwnProperty(prop)) {
                            helpObject[prop] = newObject[prop];
                        }
                    }
                    frnConstrObject[parts[i]] = helpObject;
                }
                frnConstrObject = frnConstrObject[parts[i]];
            }
            return frnConstrObject;
        },

        createDefaultDataObject: function () {
            var frnConst = this.Const,
                frnConstAppFrnData = frnConst.Application.FrnData;

            return {
                millsPerPixel: frnConstAppFrnData.millsPerPixel.DEFAULT_VAL,
                millsPerPixelForDepth: frnConstAppFrnData.millsPerPixelForDepth.DEFAULT_VAL,
                cupboardWidth: frnConstAppFrnData.cupboardWidth.DEFAULT_VAL,
                cupboardHeight: frnConstAppFrnData.cupboardHeight.DEFAULT_VAL,
                cupboardDepth: frnConstAppFrnData.cupboardDepth.DEFAULT_VAL,
                leftShelveWidth: frnConstAppFrnData.leftShelveWidth.DEFAULT_VAL,
                rightShelveWidth: frnConstAppFrnData.rightShelveWidth.DEFAULT_VAL,
                thickness: frnConstAppFrnData.thickness.DEFAULT_VAL,

                floorChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_FLOOR_IS_DRAWN,
                ceilingChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_CEILING_IS_DRAWN,
                leftShelveChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_LEFT_SHELVE_IS_DRAWN,
                rightShelveChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_RIGHT_SHELVE_IS_DRAWN,
                rearChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_REAR_WALL_IS_DRAWN,
                standLeftChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_STAND_LEFT_IS_DRAWN,
                standRightChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_STAND_RIGHT_IS_DRAWN,
                standChkBox: frnConstAppFrnData.checkBoxes.DEFAULT_STAND_IS_DRAWN,

                shelveCssColor: frnConst.Application.DEFAULT_MATERIAL_COLOR
            };
        },

        clearStorageData: function () {
            windowObject.localStorage.clear();
            this.loadStorageData();
        },

        saveStorageData: function (dataObject) {
            frnConstrDataObject = dataObject;
            windowObject.localStorage.setItem(this.Const.LocalStorage.FRN_CONSTR_DATA_OBJECT, JSON.stringify(dataObject));
        },

        loadStorageData: function () {
            var storageFirstVisit = null,
                storageFrnConstrDataObject = null;

            storageFirstVisit = windowObject.localStorage.getItem(this.Const.LocalStorage.FIRST_VISIT);
            if (storageFirstVisit === null) {
                windowObject.localStorage.setItem(this.Const.LocalStorage.FIRST_VISIT, firstVisit);
            } else {
                firstVisit = false;
                windowObject.localStorage.setItem(this.Const.LocalStorage.FIRST_VISIT, firstVisit);
            }

            storageFrnConstrDataObject = JSON.parse(windowObject.localStorage.getItem(this.Const.LocalStorage.FRN_CONSTR_DATA_OBJECT));
            console.log(storageFrnConstrDataObject);
            if (!this.Utility.isTruthy(storageFrnConstrDataObject) || jq.isEmptyObject(storageFrnConstrDataObject)) {

                thisObject.setDataObject(thisObject.getFormDataArray());
                windowObject.localStorage.setItem(this.Const.LocalStorage.FRN_CONSTR_DATA_OBJECT, JSON.stringify(frnConstrDataObject));

            } else {

                frnConstrDataObject = storageFrnConstrDataObject;

                jq("#floorChkBox").prop("checked", frnConstrDataObject.floorChkBox);
                jq("#ceilingChkBox").prop("checked", frnConstrDataObject.ceilingChkBox);
                jq("#leftShelveChkBox").prop("checked", frnConstrDataObject.leftShelveChkBox);
                jq("#rightShelveChkBox").prop("checked", frnConstrDataObject.rightShelveChkBox);
                jq("#rearChkBox").prop("checked", frnConstrDataObject.rearChkBox);
                jq("#standLeftChkBox").prop("checked", frnConstrDataObject.standLeftChkBox);
                jq("#standRightChkBox").prop("checked", frnConstrDataObject.standRightChkBox);
                jq("#standChkBox").prop("checked", frnConstrDataObject.standChkBox);

                jq("#millsPerPixel").val(frnConstrDataObject.millsPerPixel);
                jq("#millsPerPixelForDepth").val(frnConstrDataObject.millsPerPixelForDepth);
                jq("#cupboardWidth").val(frnConstrDataObject.fullWidth);
                jq("#cupboardHeight").val(frnConstrDataObject.cupboardHeight);
                jq("#cupboardDepth").val(frnConstrDataObject.cupboardDepth);
                jq("#leftShelveWidth").val(frnConstrDataObject.leftShelveWidth);
                jq("#rightShelveWidth").val(frnConstrDataObject.rightShelveWidth);
                jq("#thickness").val(frnConstrDataObject.thickness);

            }
            console.log(frnConstrDataObject);

            return frnConstrDataObject;
        },

        addNewGameState: function (stateObject, stateKeyName) {
            thisObject.addConstant(stateObject, 'KEY', stateKeyName);
        },

        init: function (configObject) {
            var frnConst = this.Const,
                frnConstAppFrnData = frnConst.Application.FrnData;

            config = configObject;
            thisObject = this;

            thisObject.addConstant(thisObject.Const, 'STAGE_WIDTH', STAGE_WIDTH);
            thisObject.addConstant(thisObject.Const, 'STAGE_HEIGHT', STAGE_HEIGHT);
            thisObject.addConstant(thisObject.Const, 'LOWER_WIDTH', LOWER_WIDTH);
            thisObject.addConstant(thisObject.Const, 'LOWER_HEIGHT', LOWER_HEIGHT);
            thisObject.addConstant(thisObject.Const, 'HTML_CONTAINER', HTML_CONTAINER);
            thisObject.addConstant(thisObject.Const, 'LOADING_LABEL_IMG_KEY', LOADING_LABEL_IMG_KEY);

            thisObject.addNewGameState(thisObject.Boot, 'BOOT');
            thisObject.addNewGameState(thisObject.Preloader, 'PRELOADER');
            thisObject.addNewGameState(thisObject.EnteriorScreen, 'ENTERIOR_SCREEN');
            thisObject.addNewGameState(thisObject.ExteriorScreen, 'EXTERIOR_SCREEN');
            thisObject.addNewGameState(thisObject.SendApplicationScreen, 'SEND_APPLICATION_SCREEN');

            if (debugMode) {
                thisObject.addNewGameState(thisObject.TestScreen, 'TEST_SCREEN');
            }

            thisObject.loadStorageData();

            thisObject.InitFrnConstrForm.initForm();
            thisObject.FrnConstrMessages.init(thisObject.getFrnConstrDataObject());

        }
    };
    }(window, Phaser, Phaser.CANVAS, window.FrnConstr, $));

window.document.addEventListener("DOMContentLoaded", function (event) {'use strict';
    var FrnConstr = window.FrnConstr,
        config = {"event": event};

    FrnConstr.init(config);

    });
