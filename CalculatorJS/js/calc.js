/**
 * Main application module that contains all necessary classes/objects,
 * methods and properties for the Calculator application.
 * @module APP
 * @class APP
 */
window.APP = window.APP || (function (windowDocumentObject) {'use strict';

    var version = "1.0.0",
        config = {},
        APP_NAME = "Calculator",
        CONST_MAP_STR = "constMap",
        DOM_CONTENT_LOADED_EVENT_STR = "DOMContentLoaded",
        MEMORY_LABEL = "memoryLabel",
        DIGITS_FIELD = "digitsField",
        OPERATION_FIELD = "operationField",
        CANNOT_PARSE_PARAM_STR = "Cannot parse parameter value. It must be in a string format!",
        CLASS_DO_NOT_CONTAIN_CONST_MAP = "The given module does not contain constants map!";

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

        constMap: {

            /**
             * Constant function. Returns "constMap" string
             * @method CONST_MAP_STR
             * @return {String} 
             */
            CONST_MAP_STR: function () {
                return CONST_MAP_STR;
            },

            /**
             * Constant function. Returns "DOMContentLoaded" string
             * @method DOM_CONTENT_LOADED_EVENT_STR
             * @return {String} 
             */
            DOM_CONTENT_LOADED_EVENT_STR: function () {
                return DOM_CONTENT_LOADED_EVENT_STR;
            },

            /**
             * Constant function. Returns application's name as a string value.
             * @method APP_NAME
             * @return {String}
             */
            APP_NAME: function () {
                return APP_NAME;
            }
        },

        /**
         * Returns application's configuration in JavaScript object format.
         * @method appConfiguration
         * @return {Object} Returs the application's version in string format. 
         */
        appConfiguration: function () {
            return config;
        },

        /**
         * Returns application's version as a string value.
         * @method getVersion
         * @return {String} Returs the application's version in string format. 
         */
        getVersion: function () {
            return version;
        },

        /**
         * arrayContains() is a function that returns true if a given element is present in the given array or false otherwise.
         * @method arrayContains
         * @param {Array} array An array object in which we search for a given element.
         * @param {Object} element A given element that can be object, number or string. 
         * @return {Boolean} True if the element is present in the array or false otherwise.
         */
        arrayContains: function (array, element) {
            var i = 0,
                contains = false;

            while (!contains) {
                if (array[i] === element) {
                    contains = true;
                } else {
                    i += 1;
                }
            }

            return contains;
        },

        /**
         * getConst() is a shortcut function for accessing a constant value. Example: Let just say APP.Math class has a constant PI with value of 3.14
         * How would you access it, using getConst() shotcut function? You call APP.getConst('APP.Math.constMap.PI'); So the parameter must be in string format
         * and must contain the subkey 'constMap'. When using APP.namespace() function the newly created subclass/subobject always contains constMap
         * subobject with keys for each constant. So if you call APP.namespace('Math', {PI: 3.14}); if you search the DOM tree, Math will already contain
         * constMap = {PI: "PI"}; 
         * @method getConst
         * @param {String} constName path of the contants in a given class or subclass.
         * @return {Object} Returns the value of the required contant or string error if something went wrong.
         */
        getConst: function (constName) {
            var keysArray = [],
                module = this,
                i = 1,
                result = {};
            if (typeof constName === 'string') {
                keysArray = constName.split('.');
                if (this.arrayContains(keysArray, CONST_MAP_STR) !== false) {
                    while (keysArray[i] !== CONST_MAP_STR) {
                        module = module[keysArray[i]];
                        i += 1;
                    }
                    result = module.Constants.get(keysArray[keysArray.length - 1]);
                } else {
                    result = CLASS_DO_NOT_CONTAIN_CONST_MAP;
                }
            } else {
                result = CANNOT_PARSE_PARAM_STR;
            }
            return result;
        },

        /**
         * listContants() prints all the contants in a given class. Example: APP.list('APP.Math'); will list all constants like PI: 3.14, E: 2.17 etc...
         * @method listContants
         * @param {String} className Must be a string of keys separated by dot, like so: 'APP.Math.Trigonometry'
         * @return {Object} Returns true if the list of constants was generated or sends error message if the parameter was not in a string format.
         */
        listContants: function (className) {
            var keysArray = [],
                module = this,
                i = 1,
                result = '';
            if (typeof className === 'string') {
                keysArray = className.split('.');
                for (i = 1; i < keysArray.length; i += 1) {
                    module = module[keysArray[i]];
                }
                module.Constants.list();
                result = true;
            } else {
                result = CANNOT_PARSE_PARAM_STR;
            }
            return result;
        },

        /**
         * Prints the application's internal state.
         * @method printData
         * @return {Object} Returs object of all necessary variables for printing in console.
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
            return props;
        },

        /**
         * Constants is a contructor so it should be called with new keyword. Each object should have its own Constants object.
         * Creates object of four functions, set(), isDefined(), list() and get() which enable creation of new immutable constant
         * that cannot be changed with Firebug or other debugging tool. 
         * @class Constants
         * @contructor Constants
         * @param {Object} constMap
         * @return {Object} Returns object with functions necessary to define new constant and prevent its change. 
         */
        Constants: function (constMap) {
            var constants = {},
                ownProp = Object.prototype.hasOwnProperty,
                allowed = {
                    string: 1,
                    number: 1,
                    boolean: 1
                },
                prefix = (Math.random() + "_").slice(2);

            return {

                constMap: constMap,

                /**
                 * Creates new immutable constant. 
                 * @method set
                 * @param {String} name
                 * @param {Object} value
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
                    this.constMap[name] = name;

                    return true;
                },

                /**
                 * Creates new immuatble constant. 
                 * @method isDefined
                 * @param {String} name
                 * @return {Boolean} Returs true if new constant is created or false otherwise.
                 */
                isDefined: function (name) {
                    return ownProp.call(constants, prefix + name);
                },

                /**
                 * Returns the value of the required constant. 
                 * @method get
                 * @param {String} name
                 * @return {Object} Returns the value of the required constant. 
                 */
                get: function (name) {
                    if (this.isDefined(name)) {
                        return constants[prefix + name];
                    }
                    return null;
                },

                /**
                 * Lists all constants with their values in array like format. Print the returned object in console. 
                 * @method list
                 * @return {Object} list of constants with their names in JavaScript object format.
                 */
                list: function () {
                    var index = 0,
                        newStr = "",
                        constant = '',
                        resultObject = {};

                    for (constant in constants) {
                        if (constants.hasOwnProperty(constant)) {
                            index = constant.indexOf('_');
                            newStr = constant.substr(index + 1);
                            resultObject[newStr] = constants[constant];
                        }
                    }
                    return resultObject;
                }
            };
        },

        /**
         * Creates objects and subobjects by using just a string in dotted notation. 
         * Example namespace('my.new.namespace'); will create object 'my' that contains subobject 'new', which contains 
         * subobject 'namespace'. 
         * @class APP
         * @method namespace
         * @param {String} nsString String describing the namespace of objects separated by a dots. 
         * @param {Object} newObjectDefinition And object to initialize each of the newly created subobject. If you add a property with all caps 
         * it will consider it as a constant and therefore use Constants object to create new constant that cannot be changed using Firebug 
         * or other browser debugging interface. 
         * @return {Object} Returns the new object that represents the new namespace of objects and subobjects, defined by the dots in the string
         * argument.
         */
        namespace: function (nsString, newObjectDefinition) {
            var parts = nsString.split('.'),
                parent = this,
                newObject = {},
                i = 0,
                property = {};

            newObject.constMap = {};
            newObject.Constants = new this.Constants(newObject.constMap);

            if (parts[0] === this.constMap.APP_NAME()) {
                parts = parts.slice(1);
            }

            for (i = 0; i < parts.length; i += 1) {
                if (parent[parts[i]] === undefined) {
                    for (property in newObjectDefinition) {
                        if (newObjectDefinition.hasOwnProperty(property)) {
                            if (property === property.toUpperCase()) {
                                if (typeof newObjectDefinition[property] !== 'function') {
                                    newObject.Constants.set(property, newObjectDefinition[property]);
                                } else {
                                    newObject.constMap[property] = newObjectDefinition[property];
                                }
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
         * Creates new immutable constant of the main application object. It is called upon page load, so
         * all necessary initializations which cannot be called before page load should be called in this function. 
         * @method init
         * @param {Object} configObject
         * @return {Object} Returs the main APP object. Returns Error object if the creation failed somehow. 
         */
        init: function (configObject) {
            try {
                config = configObject;
                this.memoryLabelField = windowDocumentObject.getElementById(MEMORY_LABEL);
                this.digitsField = windowDocumentObject.getElementById(DIGITS_FIELD);
                this.digitsField.value = '0';
                this.operationField = windowDocumentObject.getElementById(OPERATION_FIELD);
                this.operationField.value = '';
                return this;
            } catch (error) {
                return error;
            }
        },

        /**
         * Parses string value into decimal integer number if possible, and then returns the result.
         * @method myParseInt
         * @param {String} param string value that should be a number.
         * @return {Number} Returns decimal integer representation of given string value.
         */
        myParseInt: function (param) {
            return parseInt(param, 10);
        },

        /**
         * Parses string value into decimal floating point number if possible, and then returns the result.
         * @method myParseFloat
         * @param {String} param string value that should be a number.
         * @return {Number} Returns decimal floating point representation of given string value.
         */
        myParseFloat: function (param) {
            return parseFloat(param, 10);
        }
    };
    }(window.document));

window.document.addEventListener(window.APP.constMap.DOM_CONTENT_LOADED_EVENT_STR(), function (event) {'use strict';
    window.APP.init({"event": event});
    });

/**
 * Main calculator class. Contains all necessary Calculator related properties/methods.
 * @class Main
 * @module APP
 */
window.APP.namespace('Main', (function () {'use strict';

    var INVALID_INPUT_STR = "Invalid input!",
        CANNOT_DIVIDE_BY_ZERO_STR = "Cannot divide by zero!";

    return {

        /**
         * Constant function. Returns "Invalid input!" string.
         * @method INVALID_INPUT_MESSAGE
         * @return {String}
         */
        INVALID_INPUT_MESSAGE: function () {
            return INVALID_INPUT_STR;
        },

        /**
         * Constant function. Returns "Cannot divide by zero!" string.
         * @method CANNOT_DIVIDE_BY_ZERO_MESSAGE
         * @return {String}
         */
        CANNOT_DIVIDE_BY_ZERO_MESSAGE: function () {
            return CANNOT_DIVIDE_BY_ZERO_STR;
        }
    };
    }()));

/**
 * Arithmetic module. Contains all necessary properties/methods related to aritmetic operations. 
 * Like, addition, multiplication, division, etc... All aritmetic operations are binary operations, i.e need two
 * operands to work.
 * @module APP
 * @class Aritmetic
 */
window.APP.namespace('Aritmetic', (function () {'use strict';
    var parent = window.APP;
    return {

        /**
         * Divide method. Divides "result" operand with the value in the display field. It also checks for division by zero.
         * @method divide
         */
        divide: function () {
            if (parent.result === '') {
                parent.result = parent.dgField;
            } else if (parent.dgField !== '0') {
                parent.result = parent.myParseFloat(parent.result) / parent.myParseFloat(parent.dgField);
            } else {
                parent.dgField = parent.Main.constMap.CANNOT_DIVIDE_BY_ZERO_MESSAGE();
            }
            parent.opField += parent.dgField + " " + parent.operation + " ";
            parent.dgField = parent.result;
        },

        /**
         * Multiply method. Multiplies "result" operand with the value in the display field.
         * @method multiply
         */
        multiply: function () {
            if (parent.result === '') {
                parent.result = parent.dgField;
            } else {
                parent.result = parent.myParseFloat(parent.result) * parent.myParseFloat(parent.dgField);
            }
            parent.opField += parent.dgField + " " + parent.operation + " ";
            parent.dgField = parent.result;
        },

        /**
         * Add method. Adds "result" operand to the value in the display field.
         * @method add
         */
        add: function () {
            if (parent.result === '') {
                parent.result = parent.dgField;
            } else {
                parent.result = parent.myParseFloat(parent.result) + parent.myParseFloat(parent.dgField);
            }
            parent.opField += parent.dgField + " " + parent.operation + " ";
            parent.dgField = parent.result;
        },

        /**
         * Subtract method. Subtracts the value in the display field from "result" operand.
         * @method subtract
         */
        subtract: function () {
            if (parent.result === '') {
                parent.result = parent.dgField;
            } else {
                parent.result = parent.myParseFloat(parent.result) - parent.myParseFloat(parent.dgField);
            }
            parent.opField += parent.dgField + " " + parent.operation + " ";
            parent.dgField = parent.result;
        },

        /**
         * Percent method. It needs both "result" and display field values to be different than 0 to work. 
         * Therefore an aritmetic operation must be used before you can calculate percents of a given value. 
         * Example: Press number 555 and then press the plus(+) sign button. "result" operand now has the value of 555
         * and the application waits for input for the second operand. Insert value of 33 and then press the percent(%) 
         * button. The application finds there are two available operands so it calculates 33% of 555 which is 183.15 and
         * sets the display field to this new percent value. If you press the equal(=) sign button, it will sum up 555 + 183.15 
         * which is 738.15. This same set of tasks applies to all other binary operations so if we used division(/) instead of 
         * adtion(+) the final result would be 3.030303 or (555 / (33% of 555)) = (555 / 183.15)
         * @method percent
         */
        percent: function () {
            var sum = 0,
                percent = 0,
                outcome = 0,
                operandString = '';

            if (parent.result === '') {
                parent.opField = '0';
                parent.dgField = '0';
            } else {
                if (parent.dgField === '0' || parent.dgField === '0.') {
                    if (parent.opField.substr(parent.opField.length - 1) !== '0') {
                        parent.opField = parent.opField + '0';
                    }
                    parent.dgField = '0';
                } else {
                    sum = parent.myParseFloat(parent.result);
                    percent = parent.myParseFloat(parent.dgField);
                    outcome = percent * sum / 100;
                    operandString = parent.operand.toString();
                    if (parent.opField.indexOf(operandString) !== -1) {
                        parent.opField = parent.opField.substr(0, parent.opField.indexOf(operandString));
                    }
                    parent.opField += outcome;
                    parent.operand = outcome;
                    parent.dgField = outcome;
                }
            }
        }
    };
    }()));

/**
 * Buttons class. Contains all necessary properties/methods related to the visible buttons.
 * @class Buttons
 * @module APP
 */
window.APP.namespace('Buttons', (function () {'use strict';
    var parent = window.APP,
        MC = 'MC',
        MR = 'MR',
        MS = 'MS',
        M_PLUS = 'M+',
        M_MINUS = 'M-',
        SQRT = 'sqrt',
        RECIPROC = '1/x',
        NEGATE = '+/-',
        PLUS = '+',
        MINUS = '-',
        MULTIPLY = '*',
        DIVIDE = '/',
        PERCENT = '%';

    return {

        /**
         * pressNumber method (called upon pressing one of 0, 1, 2, 3, 4, 5, 6, 7, 8 or 9 buttons) is a method that receives one parameter
         * in string format from one of these '1', '2', ..., '9'. If eraseData key is true, digits field value is cleared and number param value is 
         * concatenated to digits field, then eraseData is set to false. If eraseData is set to false then any new number button pressed concatenates
         * its value to digits display field without clearing digits field previous value. 
         * @method pressNumber
         * @param {Number} number value in string format. It may be some of these values '1', '2', ..., '9'
         */
        pressNumber: function (number) {
            parent.dgField = parent.digitsField.value;
            if (number === '0') {
                if (parent.dgField === '0' || parent.eraseDigits) {
                    parent.dgField = '';
                }
                parent.dgField += '0';
            } else {
                if (parent.dgField === '0' || parent.eraseDigits) {
                    parent.dgField = '';
                }
                parent.dgField += number;
            }
            parent.eraseDigits = false;
            parent.digitsField.value = parent.dgField;
        },

        /**
         * pressUnaryOperation method (called upon pressing one of square root('sqrt'), reciproc('1/x') or negate('+/-') buttons)
         * recieves some of these values: 'sqrt', '1/x', '+/-'. It needs only one operand to work
         * since the operations are unary. It also takes cleares the operations text field from uncessary rubbish text.
         * @method pressUnaryOperation
         * @param {String} op operation value in string format. It may be some of these values 'sqrt'(square root), '1/x'(reciproc), '+/-'(negate).
         */
        pressUnaryOperation: function (op) {
            var index = 0;
            parent.opField = parent.operationField.value;
            parent.dgField = parent.digitsField.value;
            parent.operand = parent.myParseFloat(parent.dgField);

            if (parent.operandStr !== '') {
                index = parent.opField.indexOf(parent.operandStr);
                if (index !== -1) {
                    parent.opField = parent.opField.slice(0, index);
                }
            }

            switch (op) {
            case SQRT:
                parent.operandStr = (parent.operandStr === '' ? "sqrt(" + parent.operand + ")" : "sqrt(" + parent.operandStr + ")");
                if (parent.operand < 0) {
                    parent.dgField = parent.constMap.INVALID_INPUT_MESSAGE();
                } else {
                    parent.dgField = Math.sqrt(parent.operand);
                    parent.result = parent.dgField;
                }
                break;
            case RECIPROC:
                parent.operandStr = (parent.operandStr === '' ? "reciproc(" + parent.operand + ")" : "reciproc(" + parent.operandStr + ")");
                if (parent.operand === 0) {
                    parent.dgField = parent.constMap.CANNOT_DIVIDE_BY_ZERO_MESSAGE();
                } else {
                    parent.dgField = 1 / parent.operand;
                    parent.result = parent.dgField;
                }
                break;
            case NEGATE:
                if (parent.result === '') {
                    if (parent.dgField !== '0') {
                        if (parent.dgField.indexOf('-') === -1) {
                            parent.dgField = '-' + parent.dgField;
                        } else {
                            parent.dgField = parent.dgField.substr(1);
                        }
                    }
                } else {
                    if (parent.dgField !== '0') {
                        if (parent.dgField.indexOf('-') === -1) {
                            parent.dgField = '-' + parent.dgField;
                        } else {
                            parent.dgField = parent.dgField.substr(1);
                        }
                        parent.operandStr = (parent.operandStr === '' ? "negate(" + parent.operand + ")" : "negate(" + parent.operandStr + ")");
                    }
                }
                break;
            }

            parent.opField += parent.operandStr;
            parent.operationField.value = parent.opField;
            parent.digitsField.value = parent.dgField;
        },

        /**
         * pressBinaryOperation method (called upon pressing plus('+'), minus('-'), division('/'), multiplication('*') or percent('%') buttons) 
         * recieves one parameter in string format from these values: '+', '-', '/', '*', '%'. It therefore calculates the result and 
         * displays it in the digits display field according to the given operation type.
         * @method pressBinaryOperation
         * @param {String} op operation in string format from these values: '+', '-', '/', '*', '%'
         */
        pressBinaryOperation: function (op) {
            parent.dgField = parent.digitsField.value;
            parent.opField = parent.operationField.value;
            if (op !== PERCENT) {
                parent.operation = op;
            }
            parent.eraseDigits = true;

            switch (op) {
            case DIVIDE:
                parent.Aritmetic.divide();
                break;
            case MULTIPLY:
                parent.Aritmetic.multiply();
                break;
            case PLUS:
                parent.Aritmetic.add();
                break;
            case MINUS:
                parent.Aritmetic.subtract();
                break;
            case PERCENT:
                parent.Aritmetic.percent();
                break;
            }

            parent.digitsField.value = parent.dgField;
            parent.operationField.value = parent.opField;
        },

        /**
         * pressComma method (called upon pressing comma(,) button)adds dot to the digits display field. 
         * It there is already a dot it skips adding new one.
         * @method pressComma
         */
        pressComma: function () {
            parent.dgField = parent.digitsField.value;
            if (parent.dgField.indexOf('.') === -1) {
                if (parent.dgField === '') {
                    parent.dgField = '0.';
                } else {
                    parent.dgField += '.';
                }
                parent.digitsField.value = parent.dgField;
            }
        },

        /**
         * pressUndo method (called upon pressing undo(<-) button) removes one digit from the digits siplay field. 
         * If the digits display field has only one digit, it is set to zero.
         * @method pressUndo
         */
        pressUndo: function () {
            parent.dgField = parent.digitsField.value;
            if (parent.dgField.length === 1) {
                parent.dgField = '0';
            } else {
                parent.dgField = parent.dgField.substring(0, parent.dgField.length - 1);
            }
            parent.digitsField.value = parent.dgField;
        },

        /**
         * pressClearEntry method (called upon pressing clear entry(CE) button) clears the digits display field and sets it to zero. 
         * It doesn't however clear result, operation, memory, operand or operandStr.
         * @method pressClearEntry
         */
        pressClearEntry: function () {
            parent.operand = 0;
            parent.digitsField.value = '0';
        },

        /**
         * pressClear method (called upon pressing (C) button) clears all application state except for the memory property which is 
         * used to memorize values that last even after we do many calculations.
         * @method pressClear
         */
        pressClear: function () {
            parent.operation = '';
            parent.operand = 0;
            parent.operandStr = '';
            parent.result = '';
            parent.digitsField.value = '0';
            parent.operationField.value = '';
        },

        /**
         * calculate method takes the value from digits field and sets result to it if result is empty. If result is not empty it takes
         * the operation value and applies apropriate binary operation on "result" operand and digits display field value. It then empties result
         * and operation properties.
         * @method calculate
         */
        calculate: function () {
            parent.dgField = parent.digitsField.value;

            if (parent.result !== '') {
                if (parent.operation === PLUS) {
                    parent.Aritmetic.add();
                } else if (parent.operation === MINUS) {
                    parent.Aritmetic.subtract();
                } else if (parent.operation === MULTIPLY) {
                    parent.Aritmetic.multiply();
                } else if (parent.operation === DIVIDE) {
                    parent.Aritmetic.divide();
                }
                parent.result = '';
                parent.operation = '';
            } else {
                parent.result = parent.dgField;
            }

            parent.digitsField.value = parent.dgField;
        },

        /**
         * pressMemoryButton method (called upon pressing one of MC (Memory Clear), MR (Memory Recall), MS (Memory Save), M+ (Memory Add) or M- (Memory Subtract) * memory buttons) saves current digits field value into parent.memory property and shows M label in view, when MS button is pressed. 
         * When MR button is pressed, digits field is filled with value from parent.memory property if available. When M+ or M- buttons are pressed, 
         * digits field value is added or subtract from the current memory value (if set) and saved to parent.memory property. 
         * MR button sets digits field value to zero if parent.memory is empty or to parent.memory value if not empty. 
         * MC sets parent.memory property to empty string and hides M label from view.
         * @method pressMemoryButton
         * @param {String} memoryStr string value which can be some these MC, MR, MS, M+, M-
         */
        pressMemoryButton: function (memoryStr) {
            parent.dgField = parent.digitsField.value;
            switch (memoryStr) {
            case MC:
                parent.memoryLabelField.value = '';
                parent.memory = '';
                break;
            case MR:
                if (parent.memory === '') {
                    parent.dgField = '0';
                } else {
                    parent.dgField = parent.memory;
                }
                parent.digitsField.value = parent.dgField;
                parent.eraseDigits = true;
                break;
            case MS:
                if (parent.dgField !== '0' || parent.dgField !== '0.') {
                    parent.memory = parent.dgField;
                    parent.memoryLabelField.value = 'M = ' + parent.dgField;
                } else {
                    parent.digitsField.value = '0';
                }
                parent.eraseDigits = true;
                break;
            case M_PLUS:
                if (parent.memory !== '') {
                    parent.memory = parent.myParseFloat(parent.memory) + parent.myParseFloat(parent.dgField);
                    parent.memoryLabelField.value = 'M = ' + parent.memory;
                }
                break;
            case M_MINUS:
                if (parent.memory !== '') {
                    parent.memory = parent.myParseFloat(parent.memory) - parent.myParseFloat(parent.dgField);
                    parent.memoryLabelField.value = 'M = ' + parent.memory;
                }
                break;
            }
        },

        /**
         * pressEqual method (called upon pressing equal(=) button)call calculate() method to do the calculation on "result" and 
         * digits display value and resets operand to 0 and operation field value to empty string ''.
         * @method pressEqual
         */
        pressEqual: function () {
            this.calculate();
            parent.operationField.value = '';
            parent.operand = 0;
        }
    };
    }()));