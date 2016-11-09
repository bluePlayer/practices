window.FrnConstr.namespace('EnteriorScreen', window.FrnConstr.Screen, (function (frnConstr, phaser, jq) {'use strict';
    var thisObject = null,
        gameObject = null,

        // constants
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constAppKeys = frnConst.Application.Keys,

        // utils
        utils = frnConstr.Utility,
        grUtils = frnConstr.GraphicsUtility,
        pdUtils = frnConstr.ProcessDataUtility,
        ismUtils = frnConstr.InnerSlotMatrixUtility,
        frnMessages = frnConstr.Const.Messages,

        // graphics objects
        constructorGraphics = null,
        ceilingWallGraphics = null,
        floorWallGraphics = null,
        rearWallGraphics = null,
        leftWallGraphics = null,
        rightWallGraphics = null,
        leftShelveGraphics = null,
        rightShelveGraphics = null,
        shelveSlotMatrixGraphics = null,
        markersGraphics = null,
        ceilingWallMarkersGraphics = null,
        floorWallMarkersGraphics = null,
        rearWallMarkersGraphics = null,
        leftWallMarkersGraphics = null,
        rightWallMarkersGraphics = null,
        rightShelveMarkersGraphics = null,
        leftShelveMarkersGraphics = null,
        otherGraphics = null,
        windowGraphics = null,
        colorPickerGraphics = null,
        toolBoxGraphics = null,

        toolBox = null,
        colorPicker = null,
        colorSwatches = null,
        horzBaffleObj = null,
        vertBaffleObj = null,
        horzBeamObj = null,
        vertBeamObj = null,
        drawerObj = null,
        tieObj = null,
        shoesObj = null,
        trouserObj = null,
        hangerObj = null,
        pantographObj = null,

        // data objects
        matrixPos = null,
        indexes = null,

        // text
        msgLabel = null,

        // strings
        shelveCssColor = "",
        currentPartType = "",

        // numbers
        currentMaterialColor = 0,
        currentDarkerMatColor = 0,
        currentEdgeColor = 0,

        thickness = 0,
        thicknessPx = 0,
        fullWidth = 0,
        fullWidthPx = 0,
        frameX = 0,
        frameY = 0,
        cupboardWidth = 0,
        cupboardWidthPx = 0,
        cupboardHeight = 0,
        cupboardHeightPx = 0,
        cupboardDepth = 0,
        cupboardDepthPx = 0,
        leftShelveWidth = 0,
        leftShelveWidthPx = 0,
        rightShelveWidth = 0,
        rightShelveWidthPx = 0,
        maxNumOfShelves = 0,
        maxNumOfInnerShelves = 0,
        maxNumOfBeams = 0,

        row = 0,
        column = 0,
        rowShift = 0,
        colShift = 0,

        // booleans
        floorChkBox = true,
        ceilingChkBox = true,
        rearChkBox = true,
        leftShelveChkBox = true,
        rightShelveChkBox = true,
        standChkBox = true,
        standLeftChkBox = true,
        standRightChkBox = true,
        showLeftWall = true,
        showRightWall = true,
        swatchesShown = false,
        updateApp = false,
        enableHorzSlotArray = false,
        enableVertSlotArray = false,
        enableSlotMatrix = false,
        drawPart = true,

        // arrays
        leftWallPoints = [],
        rightWallPoints = [],
        topWallPoints = [],
        bottomWallPoints = [],
        leftShelvesArr = [],
        innerSlotTwoDimArray = [],
        horzInnerShelveSlots = [],
        vertInnerShelveSlots = [],

        // objects
        fcdo = {};

    return {

        init: function () {
            thisObject = this;
            gameObject = frnConstr.gameObject;
            thisObject.screenObjects = gameObject.add.group();
            thisObject.redrawnObjects = gameObject.add.group();
            thisObject.topObjects = gameObject.add.group();

            fcdo = frnConstr.getFrnConstrDataObject();

            console.log(fcdo);

            if (!utils.isTruthy(shelveCssColor)) {
                shelveCssColor = frnConst.Application.DEFAULT_MATERIAL_COLOR;
            }
        },

        create: function () {
            thisObject.drawWardrobe();
            frnConstr.fadeInGroup(thisObject.redrawnObjects);
        },

        update: function () {
            var newX = 0, newY = 0,
                i = 0, j = 0,
                leftShelvesData = {},
                leftShelves = [],
                leftShelveSlots = [],
                rightShelvesData = {},
                rightShelves = [],
                rightShelveSlots = [];

            if (updateApp) {

                newX = gameObject.input.mousePointer.x;
                newY = gameObject.input.mousePointer.y;

                if (utils.isTruthy(hangerObj)) {

                    hangerObj.x = newX;
                    hangerObj.y = newY;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForHanger(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col,
                                constGr.HANGER_WIDTH, constGr.HANGER_HEIGHT);

                            rowShift = utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.HANGER_HEIGHT);
                            colShift = utils.rowOrColShiftMax(indexes.col - 1, fcdo.maxNumOfBeams, constGr.HANGER_WIDTH);// TODO check why with (indexes.col - 1) it works

                            drawPart = ismUtils
                                .searchEmptySpaceForHanger(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols,
                                    constGr.HANGER_WIDTH,
                                    constGr.HANGER_HEIGHT);

                            ismUtils
                                .highlightSlotsForAreaParts(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    rowShift, colShift,
                                    utils.rowOrColSet(indexes.row, rowShift), utils.rowOrColSet(indexes.col, colShift));

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart && utils.isTruthy(indexes)) {

                            rowShift = indexes.row + utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.HANGER_HEIGHT);
                            colShift = indexes.col + indexes.numCols;

                            ismUtils.addAreaPart(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                indexes.numCols, constAppKeys.HANGER_KEY,
                                constGr.HANGER_HEIGHT);

                            grUtils.drawAreaPart(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.WHITE, constAppKeys.HANGER_KEY, constAppKeys.HANGER_KEY);

                            fcdo.constrData.partCoords.hangers.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        hangerObj.destroy();
                        hangerObj = null;

                    }
                }

                if (utils.isTruthy(trouserObj)) {

                    trouserObj.x = newX;
                    trouserObj.y = newY;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForTieShoesTrouser(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col,
                                constGr.TROUSER_WIDTH, constGr.TROUSER_HEIGHT);

                            rowShift = utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.TROUSER_HEIGHT);
                            colShift = utils.rowOrColShiftMax(indexes.col - 1, fcdo.maxNumOfBeams, constGr.TROUSER_WIDTH);// TODO check why with (indexes.col - 1) it works

                            drawPart = ismUtils
                                .searchEmptySpaceForAreaParts(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols,
                                    fcdo.constrData.leftWall.enabled,
                                    fcdo.constrData.rightWall.enabled,
                                    constGr.TROUSER_WIDTH,
                                    constGr.TROUSER_HEIGHT);

                            ismUtils
                                .highlightSlotsForAreaParts(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    rowShift, colShift,
                                    utils.rowOrColSet(indexes.row, rowShift), utils.rowOrColSet(indexes.col, colShift));

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = indexes.row + utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.TROUSER_HEIGHT);
                            colShift = indexes.col + indexes.numCols;

                            ismUtils.addAreaPart(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                indexes.numCols, constAppKeys.TROUSER_KEY,
                                constGr.TROUSER_HEIGHT);

                            grUtils.drawAreaPart(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.RED, constAppKeys.TROUSER_KEY, constAppKeys.TROUSER_KEY);

                            fcdo.constrData.partCoords.trousers.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        trouserObj.destroy();
                        trouserObj = null;

                    }
                }

                if (utils.isTruthy(shoesObj)) {

                    shoesObj.x = newX;
                    shoesObj.y = newY;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForTieShoesTrouser(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col,
                                constGr.SHOES_WIDTH, constGr.SHOES_HEIGHT);

                            rowShift = utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.SHOES_HEIGHT);
                            colShift = utils.rowOrColShiftMax(indexes.col - 1, fcdo.maxNumOfBeams, constGr.SHOES_WIDTH);// TODO check why with (indexes.col - 1) it works

                            drawPart = ismUtils
                                .searchEmptySpaceForAreaParts(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols,
                                    fcdo.constrData.leftWall.enabled,
                                    fcdo.constrData.rightWall.enabled,
                                    constGr.SHOES_WIDTH,
                                    constGr.SHOES_HEIGHT);

                            ismUtils
                                .highlightSlotsForAreaParts(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    rowShift, colShift,
                                    utils.rowOrColSet(indexes.row, rowShift), utils.rowOrColSet(indexes.col, colShift));

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = indexes.row + utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.SHOES_HEIGHT);
                            colShift = indexes.col + indexes.numCols;

                            ismUtils.addAreaPart(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                indexes.numCols, constAppKeys.SHOES_KEY,
                                constGr.SHOES_HEIGHT);

                            grUtils.drawAreaPart(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.GREEN, constAppKeys.SHOES_KEY, constAppKeys.SHOES_KEY);

                            fcdo.constrData.partCoords.shoes.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        shoesObj.destroy();
                        shoesObj = null;

                    }
                }

                if (utils.isTruthy(tieObj)) {

                    tieObj.x = newX;
                    tieObj.y = newY;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForTieShoesTrouser(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col,
                                constGr.TIE_WIDTH, constGr.TIE_HEIGHT);

                            rowShift = utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.TIE_HEIGHT);
                            colShift = utils.rowOrColShiftMax(indexes.col - 1, fcdo.maxNumOfBeams, constGr.TIE_WIDTH);// TODO check why with (indexes.col - 1) it works

                            drawPart = ismUtils
                                .searchEmptySpaceForAreaParts(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols,
                                    fcdo.constrData.leftWall.enabled,
                                    fcdo.constrData.rightWall.enabled,
                                    constGr.TIE_WIDTH,
                                    constGr.TIE_HEIGHT);

                            ismUtils
                                .highlightSlotsForAreaParts(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    rowShift, colShift,
                                    utils.rowOrColSet(indexes.row, rowShift), utils.rowOrColSet(indexes.col, colShift));

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart  && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = indexes.row + utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfShelves, constGr.TIE_HEIGHT);
                            colShift = indexes.col + indexes.numCols;

                            ismUtils.addAreaPart(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                indexes.numCols, constAppKeys.TIE_KEY,
                                constGr.TIE_HEIGHT);

                            grUtils.drawAreaPart(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.BLUE, constAppKeys.TIE_KEY, constAppKeys.TIE_KEY);

                            fcdo.constrData.partCoords.ties.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        tieObj.destroy();
                        tieObj = null;
                    }

                }

                if (utils.isTruthy(pantographObj)) {

                    pantographObj.x = newX;
                    pantographObj.y = newY;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForDrawerOrPtgr(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col,
                                constGr.PTGR_MAX_HEIGHT);

                            rowShift = utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.PTGR_MAX_HEIGHT);

                            drawPart = ismUtils
                                .searchEmptySpaceForDrawerOrPtgr(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols,
                                    constGr.PTGR_MIN_WIDTH, constGr.PTGR_MAX_WIDTH,
                                    constGr.PTGR_MIN_HEIGHT, constGr.PTGR_MAX_HEIGHT);

                            ismUtils
                                .highlightSlots(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    rowShift, indexes.numCols,
                                    utils.rowOrColSet(indexes.row, rowShift), []);

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = indexes.row + utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfShelves, constGr.PTGR_MAX_HEIGHT);
                            colShift = indexes.col + indexes.numCols;

                            ismUtils.addDrawerOrPtgr(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                indexes.numCols,
                                constGr.PTGR_MAX_HEIGHT, constAppKeys.PANTOGRAPH_KEY);

                            grUtils.drawDrawerOrPtgr(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.YELLOW, constAppKeys.DRAWER_KEY,
                                constAppKeys.PANTOGRAPH_KEY, constGr.PTGR_MAX_HEIGHT);

                            fcdo.constrData.partCoords.pantographs.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        pantographObj.destroy();
                        pantographObj = null;
                    }
                }

                if (utils.isTruthy(drawerObj)) {

                    drawerObj.x = newX;
                    drawerObj.y = newY;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForDrawerOrPtgr(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col,
                                constGr.DRAWER_MAX_HEIGHT);

                            rowShift = utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfInnerShelves, constGr.DRAWER_MAX_HEIGHT);

                            drawPart = ismUtils
                                .searchEmptySpaceForDrawerOrPtgr(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols,
                                    constGr.DRAWER_MIN_WIDTH, constGr.DRAWER_MAX_WIDTH,
                                    constGr.DRAWER_MIN_HEIGHT, constGr.DRAWER_MAX_HEIGHT);

                            ismUtils
                                .highlightSlots(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    rowShift, indexes.numCols,
                                    utils.rowOrColSet(indexes.row, rowShift), []);

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart  && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = indexes.row + utils.rowOrColShiftMax(indexes.row, fcdo.maxNumOfShelves, constGr.DRAWER_MAX_HEIGHT);
                            colShift = indexes.col + indexes.numCols;

                            ismUtils.addDrawerOrPtgr(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                indexes.numCols,
                                constGr.DRAWER_MAX_HEIGHT, constAppKeys.DRAWER_KEY);

                            grUtils.drawDrawerOrPtgr(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.DARK_GRAY, constAppKeys.DRAWER_KEY,
                                constAppKeys.DRAWER_KEY);

                            fcdo.constrData.partCoords.drawers.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        drawerObj.destroy();
                        drawerObj = null;

                    }
                }

                if (utils.isTruthy(vertBeamObj)) {

                    vertBeamObj.x = newX;
                    vertBeamObj.y = newY;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForVertBaffle(fcdo.constrData.shelveSlotMatrix, matrixPos.row, matrixPos.col);

                            drawPart = ismUtils
                                .searchEmptySpaceForVertBeam(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numRows);

                            ismUtils
                                .highlightSlots(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    indexes.numRows, 1,
                                    [], [indexes.col]);

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart  && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = utils.zeroBasedRange((indexes.row + indexes.numRows), indexes.row, fcdo.maxNumOfShelves);
                            colShift = indexes.col + 1;

                            ismUtils.addAreaOfParts(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                rowShift, colShift,
                                constAppKeys.VERT_BEAM_KEY);

                            grUtils.drawVerticalBeam(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.DARK_GRAY, constAppKeys.VERT_BEAM_KEY,
                                constAppKeys.VERT_BEAM_KEY);

                            fcdo.constrData.partCoords.vertBeams.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        vertBeamObj.destroy();
                        vertBeamObj = null;
                    }
                }

                if (utils.isTruthy(vertBaffleObj)) {

                    vertBaffleObj.x = newX - 10;
                    vertBaffleObj.y = utils.decimalRound(newY - (vertBaffleObj.height / 2), frnConst.DECIMAL_ROUND_EXP);

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForVertBaffle(fcdo.constrData.shelveSlotMatrix, matrixPos.row, matrixPos.col);

                            drawPart = ismUtils
                                .searchEmptySpaceForVertBaffle(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numRows);

                            ismUtils
                                .highlightSlots(
                                    innerSlotTwoDimArray,
                                    drawPart,
                                    indexes.row, indexes.col,
                                    indexes.numRows, 1,
                                    [], [indexes.col]);

                        } else {
                            this.resetState();
                        }

                    }  else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart  && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = utils.zeroBasedRange((indexes.row + indexes.numRows), indexes.row, fcdo.maxNumOfShelves);
                            colShift = indexes.col + 1;

                            ismUtils.addAreaOfParts(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                rowShift, colShift,
                                constAppKeys.VERT_BAFFLE_KEY);

                            grUtils.drawVerticalBeam(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                utils.getHexColor(shelveCssColor), constAppKeys.VERT_BAFFLE_KEY,
                                constAppKeys.VERT_BAFFLE_KEY);

                            fcdo.constrData.partCoords.vertBaffles.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        vertBaffleObj.destroy();
                        vertBaffleObj = null;
                    }
                }

                if (utils.isTruthy(horzBeamObj)) {

                    horzBeamObj.x = newX - utils.decimalRound((horzBeamObj.width / 2), frnConst.DECIMAL_ROUND_EXP);
                    horzBeamObj.y = utils.decimalRound(newY - (horzBeamObj.height / 2), frnConst.DECIMAL_ROUND_EXP);

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForHorzBaffle(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col);

                            drawPart = ismUtils
                                .searchEmptySpaceForHorzBeam(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols);

                            ismUtils
                                .highlightSlots(
                                    innerSlotTwoDimArray,
                                    drawPart, indexes.row,
                                    indexes.col,
                                    1, indexes.numCols,
                                    [indexes.row], []);

                        } else {
                            this.resetState();
                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = utils.zeroBasedRange((indexes.row + constGr.HORZ_BEAM_SPACE), 0, fcdo.maxNumOfShelves);
                            colShift = utils.zeroBasedRange((indexes.col + indexes.numCols), indexes.col, fcdo.maxNumOfBeams);

                            ismUtils.addAreaOfParts(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                rowShift, colShift,
                                constAppKeys.HORZ_BEAM_KEY);

                            grUtils.drawHorizontalBeam(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                constGr.Colors.DARK_GRAY, constAppKeys.HORZ_BEAM_KEY, constAppKeys.HORZ_BEAM_KEY);

                            fcdo.constrData.partCoords.horzBeams.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        this.resetState();
                        horzBeamObj.destroy();
                        horzBeamObj = null;

                    }
                }

                if (utils.isTruthy(horzBaffleObj)) {

                    horzBaffleObj.x = newX;
                    horzBaffleObj.y = newY;

                    leftShelvesData = fcdo.constrData.leftShelveWall.shelvesData;
                    leftShelves = leftShelvesData.shelves;
                    leftShelveSlots = leftShelveGraphics.getChildAt(1).children;

                    rightShelvesData = fcdo.constrData.rightShelveWall.shelvesData;
                    rightShelves = rightShelvesData.shelves;
                    rightShelveSlots = rightShelveGraphics.getChildAt(1).children;

                    if (gameObject.input.mousePointer.isDown) {

                        matrixPos = grUtils.slotContainsPt(innerSlotTwoDimArray, {x: newX, y: newY});

                        if (matrixPos.row !== -1 && matrixPos.col !== -1) {

                            indexes = ismUtils.searchRangeForHorzBaffle(
                                fcdo.constrData.shelveSlotMatrix,
                                matrixPos.row, matrixPos.col);

                            drawPart = ismUtils
                                .searchEmptySpaceForHorzBaffle(
                                    fcdo.constrData.shelveSlotMatrix,
                                    indexes.row, indexes.col,
                                    indexes.numCols);

                            ismUtils
                                .highlightSlots(
                                    innerSlotTwoDimArray,
                                    drawPart, indexes.row,
                                    indexes.col,
                                    1, indexes.numCols,
                                    [indexes.row], []);

                        } else {
                            this.resetState();
                        }

                        if (fcdo.constrData.leftWall.enabled) {

                            if (fcdo.constrData.leftShelveWall.enabled) {

                                for (i = 0; i < leftShelveSlots.length; i += 1) {

                                    if (grUtils.geoObjContainsPt(leftShelveSlots[i], newX, newY)) {
                                        leftShelveSlots[i].alpha = 0.5;

                                        if (leftShelves[i].busy) {
                                            leftShelveSlots[i].tint = constGr.Colors.RED;
                                        } else {
                                            leftShelveSlots[i].tint = constGr.Colors.GREEN;
                                        }

                                    } else {
                                        leftShelveSlots[i].alpha = 0.0;
                                    }

                                }

                            }
                        }

                        if (fcdo.constrData.rightWall.enabled && fcdo.constrData.rightShelveWall.enabled) {

                            for (i = 0; i < rightShelveSlots.length; i += 1) {

                                if (grUtils.geoObjContainsPt(rightShelveSlots[i], newX, newY)) {
                                    rightShelveSlots[i].alpha = 0.5;

                                    if (rightShelves[i].busy) {
                                        rightShelveSlots[i].tint = constGr.Colors.RED;
                                    } else {
                                        rightShelveSlots[i].tint = constGr.Colors.GREEN;
                                    }

                                } else {
                                    rightShelveSlots[i].alpha = 0.0;
                                }

                            }

                        }

                    } else if (gameObject.input.mousePointer.isUp) {

                        if (drawPart && utils.isTruthy(indexes) &&
                            matrixPos.row !== -1 && matrixPos.col !== -1) {

                            rowShift = indexes.row + 1;
                            colShift = utils.zeroBasedRange(
                                    (indexes.col + indexes.numCols),
                                    indexes.col, fcdo.maxNumOfBeams);

                            ismUtils.addAreaOfParts(
                                fcdo.constrData.shelveSlotMatrix,
                                indexes.row, indexes.col,
                                rowShift, colShift,
                                constAppKeys.HORZ_BAFFLE_KEY);

                            grUtils.drawHorizontalBeam(fcdo, shelveSlotMatrixGraphics,
                                indexes.row, indexes.col, rowShift, colShift, innerSlotTwoDimArray,
                                utils.getHexColor(shelveCssColor), constAppKeys.HORZ_BAFFLE_KEY, constAppKeys.HORZ_BAFFLE_KEY);

                            fcdo.constrData.partCoords.horzBaffles.push({row: indexes.row, col: indexes.col, rowShift: rowShift, colShift: colShift});
                            frnConstr.saveStorageData(fcdo);
                        }

                        if (fcdo.constrData.leftWall.enabled && fcdo.constrData.leftShelveWall.enabled) {

                            for (i = 0; i < leftShelveSlots.length; i += 1) {
                                if (grUtils.geoObjContainsPt(leftShelveSlots[i], newX, newY)) {
                                    if (!leftShelves[i].busy) {

                                        leftShelves[i].busy = true;

                                        leftShelveMarkersGraphics = grUtils.makeNewGraphicsObject(leftShelveMarkersGraphics, 0, 0, "leftShelveMarkers", markersGraphics);

                                        leftShelveGraphics = grUtils.makeNewGraphicsObject(leftShelveGraphics, frameX, frameY, "leftShelve", constructorGraphics);

                                        grUtils.drawShelveWallAndShadow(fcdo.constrData.leftShelveWall, leftShelveGraphics, leftShelveMarkersGraphics);

                                        grUtils.drawAllShelves(leftShelvesData, leftShelveGraphics, leftShelveMarkersGraphics, true);

                                        grUtils.drawMarkers(true, leftShelveMarkersGraphics);

                                        frnConstr.saveStorageData(fcdo);
                                    }
                                }
                            }
                        }

                        if (fcdo.constrData.rightWall.enabled && fcdo.constrData.rightShelveWall.enabled) {

                            for (i = 0; i < rightShelveSlots.length; i += 1) {
                                if (grUtils.geoObjContainsPt(rightShelveSlots[i], newX, newY)) {
                                    if (!rightShelves[i].busy) {

                                        rightShelves[i].busy = true;

                                        rightShelveMarkersGraphics = grUtils.makeNewGraphicsObject(rightShelveMarkersGraphics, 0, 0, "rightShelveMarkers", markersGraphics);

                                        rightShelveGraphics = grUtils.makeNewGraphicsObject(rightShelveGraphics, frameX, frameY, "rightShelve", constructorGraphics);

                                        grUtils.drawShelveWallAndShadow(fcdo.constrData.rightShelveWall, rightShelveGraphics, rightShelveMarkersGraphics);

                                        grUtils.drawAllShelves(rightShelvesData, rightShelveGraphics, rightShelveMarkersGraphics, false);

                                        grUtils.drawMarkers(false, rightShelveMarkersGraphics);

                                        frnConstr.saveStorageData(fcdo);
                                    }

                                }
                            }
                        }

                        this.resetState();
                        horzBaffleObj.destroy();
                        horzBaffleObj = null;
                    }
                }
            }
        },

        shutdown: function () {
            thisObject.screenObjects = null;
            gameObject = null;
        },

        getInnerSlotTwoDimArray: function () {
            return innerSlotTwoDimArray;
        },

        setHorzBaffleObject: function (obj) {
            horzBaffleObj = obj;
            currentPartType = constAppKeys.HORZ_BAFFLE_KEY;
        },

        setVertBaffleObject: function (obj) {
            vertBaffleObj = obj;
            currentPartType = constAppKeys.VERT_BAFFLE_KEY;
        },

        setHorzBeamObject: function (obj) {
            horzBeamObj = obj;
            currentPartType = constAppKeys.HORZ_BEAM_KEY;
        },

        setVertBeamObject: function (obj) {
            vertBeamObj = obj;
            currentPartType = constAppKeys.VERT_BEAM_KEY;
        },

        setDrawerObject: function (obj) {
            drawerObj = obj;
            currentPartType = constAppKeys.DRAWER_KEY;
        },

        setTieObject: function (obj) {
            tieObj = obj;
            currentPartType = constAppKeys.TIE_KEY;
        },

        setShoesObject: function (obj) {
            shoesObj = obj;
            currentPartType = constAppKeys.SHOES_KEY;
        },

        setTrouserObject: function (obj) {
            trouserObj = obj;
            currentPartType = constAppKeys.TROUSER_KEY;
        },

        setHangerObject: function (obj) {
            hangerObj = obj;
            currentPartType = constAppKeys.HANGER_KEY;
        },

        setPantographObject: function (obj) {
            pantographObj = obj;
            currentPartType = constAppKeys.PANTOGRAPH_KEY;
        },

        resetState: function () {
            drawPart = true;
            indexes = null;
            currentPartType = "";
            rowShift = 0;
            colShift = 0;
        },

        drawWardrobe: function () {
            var r = 0,
                c = 0,
                partCoord = {};

            // app settings
            updateApp = false;

            fcdo = pdUtils.processData(fcdo, shelveCssColor, fcdo.millsPerPixel);

            fcdo.currentMaterialColor = utils.getColor(constAppKeys.MATERIAL_COLOR_KEY, shelveCssColor);
            currentMaterialColor = fcdo.currentMaterialColor;

            fcdo.currentDarkerMatColor = utils.getColor(constAppKeys.DARKER_COLOR_KEY, shelveCssColor);
            currentDarkerMatColor = fcdo.currentDarkerMatColor;

            fcdo.currentEdgeColor = utils.getColor(constAppKeys.EDGE_COLOR_KEY, shelveCssColor);
            currentEdgeColor = fcdo.currentEdgeColor;

            frameX = fcdo.frameX;
            frameY = fcdo.frameY;
            thickness = fcdo.thickness;
            thicknessPx = fcdo.thicknessPx;
            fullWidth = fcdo.fullWidth;
            fullWidthPx = fcdo.fullWidthPx;

            cupboardWidth = fcdo.cupboardWidth;
            cupboardWidthPx = fcdo.cupboardWidthPx;

            cupboardHeight = fcdo.cupboardHeight;
            cupboardHeightPx = fcdo.cupboardHeightPx;

            cupboardDepth = fcdo.cupboardDepth;
            cupboardDepthPx = fcdo.cupboardDepthPx;

            leftShelveWidth = fcdo.leftShelveWidth;
            leftShelveWidthPx = fcdo.leftShelveWidthPx;

            rightShelveWidth = fcdo.rightShelveWidth;
            rightShelveWidthPx = fcdo.rightShelveWidthPx;

            maxNumOfShelves = fcdo.maxNumOfShelves;
            maxNumOfInnerShelves = fcdo.maxNumOfInnerShelves;
            maxNumOfBeams = fcdo.maxNumOfBeams;

            // visual objects initialization
            constructorGraphics = grUtils.makeNewGraphicsObject(constructorGraphics, 0, 0, "constructor", gameObject.world);
            constructorGraphics.inputEnabled = true;
            constructorGraphics.input.enableDrag();

            // marker graphics
            markersGraphics = grUtils.makeNewGraphicsObject(markersGraphics, 0, 0, "markersGraphics", constructorGraphics);
            ceilingWallMarkersGraphics = grUtils.makeNewGraphicsObject(ceilingWallMarkersGraphics, 0, 0, "ceilingWallMarkers", markersGraphics);
            floorWallMarkersGraphics = grUtils.makeNewGraphicsObject(floorWallMarkersGraphics, 0, 0, "floorWallMarkers", markersGraphics);
            rearWallMarkersGraphics = grUtils.makeNewGraphicsObject(rearWallMarkersGraphics, 0, 0, "rearWallMarkers", markersGraphics);
            leftWallMarkersGraphics = grUtils.makeNewGraphicsObject(leftWallMarkersGraphics, 0, 0, "leftWallMarkers", markersGraphics);
            rightWallMarkersGraphics = grUtils.makeNewGraphicsObject(rightWallMarkersGraphics, 0, 0, "rightWallMarkers", markersGraphics);
            leftShelveMarkersGraphics = grUtils.makeNewGraphicsObject(leftShelveMarkersGraphics, 0, 0, "leftShelveMarkers", markersGraphics);
            rightShelveMarkersGraphics = grUtils.makeNewGraphicsObject(rightShelveMarkersGraphics, 0, 0, "rightShelveMarkers", markersGraphics);

            // constructor graphics
            rearWallGraphics = grUtils.makeNewGraphicsObject(rearWallGraphics, frameX, frameY, "rearWall", constructorGraphics);
            leftWallGraphics = grUtils.makeNewGraphicsObject(leftWallGraphics, frameX, frameY, "leftWall", constructorGraphics);
            rightWallGraphics = grUtils.makeNewGraphicsObject(rightWallGraphics, frameX, frameY, "rightWall", constructorGraphics);
            ceilingWallGraphics = grUtils.makeNewGraphicsObject(ceilingWallGraphics, frameX, frameY, "ceilingWall", constructorGraphics);
            floorWallGraphics = grUtils.makeNewGraphicsObject(floorWallGraphics, frameX, frameY, "floorWall", constructorGraphics);
            leftShelveGraphics = grUtils.makeNewGraphicsObject(leftShelveGraphics, frameX, frameY, "leftShelve", constructorGraphics);
            rightShelveGraphics = grUtils.makeNewGraphicsObject(rightShelveGraphics, frameX, frameY, "rightShelve", constructorGraphics);
            shelveSlotMatrixGraphics = grUtils.makeNewGraphicsObject(shelveSlotMatrixGraphics, frameX, frameY, "shelveSlotMatrix", constructorGraphics);

            // add color picker
            colorPickerGraphics = grUtils.makeNewGraphicsObject(colorPickerGraphics, 700, 150, "colorPicker", gameObject.world);
            colorPicker = grUtils.drawColorPicker(colorPickerGraphics, 0, 0, shelveCssColor, constGr.Colors.Material, swatchesShown, thisObject.changeWardrobeColor);

            // add toolbox
            toolBoxGraphics = grUtils.makeNewGraphicsObject(toolBoxGraphics, 10, 10, "toolBox", gameObject.world);
            toolBox = grUtils.drawFrnPartsToolBox(fcdo, toolBoxGraphics, 0, 0, 350, 70, toolBoxGraphics, shelveCssColor, thicknessPx);

            // add validation window
            windowGraphics = grUtils.makeNewGraphicsObject(windowGraphics, 0, 0, "window", gameObject.world);
            if (frnConstr.getValidationMsg() !== "") {
                grUtils.drawMessageWindow(constGr.VALIDATION_WINDOW_TITLE,
                                        frnConstr.getValidationMsg(),
                                        windowGraphics,
                                        0,
                                        0,
                                        constGr.DEFAULT_VALIDATION_WINDOW_WIDTH,
                                        325,
                                        10,
                                        1,
                                        constGr.Colors.DEFAULT_EDGE_COLOR,
                                        1,
                                        constGr.Colors.WHITE,
                                        1,
                                        constGr.Colors.DARK_GRAY,
                                        1);
            }

            otherGraphics = grUtils.makeNewGraphicsObject(otherGraphics, 0, 0, "other", gameObject.world);
            grUtils.drawRect(otherGraphics, 0, 0, gameObject.world.width, gameObject.world.height, 0, constGr.Colors.DEFAULT_EDGE_COLOR, 0, constGr.Colors.BACKGROUND_COLOR, 1, "background");
            otherGraphics.inputEnabled = true;
            otherGraphics.events.onInputUp.add(function () {
                if (swatchesShown) {

                    colorSwatches.destroy();
                    swatchesShown = false;

                }
                if (utils.isTruthy(msgLabel)) {
                    msgLabel.text = "";
                }
            }, otherGraphics);

            msgLabel = grUtils.drawText(otherGraphics, 20, gameObject.world.height - 20, "", utils.getTextStyle10Red(), "messageLabel");

            // rear wall
            if (fcdo.constrData.rearWall.enabled) {

                grUtils.drawRearWall(fcdo.constrData.rearWall, rearWallGraphics);

            }

            // left wall
            if (fcdo.constrData.leftWall.enabled) {

                grUtils.drawLeftOrRightWall(fcdo.constrData.leftWall, leftWallGraphics, leftWallMarkersGraphics);

                // left shelve
                if (fcdo.constrData.leftShelveWall.enabled) {

                    grUtils.drawShelveWallAndShadow(fcdo.constrData.leftShelveWall, leftShelveGraphics, leftShelveMarkersGraphics);

                    grUtils.drawAllShelves(fcdo.constrData.leftShelveWall.shelvesData, leftShelveGraphics, leftShelveMarkersGraphics, true);

                    grUtils.drawMarkers(true, leftShelveMarkersGraphics);

                }
            }

            // right wall
            if (fcdo.constrData.rightWall.enabled) {

                grUtils.drawLeftOrRightWall(fcdo.constrData.rightWall, rightWallGraphics, leftWallMarkersGraphics);

                // right shelve
                if (fcdo.constrData.rightShelveWall.enabled) {

                    grUtils.drawShelveWallAndShadow(fcdo.constrData.rightShelveWall, rightShelveGraphics, rightShelveMarkersGraphics);

                    grUtils.drawAllShelves(fcdo.constrData.rightShelveWall.shelvesData, rightShelveGraphics, rightShelveMarkersGraphics, false);

                    grUtils.drawMarkers(false, rightShelveMarkersGraphics);

                }
            }

            grUtils.drawTopBottomMarker(
                                        ceilingWallMarkersGraphics,
                                        fcdo.artmTree.frameX.value + fcdo.artmTree.frameX.sumLeftShelveWidthPx.value,
                                        2 * fcdo.artmTree.frameY.value - constGr.DEFAULT_TOP_MARKERS_Y_SHIFT,
                                        fcdo.artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value - fcdo.artmTree.frameX.sumLeftShelveWidthPx.value,
                                        constGr.DEFAULT_TOP_MARKERS_HEIGHT,
                                        constGr.DEFAULT_TOP_MARKERS_PERCENT,
                                        true,
                                        cupboardWidth.toString(),
                                        utils.getTextStyle10(),
                                            constGr.Colors.DEFAULT_EDGE_COLOR);

            grUtils.drawTopBottomMarker(
                                        floorWallMarkersGraphics,
                                        fcdo.artmTree.frameX.value + fcdo.artmTree.frameX.sumLeftShelveWidthPx.value,
                                        fcdo.artmTree.frameY.value - constGr.DEFAULT_TOP_MARKERS_Y_SHIFT + fcdo.artmTree.frameY.sumFrameHeight.value,
                                        fcdo.artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value - fcdo.artmTree.frameX.sumLeftShelveWidthPx.value,
                                        constGr.DEFAULT_TOP_MARKERS_HEIGHT,
                                        constGr.DEFAULT_TOP_MARKERS_PERCENT,
                                        false,
                                        cupboardWidth.toString(),
                                        utils.getTextStyle10Red(),
                                        constGr.Colors.RED);

            // depth markers
            grUtils.drawTopBottomMarker(
                                        ceilingWallMarkersGraphics,
                                        fcdo.artmTree.frameX.value + fcdo.artmTree.frameX.sumLeftShelveWidthPx.sumThicknessPx.value,
                                        2 * fcdo.artmTree.frameY.value - 45,
                                        (cupboardDepthPx / 2) + thicknessPx,
                                        65,
                                        constGr.DEFAULT_TOP_MARKERS_PERCENT,
                                        true,
                                        cupboardDepth.toString(),
                                        utils.getTextStyle10(),
                                        constGr.Colors.DEFAULT_EDGE_COLOR);

            grUtils.drawLeftRightMarker(
                                        rightWallMarkersGraphics,
                                        fcdo.artmTree.frameX.sumFullWidthPx.value + 5,
                                        fcdo.artmTree.frameY.doubleFrameY.value,
                                        rightShelveWidthPx + 70,
                                        cupboardHeightPx,
                                        constGr.DEFAULT_TOP_MARKERS_PERCENT,
                                        false,
                                        cupboardHeight.toString(),
                                        utils.getTextStyle10Red(),
                                        constGr.Colors.RED);

            // ceiling
            if (fcdo.constrData.ceiling.enabled) {

                grUtils.drawCeilOrFloorWall(fcdo.constrData.ceiling, ceilingWallGraphics);

            }

            // floor
            if (fcdo.constrData.floor.enabled) {

                grUtils.drawCeilOrFloorWall(fcdo.constrData.floor, floorWallGraphics);

            }

            innerSlotTwoDimArray = grUtils.drawShelveMatrix(fcdo, shelveSlotMatrixGraphics);

            thisObject.screenObjects.add(otherGraphics);
            thisObject.redrawnObjects.add(constructorGraphics);
            thisObject.topObjects.add(colorPickerGraphics);
            thisObject.topObjects.add(windowGraphics);

            constructorGraphics.setChildIndex(shelveSlotMatrixGraphics, constructorGraphics.children.length - 1);

            // draw horizontal baffles
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.horzBaffles, constAppKeys.HORZ_BAFFLE_KEY,
                constAppKeys.HORZ_BAFFLE_KEY, shelveSlotMatrixGraphics,
                utils.getHexColor(shelveCssColor));

            // draw horizontal beams
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.horzBeams, constAppKeys.HORZ_BEAM_KEY,
                constAppKeys.HORZ_BEAM_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.DARK_GRAY);

            // draw vertical baffles
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.vertBaffles, constAppKeys.VERT_BAFFLE_KEY,
                constAppKeys.VERT_BAFFLE_KEY, shelveSlotMatrixGraphics,
                utils.getHexColor(shelveCssColor));

            // draw vertical beams
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.vertBeams, constAppKeys.VERT_BEAM_KEY,
                constAppKeys.VERT_BEAM_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.DARK_GRAY);

            // draw drawers
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.drawers, constAppKeys.DRAWER_KEY,
                constAppKeys.DRAWER_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.DARK_GRAY);

            // draw pantographs
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.pantographs, constAppKeys.PANTOGRAPH_KEY,
                constAppKeys.PANTOGRAPH_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.YELLOW);

            // draw ties
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.ties, constAppKeys.TIE_KEY,
                constAppKeys.TIE_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.BLUE);

            // draw shoes
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.shoes, constAppKeys.SHOES_KEY,
                constAppKeys.SHOES_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.GREEN);

            // draw trousers
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.trousers, constAppKeys.TROUSER_KEY,
                constAppKeys.TROUSER_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.RED);

            // draw hangers
            grUtils.drawInnerParts(
                fcdo, innerSlotTwoDimArray,
                fcdo.constrData.partCoords.hangers, constAppKeys.HANGER_KEY,
                constAppKeys.HANGER_KEY, shelveSlotMatrixGraphics,
                constGr.Colors.WHITE);

            utils.printGrObjectsCount({
                world: gameObject.world,
                constrGr: constructorGraphics,
                markersGr: markersGraphics,
                leftWallGr: leftWallGraphics,
                rightWallGr: rightWallGraphics,
                ceilWallGr: ceilingWallGraphics,
                floorWallGr: floorWallGraphics,
                rearWallGr: rearWallGraphics,
                leftShelveGr: leftShelveGraphics,
                rightShelveGr: rightShelveGraphics,
                otherGr: otherGraphics,
                windowGr: windowGraphics,
                colorPickerGr: colorPickerGraphics
            });
            console.log(fcdo);

            frnConstr.saveStorageData(fcdo);

            updateApp = true;
            return fcdo;
        },

        changeWardrobeColor: function () {
            var rc = this.rectColor;

            shelveCssColor = rc;

            thisObject.drawWardrobe();
        }
    };
    }(window.FrnConstr, Phaser, $)));
