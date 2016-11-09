window.FrnConstr = window.FrnConstr || ( function(frnConstrWindowObject) {
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
                        thickness: {}
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

            setDataObject: function (data) {
                dataObject = {};
                data.forEach(function (crv, index, arr) {
                    switch (crv.name) {
                        case 'cupboardWidth':
                            dataObject[crv.name] = this.Utility.parseToDecimal(crv.value);
                            break;
                        case 'cupboardHeight':
                            dataObject[crv.name] = this.Utility.parseToDecimal(crv.value);
                            break;
                        case 'cupboardDepth':
                            dataObject[crv.name] = this.Utility.parseToDecimal(crv.value);
                            break;
                        case 'leftShelveWidth':
                            dataObject[crv.name] = this.Utility.parseToDecimal(crv.value);
                            break;
                        case 'rightShelveWidth':
                            dataObject[crv.name] = this.Utility.parseToDecimal(crv.value);
                            break;
                        default:
                            dataObject[crv.name] = crv.value;
                            break;
                    }

                }, this);

                dataObject.floorChkBox = (dataObject.floorChkBox === undefined || dataObject.floorChkBox === null) ? false : true;
                dataObject.ceilingChkBox = (dataObject.ceilingChkBox === undefined || dataObject.ceilingChkBox === null) ? false : true;
                dataObject.rearChkBox = (dataObject.rearChkBox === undefined || dataObject.rearChkBox === null) ? false : true;
                dataObject.leftShelveChkBox = (dataObject.leftShelveChkBox === undefined || dataObject.leftShelveChkBox === null) ? false : true;
                dataObject.rightShelveChkBox = (dataObject.rightShelveChkBox === undefined || dataObject.rightShelveChkBox === null) ? false : true;
                dataObject.standChkBox = (dataObject.standChkBox === undefined || dataObject.standChkBox === null) ? false : true;
                dataObject.standLeftChkBox = (dataObject.standLeftChkBox === undefined || dataObject.standLeftChkBox === null) ? false : true;
                dataObject.standRightChkBox = (dataObject.standRightChkBox === undefined || dataObject.standRightChkBox === null) ? false : true;

                if (dataObject.leftShelveChkBox) {
                    dataObject.cupboardWidth -= dataObject.leftShelveWidth;
                }

                if (dataObject.rightShelveChkBox) {
                    dataObject.cupboardWidth -= dataObject.rightShelveWidth;
                }

                dataObject.shelveHexColor = this.Utility.hashToHexColor(dataObject.shelveColor);
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
    }(window));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var FrnConstr = window.FrnConstr,
        config = {
        "event" : event
    };

    FrnConstr.init(config);
});
