/**
 * Main calculator class. Contains all necessary Calculator related properties/methods.
 * @class Main
 * @module APP
 */
window.APP.namespace('Main', (function () {
    var parent = window.APP;
    return {
        test: function () {
            console.dir(parent);
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
window.APP.namespace('Aritmetic', (function () {
    var parent = window.APP;
    return {
        /**
         * Divide method. Divides "result" operand with the value in the display field. It also checks for division by zero.
         * @class Aritmetic 
         * @method divide
         */
        divide: function () {'use strict';
            if (parent.result === '') {
                parent.result = parent.dgField;
            } else if (parent.dgField !== '0') {
                parent.result = parent.myParseFloat(parent.result) / parent.myParseFloat(parent.dgField);
            } else {
                parent.dgField == "Cannot divide by zero";
            }
            parent.opField += parent.dgField + " " + parent.operation + " ";
            parent.dgField = parent.result;
        },

        /**
         * Multiply method. Multiplies "result" operand with the value in the display field.
         * @method multiply
         * @class Aritmetic 
         */
        multiply: function () {'use strict';
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
         * @class Aritmetic 
         */
        add: function () {'use strict';
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
         * @class Aritmetic 
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
         * @class Aritmetic 
         */
        percent: function () {
            var sum = 0,
                percent = 0,
                outcome = 0;

            if (parent.result === '') {
                parent.opField = '0';
                parent.dgField = '0';
            } else {
                if (parent.dgField === '0' || parent.dgField === '0.') {
                    if (parent.opField.substr(parent.opField.length - 1) !== '0' ) {
                        parent.opField = parent.opField + '0';
                    } 
                    parent.dgField = '0';
                    parent.printData();
                } else {
                    sum = parent.myParseFloat(parent.result);
                    percent = parent.myParseFloat(parent.dgField);
                    outcome = percent * sum / 100;
                    if (parent.opField.indexOf("" + parent.operand) !== -1) {
                        parent.opField = parent.opField.substr(0, parent.opField.indexOf("" + parent.operand));
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
window.APP.namespace('Buttons', (function () {
    var parent = window.APP;
    return {
        /**
         * pressNumber method (called upon pressing one of 0, 1, 2, 3, 4, 5, 6, 7, 8 or 9 buttons) is a method that receives one parameter
         * in string format from one of these '1', '2', ..., '9'. If eraseData key is true, digits field value is cleared and number param value is 
         * concatenated to digits field, then eraseData is set to false. If eraseData is set to false then any new number button pressed concatenates
         * its value to digits display field without clearing digits field previous value. 
         * @method pressNumber
         * @param number number value in string format. It may be some of these values '1', '2', ..., '9'
         * @class Buttons 
         */
        pressNumber: function (number) {'use strict';
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
         * @param op operation value in string format. It may be some of these values 'sqrt'(square root), '1/x'(reciproc), '+/-'(negate).
         * @class Buttons 
         */
        pressUnaryOperation: function (op) {'use strict';
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
                case 'sqrt':
                    parent.operandStr = (parent.operandStr === '' ? "sqrt(" + parent.operand + ")" : "sqrt(" + parent.operandStr + ")");
                    if (parent.operand < 0) {
                        parent.dgField = "invalid input";
                    } else {
                        parent.dgField = Math.sqrt(parent.operand);
                        parent.result = parent.dgField;
                    }
                break;
                case '1/x':
                    parent.operandStr = (parent.operandStr === '' ? "reciproc(" + parent.operand + ")" : "reciproc(" + parent.operandStr + ")");
                    if (parent.operand === 0) {
                        parent.dgField = "Cannot divide by zero";
                    } else {
                        parent.dgField = 1 / parent.operand;
                        parent.result = parent.dgField;
                    }
                break;
                case '+/-':
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

            parent.printData();
        },

        /**
         * pressBinaryOperation method (called upon pressing plus('+'), minus('-'), division('/'), multiplication('*') or percent('%') buttons) 
         * recieves one parameter in string format from these values: '+', '-', '/', '*', '%'. It therefore calculates the result and 
         * displays it in the digits display field according to the given operation type.
         * @method pressBinaryOperation
         * @param op operation in string format from these values: '+', '-', '/', '*', '%'
         * @class Buttons 
         */
        pressBinaryOperation: function (op) {'use strict';
            parent.dgField = parent.digitsField.value;
            parent.opField = parent.operationField.value;
            if (op !== '%') {
                parent.operation = op;
            }
            parent.eraseDigits = true;

            switch (op) {
                case '/': 
                    parent.Aritmetic.divide();
                break;
                case '*': 
                    parent.Aritmetic.multiply();
                break;
                case '+': 
                    parent.Aritmetic.add();
                break;
                case '-': 
                    parent.Aritmetic.subtract();
                break;
                case '%': 
                    parent.Aritmetic.percent();
                break;
            }

            parent.digitsField.value = parent.dgField;
            parent.operationField.value = parent.opField;
            parent.printData();
        },

        /**
         * pressComma method (called upon pressing comma(,) button)adds dot to the digits display field. 
         * It there is already a dot it skips adding new one.
         * @method pressComma
         * @class Buttons 
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
         * @class Buttons 
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
         * @class Buttons 
         */
        pressClearEntry: function () {
            parent.operand = 0;
            parent.digitsField.value = '0';
        },

        /**
         * pressClear method (called upon pressing (C) button) clears all application state except for the memory property which is 
         * used to memorize values that last even after we do many calculations.
         * @method pressClear
         * @class Buttons 
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
         * @class Buttons 
         */
        calculate: function () {
            parent.dgField = parent.digitsField.value;

            if (parent.result !== '') {
                if (parent.operation === '+') {
                    parent.Aritmetic.add();
                } else if (parent.operation === '-') {
                    parent.Aritmetic.subtract();
                } else if (parent.operation === '*') {
                    parent.Aritmetic.multiply();
                } else if (parent.operation === '/') {
                    parent.Aritmetic.divide();
                } 
                parent.result = '';
                parent.printData();
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
         * @param memoryStr string value which can be some these MC, MR, MS, M+, M-
         * @class Buttons 
         */
        pressMemoryButton: function (memoryStr) {
            parent.dgField = parent.digitsField.value;
            switch (memoryStr) {
                case 'MC':
                    parent.memoryLabelField.value = '';
                    parent.memory = '';
                break;
                case 'MR':
                    if (parent.memory === '') {
                        parent.dgField = '0';
                    } else {
                        parent.dgField = parent.memory;
                    }
                    parent.digitsField.value = parent.dgField;
                    parent.eraseDigits = true;
                break;
                case 'MS':
                    if (parent.dgField !== '0' || parent.dgField !== '0.') {
                        parent.memory = parent.dgField;
                        parent.memoryLabelField.value = 'M = ' + parent.dgField;
                    } else {
                        parent.digitsField.value = '0';
                    }
                    parent.eraseDigits = true;
                break;
                case 'M+':
                    if (parent.memory !== '') {
                        parent.memory = parent.myParseFloat(parent.memory) + parent.myParseFloat(parent.dgField);
                        parent.memoryLabelField.value = 'M = ' + parent.memory;
                    }
                break;
                case 'M-':
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
         * @class Buttons 
         */
        pressEqual: function () {
            this.calculate();
            parent.operationField.value = '';
            parent.operand = 0;
        }
    };
}()));