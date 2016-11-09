window.FrnConstr.namespace('InnerSlotMatrixUtility', {}, (function (frnConstr) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        utils = frnConstr.Utility;

    return {

        enableSlot: function (slotTwoDimArray, row, col) {
            slotTwoDimArray[row][col].alpha = 0.5;
            slotTwoDimArray[row][col].tint = constGr.Colors.GREEN;
        },

        disableSlot: function (slotTwoDimArray, row, col) {
            slotTwoDimArray[row][col].alpha = 0.5;
            slotTwoDimArray[row][col].tint = constGr.Colors.RED;
        },

        hideSlot: function (slotTwoDimArray, row, col) {
            slotTwoDimArray[row][col].alpha = 0.0;
            slotTwoDimArray[row][col].tint = constGr.Colors.BLUE;
        },

        enableMatrixArea: function (slotTwoDimArray, row, col, numRows, numCols) {
            var i = 0, j = 0;

            for (i = row; i < (row + numRows); i += 1) {
                for (j = col; j < (col + numCols); j += 1) {
                    this.enableSlot(slotTwoDimArray, i, j);
                }
            }

            return slotTwoDimArray;
        },

        disableMatrixArea: function (slotTwoDimArray, row, col, numRows, numCols) {
            var i = 0, j = 0;

            for (i = row; i < (row + numRows); i += 1) {
                for (j = col; j < (col + numCols); j += 1) {
                    this.disableSlot(slotTwoDimArray, i, j);
                }
            }

            return slotTwoDimArray;
        },

        hideSlots: function (innerSlotTwoDimArray, maxNumOfInnerShelves, maxNumOfBeams, rows, cols) {
            var r = 0, c = 0;

            for (r = 0; r < maxNumOfInnerShelves; r += 1) {
                for (c = 0; c < maxNumOfBeams; c += 1) {
                    if (rows.indexOf(r) === -1 && cols.indexOf(c) === -1) {
                        this.hideSlot(innerSlotTwoDimArray, r, c);
                    }
                }
            }

            return innerSlotTwoDimArray;
        },

        highlightSlots: function (innerPartsSlotMatrix, drawPart, row, col, numRows, numCols, rowShift, colShift) {
            var numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length;

            if (drawPart) {
                this.enableMatrixArea(innerPartsSlotMatrix, row, col, numRows, numCols);
            } else {
                this.disableMatrixArea(innerPartsSlotMatrix, row, col, numRows, numCols);
            }

            this.hideSlots(innerPartsSlotMatrix, numOfMatrixRows, numOfMatrixCols, rowShift, colShift);
        },

        hideSlotsForAreaParts: function (innerSlotTwoDimArray, maxNumOfInnerShelves, maxNumOfBeams, rows, cols) {
            var r = 0, c = 0;

            for (r = 0; r < maxNumOfInnerShelves; r += 1) {
                for (c = 0; c < maxNumOfBeams; c += 1) {
                    if (rows.indexOf(r) === -1 || cols.indexOf(c) === -1) {
                        this.hideSlot(innerSlotTwoDimArray, r, c);
                    }
                }
            }

            return innerSlotTwoDimArray;
        },

        highlightSlotsForAreaParts: function (innerPartsSlotMatrix, drawPart, row, col, numRows, numCols, rowShift, colShift) {
            var numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length;

            if (drawPart) {
                this.enableMatrixArea(innerPartsSlotMatrix, row, col, numRows, numCols);
            } else {
                this.disableMatrixArea(innerPartsSlotMatrix, row, col, numRows, numCols);
            }

            this.hideSlotsForAreaParts(innerPartsSlotMatrix, numOfMatrixRows, numOfMatrixCols, rowShift, colShift);
        },

        searchVertBflLeft: function (innerPartsSlotMatrix, row, col, numRows) {
            var index = -1,
                found = false,
                r = 0,
                c = 0,
                parts = [];

            for (r = row; r < row + numRows; r += 1) {

                for (c = col; c >= 0; c -= 1) {
                    parts = innerPartsSlotMatrix[r][c];

                    if (this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY) ||
                        (c === 0)) {
                        index = c;
                        found = true;
                        break;
                    }

                }

                if (found) {
                    break;
                }
            }

            return index;
        },

        searchVertBflRight: function (innerPartsSlotMatrix, row, col, numRows) {
            var index = -1,
                found = false,
                numCols = innerPartsSlotMatrix[0].length,
                r = 0,
                c = 0,
                parts = [];

            for (r = row; r < row + numRows; r += 1) {

                for (c = col + ((numCols === (col + 1)) ? 0 : 1); c < numCols; c += 1) {
                    parts = innerPartsSlotMatrix[r][c];

                    if (this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY)) {
                        index = c;
                        found = true;
                        break;
                    } else if (c === numCols - 1) {
                        index = c + 1;
                        found = true;
                        break;
                    }

                }
                if (found) {
                    break;
                }
            }

            return index;
        },

        searchHorzBflAbove: function (innerPartsSlotMatrix, row, col) {
            var index = -1,
                r = 0,
                c = 0,
                parts = [];

            for (r = row; r >= 0; r -= 1) {
                parts = innerPartsSlotMatrix[r][col];

                if (this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY) ||
                    (r === 0)) {
                    index = r;
                    break;
                }
            }

            return index;
        },

        // TODO searchHorzBflBelow(innerPartsSlotMatrix, row, col, numRows, numCols) - add tests
        searchHorzBflBelow: function (innerPartsSlotMatrix, row, col) {
            var index = -1,
                numRows = innerPartsSlotMatrix.length,
                r = 0,
                c = 0,
                parts = [];

            for (r = row + ((numRows === (row + 1)) ? 0 : 1); r < numRows; r += 1) {

                parts = innerPartsSlotMatrix[r][col];

                if (this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY)) {
                    index = r;
                    break;
                } else if (r === numRows - 1) {
                    index = r + 1;
                }
            }

            return index;
        },

        searchRangeForHanger: function (innerPartsSlotMatrix, row, col, partWidth) {
            var numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                result = {},
                leftIndex = 0,
                rightIndex = numOfMatrixCols;

            leftIndex = newCol;
            rightIndex = newCol + utils.rowOrColShiftMax(newCol, numOfMatrixCols, partWidth);
            result.numCols = (rightIndex - leftIndex) + ((rightIndex - leftIndex) < partWidth ? 1 : 0);
            result.row = newRow;
            result.col = leftIndex;

            return result;
        },

        // TODO searchEmptySpaceForHanger(innerPartsSlotMatrix, row, col, numCols) - add tests for parts like
        // VBF, HBM, VBM, TRST, DRW, PTGR, HGR, SH
        searchEmptySpaceForHanger: function (innerPartsSlotMatrix, row, col, numCols, partWidth, partHeight) {
            var r = 0, c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                shift = utils.rowOrColShiftMax(row, numOfMatrixRows, partHeight),
                rowShift = row + shift,
                colShift = utils.zeroBasedRange((col + numCols), col, numOfMatrixCols),
                parts = [],
                isDrawn = true,
                containsHorzWall = true,
                result = null;

            if (shift + 1 < partHeight || numCols <= partWidth - 1) {

                isDrawn = false;

            } else {

                for (c = col; c < colShift; c += 1) {
                    parts = innerPartsSlotMatrix[row][c];

                    if (!this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY)) {
                        containsHorzWall = containsHorzWall && false;
                    }
                }

                if (!containsHorzWall) {
                    isDrawn = false;
                }

                for (r = row; r < row + 1; r += 1) {
                    parts = innerPartsSlotMatrix[r][col];

                    if (this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY)) {

                        isDrawn = false;

                    }
                }

                for (r = row + 1; r < rowShift; r += 1) {
                    for (c = col + 1; c < colShift; c += 1) {

                        parts = innerPartsSlotMatrix[r][c];

                        if (this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY)) {

                            isDrawn = false;

                        }
                    }
                }
            }

            return isDrawn;
        },

        // TODO searchRangeForTieShoesTrouser(innerPartsSlotMatrix, row, col) - add test coverage
        searchRangeForTieShoesTrouser: function (innerPartsSlotMatrix, row, col, partWidth, partHeight) {
            var r = 0, c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                numRows = utils.rowOrColShiftMax(newRow, numOfMatrixRows, partHeight) + 1,
                numCols = utils.rowOrColShiftMax(newCol, numOfMatrixCols, partWidth),
                rowShift = newRow + utils.rowOrColShiftMax(newRow, numOfMatrixRows, partHeight),
                result = {},
                leftIndex = 0,
                rightIndex = numOfMatrixCols,
                distance = 0,
                halfDistance = 0;

            leftIndex = this.searchVertBflLeft(innerPartsSlotMatrix, newRow, newCol, numRows);
            rightIndex = this.searchVertBflRight(innerPartsSlotMatrix, newRow, newCol, numRows);
            distance = rightIndex - leftIndex;
            halfDistance = utils.decimalRound(distance / 2, 0);

            if (distance === partWidth) {

                result.numCols = rightIndex - leftIndex;

            } else if (distance > partWidth) {

                if (newCol === leftIndex) {
                    rightIndex = newCol + partWidth;
                } else if ((newCol > leftIndex) && (newCol < leftIndex + halfDistance)) {
                    rightIndex = leftIndex + partWidth;
                } else if (newCol === rightIndex - 1) {
                    leftIndex = newCol - partWidth + 1;
                } else if ((newCol < rightIndex - 1) && (newCol >= leftIndex + halfDistance)) {
                    leftIndex = rightIndex - partWidth;
                }

                result.numCols = rightIndex - leftIndex;

            } else {

                result.numCols = distance;

            }

            result.row = newRow;
            result.col = leftIndex;

            return result;
        },

        // TODO searchEmptySpaceForAreaParts(innerPartsSlotMatrix, row, col, numCols) - add test coverage
        searchEmptySpaceForAreaParts: function (innerPartsSlotMatrix, row, col, numCols, leftWallOn, rightWallOn, partWidth, partHeight) {
            var r = 0, c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                shift = utils.rowOrColShiftMax(newRow, numOfMatrixRows, partHeight),
                newNumCols = utils.zeroBasedRange(numCols, 0, numOfMatrixCols),
                rowShift = newRow + shift,
                colShift = utils.zeroBasedRange((newCol + newNumCols + 1), newCol, numOfMatrixCols),
                parts = [],
                isDrawn = true,
                found = false,
                containsLeftWall = true,
                containsRightWall = true,
                result = null;

            if ((newCol === 0 && !leftWallOn) ||
                (newCol === numOfMatrixCols  && !rightWallOn)) {

                 isDrawn = false;
            }

            if (shift < partHeight ||
                newNumCols < partWidth) {

                isDrawn = false;

            } else {

                for (r = newRow; r < rowShift; r += 1) {
                    for (c = newCol; c < colShift; c += 1) {

                        parts = innerPartsSlotMatrix[r][c];

                        if (c === newCol &&
                            !this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY)) {
                            containsLeftWall = false;
                        } else if ((c === colShift - 1) &&
                            !this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY)) {
                            containsRightWall = false;
                        }
                        if ((rightWallOn &&
                            (c === colShift - 1) &&
                            colShift === numOfMatrixCols)) {
                            containsRightWall = true;
                        }
                    }
                }

                if (containsLeftWall) {

                    for (c = newCol + 1; c < colShift - 1; c += 1) {
                        parts = innerPartsSlotMatrix[newRow][c];

                        if (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY)) {

                            isDrawn = false;

                        }
                    }

                    for (r = newRow + 1; r < rowShift; r += 1) {
                        parts = innerPartsSlotMatrix[r][newCol];

                        if (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY)) {

                            isDrawn = false;

                        }
                    }

                    for (r = newRow + 1; r < rowShift; r += 1) {
                        for (c = newCol + 1; c < colShift - 1; c += 1) {

                            parts = innerPartsSlotMatrix[r][c];

                            if (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY)) {

                                isDrawn = false;

                            }
                        }
                    }

                } else if (containsRightWall) {

                    for (c = newCol + 1; c < colShift - 1; c += 1) {

                        parts = innerPartsSlotMatrix[newRow][c];

                        if (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY)) {

                            isDrawn = false;

                        }
                    }

                    for (r = newRow; r < rowShift; r += 1) {

                        parts = innerPartsSlotMatrix[r][newCol];

                        if (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY)) {

                            isDrawn = false;

                        }
                    }

                    for (r = newRow + 1; r < rowShift; r += 1) {
                        for (c = newCol + 1; c < colShift - 1; c += 1) {

                            parts = innerPartsSlotMatrix[r][c];

                            if (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY) ||
                                this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY)) {

                                isDrawn = false;

                            }
                        }
                    }

                } else {
                    isDrawn = false;
                }
            }

            return isDrawn;
        },

        // TODO addAreaPart(innerPartsSlotMatrix, row, col, numCols, areaPartType, partHeight) add test coverage
        // Replace this function with 4 addAreaOfParts() statements
        // where it is called and remove it.
        addAreaPart: function (innerPartsSlotMatrix, row, col, numCols, areaPartType, partHeight) {
            var c = 0, r = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                newNumCols = utils.zeroBasedRange(numCols, 0, numOfMatrixCols),
                numRows = utils.rowOrColShiftMax(newRow, numOfMatrixRows, partHeight),
                rowShift = utils.zeroBasedRange((newRow + numRows), newRow, numOfMatrixRows),
                colShift = utils.zeroBasedRange((newCol + newNumCols), newCol, numOfMatrixCols),
                currentSlot = innerPartsSlotMatrix[newRow][newCol];

            if (this.isFullSlot(currentSlot)) {

                console.log("addAreaPart(innerPartsSlotMatrix, row, col, numCols): no free part slot");

            } else {

                innerPartsSlotMatrix = this.addAreaOfParts(innerPartsSlotMatrix, newRow,     newCol,     newRow + 1, newNumCols, areaPartType);
                innerPartsSlotMatrix = this.addAreaOfParts(innerPartsSlotMatrix, newRow + 1, newCol,     rowShift,   newCol + 1, areaPartType);
                innerPartsSlotMatrix = this.addAreaOfParts(innerPartsSlotMatrix, newRow + 1, newCol + 1, rowShift,   colShift,   areaPartType);
                innerPartsSlotMatrix = this.addAreaOfParts(innerPartsSlotMatrix, newRow + 1, newCol + 1, rowShift,   colShift,   constAppKeys.DUMMY_SLOT_KEY);

            }

            return innerPartsSlotMatrix.slice();
        },

        // TODO searchRangeForDrawerOrPtgr(innerPartsSlotMatrix, row, col) - add test coverage
        searchRangeForDrawerOrPtgr: function (innerPartsSlotMatrix, row, col, partHeight) {
            var numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                numRows = utils.rowOrColShiftMax(newRow, numOfMatrixRows, partHeight),
                lowerIndex = 0,
                upperIndex = numOfMatrixCols;

            lowerIndex = this.searchVertBflLeft(innerPartsSlotMatrix, newRow, newCol, numRows);
            upperIndex = this.searchVertBflRight(innerPartsSlotMatrix, row, col, numRows);

            return {row: newRow, col: lowerIndex, numCols: upperIndex - lowerIndex};
        },

        // TODO searchEmptySpaceForDrawerOrPtgr(innerPartsSlotMatrix, row, col, numCols) - add test coverage
        searchEmptySpaceForDrawerOrPtgr: function (innerPartsSlotMatrix, row, col, numCols, minWidth, maxWidth, minHeight, maxHeight) {
            var r = 0, c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                shift = utils.rowOrColShiftMax(newRow, numOfMatrixRows, maxHeight),
                newNumCols = utils.zeroBasedRange(numCols, 0, numOfMatrixCols),
                rowShift = newRow + shift,
                colShift = utils.zeroBasedRange((newCol + newNumCols), newCol, numOfMatrixCols),
                parts = [],
                isEmptyArea = true,
                result = null;

            if (shift < maxHeight || newNumCols < minWidth ||
                newNumCols > maxWidth) {

                isEmptyArea = false;

            } else {

                for (c = newCol; c < colShift; c += 1) {

                    parts = innerPartsSlotMatrix[newRow][c];

                    if (this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                        this.isFullSlot(parts)) {

                        isEmptyArea = false;
                        break;

                    }
                }

                for (r = newRow + 1; r < rowShift; r += 1) {
                    for (c = newCol; c < colShift; c += 1) {

                        parts = innerPartsSlotMatrix[r][c];

                        if (this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                            this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                            this.isFullSlot(parts)) {

                            isEmptyArea = false;
                            break;

                        }
                    }
                }
            }

            return isEmptyArea;
        },

        // TODO addDrawerOrPtgr(innerPartsSlotMatrix, row, col, numCols) - Replace this function with 3 addAreaOfParts() statements
        // where it is called and remove it.
        addDrawerOrPtgr: function (innerPartsSlotMatrix, row, col, numCols, partHeight, partType) {
            var c = 0, r = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                newNumCols = utils.zeroBasedRange(numCols, 0, numOfMatrixCols),
                rowShift = newRow + utils.rowOrColShiftMax(newRow, numOfMatrixRows, partHeight),
                colShift = utils.zeroBasedRange((newCol + newNumCols), newCol, numOfMatrixCols),
                currentSlot = innerPartsSlotMatrix[newRow][newCol];

            if (this.isFullSlot(currentSlot)) {

                console.log("addDrawerOrPtgr(innerPartsSlotMatrix, row, col, numCols): no free part slot");

            } else {

                innerPartsSlotMatrix = this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    newRow, newCol,
                    newRow + 1, colShift,
                    partType);

                innerPartsSlotMatrix = this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    newRow + 1, newCol,
                    rowShift, colShift,
                    partType);

                innerPartsSlotMatrix = this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    newRow + 1, newCol,
                    rowShift, colShift,
                    constAppKeys.DUMMY_SLOT_KEY);
            }

            return innerPartsSlotMatrix.slice();
        },

        searchRangeForHorzBaffle: function (innerPartsSlotMatrix, row, col) {
            var numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                lowerIndex = 0,
                upperIndex = numOfMatrixCols;

            lowerIndex = this.searchVertBflLeft(innerPartsSlotMatrix, newRow, newCol, 1);
            upperIndex = this.searchVertBflRight(innerPartsSlotMatrix, newRow, newCol, 1);

            return {row: newRow, col: lowerIndex, numCols: upperIndex - lowerIndex};
        },

        searchEmptySpaceForHorzBaffle: function (innerPartsSlotMatrix, row, col, numCols) {
            var c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                newNumCols = utils.zeroBasedRange(numCols, 0, numOfMatrixCols),
                colShift = utils.zeroBasedRange((newCol + newNumCols), newCol, numOfMatrixCols),
                parts = [],
                isEmptyArea = true,
                result = null;

            for (c = newCol; c < colShift; c += 1) {

                parts = innerPartsSlotMatrix[newRow][c];

                if (this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                    (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.TIE_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.SHOES_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.HANGER_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    this.isFullSlot(parts)) {

                    isEmptyArea = false;
                    break;

                }
            }

            return isEmptyArea;
        },

        // TODO searchEmptySpaceForHorzBeam(innerPartsSlotMatrix, row, col, numCols) - add test coverage for other parts
        searchEmptySpaceForHorzBeam: function (innerPartsSlotMatrix, row, col, numCols) {
            var r = 0,
                c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                rowForDrawer = utils.zeroBasedRange(row - 1, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                newNumCols = utils.zeroBasedRange(numCols, 0, numOfMatrixCols),
                rowShift = utils.zeroBasedRange((newRow + constGr.HORZ_BEAM_SPACE), newRow, numOfMatrixRows),
                colShift = utils.zeroBasedRange((newCol + newNumCols), newCol, numOfMatrixCols),
                parts = [],
                isEmptyArea = true,
                result = null;

            for (r = newRow; r < rowShift; r += 1) {
                for (c = newCol; c < colShift; c += 1) {

                    parts = innerPartsSlotMatrix[r][c];

                    if (this.slotContainsPart(parts, constAppKeys.HORZ_BAFFLE_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                        this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                        this.isFullSlot(parts)) {

                        isEmptyArea = false;
                        break;

                    }
                }
            }

            for (c = newCol; c < colShift; c += 1) {
                parts = innerPartsSlotMatrix[rowForDrawer][c];

                if (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY)) {
                    isEmptyArea = false;
                    break;
                }
            }

            return isEmptyArea;
        },

        searchRangeForVertBaffle: function (innerPartsSlotMatrix, row, col) {
            var numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                lowerIndex = 0,
                upperIndex = numOfMatrixRows;

            lowerIndex = this.searchHorzBflAbove(innerPartsSlotMatrix, newRow, newCol, 1);
            upperIndex = this.searchHorzBflBelow(innerPartsSlotMatrix, newRow, newCol, 1);

            return {row: lowerIndex, col: newCol, numRows: upperIndex - lowerIndex};
        },

        searchEmptySpaceForVertBaffle: function (innerPartsSlotMatrix, row, col, numRows) {
            var r = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                newNumRows = utils.zeroBasedRange(numRows, 0, numOfMatrixRows),
                rowShift = utils.zeroBasedRange((newRow + newNumRows), newRow, numOfMatrixRows),
                parts = [],
                isEmptyArea = true,
                result = null;

            for (r = newRow; r < rowShift; r += 1) {

                parts = innerPartsSlotMatrix[r][newCol];

                if (this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                    (this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.TIE_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.SHOES_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.HANGER_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    (this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) &&
                        this.slotContainsPart(parts, constAppKeys.DUMMY_SLOT_KEY)) ||
                    this.isFullSlot(parts)) {

                    isEmptyArea = false;
                    break;

                }
            }

            return isEmptyArea;
        },

        // TODO searchEmptySpaceForVertBeam(innerPartsSlotMatrix, row, col, numRows) - add test coverage
        searchEmptySpaceForVertBeam: function (innerPartsSlotMatrix, row, col, numRows) {
            var r = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length,
                newRow = utils.zeroBasedRange(row, 0, numOfMatrixRows),
                newCol = utils.zeroBasedRange(col, 0, numOfMatrixCols),
                newNumRows = utils.zeroBasedRange(numRows, 0, numOfMatrixRows),
                rowShift = utils.zeroBasedRange((newRow + newNumRows), newRow, numOfMatrixRows),
                parts = [],
                isEmptyArea = true,
                result = null;

            for (r = newRow; r < rowShift; r += 1) {

                parts = innerPartsSlotMatrix[r][newCol];

                if (this.slotContainsPart(parts, constAppKeys.VERT_BAFFLE_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.VERT_BEAM_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.DRAWER_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.HORZ_BEAM_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.TIE_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.SHOES_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.TROUSER_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.HANGER_KEY) ||
                    this.slotContainsPart(parts, constAppKeys.PANTOGRAPH_KEY) ||
                    this.isFullSlot(parts)) {

                    isEmptyArea = false;
                    break;

                }
            }

            return isEmptyArea;
        },

        defaultSlotDataObject: function () {
            return this.makePartsArray(constGr.MAX_PARTS_PER_SLOT, constAppKeys.EMPTY_SLOT_KEY);
        },

        defaultInnerPartsMatrix: function (maxNumOfInnerShelves, maxNumOfBeams) {
            var slotMatrix = [],
                i = 0,
                j = 0;

            for (i = 0; i < maxNumOfInnerShelves; i += 1) {
                slotMatrix[i] = [];
                for (j = 0; j < maxNumOfBeams; j += 1) {
                    slotMatrix[i].push(this.defaultSlotDataObject());
                }
            }

            return slotMatrix.slice();
        },

        makeInnerPartsMatrix: function (ceilOn, floorOn, leftWallOn, innerPartsSlotMatrix, maxNumOfInnerShelves, maxNumOfBeams) {

            if (!utils.isTruthy(innerPartsSlotMatrix) || innerPartsSlotMatrix.length === 0 ||
                typeof innerPartsSlotMatrix === "object" || typeof innerPartsSlotMatrix === "boolean") {
                innerPartsSlotMatrix = this.defaultInnerPartsMatrix(maxNumOfInnerShelves, maxNumOfBeams);
            }

            if (ceilOn) {
                innerPartsSlotMatrix = this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    0, 0, 1, maxNumOfBeams,
                    constAppKeys.HORZ_BAFFLE_KEY);
            }

            if (floorOn) {
                innerPartsSlotMatrix = this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    maxNumOfInnerShelves - 1, 0, maxNumOfInnerShelves, maxNumOfBeams,
                    constAppKeys.HORZ_BAFFLE_KEY);
            }

            if (leftWallOn) {
                innerPartsSlotMatrix = this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    0, 0, maxNumOfInnerShelves, 1,
                    constAppKeys.VERT_BAFFLE_KEY);
            }

            return innerPartsSlotMatrix.slice();
        },

        slotContainsPart: function (partsArray, partName) {
            return (partsArray.indexOf(partName) !== -1);
        },

        isFullSlot: function (parts) {
            var p = 0,
                partsCount = parts.length,
                slotsLeft = partsCount;

            for (p = 0; p < partsCount; p += 1) {
                if (parts[p] !== constAppKeys.EMPTY_SLOT_KEY) {
                    slotsLeft -= 1;
                }
            }

            return (slotsLeft === 0);
        },

        isEmptySlot: function (parts) {
            var p = 0,
                partsCount = parts.length,
                slotsAvailable = 0;

            for (p = 0; p < partsCount; p += 1) {
                if (parts[p] === constAppKeys.EMPTY_SLOT_KEY) {
                    slotsAvailable += 1;
                }
            }

            return (slotsAvailable === partsCount);
        },

        addAreaOfParts: function (innerPartsSlotMatrix, row, col, rowShift, colShift, partType) {
            var r = 0, c = 0,
                parts = [];

            for (r = row; r < rowShift; r += 1) {
                for (c = col; c < colShift; c += 1) {

                    parts = innerPartsSlotMatrix[r][c];
                    parts = this.addPart(parts, partType);

                    if (typeof parts === "boolean") {
                        innerPartsSlotMatrix[r][c] = this.defaultSlotDataObject();
                    } else {
                        innerPartsSlotMatrix[r][c] = parts;
                    }

                }
            }

            return innerPartsSlotMatrix;
        },

        addPart: function (parts, partType) {
            var result = this.defaultSlotDataObject(),
                emptyPartSlotIndex = 0;

            if (this.isFullSlot(parts) || partType === constAppKeys.EMPTY_SLOT_KEY) {
                result = false;
            } else if (this.slotContainsPart(parts, partType)) {
                result = parts;
            } else {
                emptyPartSlotIndex = parts.indexOf(constAppKeys.EMPTY_SLOT_KEY);
                parts[emptyPartSlotIndex] = partType;
                result = parts;
            }

            return result;
        },

        // TODO removeAreaOfParts(innerPartsSlotMatrix, row, col, numRows, numCols, partType) - Add tests for other parts. HBF is covered.
        removeAreaOfParts: function (innerPartsSlotMatrix, row, col, rowShift, colShift, partType) {
            var r = 0, c = 0,
                result = [];

            for (r = row; r < rowShift; r += 1) {
                for (c = col; c < colShift; c += 1) {

                    result = this.removePart(innerPartsSlotMatrix[r][c], partType);

                    if (!result) {
                        console.log("Could not remove part.");
                    }
                }
            }

            return innerPartsSlotMatrix;
        },

        // TODO removePart(parts, partType) - finish the tests
        removePart: function (parts, partType) {
            var result = this.defaultSlotDataObject(),
                emptyPartSlotIndex = 0,
                r = 0;

            if (this.isEmptySlot(parts) || partType === constAppKeys.EMPTY_SLOT_KEY ||
                !this.slotContainsPart(parts, partType)) {

                result = false;

            } else {

                for (r = 0; r < parts.length; r += 1) {
                    if (r === parts.indexOf(partType)) {
                        parts[r] = constAppKeys.EMPTY_SLOT_KEY;
                    }
                }
                result = parts;

            }

            return result;
        },

        makePartsArray: function (partsCount, partType) {
            var i = 0,
                parts = [];

            for (i = 0; i < partsCount; i += 1) {
                parts.push(partType);
            }

            return parts;
        },

        // TODO addColumns(innerPartsSlotMatrix, numCols, ceilOn, floorOn) - add tests for all cases
        addColumns: function (innerPartsSlotMatrix, numCols, ceilOn, floorOn) {
            var r = 0,
                c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length;

            for (r = 0; r < numOfMatrixRows; r += 1) {
                for (c = numOfMatrixCols; c < numOfMatrixCols + numCols; c += 1) {
                    innerPartsSlotMatrix[r].push(this.defaultSlotDataObject());
                }
            }

            // if the ceiling is turned on replace the ceiling slots with slots that contain
            // horizontal baffle
            if (ceilOn) {
                this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    0, numOfMatrixCols,
                    1, numOfMatrixCols + numCols,
                    constAppKeys.HORZ_BAFFLE_KEY);
            }

            // if the floor is turned on replace the floor slots with slots that contain
            // horizontal baffle
            if (floorOn) {
                this.addAreaOfParts(
                    innerPartsSlotMatrix,
                    numOfMatrixRows - 1, numOfMatrixCols,
                    numOfMatrixRows, numOfMatrixCols + numCols,
                    constAppKeys.HORZ_BAFFLE_KEY);
            }

            return innerPartsSlotMatrix;
        },

        // TODO removeColumns(innerPartsSlotMatrix, numCols, floorOn) - add tests for all cases
        removeColumns: function (innerPartsSlotMatrix, numCols) {
            var r = 0,
                c = 0,
                numOfMatrixCols = innerPartsSlotMatrix[0].length,
                numOfMatrixRows = innerPartsSlotMatrix.length;

            for (r = 0; r < numOfMatrixRows; r += 1) {
                innerPartsSlotMatrix[r].splice(numOfMatrixCols - numCols, numCols);
            }

            return innerPartsSlotMatrix;
        }
    };
    }(window.FrnConstr)));