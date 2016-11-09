window.FrnConstr.namespace('Utility', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        textStyle20 = {font: 'bold 20pt Verdana', align: 'center'},
        textStyle17 = {font: 'bold 17pt Verdana', align: 'center'},
        textStyle10 = {font: 'bold 10pt Arial', align: 'center'},
        textStyle10Matterhorn = {font: 'bold 10pt Arial', align: 'center', fill: '#4D4D4D'},
        textStyle10Red = {font: 'bold 10pt Arial', align: 'center', fill: 'red'},
        textStyle12 = {font: 'bold 12pt Arial', align: 'center'},
        textStyle12Red = {font: 'bold 12pt Arial', align: 'center', fill: 'red', wordWrap: true},
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys;

    return {

        rowOrColShiftMax: function (rowOrCol, numOfRowsOrCols, maxValue) {
            return ((rowOrCol + maxValue) > (numOfRowsOrCols - 1) ? (numOfRowsOrCols - 1 - rowOrCol) : maxValue);
        },

        rowOrColShiftMin: function (rowOrCol, minValue) {
            return ((rowOrCol - minValue) <= 0 ? (rowOrCol) : minValue);
        },

        rowOrColSet: function (rowOrCol, numOfRowsOrCols) {
            var sh = 0,
                rowOrColSet = [];

            for (sh = 0; sh < numOfRowsOrCols; sh += 1) {
                rowOrColSet.push(rowOrCol + sh);
            }

            return rowOrColSet;
        },

        zeroBasedRange: function (value, minRange, maxRange) {
            var result = 0;

            if (value >= maxRange) {
                result = maxRange;
            } else if (value < minRange) {
                result = minRange;
            } else {
                result = value;
            }

            return result;
        },

        convertTwoDimIndexesToOneDimIndex: function (cols, currentRow, currentCol) {
            return currentCol + cols * currentRow;
        },

        printGrObjectsCount: function (grObjects) {
            var key = null;

            for (key in grObjects) {
                if (grObjects.hasOwnProperty(key)) {
                    console.log(key + " count: " + grObjects[key].children.length);
                }
            }
        },

        bubleSort: function (array, sortType) {
            var i = 0,
                temp = 0,
                swapped = false;

            do {
                swapped = false;
                for (i = 0; i < array.length - 1; i += 1) {

                    if (sortType === phaser.Group.SORT_ASCENDING) {
                        if (array[i] > array[i + 1]) {
                            temp = array[i];
                            array[i] = array[i + 1];
                            array[i + 1] = temp;
                            swapped = true;
                        }
                    }

                    if (sortType === phaser.Group.SORT_DESCENDING) {
                        if (array[i] < array[i + 1]) {
                            temp = array[i];
                            array[i] = array[i + 1];
                            array[i + 1] = temp;
                            swapped = true;
                        }
                    }

                }
            } while (swapped);

            return array;
        },

        isTruthy: function (value) {
            var result = false;
            if (value) {
                result = true;
            } else {
                result = false;
            }
            return result;
        },

        findPropKey: function (objLiteral, value) {
            var result = null,
                key = null;

            for (key in objLiteral) {
                if (objLiteral.hasOwnProperty(key)) {
                    if (typeof objLiteral[key] === 'string' && objLiteral[key] === value) {
                        result = key;
                        break;
                    }
                }
            }

            return result;
        },

        disableDisplayObject: function (item) {
            item.inputEnabled = false;
        },

        enableDisplayObject: function (item) {
            item.inputEnabled = true;
        },

        // TODO numOfElemInObject(myObject) - add tests coverage
        numOfElemInObject: function (myObject) {
            return Object.keys(myObject).length;
        },

        getTextStyle20: function () {
            return textStyle20;
        },

        getTextStyle17: function () {
            return textStyle17;
        },

        getTextStyle12: function () {
            return textStyle12;
        },

        getTextStyle12Red: function () {
            return textStyle12Red;
        },

        getTextStyle10: function () {
            return textStyle10;
        },

        getTextStyle10Matterhorn: function () {
            return textStyle10Matterhorn;
        },

        getTextStyle10Red: function () {
            return textStyle10Red;
        },

        validateNumericFrnData: function (dataType, value) {
            var floatVal = 0,
                result = 0;

            if (typeof value === "string" && value.match(constApp.REGEX_ONLY_DIGITS) === null) {

                result = constApp.FrnData[dataType].DEFAULT_VAL;
                frnConstr.addValidationMsg(frnConst.Messages.NON_NUMERIC_DATA_MSG + " Info: " + result + "\n");

            } else {

                floatVal = this.toFloat(value);

                if (floatVal < constApp.FrnData[dataType].MIN_VAL) {

                    result = constApp.FrnData[dataType].MIN_VAL;
                    frnConstr.addValidationMsg(frnConst.Messages[dataType].VERY_LOW_MSG + "\n");

                } else if (floatVal > constApp.FrnData[dataType].MAX_VAL) {

                    result = constApp.FrnData[dataType].MAX_VAL;
                    frnConstr.addValidationMsg(frnConst.Messages[dataType].VERY_HIGH_MSG + "\n");

                } else {
                    result = floatVal;
                }

            }

            return result;
        },

        /**
         * randomNumber(min, max), min and max are inclusive.
         * @method randomNumber
         * @param {Integer} min
         * @param {Integer} max
         * @return {Integer}
         */
        randomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        /**
         * Decimal adjustment of a number. Check https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
         *
         * @param {String}  type  The type of adjustment.
         * @param {Number}  value The number.
         * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
         * @returns {Number} The adjusted value.
        */
        decimalAdjust: function (type, value, exp) {
            // If the exp is undefined or zero...
            if (typeof exp === 'undefined' || +exp === 0) {
              return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // If the value is not a number or the exp is not an integer...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
              return NaN;
            }
            // Shift
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // Shift back
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        },

        /*
         * Check https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
         */
        decimalRound: function (value, exp) {
            return this.decimalAdjust('round', value, exp);
        },

        /*
         * Check https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
         */
        decimalFloor: function (value, exp) {
            return this.decimalAdjust('floor', value, exp);
        },

        /*
         * Check https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
         */
        decimalCeil: function (value, exp) {
            return this.decimalAdjust('ceil', value, exp);
        },

        // TODO percentToSampleCustomExp(percent, sum, exp) - add tests for this function
        percentToSampleCustomExp: function (percent, sum, exp) {
            return this.decimalRound((Math.abs(sum) * Math.abs(percent)) / 100, exp);
        },

        percentToSample: function (percent, sum) {
            return this.percentToSampleCustomExp(percent, sum, frnConst.DECIMAL_ROUND_EXP);
        },

        sampleToPercent: function (sample, sum) {
            return this.decimalRound((Math.abs(sample) * 100) / Math.abs(sum), frnConst.DECIMAL_ROUND_EXP);
        },

        getRGBHexValue: function (hashString, length) {
            var result = "",
                hexRegEx = constApp.REGEX_ONLY_HEX_DIGITS;

            result = hashString.match(hexRegEx).join("");
            while (result.length < length) {
                result = "0" + result;
            }
            result = result.substring(0, length);
            return result;
        },

        getDarkerStringColor: function (rgbString, prcnt) {
            var rgbHexColor = this.getRGBHexValue(rgbString, 6),
                redChannel = this.toHex(rgbHexColor.substring(0, 2)),
                greenChannel = this.toHex(rgbHexColor.substring(2, 4)),
                blueChannel = this.toHex(rgbHexColor.substring(4, 6)),
                hashValue = this.getRGBHexValue(this.decimalRound(this.percentToSampleCustomExp(prcnt, redChannel, 0), 0).toString(16),
                                                    constGr.NUM_OF_COLOR_CHANNEL_DIGITS) +
                            this.getRGBHexValue(this.decimalRound(this.percentToSampleCustomExp(prcnt, greenChannel, 0), 0).toString(16),
                                                    constGr.NUM_OF_COLOR_CHANNEL_DIGITS) +
                            this.getRGBHexValue(this.decimalRound(this.percentToSampleCustomExp(prcnt, blueChannel, 0), 0).toString(16),
                                                    constGr.NUM_OF_COLOR_CHANNEL_DIGITS);

            return hashValue;
        },

        getDarkerHexColor: function (rgbString, prcnt) {
            return this.toHex(this.getDarkerStringColor(rgbString, prcnt));
        },

        /**
         * hashToHexColor(hashString) converts color in the hash string format to hexadecimal color value. Value without hash(#) symbol work as well.
         * @method hashToHexColor
         * @param {String} hashString representing string value of the color in the form #xxxxxx where each pair of x means Red, Green or Blue channel.
         */
        getHexColor: function (hashString) {
            return this.toHex(this.getRGBHexValue(hashString, constGr.NUM_OF_COLOR_DIGITS));
        },

        // TODO getColor(colorType, hashColor) - finish this function and update the tests accordingly for edge and default cases: getColor(colorType, hashColor);
        getColor: function (colorType, hashColor) {
            var colorByType = 0x000000;

            switch (colorType) {
            case constAppKeys.MATERIAL_COLOR_KEY:
                colorByType = ((hashColor === constGr.Colors.Material.MAT_BLACK) ?
                                constGr.Colors.DARK_GRAY_1 :
                                this.getHexColor(hashColor));
                break;
            case constAppKeys.DARKER_COLOR_KEY:
                colorByType = ((hashColor === constGr.Colors.Material.MAT_BLACK) ?
                                constGr.Colors.DEFAULT_EDGE_COLOR :
                                this.getDarkerHexColor(hashColor, constGr.DEFAULT_COLOR_SHIFT_PERCENT));
                break;
            case constAppKeys.EDGE_COLOR_KEY:
                colorByType = ((hashColor === constGr.Colors.Material.MAT_BLACK) ?
                                constGr.Colors.MATTERHORN : constGr.Colors.DEFAULT_EDGE_COLOR);
                break;
            default:
                colorByType = ((hashColor === constGr.Colors.Material.MAT_BLACK) ?
                                constGr.Colors.MATTERHORN : constGr.Colors.DEFAULT_EDGE_COLOR);
                break;
            }

            return colorByType;
        },

        toDecimal: function (str) {
            return parseInt(str, 10);
        },

        toFloat: function (str) {
            return parseFloat(str, 10);
        },

        toHex: function (str) {
            return parseInt(str, 16);
        },

        // TODO convertMillsToPixels(mills, millsPerPixel) - add tests for this function
        convertMillsToPixels: function (mills, millsPerPixel) {
            return this.decimalRound((mills / millsPerPixel), frnConst.DECIMAL_ROUND_EXP);
        },

        convertPixelsToMills: function (pixels, millsPerPixel) {
            return this.decimalRound((pixels * millsPerPixel), frnConst.DECIMAL_ROUND_EXP);
        },

        // TODO saveCanvasData(key) - finish the function and add tests coverage
        saveCanvasData: function (key) {
            var area = new phaser.Rectangle(0, 0, gameObject.width, gameObject.height),
                bmpData = gameObject.make.bitmapData(gameObject.width, gameObject.height, key, true);

            bmpData.copyRect(gameObject.canvas, area, 0, 0);
            return bmpData;
        },

        // TODO addScreenBmpData(bmpData, x, y, anchorX, anchorY, scaleX, scaleY) - finish and add tests coverage
        addScreenBmpData: function (bmpData, x, y, anchorX, anchorY, scaleX, scaleY) {
            bmpData.addToWorld(x, y, anchorX, anchorY, scaleX, scaleY);
        },

        makeShelveDataObject: function (x, y, shiftX, shiftY, frameHeight, halfCupboardDepth, rearHeight, thickness) {
            var percentHeight = this.sampleToPercent(shiftY - y - halfCupboardDepth, rearHeight),
                numOfPixelsAdded = this.percentToSample(percentHeight, frameHeight),
                rightPointY = y + numOfPixelsAdded,
                pointsObject = {
                    pt1: {x: x, y: shiftY},
                    cp1: {x: x, y: rightPointY},
                    pt2: {x: shiftX, y: rightPointY},
                    pt3: {x: shiftX, y: rightPointY + thickness},
                    cp2: {x: x, y: rightPointY + thickness},
                    pt4: {x: x, y: shiftY + thickness},
                    pt5: {x: shiftX, y: shiftY + thickness}
                };

                return pointsObject;
        },

        /**
         * Determines if y is within lower y bound and upper y bound and returns true or false accordingly.
         * Lower y bound is the value of construtor y coordinate plus half depth of the constructor.
         * Upper y bound is the value is sum of half height of the constructor plus y coordinate of the
         * constructor.
         * @method isTopCornerShelvesDrawn
         * @param {Object} lowerYBound
         * @param {Object} upperYBound
         * @param {Object} y
         * @return {Boolean}
         */
        isTopCornerShelvesDrawn: function (lowerYBound, upperYBound, y) {
            return (y >= this.decimalRound(lowerYBound, frnConst.DECIMAL_ROUND_EXP) &&
                    y < this.decimalRound(upperYBound, frnConst.DECIMAL_ROUND_EXP));
        },

        /**
         * Determines if given y coordinate is equal to middle point of the constructor.
         * Middle point is y coordinate of the constructor plus half height of the constructor.
         * @method isRectShelveDrawn
         * @param {Object} midPoint
         * @param {Object} y
         * @return {Boolean}
         */
        isRectShelveDrawn: function (midPoint, y) {
            return (y === this.decimalRound(midPoint, frnConst.DECIMAL_ROUND_EXP));
        },

        /**
         * Determines if y is within lower y bound and upper y bound and returns true or false accordingly.
         * Lower y bound is the value of construtor y coordinate plus half height of the constructor.
         * Upper y bound is the value is construtor y coordinate plus height of the constructor minus half depth
         * of the constructor.
         * constructor.
         * @method isBottomCornerShelvesDrawn
         * @param {Object} lowerYBound
         * @param {Object} upperYBound
         * @param {Object} y
         * @return {Boolean}
         */
        isBottomCornerShelvesDrawn: function (lowerYBound, upperYBound, y) {
            return (y > this.decimalRound(lowerYBound, frnConst.DECIMAL_ROUND_EXP) &&
                        y <= this.decimalRound(upperYBound, frnConst.DECIMAL_ROUND_EXP));
        },

        process: function (key, value) {
            console.log(key + " : " + value);
        },

        countNodesInObject: function (obj) {
            var key = null,
                value = null,
                result = 0;

            for (key in obj) {

                if (obj.hasOwnProperty(key)) {
                    value = obj[key];

                    if (value !== null && typeof(value) === "object") {
                        //result += 1;
                        console.log(key + " : " + result);
                        console.dir(value);
                        result = this.countNodesInObject(value) + 1;
                    }
                }

            }

            return result;
        },

        traverse: function (obj, func) {
            var key = null,
                value = null;

            for (key in obj) {

                if (obj.hasOwnProperty(key)) {
                    value = obj[key];

                    if (value !== null && typeof(value) === "object" && typeof(value) !== "number") {
                        func.apply(this, [key, value]);
                        this.traverse(value, func);
                    }
                }

            }

        }
    };
    }(window.FrnConstr, Phaser)));