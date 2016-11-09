window.FrnConstr = window.FrnConstr || ( function(frnConstrWindowObject, phaser, renderingMode, frnConstr, jq) {
        'use strict';
        var

        /**
         * Object that contains application configuration.
         * @property config
         * @private
         * @type Object
         * @default null
         */ config = null,

         /**
         * frnConstrDataObject is private variable holding data in JSON object format. This data is generated from data array comming from the html form.
         * @property frnConstrDataObject
         * @private
         * @type Object
         * @default {}
         */
        frnConstrDataObject = {},

        /**
         * thisObject is a reference name for the FrnConstr object, so that you don't have to write all the time 'this'.
         * @property thisObject
         * @private
         * @type Object
         * @default null
         */
            thisObject = null,

            validationMessages = "",

            HTML_CONTAINER = 'qunit-fixture',

            dataObject = {};

        return {

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

            getValidationMsg: function () {
                return validationMessages;
            },

            addValidationMsg: function (msg) {
                validationMessages += msg;
            },

            clearValidationMsgs: function () {
                validationMessages = "";
            },

            getHtmlContainer: function () {
                return HTML_CONTAINER;
            },

            getFrnConstrDataObject: function () {
                return frnConstrDataObject;
            },

            setDataObject: function (data) {
                var appConst = this.Const.Application,
                    appConstKeys = appConst.Keys;

                frnConstrDataObject = {};
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
            },

            /**
             * addConstant(MyObject, constantName, constantValue) creates new constant in MyObject with constantName as name and
             * constantValue as value. If constantValue is null that the value of the new constant will equal to its name.
             * @method addConstant
             * @param {Object} MyObject object where this constant should be created
             * @param {String} constantName name of the new constant, usually with upper case letters and underscores.
             * @param {Object} constantValue value of the new constant. If set to null the new constant will have the name as the value.
             */
            addConstant : function(MyObject, constantName, constantValue) {
                if (constantValue === undefined || constantValue === null) {
                    constantValue = constantName;
                }
                if (MyObject === null || MyObject === undefined) {
                    MyObject = {};
                }
                Object.defineProperty(MyObject, constantName, {
                    configurable : false,
                    enumerable : true,
                    value : constantValue,
                    writable : false
                });
            },

            namespace : function(namespaceStr, inheritObject, newObject) {
                var parts = namespaceStr.split('.'),
                    helpObject = Object.create((inheritObject === null || inheritObject === undefined) ? {} : inheritObject),
                    frnConstrObject = this,
                    i = 0,
                    prop = {};

                if (parts[0] === 'Furniture Contructor') {
                    parts = parts.slice(1);
                }

                for ( i = 0; i < parts.length; i += 1) {
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

            init : function(configObject) {

                config = configObject;
                thisObject = this;
            }
        };
    }(window, Phaser, Phaser.CANVAS, window.FrnConstr, $));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var FrnConstr = window.FrnConstr,
        config = {
        "event" : event
    };

    FrnConstr.init(config);
});
