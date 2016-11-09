window.FrnConstr = window.FrnConstr || (function(windowObject, jq) {
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
         * thisObject is a reference name for the FrnConstr object, so that you don't have to write all the time 'this'.
         * @property thisObject
         * @private
         * @type Object
         * @default null
         */
            thisObject = null,

            frnConstrDataObject = {
                maxNumOfBeams: 6,
                maxNumOfInnerShelves: 3
            },

            firstVisit = true,

            validationMessages = "",

            HTML_CONTAINER = 'qunit-fixture',

            dataObject = {};

        return {

            Const : {

                Graphics : {
                    Colors : {
                        Material : {
                        },
                        Doors : {
                        }
                    }
                },
                LocalStorage : {
                },
                Application : {
                    Keys : {
                    },
                    FrnData : {
                        millsPerPixel : {
                        },
                        millsPerPixelForDepth : {
                        },
                        cupboardWidth : {
                        },
                        cupboardHeight : {
                        },
                        cupboardDepth : {
                        },
                        leftShelveWidth : {
                        },
                        rightShelveWidth : {
                        },
                        thickness : {
                        },
                        checkBoxes : {
                        }
                    },
                    InnerPartsMatrix: {
                        numOfPartsPerSlot: 4
                    }
                },
                Messages : {
                    millsPerPixel : {
                    },
                    millsPerPixelForDepth : {
                    },
                    cupboardWidth : {
                    },
                    cupboardHeight : {
                    },
                    cupboardDepth : {
                    },
                    leftShelveWidth : {
                    },
                    rightShelveWidth : {
                    },
                    thickness : {
                    }
                },
                Errors : {
                }
            },

            getValidationMsg : function() {
                return validationMessages;
            },

            addValidationMsg : function(msg) {
                validationMessages += msg;
            },

            clearValidationMsgs : function() {
                validationMessages = "";
            },

            getHtmlContainer : function() {
                return HTML_CONTAINER;
            },

            getFormDataArray: function () {
                return jq("#constrForm").serializeArray();
            },

            getFrnConstrDataObject: function () {
                return frnConstrDataObject;
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
    }(window, $));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var FrnConstr = window.FrnConstr,
        config = {
        "event" : event
    };

    FrnConstr.init(config);
});
