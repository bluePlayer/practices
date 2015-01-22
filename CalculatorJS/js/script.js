/**
 * Main calculator class. Contains all necessary Calculator related properties/methods.
 * @class Main
 * @module APP
 */
window.APP.namespace('Main', {

});

/**
 * Arithmetic module. Contains all necessary properties/methods related to aritmetic operations. 
 * Like, addition, multiplication, division, etc... All aritmetic operations are binary operations, i.e need two
 * operands to work.
 * @module APP
 * @class Aritmetic
 */
window.APP.namespace('Aritmetic', {

    /**
     * Divide method. Divides "result" operand with the value in the display field. It also checks for division by zero.
     * @class Aritmetic 
     * @method divide
     */
    divide: function () {'use strict';
        if (window.APP.result === '') {
            window.APP.result = window.APP.dgField;
        } else if (window.APP.dgField !== '0') {
            window.APP.result = window.APP.myParseFloat(window.APP.result) / window.APP.myParseFloat(window.APP.dgField);
        } else {
            window.APP.dgField == "Cannot divide by zero";
        }
        window.APP.opField += window.APP.dgField + " " + window.APP.operation + " ";
        window.APP.dgField = window.APP.result;
    },

    /**
     * Multiply method. Multiplies "result" operand with the value in the display field.
     * @method multiply
     * @class Aritmetic 
     */
    multiply: function () {'use strict';
        if (window.APP.result === '') {
            window.APP.result = window.APP.dgField;
        } else {
            window.APP.result = window.APP.myParseFloat(window.APP.result) * window.APP.myParseFloat(window.APP.dgField);
        }
        window.APP.opField += window.APP.dgField + " " + window.APP.operation + " ";
        window.APP.dgField = window.APP.result;
    },

    /**
     * Add method. Adds "result" operand to the value in the display field.
     * @method add
     * @class Aritmetic 
     */
    add: function () {'use strict';
        if (window.APP.result === '') {
            window.APP.result = window.APP.dgField;
        } else {
            window.APP.result = window.APP.myParseFloat(window.APP.result) + window.APP.myParseFloat(window.APP.dgField);
        } 
        window.APP.opField += window.APP.dgField + " " + window.APP.operation + " ";
        window.APP.dgField = window.APP.result;
    },

    /**
     * Subtract method. Subtracts the value in the display field from "result" operand.
     * @method subtract
     * @class Aritmetic 
     */
    subtract: function () {
        if (window.APP.result === '') {
            window.APP.result = window.APP.dgField;
        } else {
            window.APP.result = window.APP.myParseFloat(window.APP.result) - window.APP.myParseFloat(window.APP.dgField);
        }
        window.APP.opField += window.APP.dgField + " " + window.APP.operation + " ";
        window.APP.dgField = window.APP.result;
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

        if (window.APP.result === '') {
            window.APP.opField = '0';
            window.APP.dgField = '0';
        } else {
            if (window.APP.dgField === '0' || window.APP.dgField === '0.') {
                if (window.APP.opField.substr(window.APP.opField.length - 1) !== '0' ) {
                    window.APP.opField = window.APP.opField + '0';
                } 
                window.APP.dgField = '0';
                window.APP.printData();
            } else {
                sum = window.APP.myParseFloat(window.APP.result);
                percent = window.APP.myParseFloat(window.APP.dgField);
                outcome = percent * sum / 100;
                if (window.APP.opField.indexOf("" + window.APP.operand) !== -1) {
                    window.APP.opField = window.APP.opField.substr(0, window.APP.opField.indexOf("" + window.APP.operand));
                } 
                window.APP.opField += outcome;
                window.APP.operand = outcome;
                window.APP.dgField = outcome;
            }
        }
    }
});

/**
 * Buttons class. Contains all necessary properties/methods related to the visible buttons.
 * @class Buttons
 * @module APP
 */
window.APP.namespace('Buttons', {

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
        window.APP.dgField = window.APP.digitsField.value;
        if (number === '0') {
            if (window.APP.dgField === '0' || window.APP.eraseDigits) {
                window.APP.dgField = '';
            }
            window.APP.dgField += '0';
        } else {
            if (window.APP.dgField === '0' || window.APP.eraseDigits) {
                window.APP.dgField = '';
            }
            window.APP.dgField += number;
        }
        window.APP.eraseDigits = false;
        window.APP.digitsField.value = window.APP.dgField;
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
        window.APP.opField = window.APP.operationField.value;
        window.APP.dgField = window.APP.digitsField.value;
        window.APP.operand = window.APP.myParseFloat(window.APP.dgField);

        if (window.APP.operandStr !== '') {
            index = window.APP.opField.indexOf(window.APP.operandStr);
            if (index !== -1) {
                window.APP.opField = window.APP.opField.slice(0, index);
            }
        }

        switch (op) {
            case 'sqrt':
                window.APP.operandStr = (window.APP.operandStr === '' ? "sqrt(" + window.APP.operand + ")" : "sqrt(" + window.APP.operandStr + ")");
                if (window.APP.operand < 0) {
                    window.APP.dgField = "invalid input";
                } else {
                    window.APP.dgField = Math.sqrt(window.APP.operand);
                    window.APP.result = window.APP.dgField;
                }
            break;
            case '1/x':
                window.APP.operandStr = (window.APP.operandStr === '' ? "reciproc(" + window.APP.operand + ")" : "reciproc(" + window.APP.operandStr + ")");
                if (window.APP.operand === 0) {
                    window.APP.dgField = "Cannot divide by zero";
                } else {
                    window.APP.dgField = 1 / window.APP.operand;
                    window.APP.result = window.APP.dgField;
                }
            break;
            case '+/-':
                if (window.APP.result === '') {
                    if (window.APP.dgField !== '0') {
                        if (window.APP.dgField.indexOf('-') === -1) {
                            window.APP.dgField = '-' + window.APP.dgField;
                        } else {
                            window.APP.dgField = window.APP.dgField.substr(1);
                        }
                    }
                } else {
                    if (window.APP.dgField !== '0') {
                        if (window.APP.dgField.indexOf('-') === -1) {
                            window.APP.dgField = '-' + window.APP.dgField;
                        } else {
                            window.APP.dgField = window.APP.dgField.substr(1);
                        }
                        window.APP.operandStr = (window.APP.operandStr === '' ? "negate(" + window.APP.operand + ")" : "negate(" + window.APP.operandStr + ")");
                    }
                }
            break;
        }

        window.APP.opField += window.APP.operandStr;
        window.APP.operationField.value = window.APP.opField;
        window.APP.digitsField.value = window.APP.dgField;

        window.APP.printData();
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
        window.APP.dgField = window.APP.digitsField.value;
        window.APP.opField = window.APP.operationField.value;
        if (op !== '%') {
            window.APP.operation = op;
        }
        window.APP.eraseDigits = true;

        switch (op) {
            case '/': 
                window.APP.Aritmetic.divide();
            break;
            case '*': 
                window.APP.Aritmetic.multiply();
            break;
            case '+': 
                window.APP.Aritmetic.add();
            break;
            case '-': 
                window.APP.Aritmetic.subtract();
            break;
            case '%': 
                window.APP.Aritmetic.percent();
            break;
        }

        window.APP.digitsField.value = window.APP.dgField;
        window.APP.operationField.value = window.APP.opField;
        window.APP.printData();
    },

    /**
     * pressComma method (called upon pressing comma(,) button)adds dot to the digits display field. 
     * It there is already a dot it skips adding new one.
     * @method pressComma
     * @class Buttons 
     */
    pressComma: function () {
        window.APP.dgField = window.APP.digitsField.value;
        if (window.APP.dgField.indexOf('.') === -1) {
            if (window.APP.dgField === '') {
                window.APP.dgField = '0.';
            } else {
                window.APP.dgField += '.';
            }
            window.APP.digitsField.value = window.APP.dgField;
        } 
    },

    /**
     * pressUndo method (called upon pressing undo(<-) button) removes one digit from the digits siplay field. 
     * If the digits display field has only one digit, it is set to zero.
     * @method pressUndo
     * @class Buttons 
     */
    pressUndo: function () {
        window.APP.dgField = window.APP.digitsField.value;
        if (window.APP.dgField.length === 1) {
            window.APP.dgField = '0';
        } else {
            window.APP.dgField = window.APP.dgField.substring(0, window.APP.dgField.length - 1);
        }
        window.APP.digitsField.value = window.APP.dgField;
    },

    /**
     * pressClearEntry method (called upon pressing clear entry(CE) button) clears the digits display field and sets it to zero. 
     * It doesn't however clear result, operation, memory, operand or operandStr.
     * @method pressClearEntry
     * @class Buttons 
     */
    pressClearEntry: function () {
        window.APP.operand = 0;
        window.APP.digitsField.value = '0';
    },

    /**
     * pressClear method (called upon pressing (C) button) clears all application state except for the memory property which is 
     * used to memorize values that last even after we do many calculations.
     * @method pressClear
     * @class Buttons 
     */
    pressClear: function () {
        window.APP.operation = '';
        window.APP.operand = 0;
        window.APP.operandStr = '';
        window.APP.result = '';
        window.APP.digitsField.value = '0';
        window.APP.operationField.value = '';
    },

    /**
     * calculate method takes the value from digits field and sets result to it if result is empty. If result is not empty it takes
     * the operation value and applies apropriate binary operation on "result" operand and digits display field value. It then empties result
     * and operation properties.
     * @method calculate
     * @class Buttons 
     */
    calculate: function () {
        window.APP.dgField = window.APP.digitsField.value;

        if (window.APP.result !== '') {
            if (window.APP.operation === '+') {
                window.APP.Aritmetic.add();
            } else if (window.APP.operation === '-') {
                window.APP.Aritmetic.subtract();
            } else if (window.APP.operation === '*') {
                window.APP.Aritmetic.multiply();
            } else if (window.APP.operation === '/') {
                window.APP.Aritmetic.divide();
            } 
            window.APP.result = '';
            window.APP.printData();
            window.APP.operation = '';
        } else {
            window.APP.result = window.APP.dgField;
        }

        window.APP.digitsField.value = window.APP.dgField;
    },
    
    /**
     * pressMemoryButton method (called upon pressing one of MC (Memory Clear), MR (Memory Recall), MS (Memory Save), M+ (Memory Add) or M- (Memory Subtract) * memory buttons) saves current digits field value into window.APP.memory property and shows M label in view, when MS button is pressed. 
     * When MR button is pressed, digits field is filled with value from window.APP.memory property if available. When M+ or M- buttons are pressed, 
     * digits field value is added or subtract from the current memory value (if set) and saved to window.APP.memory property. 
     * MR button sets digits field value to zero if window.APP.memory is empty or to window.APP.memory value if not empty. 
     * MC sets window.APP.memory property to empty string and hides M label from view.
     * @method pressMemoryButton
     * @param memoryStr string value which can be some these MC, MR, MS, M+, M-
     * @class Buttons 
     */
    pressMemoryButton: function (memoryStr) {
        window.APP.dgField = window.APP.digitsField.value;
        switch (memoryStr) {
            case 'MC':
                window.APP.memoryLabelField.innerHTML = '';
                window.APP.memory = '';
            break;
            case 'MR':
                if (window.APP.memory === '') {
                    window.APP.dgField = '0';
                } else {
                    window.APP.dgField = window.APP.memory;
                }
                window.APP.digitsField.value = window.APP.dgField;
                window.APP.eraseDigits = true;
            break;
            case 'MS':
                if (window.APP.dgField !== '0' || window.APP.dgField !== '0.') {
                    window.APP.memory = window.APP.dgField;
                    window.APP.memoryLabelField.innerHTML = 'M = ' + window.APP.dgField;
                } else {
                    window.APP.digitsField.value = '0';
                }
                window.APP.eraseDigits = true;
            break;
            case 'M+':
                if (window.APP.memory !== '') {
                    window.APP.memory = window.APP.myParseFloat(window.APP.memory) + window.APP.myParseFloat(window.APP.dgField);
                    window.APP.memoryLabelField.innerHTML = 'M = ' + window.APP.memory;
                }
            break;
            case 'M-':
                if (window.APP.memory !== '') {
                    window.APP.memory = window.APP.myParseFloat(window.APP.memory) - window.APP.myParseFloat(window.APP.dgField);
                    window.APP.memoryLabelField.innerHTML = 'M = ' + window.APP.memory;
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
        window.APP.operationField.value = '';
        window.APP.operand = 0;
    }
});