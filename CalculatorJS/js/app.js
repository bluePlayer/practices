/**
 * Main application module that contains all necessary classes/objects,
 * methods and properties for the Calculator application.
 * @module APP
 */
window.APP = window.APP || (function (global) {'use strict';

    var name = "Calculator",
        version = "1.0.0";

    return {

        operation: '',
        operand: 0,
        operandStr: '',
        memory: '',
        result: '',
        memoryLabelField: {},
        digitsField: {},
        dgField: '',
        operationField: {},
        opField: '',
        eraseDigits: true,

        /**
         * Returns application's name as a string value.
         * @class APP
         * @method getName
         * @return {String} Returs the application's name in string format. 
         */
        getName: function () {
            return name;
        },

        /**
         * Returns application's version as a string value.
         * @class APP
         * @method getVersion
         * @return {String} Returs the application's version in string format. 
         */
        getVersion: function () {
            return version;
        },

        /**
         * Prints the application's internal state in console.
         * @class APP
         * @method printData
         * @return {Object} Returs the main APP object. 
         */
        printData: function () {
            var props = {
                operation: this.operation,
                operand: this.operand,
                operandStr: this.operandStr,
                memory: this.memory,
                result: this.result,
                digitsField: this.digitsField,
                dgField: this.dgField,
                operationField: this.operationField,
                opField: this.opField
            };
            console.dir(props);
            return this;
        },

        /**
         * Constants is a contructor so it should be called with new keyword. Each object should have its own Constants object.
         * Creates object of four functions, set(), isDefined(), list() and get() which enable creation of new immutable constant
         * that cannot be changed with Firebug or other debugging tool. 
         * @class APP
         * @method Constants
         * @return {Object} Returs object with functions necessary to define new constant and prevent its change. 
         */
        Constants: function (constMapObject) {
            var constants = {},
                ownProp = Object.prototype.hasOwnProperty,
                allowed = {
                    string: 1,
                    number: 1,
                    boolean: 1
                },
                prefix = (Math.random() + "_").slice(2);

            return {

                /**
                 * Creates new immuatble constant. 
                 * @class Constants
                 * @method set
                 * @return {Boolean} Returs true if new constant is created or false otherwise.
                 */
                set: function (name, value) {
                    if (this.isDefined(name)) {
                        return false;
                    }
                    if (!ownProp.call(allowed, typeof value)) {
                        return false;
                    }

                    constants[prefix + name] = value;
                    /**
                     * @todo use constMapObject to create new constant key in the given constants map object. 
                     */
                    return true;
                },

                /**
                 * Creates new immuatble constant. 
                 * @class Constants
                 * @method isDefined
                 * @return {Boolean} Returs true if new constant is created or false otherwise.
                 */
                isDefined: function (name) {
                    return ownProp.call(constants, prefix + name);
                },

                /**
                 * Returns the value of the required constant. 
                 * @class Constants
                 * @method get
                 * @return {Object} Returns the value of the required constant. 
                 */
                get: function (name) {
                    if (this.isDefined(name)) {
                        return constants[prefix + name];
                    }
                    return null;
                },

                /**
                 * Lists all constants with their values in array like format. Useful in JavaScript console. 
                 * @class Constants
                 * @method list
                 */
                list: function () {
                    var index = 0,
                        newStr = "",
                        constant = '';

                    for (constant in constants) {
                        if (constants.hasOwnProperty(constant)) {
                            index = constant.indexOf('_');
                            newStr = constant.substr(index + 1);
                            console.log(newStr + ": " + constants[constant]);
                        }
                    }
                }
            };
        },

        /**
         * Creates objects and subobjects by using just a string in dotted notation. 
         * Example namespace('my.new.namespace'); will create object 'my' that contains subobject 'new', which contains 
         * subobject 'namespace'. 
         * @class APP
         * @method namespace
         * @param {String} String describing the namespace of objects separated by a dots. 
         * @param {Object} And object to initialize each of the newly created subobject. If you add a property with all caps it will consider it as a
         * constant and therefore use Constants object to create new constant that cannot be changed using Firebug and console. 
         * @return {Object} Returns the new object that represents the new namespace of objects and subobjects, defined by the dots in the string
         * argument.
         */
        namespace: function (nsString, newObjectDefinition) {
            var parts = nsString.split('.'),
                parent = this,
                newObject = {},
                i = 0,
                property = {};

            newObject.Constants = new this.Constants();
            newObject.constMap = {};

            if (parts[0] === this.getName()) {
                parts = parts.slice(1);
            }

            for (i = 0; i < parts.length; i += 1) {
                if (parent[parts[i]] === undefined) {
                    for (property in newObjectDefinition) {
                        if (newObjectDefinition.hasOwnProperty(property)) {
                            if (property === property.toUpperCase()) {
                                newObject.Constants.set(property, newObjectDefinition[property]);
                                newObject.constMap[property] = property;
                            } else {
                                newObject[property] = newObjectDefinition[property];
                            }
                        }
                    }
                    parent[parts[i]] = newObject;
                }
                parent = parent[parts[i]];
            }

            return parent;
        },

        /**
         * Creates new immutable constant of the main application object.
         * @class APP
         * @method init
         * @return {Object} Returs the main APP object. false if the creation failed somehow. It is called upon page load, so
         * all necessary initializations which cannot be called befor page load should be called in this function. 
         */
        init: function (config) {
            try {
                this.memoryLabelField = global.getElementById('memoryLabel');
                this.digitsField = global.getElementById('digitsField');
                this.digitsField.value = '0';
                this.operationField = global.getElementById('operationField');
                this.operationField.value = '';
                return this;
            } catch (error) {
                console.log(error.message);
                return error.message;
            }
        },

        /**
         * Parses string value into decimal integer number if possible, and then returns the result.
         * @class APP
         * @method myParseInt
         * @param param param string value that should be a number.
         * @return {Number} Returns decimal integer representation of given string value.
         */
        myParseInt: function (param) {
            return parseInt(param, 10);
        },

        /**
         * Parses string value into decimal floating point number if possible, and then returns the result.
         * @class APP
         * @method myParseFloat
         * @param param string value that should be a number.
         * @return {Number} Returns decimal floating point representation of given string value.
         */
        myParseFloat: function (param) {
            return parseFloat(param, 10);
        }
    };
    }(window.document));

window.document.addEventListener("DOMContentLoaded", function (event) {'use strict';
    window.APP.init({"event": event});
    });