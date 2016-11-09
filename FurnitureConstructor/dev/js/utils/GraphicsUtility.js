window.FrnConstr.namespace('GraphicsUtility', {}, (function (frnConstr, phaser) {'use strict';
    var gameObject = frnConstr.gameObject,
        frnConst = frnConstr.Const,
        constGr = frnConst.Graphics,
        constApp = frnConst.Application,
        constAppKeys = constApp.Keys,
        utils = frnConstr.Utility,
        ismUtils = frnConstr.InnerSlotMatrixUtility;

    return {

        getChildByName: function (grObject, name) {
            var i = 0,
                children = grObject.children,
                child = null;

            for (i = 0; i < children.length; i += 1) {
                if (children[i].name === name) {console.log(name);
                    child = children[i];
                    break;
                }
            }

            return child;
        },

        graphicsBubleSort: function (prop, grObjectsArray, sortType) {
            var i = 0,
                temp = null,
                swapped = false;

            do {
                swapped = false;
                for (i = 0; i < grObjectsArray.length - 1; i += 1) {

                    if (sortType === phaser.Group.SORT_ASCENDING) {
                        if (grObjectsArray[i][prop] > grObjectsArray[i + 1][prop]) {
                            temp = grObjectsArray[i];
                            grObjectsArray[i] = grObjectsArray[i + 1];
                            grObjectsArray[i + 1] = temp;
                            swapped = true;
                        }
                    }

                    if (sortType === phaser.Group.SORT_DESCENDING) {
                        if (grObjectsArray[i][prop] < grObjectsArray[i + 1][prop]) {
                            temp = grObjectsArray[i];
                            grObjectsArray[i] = grObjectsArray[i + 1];
                            grObjectsArray[i + 1] = temp;
                            swapped = true;
                        }
                    }

                }
            } while (swapped);

            return grObjectsArray;
        },

        slotContainsPt: function (grSlotMatrix, point) {
            var i = 0,
                j = 0,
                result = {row: -1, col: -1};

            for (i = 0; i < grSlotMatrix.length; i += 1) {
                for (j = 0; j < grSlotMatrix[i].length; j += 1) {

                    if (this.geoObjContainsPt(grSlotMatrix[i][j], point.x, point.y)) {
                        result.row = i;
                        result.col = j;
                        break;
                    }

                }

                if (result.row !== -1 && result.col !== -1) {
                    break;
                }
            }

            return result;
        },

        geoObjContainsPt: function (geoObj, x, y) {
            return geoObj.getBounds().contains(x, y);
        },

        drawHorzInnerShelveSlots: function (fcdo, graphics) {
            var i = 0, x = 0, y = 0,
                width = fcdo.cupboardWidthPx,
                height = fcdo.innerShelveSlotHeight,
                slots = [],
                slot = null;

            for (i = 0; i < fcdo.maxNumOfInnerShelves; i += 1) {

                x = fcdo.artmTree.frameX.sumLeftShelveWidthPx.value;
                y = fcdo.artmTree.frameY.value + (i * fcdo.innerShelveSlotHeight);

                slot = this.drawSprite(frnConstr.ImageAssetKeys.SHELVE_SLOT,
                    x, y,
                    width, height,
                    0.0, constGr.Colors.BLUE,
                    "slot-" + i,
                    graphics);

                slots.push(slot);

            }

            return slots;
        },

        drawVertInnerShelveSlots: function (fcdo, graphics) {
            var i = 0, x = 0, y = 0,
                width = fcdo.innerShelveSlotHeight,
                height = fcdo.cupboardHeightPx,
                slots = [],
                slot = null;

            for (i = 0; i < fcdo.maxNumOfBeams; i += 1) {

                x = fcdo.artmTree.frameX.sumLeftShelveWidthPx.value + (i * fcdo.innerShelveSlotWidth);
                y = fcdo.artmTree.frameY.sumThicknessPx.value;

                slot = this.drawSprite(frnConstr.ImageAssetKeys.SHELVE_SLOT,
                    x, y,
                    width, height,
                    0.0, constGr.Colors.BLUE,
                    "slot-" + i,
                    graphics);

                slots.push(slot);

            }

            return slots;
        },

        drawShelveMatrix: function (fcdo, graphics) {
            var i = 0, j = 0,
                x = 0, y = 0,
                width = fcdo.innerShelveSlotWidth,
                height = fcdo.innerShelveSlotHeight,
                slots = [],
                slot = null;

            for (i = 0; i < fcdo.maxNumOfInnerShelves; i += 1) {

                slots[i] = [];
                y = fcdo.artmTree.frameY.value + (i * fcdo.innerShelveSlotHeight);

                for (j = 0; j < fcdo.maxNumOfBeams; j += 1) {

                    x = fcdo.artmTree.frameX.sumLeftShelveWidthPx.value + (j * fcdo.innerShelveSlotWidth);

                    slot = this.drawSprite(frnConstr.ImageAssetKeys.SHELVE_SLOT,
                        x, y,
                        width, height,
                        0.0, constGr.Colors.BLUE,
                        "slot-" + i + "-" + j,
                        graphics);

                    slots[i].push(slot);
                }

            }

            return slots;
        },

        drawText: function (graphics, x, y, text, styleObject, name) {
            var textLabel = gameObject.add.text(x, y, text, styleObject);

            graphics.addChild(textLabel);
            textLabel.name = (utils.isTruthy(name) ? (name + "Text") : ("text" + graphics.getChildIndex(textLabel)));

            return textLabel;
        },

        drawSprite: function (cacheKey, x, y, width, height, alpha, tint, name, parent) {
            var sprite = gameObject.add.sprite(x, y, cacheKey);

            sprite.width = width;
            sprite.height = height;
            sprite.alpha = alpha;
            sprite.tint = tint;
            sprite.name = name;

            if (utils.isTruthy(parent)) {
                parent.addChild(sprite);
            } else {
                gameObject.world.addChild(sprite);
            }

            return sprite;
        },

        drawRect: function (graphics, x, y, width, height, bSize, bColor, bAlpha, fColor, fAlpha, name) {
            var rect = gameObject.add.graphics(x, y);

            rect.lineStyle(bSize, bColor, bAlpha);
            rect.beginFill(fColor, fAlpha);
            rect.drawRect(0, 0, width, height);
            rect.endFill();

            graphics.addChild(rect);
            rect.name = (utils.isTruthy(name) ? (name + "Rect") : ("rect" + graphics.getChildIndex(rect)));

            return rect;
        },

        drawLine: function (graphics, x, y, destX, destY, bSize, bColor, bAlpha, name) {
            var line = gameObject.add.graphics(0, 0);

            line.lineStyle(bSize, bColor, bAlpha);
            line.moveTo(x, y);
            line.lineTo(destX, destY);

            graphics.addChild(line);
            line.name = (utils.isTruthy(name) ? (name + "Line") : ("line" + graphics.getChildIndex(line)));

            return line;
        },

        drawPolygon: function (graphics, pointsArray, bSize, bColor, bAlpha, fColor, fAlpha, name) {
            var polygon = gameObject.add.graphics(0, 0);

            polygon.lineStyle(bSize, bColor, bAlpha);
            polygon.beginFill(fColor, fAlpha);
            polygon.drawPolygon(pointsArray);
            polygon.endFill();

            graphics.addChild(polygon);
            polygon.name = (utils.isTruthy(name) ? (name + "Polygon") : ("polygon" + graphics.getChildIndex(polygon)));

            return polygon;
        },

        drawRoundedRect: function (graphics, x, y, width, height, radius, bSize, bColor, bAlpha, fColor, fAlpha, name) {
            var rect = gameObject.add.graphics(x, y);

            rect.lineStyle(bSize, bColor, bAlpha);
            rect.beginFill(fColor, fAlpha);
            rect.drawRoundedRect(0, 0, width, height, radius);
            rect.endFill();

            graphics.addChild(rect);
            rect.name = (utils.isTruthy(name) ? (name + "RoundRect") : ("roundRect" + graphics.getChildIndex(rect)));

            return rect;
        },

        drawVerticalBeam: function(fcdo, graphics, row, col, rowShift, colShift, slotMatrix, hexColor, name) {
            var i = 0,
                vertBeam = null,
                newInnexShelveX = 0,
                newInnerShelveY = 0,
                newInnerShelveEndX = 0,
                newInnerShelveEndY = 0,
                newInnerShelveWidth = 0,
                newInnerShelveHeight = 0;

            for (i = row; i < rowShift; i += 1) {
                slotMatrix[i][col].alpha = 0.0;
            }

            newInnexShelveX = slotMatrix[row][col].x;
            newInnerShelveY = slotMatrix[row][col].y;
            newInnerShelveEndY = slotMatrix[rowShift - 1][col].y;
            newInnerShelveWidth = fcdo.thicknessPx;
            newInnerShelveHeight = newInnerShelveEndY - newInnerShelveY + fcdo.innerShelveSlotHeight - fcdo.thicknessPx;

            vertBeam = this.drawRect(
                graphics,
                newInnexShelveX, newInnerShelveY + fcdo.thicknessPx,
                newInnerShelveWidth, newInnerShelveHeight,
                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.DEFAULT_EDGE_COLOR, 1,
                hexColor, 1, name + "-" + i);

            vertBeam.inputEnabled = true;
            vertBeam.input.useHandCursor = true;
            vertBeam.events.onInputDown.add(function() {
                console.log("vertBeam");
            }, vertBeam);

            return vertBeam;
        },

        drawHorizontalBeam: function(fcdo, graphics, row, col, rowShift, colShift, slotMatrix, hexColor, name, partType) {
            var i = 0,
                horzBeam = null,
                newInnexShelveX = 0,
                newInnerShelveY = 0,
                newInnerShelveEndX = 0,
                newInnerShelveWidth = 0,
                newInnerShelveHeight = 0,
                horzBflContextObject = this.makeBaffleContextObject(this,
                    0, 0, 50, fcdo.thicknessPx, utils.getHexColor(fcdo.shelveCssColor),
                    "horizontalBaffle", 'setHorzBaffleObject');

            for (i = col; i < colShift; i += 1) {
                slotMatrix[row][i].alpha = 0.0;
            }

            newInnexShelveX = slotMatrix[row][col].x;
            newInnerShelveY = slotMatrix[row][col].y;
            newInnerShelveEndX = slotMatrix[row][colShift - 1].x;
            newInnerShelveWidth = newInnerShelveEndX - newInnexShelveX + fcdo.innerShelveSlotWidth - fcdo.thicknessPx;
            newInnerShelveHeight = fcdo.thicknessPx;

            horzBeam = this.drawRect(
                graphics,
                newInnexShelveX + fcdo.thicknessPx, newInnerShelveY,
                newInnerShelveWidth, newInnerShelveHeight,
                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.DEFAULT_EDGE_COLOR, 1,
                hexColor, 1, name + "-" + i);
            horzBeam.inputEnabled = true;
            horzBeam.input.useHandCursor = true;
            horzBeam.events.onInputDown.add(function() {

                this.part.input.enableDrag(true);
                ismUtils.removeAreaOfParts(this.matrix, this.row, this.col, this.rowShift, this.colShift, this.partType);

            }, {
                part: horzBeam,
                callback: ismUtils.removeAreaOfParts,
                matrix: fcdo.constrData.shelveSlotMatrix,
                row: row,
                col: col,
                rowShift: rowShift,
                colShift: colShift,
                partType: partType,
                partHandle: "setHorzBaffleObject"
            });

            return horzBeam;
        },

        drawDrawerOrPtgr: function(fcdo, graphics, row, col, rowShift, colShift, slotMatrix, hexColor, name, partType) {
            var r = 0,
                c = 0,
                part = null,
                newInnexShelveX = 0,
                newInnerShelveY = 0,
                newInnerShelveEndX = 0,
                newInnerShelveWidth = 0,
                newInnerShelveHeight = 0;

            for (r = row; r < rowShift; r += 1) {
                for (c = col; c < colShift; c += 1) {
                    slotMatrix[r][c].alpha = 0.0;
                }
            }

            newInnexShelveX = slotMatrix[row][col].x;
            newInnerShelveY = slotMatrix[row][col].y + fcdo.thicknessPx;
            newInnerShelveEndX = slotMatrix[row][colShift - 1].x;
            newInnerShelveWidth = newInnerShelveEndX - newInnexShelveX + fcdo.innerShelveSlotWidth - fcdo.thicknessPx;
            newInnerShelveHeight = slotMatrix[rowShift][col].y - slotMatrix[row][col].y - fcdo.thicknessPx;

            part = this.drawRect(
                graphics,
                newInnexShelveX + fcdo.thicknessPx, newInnerShelveY,
                newInnerShelveWidth, newInnerShelveHeight,
                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.DEFAULT_EDGE_COLOR, 1,
                hexColor, 1, name);

            return part;
        },

        drawAreaPart: function(fcdo, graphics, row, col, rowShift, colShift, slotMatrix, hexColor, name, partType) {
            var r = 0,
                c = 0,
                part = null,
                newInnexShelveX = 0,
                newInnerShelveY = 0,
                newInnerShelveEndX = 0,
                newInnerShelveWidth = 0,
                newInnerShelveHeight = 0;

            for (r = row; r < rowShift; r += 1) {
                for (c = col; c < colShift; c += 1) {
                    slotMatrix[r][c].alpha = 0.0;
                }
            }

            newInnexShelveX = slotMatrix[row][col].x;
            newInnerShelveY = slotMatrix[row][col].y + fcdo.thicknessPx;
            newInnerShelveEndX = slotMatrix[row][colShift - 1].x;
            newInnerShelveWidth = newInnerShelveEndX - newInnexShelveX + fcdo.innerShelveSlotWidth - fcdo.thicknessPx;
            newInnerShelveHeight = slotMatrix[rowShift][col].y - slotMatrix[row][col].y - fcdo.thicknessPx;

            part = this.drawRect(
                graphics,
                newInnexShelveX + fcdo.thicknessPx, newInnerShelveY,
                newInnerShelveWidth, newInnerShelveHeight,
                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.DEFAULT_EDGE_COLOR, 1,
                hexColor, 1, name);

            return part;
        },

        toolBoxBaffleHandler: function () {
            var tool = this
                .grUtils
                .drawRect(this.context,
                    this.x, this.y,
                    this.width, this.height,
                    constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                    this.hexColor, 1,
                    this.name);

            frnConstr.EnteriorScreen[this.setToolFunc](tool);
        },

        toolBoxDrawerHandler: function () {
            var tool = this
                .grUtils
                .drawRect(this.context,
                    this.x, this.y,
                    this.width, this.height,
                    constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                    this.hexColor, 1,
                    this.name);

            frnConstr.EnteriorScreen[this.setToolFunc](tool);
        },

        makeBaffleContextObject: function(grContext, x, y, width, height, hexColor, name, setToolFunc) {
            return {
                context: grContext,
                grUtils: this,
                x: x,
                y: y,
                width: width,
                height: height,
                hexColor: hexColor,
                name: name,
                setToolFunc: setToolFunc
            };
        },

        drawFrnPartsToolBox: function (fcdo, graphics, x, y, width, height, grContext, shelveCssColor, thicknessPx) {
            var toolBox = null,
                rect = null,
                horizontalBaffleBtn = null,
                horzBflContextObject =
                    this.makeBaffleContextObject(grContext,
                        0, 0, 50, thicknessPx, utils.getHexColor(shelveCssColor),
                        "horizontalBaffle", 'setHorzBaffleObject'),
                verticalBaffleBtn = null,
                vertBflContextObject =
                    this.makeBaffleContextObject(grContext,
                        0, 0, thicknessPx, 50, utils.getHexColor(shelveCssColor),
                        "verticalBaffle", 'setVertBaffleObject'),
                horizontalBeamBtn = null,
                horzBeamContextObject = {
                    context: grContext, grUtils: this
                },
                verticalBeamBtn = null,
                vertBeamContextObject = {
                    context: grContext, grUtils: this
                },
                drawerBtn = null,
                drawerContextObject = this.makeBaffleContextObject(grContext,
                        0, 0, 100, (fcdo.innerShelveSlotHeight * 2), utils.getHexColor(constGr.Colors.Material.MAT_ANTIQUE_WHITE),
                        "drawer", 'setDrawerObject'),
                tieBtn = null,
                tieContextObject = this.makeBaffleContextObject(grContext,
                        0, 0, 50, (fcdo.innerShelveSlotHeight * 2), utils.getHexColor(constGr.Colors.Material.MAT_GREY),
                        "tie", 'setTieObject'),
                shoesBtn = null,
                shoesContextObject = this.makeBaffleContextObject(grContext,
                        0, 0, 50, (fcdo.innerShelveSlotHeight * 2), utils.getHexColor(constGr.Colors.Material.MAT_GREY),
                        "shoes", 'setShoesObject'),
                trouserBtn = null,
                trouserContextObject = this.makeBaffleContextObject(grContext,
                        0, 0, 50, (fcdo.innerShelveSlotHeight * 2), utils.getHexColor(constGr.Colors.Material.MAT_GREY),
                        "trouser", 'setTrouserObject'),
                hangerBtn = null,
                hangerContextObject = this.makeBaffleContextObject(grContext,
                        0, 0, 50, (fcdo.innerShelveSlotHeight * 2), utils.getHexColor(constGr.Colors.Material.MAT_GREY),
                        "hanger", 'setHangerObject'),
                pantographBtn = null,
                pantographContextObject = this.makeBaffleContextObject(grContext,
                        0, 0, 50, (fcdo.innerShelveSlotHeight * 2), utils.getHexColor(constGr.Colors.Material.MAT_GREY),
                        "pantograph", 'setPantographObject');

            toolBox = gameObject.add.graphics(x, y);

            // draw toolbox container rectangle
            /*rect = this.drawRoundedRect(toolBox,
                0, 0,
                width, height,
                15, constGr.DEFAULT_GRAPHICS_BORDER_SIZE,
                constGr.Colors.BLACK, 1,
                utils.getHexColor(constGr.Colors.Material.MAT_ANTIQUE_WHITE), 1,
                "toolBoxContainer");*/

            horizontalBaffleBtn = gameObject.add.button(5, 0, frnConstr.ImageAssetKeys.HORIZONTAL_BAFFLE);
            horizontalBaffleBtn.events.onInputDown.add(this.toolBoxBaffleHandler, horzBflContextObject);
            toolBox.addChild(horizontalBaffleBtn);

            verticalBaffleBtn = gameObject.add.button(82, 0, frnConstr.ImageAssetKeys.VERTICAL_BAFFLE);
            verticalBaffleBtn.events.onInputDown.add(this.toolBoxBaffleHandler, vertBflContextObject);
            toolBox.addChild(verticalBaffleBtn);

            horizontalBeamBtn = gameObject.add.button(159, 0, frnConstr.ImageAssetKeys.HORIZONTAL_BEAM);
            horizontalBeamBtn
                .events
                .onInputDown
                .add(function () {
                    var horzBeam = gameObject.add.graphics(x, y),
                        horzPart = this
                            .grUtils
                            .drawRect(this.context,
                                0, 5,
                                50, thicknessPx,
                                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                                constGr.Colors.DARK_GRAY, 1,
                                "horzBeamHorzPart"),
                        vertPartLeft = this
                            .grUtils
                            .drawRect(this.context,
                                0, 0,
                                thicknessPx, 10 + thicknessPx,
                                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                                constGr.Colors.DARK_GRAY, 1,
                                "horzBeamVertPartLeft"),
                        vertPartRight = this
                            .grUtils
                            .drawRect(this.context,
                                50 - thicknessPx, 0,
                                thicknessPx, 10 + thicknessPx,
                                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                                constGr.Colors.DARK_GRAY, 1,
                                "horzBeamVertPartRight");

                    horzBeam.name = "horizontalBeam";
                    horzBeam.addChild(vertPartLeft);
                    horzBeam.addChild(vertPartRight);
                    horzBeam.addChild(horzPart);
                    horzBeam.setChildIndex(horzPart, 0);

                    frnConstr.EnteriorScreen.setHorzBeamObject(horzBeam);

                 },
                 horzBeamContextObject);

            toolBox.addChild(horizontalBeamBtn);

            verticalBeamBtn = gameObject.add.button(236, 0, frnConstr.ImageAssetKeys.VERTICAL_BEAM);
            verticalBeamBtn
                .events
                .onInputDown
                .add(function () {
                    var vertBeam = gameObject.add.graphics(x, y),
                        vertPart = this
                            .grUtils
                            .drawRect(this.context,
                                5, 0,
                                thicknessPx, 50,
                                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                                constGr.Colors.DARK_GRAY, 1,
                                "vertBeamVertPart"),
                        horzPartTop = this
                            .grUtils
                            .drawRect(this.context,
                                0, 0,
                                10 + thicknessPx, thicknessPx,
                                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                                constGr.Colors.DARK_GRAY, 1,
                                "vertBeamHorzPartTop"),
                        horzPartBottom = this
                            .grUtils
                            .drawRect(this.context,
                                0, 50 - thicknessPx,
                                10 + thicknessPx, thicknessPx,
                                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.BLACK, 1,
                                constGr.Colors.DARK_GRAY, 1,
                                "vertBeamHorzPartBottom");

                    vertBeam.name = "verticalBeam";
                    vertBeam.addChild(horzPartTop);
                    vertBeam.addChild(horzPartBottom);
                    vertBeam.addChild(vertPart);
                    vertBeam.setChildIndex(vertPart, 0);

                    frnConstr.EnteriorScreen.setVertBeamObject(vertBeam);

                 },
                 vertBeamContextObject);

            toolBox.addChild(verticalBeamBtn);

            drawerBtn = gameObject.add.button(313, 0, frnConstr.ImageAssetKeys.DRAWER);
            drawerBtn.events.onInputDown.add(this.toolBoxDrawerHandler, drawerContextObject);
            toolBox.addChild(drawerBtn);

            tieBtn = gameObject.add.button(390, 0, frnConstr.ImageAssetKeys.TIE);
            tieBtn.events.onInputDown.add(this.toolBoxDrawerHandler, tieContextObject);
            toolBox.addChild(tieBtn);

            shoesBtn = gameObject.add.button(467, 0, frnConstr.ImageAssetKeys.SHOES);
            shoesBtn.events.onInputDown.add(this.toolBoxDrawerHandler, shoesContextObject);
            toolBox.addChild(shoesBtn);

            trouserBtn = gameObject.add.button(544, 0, frnConstr.ImageAssetKeys.TROUSER);
            trouserBtn.events.onInputDown.add(this.toolBoxDrawerHandler, trouserContextObject);
            toolBox.addChild(trouserBtn);

            hangerBtn = gameObject.add.button(621, 0, frnConstr.ImageAssetKeys.HANGER);
            hangerBtn.events.onInputDown.add(this.toolBoxDrawerHandler, hangerContextObject);
            toolBox.addChild(hangerBtn);

            pantographBtn = gameObject.add.button(698, 0, frnConstr.ImageAssetKeys.PANTOGRAPH);
            pantographBtn.events.onInputDown.add(this.toolBoxDrawerHandler, pantographContextObject);
            toolBox.addChild(pantographBtn);

            graphics.addChild(toolBox);

            return toolBox;
        },

        drawTopBottomMarker: function (graphics, x, y, width, height, shiftFactor, topOrBottom, text, textStyle, bColor) {
            var grObject = null,
                textLabel = null,
                sample = (topOrBottom ? shiftFactor : height - shiftFactor);

            grObject = gameObject.add.graphics(0, 0);

            // draw left marker
            this.drawLine(grObject, x, y, x, y + height, constGr.DEFAULT_GRAPHICS_BORDER_SIZE, bColor, 1, "leftMarker");

            // draw marker label
            textLabel = this.drawText(grObject, x + (width / 2), y + (topOrBottom ? 0 : height - shiftFactor), text, textStyle, "markerLabel");
            textLabel.x -= (textLabel.width / 2);

            if (textLabel.width >= width) {
                textLabel.y += (topOrBottom ? -textLabel.height : textLabel.height);
            }

            // draw horizontal line
            this.drawLine(grObject, x, y + sample, x + width, y + sample, constGr.DEFAULT_GRAPHICS_BORDER_SIZE, bColor, 1, "horizontal");

            // draw arrow pins
            this.drawArrowPin(grObject, x, y + sample, constGr.ORIENT_WEST, constGr.ARROW_PIN_SIZE, bColor);
            this.drawArrowPin(grObject, x + width, y + sample, constGr.ORIENT_EAST, constGr.ARROW_PIN_SIZE, bColor);

            // draw right marker
            this.drawLine(grObject, x + width, y, x + width, y + height, constGr.DEFAULT_GRAPHICS_BORDER_SIZE, bColor, 1, "rightMarker");

            graphics.addChild(grObject);

            return grObject;
        },

        drawLeftRightMarker: function (graphics, x, y, width, height, shiftFactor, leftOrRight, text, textStyle, bColor) {
            var grObject = null,
                textLabel = null,
                sample = (leftOrRight ? shiftFactor : width - shiftFactor);

            grObject = gameObject.add.graphics(0, 0);

            // draw top marker
            this.drawLine(grObject, x, y, x + width, y, constGr.DEFAULT_GRAPHICS_BORDER_SIZE, bColor, 1, "topMarker");

            // draw marker label
            textLabel = this.drawText(grObject, x + (leftOrRight ? 0 : width), y + (height / 2), text, textStyle, "markerLabel");
            textLabel.angle = (leftOrRight ? -90 : 90);
            textLabel.y += (leftOrRight ? (textLabel.width / 2) : -(textLabel.width / 2));
            if (textLabel.width >= height) {
                textLabel.x += (leftOrRight ? -textLabel.height : textLabel.height);
            }

            // draw vertical line
            this.drawLine(grObject, x + sample, y, x + sample, y + height, constGr.DEFAULT_GRAPHICS_BORDER_SIZE, bColor, 1, "vertical");

            // draw arrow pins
            this.drawArrowPin(grObject, x + sample, y, constGr.ORIENT_NORTH, constGr.ARROW_PIN_SIZE, bColor);
            this.drawArrowPin(grObject, x + sample, y + height, constGr.ORIENT_SOUTH, constGr.ARROW_PIN_SIZE, bColor);

            // draw bottom marker
            this.drawLine(grObject, x, y + height, x + width, y + height, constGr.DEFAULT_GRAPHICS_BORDER_SIZE, bColor, 1, "bottomMarker");

            graphics.addChild(grObject);

            return grObject;
        },

        drawArrowPin: function (graphics, x, y, orientation, pinSize, bColor) {
            var grObject = null,
                pointsArray = [];

            grObject = gameObject.add.graphics(0, 0);

            switch (orientation) {
                case constGr.ORIENT_NORTH:
                    pointsArray = [{x: x - pinSize, y: y + pinSize}, {x: x, y: y}, {x: x + pinSize, y: y + pinSize}];
                    break;
                case constGr.ORIENT_SOUTH:
                    pointsArray = [{x: x - pinSize, y: y - pinSize}, {x: x, y: y}, {x: x + pinSize, y: y - pinSize}];
                    break;
                case constGr.ORIENT_EAST:
                    pointsArray = [{x: x - pinSize, y: y - pinSize}, {x: x, y: y}, {x: x - pinSize, y: y + pinSize}];
                    break;
                case constGr.ORIENT_WEST:
                    pointsArray = [{x: x + pinSize, y: y - pinSize}, {x: x, y: y}, {x: x + pinSize, y: y + pinSize}];
                    break;
            }

            this.drawPolygon(grObject, pointsArray, 1, bColor, 1, bColor, 1, "arrowPin" + orientation);

            graphics.addChild(grObject);
        },

        drawMessageWindow: function(title, message, graphics, x, y, width, height, radius, bSize, bColor, bAlpha, fColor, fAlpha, titlFlColor, titlFlColorAlpha) {
            var grObject = null,
                windowBack = null,
                titleTextField = null,
                msgTextField = null,
                btnTextField = null,
                closeBtn = null,
                mask = null,
                titleBar = null,
                bottomBar = null,
                btnX = x + (width / 2) - (constGr.DEFAULT_BUTTON_WIDTH / 2),
                btnY = y + height - constGr.DEFAULT_BUTTON_HEIGHT - constGr.DEFAULT_WINDOW_PADDING;

            // draw container graphics object
            grObject = gameObject.add.graphics(0, 0);
            grObject.inputEnabled = true;
            grObject.input.enableDrag();

            // create mask
            mask = this.drawRoundedRect(grObject, x, y, width, height, radius, bSize, bColor, bAlpha, fColor, fAlpha, "msgWidowMask");

            // draw rounded rectangle
            windowBack = this.drawRoundedRect(grObject, x, y, width, height, radius, bSize, bColor, bAlpha, fColor, fAlpha, "msgWindowBg");

            // draw titleBar
            titleBar = this.drawRect(grObject, x, y, width, utils.percentToSample(10, height), 0, bColor, 0, titlFlColor, titlFlColorAlpha, "titleBar");
            titleBar.mask = mask;

            // draw title text field
            titleTextField = this.drawText(grObject, x, y + (constGr.DEFAULT_WINDOW_PADDING / 2), title, utils.getTextStyle12(), "messageWindowTitle");
            titleTextField.x = x + (width / 2) - (titleTextField.width / 2);
            titleTextField.wordWrapWidth = width - (constGr.DEFAULT_WINDOW_PADDING * 2);

            // draw message text field
            msgTextField = this.drawText(grObject,
                x + constGr.DEFAULT_WINDOW_PADDING * 2, y + constGr.DEFAULT_WINDOW_PADDING * 4,
                message, utils.getTextStyle12Red(),
                "messageWindowMessage");
            msgTextField.wordWrapWidth = width - (constGr.DEFAULT_WINDOW_PADDING * 2);

            // draw bottom bar
            bottomBar = this.drawRect(grObject, x,
                btnY - (constGr.DEFAULT_WINDOW_PADDING / 2),
                width,
                y + height - utils.percentToSample(10, height),
                0, bColor, 0, constGr.Colors.BACKGROUND_COLOR, 0.5,
                "bottomBar");
            bottomBar.mask = mask;

            closeBtn = frnConstr.FrnConstrButton.FrnConstrButton(btnX, btnY,
                frnConstr.ImageAssetKeys.STANDARD_BUTTONS_SHEET, grObject,
                function() {
                    this.destroy();
                },
                null, null, null, null, null, null, 19, 18, 18, 19);
            grObject.addChild(closeBtn);

            graphics.addChild(grObject);
            return graphics;
        },

        drawColorSwatch: function (graphics, x, y, width, height, fColor, enableInput, handler) {
            var rectShift = constGr.DEFAULT_SWATCH_PADDING,
                whiteRect = null,
                coloredRect = null;

            // draw white rectangle
            whiteRect = this.drawRect(graphics,
                x, y,
                width, height,
                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.DEFAULT_EDGE_COLOR, 1,
                constGr.Colors.WHITE, 1,
                "whiteBorder");

            // draw colored rectangle
            coloredRect = this.drawRect(graphics,
                x + rectShift, y + rectShift,
                width - (rectShift * 2), height - (rectShift * 2),
                constGr.DEFAULT_GRAPHICS_BORDER_SIZE, constGr.Colors.DEFAULT_EDGE_COLOR, 1,
                utils.getHexColor(fColor), 1,
                "colorSwatch");

            coloredRect.rectColor = fColor;
            if (enableInput) {
                coloredRect.inputEnabled = true;
                coloredRect.input.useHandCursor = true;
                coloredRect.events.onInputUp.add(handler, coloredRect);
            }

            return graphics;
        },

        drawSwatches: function(graphics, x, y, colorsObject, handler) {
            var color = 0,
                swIndex = 0;

            for (color in colorsObject) {
                if (colorsObject.hasOwnProperty(color)) {

                    this.drawColorSwatch(graphics,
                        x,
                        y + (swIndex * constGr.DEFAULT_SWATCH_HEIGHT),
                        constGr.DEFAULT_SWATCH_WIDTH,
                        constGr.DEFAULT_SWATCH_HEIGHT,
                        colorsObject[color],
                        true,
                        handler);
                    swIndex += 1;
                }
            }

            return graphics;
        },

        drawColorPicker: function (graphics, x, y, hashColor, colorsObject, swatchesShown, handler) {
            var colorPicker = null,
                colorPickerBtn = null,
                colorSwatches = null,
                editedColorsObject = {},
                colorKey = null,
                initSwatch = null;

            // remove initial color from the colors list
            for (colorKey in colorsObject) {
                if (colorsObject.hasOwnProperty(colorKey)) {
                    editedColorsObject[colorKey] = colorsObject[colorKey];
                }
            }
            delete editedColorsObject[utils.findPropKey(editedColorsObject, hashColor)];

            // create colo picker object and initial color swatch
            colorPicker = gameObject.add.graphics(x, y);
            initSwatch = this.drawColorSwatch(colorPicker, 0, 0, constGr.DEFAULT_SWATCH_WIDTH, constGr.DEFAULT_SWATCH_HEIGHT, hashColor, false);

            // create color picker button and add show/hide button handler
            colorPickerBtn = gameObject.add.graphics(constGr.DEFAULT_SWATCH_WIDTH, 0);
            this.drawRect(colorPickerBtn,
                0, 0,
                constGr.DEFAULT_SWATCH_HEIGHT, constGr.DEFAULT_SWATCH_HEIGHT,
                1, constGr.Colors.MATTERHORN, 1,
                constGr.Colors.MATTERHORN, 1,
                "colorPickerBtn");

            colorPickerBtn.inputEnabled = true;
            colorPickerBtn.input.useHandCursor = true;
            colorPickerBtn.events.onInputUp.add(function () {
                if (swatchesShown && colorSwatches !== null) {

                    colorSwatches.destroy();
                    swatchesShown = false;

                } else {

                    swatchesShown = true;
                    colorSwatches = gameObject.add.graphics(0, constGr.DEFAULT_SWATCH_HEIGHT);
                    this.grUtils.drawSwatches(colorSwatches, 0, 0, editedColorsObject, handler);
                    this.grObject.addChild(colorSwatches);

                }
            }, {grObject: colorPicker, grUtils: this});

            this.drawLine(colorPickerBtn, 5, 5, 10, 15, 3, constGr.Colors.WHITE, 1, "colorPickerBtn");
            this.drawLine(colorPickerBtn, 10, 15, 15, 5, 3, constGr.Colors.WHITE, 1, "colorPickerBtn");

            colorPicker.addChild(colorPickerBtn);
            graphics.addChild(colorPicker);

            return colorPicker;
        },

        drawShelveShadow: function (graphics, ptsObject, fColor, fAlpha) {
            var shelveShadow = gameObject.add.graphics(0, 0);

            shelveShadow.lineStyle(0, constGr.Colors.WHITE, 0);
            shelveShadow.beginFill(fColor, fAlpha);
            shelveShadow.moveTo(ptsObject.pt1.x, ptsObject.pt1.y);
            shelveShadow.lineTo(ptsObject.pt2.x, ptsObject.pt2.y);
            shelveShadow.lineTo(ptsObject.pt3.x, ptsObject.pt3.y);
            shelveShadow.lineTo(ptsObject.pt4.x, ptsObject.pt4.y);
            shelveShadow.bezierCurveTo(ptsObject.pt4.x, ptsObject.pt4.y, ptsObject.cp.x, ptsObject.cp.y, ptsObject.pt1.x, ptsObject.pt1.y);
            shelveShadow.endFill();

            graphics.addChild(shelveShadow);
            return shelveShadow;
        },

        drawShelveWithArea: function (dataObject) {
            var polygon = dataObject.polygon,
                shelveWithArea = gameObject.add.graphics(polygon.pt1.x, polygon.pt1.y);

            shelveWithArea.lineStyle(dataObject.borderSize, dataObject.borderColor, 1);

            // draw shelve area
            shelveWithArea.beginFill(dataObject.areaColor, 1);
            shelveWithArea
                .moveTo(
                    polygon.pt3.x - polygon.pt1.x, polygon.pt3.y - polygon.pt1.y);
            shelveWithArea
                .bezierCurveTo(
                    polygon.pt3.x - polygon.pt1.x, polygon.pt3.y - polygon.pt1.y,
                    polygon.cp2.x - polygon.pt1.x, polygon.cp2.y - polygon.pt1.y,
                    polygon.pt4.x - polygon.pt1.x, polygon.pt4.y - polygon.pt1.y);
            shelveWithArea
                .lineTo(
                    polygon.pt5.x - polygon.pt1.x, polygon.pt5.y - polygon.pt1.y);
            shelveWithArea
                .lineTo(
                    polygon.pt3.x - polygon.pt1.x, polygon.pt3.y - polygon.pt1.y);
            shelveWithArea.endFill();

            // draw front
            shelveWithArea.beginFill(dataObject.frontColor, 1);
            shelveWithArea.moveTo(0, 0);
            shelveWithArea
                .bezierCurveTo(0, 0,
                    polygon.cp1.x - polygon.pt1.x, polygon.cp1.y - polygon.pt1.y,
                    polygon.pt2.x - polygon.pt1.x, polygon.pt2.y - polygon.pt1.y);
            shelveWithArea
                .lineTo(
                    polygon.pt3.x - polygon.pt1.x, polygon.pt3.y - polygon.pt1.y);
            shelveWithArea
                .bezierCurveTo(
                    polygon.pt3.x - polygon.pt1.x, polygon.pt3.y - polygon.pt1.y,
                    polygon.cp2.x - polygon.pt1.x, polygon.cp2.y - polygon.pt1.y,
                    polygon.pt4.x - polygon.pt1.x, polygon.pt4.y - polygon.pt1.y);
            shelveWithArea.lineTo(0, 0);
            shelveWithArea.endFill();

            dataObject.graphicsObj.addChild(shelveWithArea);

            return shelveWithArea;
        },

        drawShelve: function(dataObject) {
            var halfHeight = utils.decimalRound((dataObject.frameHeight / 2), frnConst.DECIMAL_ROUND_EXP),
                halfRearHeight = utils.decimalRound((dataObject.rearHeight / 2), frnConst.DECIMAL_ROUND_EXP),
                shelveGrObject = null,
                shelve = {
                    graphicsObj: dataObject.graphicsObj,
                    borderSize: constGr.DEFAULT_GRAPHICS_BORDER_SIZE,
                    borderColor: dataObject.borderColor,
                    borderAlpha: 1,
                    areaColor: dataObject.areaColor,
                    frontColor: dataObject.frontColor,
                    thickness: dataObject.thickness,
                    polygon: {
                        pt1: {
                            x: 0,
                            y: 0
                        },
                        cp1: {
                            x: 0,
                            y: 0
                        },
                        pt2: {
                            x: 0,
                            y: 0
                        },
                        pt3: {
                            x: 0,
                            y: 0
                        },
                        cp2: {
                            x: 0,
                            y: 0
                        },
                        pt4: {
                            x: 0,
                            y: 0
                        },
                        pt5: {
                            x: 0,
                            y: 0
                        }
                    }
                };

            // draw top corner shelves
            if (utils.isTopCornerShelvesDrawn(dataObject.y + dataObject.halfCupboardDepth, dataObject.y + halfHeight, dataObject.shiftY)) {

                shelve.polygon = utils.makeShelveDataObject(dataObject.x,
                    dataObject.y,
                    dataObject.shiftX,
                    dataObject.shiftY,
                    dataObject.frameHeight,
                    dataObject.halfCupboardDepth,
                    dataObject.rearHeight,
                    dataObject.thickness);
                shelveGrObject = this.drawShelveWithArea(shelve);

                // draw rectangle instead of full shelve when exact half is hit with a Y coordinate
            } else if (utils.isRectShelveDrawn(dataObject.y + halfHeight, dataObject.shiftY)) {

                shelveGrObject = this.drawRect(dataObject.graphicsObj,
                    dataObject.x,
                    dataObject.shiftY,
                    dataObject.shiftX - dataObject.x,
                    dataObject.thickness,
                    constGr.DEFAULT_GRAPHICS_BORDER_SIZE,
                    dataObject.borderColor,
                    1,
                    dataObject.frontColor,
                    1,
                    "middleShelve");

                // draw bottom corner shelves
            } else if (utils.isBottomCornerShelvesDrawn(dataObject.y + halfHeight, dataObject.y + halfHeight + halfRearHeight, dataObject.shiftY)) {

                shelve.polygon = utils.makeShelveDataObject(dataObject.x,
                    dataObject.y,
                    dataObject.shiftX,
                    dataObject.shiftY,
                    dataObject.frameHeight,
                    dataObject.halfCupboardDepth,
                    dataObject.rearHeight, -dataObject.thickness);
                shelveGrObject = this.drawShelveWithArea(shelve);

            }

            if (utils.isTruthy(shelveGrObject)) {

                shelveGrObject.inputEnabled = true;
                shelveGrObject.input.useHandCursor = true;
                shelveGrObject.input.enableDrag();

                shelveGrObject.events.onDragStop.add(function() {
                    this.shelves[this.shIndex].busy = false;
                    this.grUtils.drawMarkers(this.leftOrRight, this.shelveMarkersGrObject);
                    this.grObject.destroy();
                    this.frnConstr.saveStorageData(this.frnConstr.getFrnConstrDataObject());
                }, {
                    grObject: shelveGrObject,
                    shelveMarkersGrObject: dataObject.shelveMarkersGrObject,
                    leftOrRight: dataObject.leftOrRight,
                    shelves: dataObject.shelvesRef,
                    shIndex: dataObject.shIndex,
                    grUtils: this,
                    frnConstr: frnConstr
                });

            }

            return shelveGrObject;
        },

        makeShelveDataObject: function (dataObject, grObject, shelveIndex, shelveMarkersGrObject, leftOrRight) {
            var shelve = null,
                shelveDataObject = {
                    graphicsObj: grObject,
                    shelveMarkersGrObject: shelveMarkersGrObject,
                    leftOrRight: leftOrRight,
                    borderSize: 1,
                    borderColor: dataObject.borderColor,
                    borderAlpha: 1,
                    frontColor: dataObject.frontColor,
                    frontAlpha: 1,
                    areaColor: dataObject.areaColor,
                    areaAlpha: 1,
                    shIndex: shelveIndex,
                    x: dataObject.shelves[shelveIndex].x,
                    y: dataObject.shelves[shelveIndex].y,
                    shiftX: dataObject.shelves[shelveIndex].shiftX,
                    shiftY: dataObject.shelves[shelveIndex].shiftY,
                    frameHeight: dataObject.frameHeight,
                    halfCupboardDepth: dataObject.halfCupboardDepth,
                    rearHeight: dataObject.rearHeight,
                    thickness: dataObject.thickness,
                    shelvesRef: dataObject.shelves
                };

            return shelveDataObject;
        },

        drawMarkers: function(leftOrRight, shelveMarkersGrObject) {
            var shelvesData = {},
                fcdo = frnConstr.getFrnConstrDataObject(),
                artmTree = fcdo.artmTree,
                halfShelvesNum = utils.decimalRound((fcdo.maxNumOfShelves / 2), 0),
                i = 0,
                markerDistance = 0,
                markersArray = [],
                markerWidthPx = (leftOrRight ?
                    fcdo.leftShelveWidthPx :
                    fcdo.rightShelveWidthPx),
                markerLabelText = (leftOrRight ?
                    fcdo.leftShelveWidth.toString() :
                    fcdo.rightShelveWidth.toString());

            shelveMarkersGrObject.removeChildren(0, shelveMarkersGrObject.children.length);

            if (leftOrRight) {
                shelvesData = fcdo.constrData.leftShelveWall.shelvesData;
            } else {
                shelvesData = fcdo.constrData.rightShelveWall.shelvesData;
            }

            // draw left or right markers
            markersArray.push(shelvesData.shelves[0].shiftY);

            for (i = 1; i < halfShelvesNum; i += 1) {
                if (shelvesData.shelves[i].busy) {
                    markersArray.push(shelvesData.shelves[i].shiftY);
                }
            }

            for (i = halfShelvesNum; i < fcdo.maxNumOfShelves; i += 1) {
                if (shelvesData.shelves[i].busy) {
                    markersArray.push(shelvesData.shelves[i].shiftY - fcdo.thicknessPx);
                }
            }

            markersArray.push(fcdo.artmTree.frameY.sumFrameHeight.subHalfCupboardDepth.value - fcdo.frameY);

            for (i = 0; i < markersArray.length - 1; i += 1) {
                markerDistance = utils.decimalRound(markersArray[i + 1] - markersArray[i], 0);
                this.drawLeftRightMarker(
                    shelveMarkersGrObject,
                    (leftOrRight ?
                        (artmTree.frameX.value + 15) :
                        artmTree.frameX.sumFullWidthPx.value + 20), ((2 * artmTree.frameY.value) + markersArray[i]),
                    50, markerDistance,
                    constGr.DEFAULT_TOP_MARKERS_PERCENT, leftOrRight,
                    utils.convertPixelsToMills(markerDistance, fcdo.millsPerPixel).toString(), utils.getTextStyle10Matterhorn(), constGr.Colors.MATTERHORN);
            }

            // draw top shelve marker
            this.drawTopBottomMarker(
                shelveMarkersGrObject,
                (leftOrRight ?
                    (2 * fcdo.artmTree.frameX.value) :
                    (fcdo.artmTree.frameX.value + fcdo.artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value)),
                ((2 * fcdo.artmTree.frameY.value) - constGr.DEFAULT_TOP_MARKERS_Y_SHIFT),
                markerWidthPx,
                constGr.DEFAULT_TOP_MARKERS_HEIGHT,
                constGr.DEFAULT_TOP_MARKERS_PERCENT,
                true,
                markerLabelText,
                utils.getTextStyle10(),
                constGr.Colors.DEFAULT_EDGE_COLOR);
        },

        drawAllShelves: function (shelvesData, shelvesContainerObject, shelveMarkersGrObject, leftOrRight) {
            var fcdo = frnConstr.getFrnConstrDataObject(),
                artmTree = fcdo.artmTree,
                i = 0, j = 0, k = 0,
                shelveDataObject = null,
                shelveNum = shelvesData.shelves.length,
                halfShelvesNum = utils.decimalRound((shelveNum / 2), 0),
                topShelves = null,
                bottomShelves = null;

            topShelves = this.makeNewGraphicsObject(topShelves, artmTree.frameX.value, artmTree.frameY.value, "topShelves", shelvesContainerObject);
            topShelves.name = constAppKeys.TOP_SHELVES_KEY;

            bottomShelves = this.makeNewGraphicsObject(bottomShelves, artmTree.frameX.value, artmTree.frameY.value, "bottomShelves", shelvesContainerObject);
            bottomShelves.name = constAppKeys.BOTTOM_SHELVES_KEY;

            for (i = 0; i < halfShelvesNum; i += 1) {
                if (shelvesData.shelves[i].busy) {
                    shelveDataObject = this.makeShelveDataObject(shelvesData, topShelves, i, shelveMarkersGrObject, leftOrRight);
                    this.drawShelve(shelveDataObject);
                }
            }

            for (i = halfShelvesNum; i < shelveNum; i += 1) {
                if (shelvesData.shelves[i].busy) {
                    shelveDataObject = this.makeShelveDataObject(shelvesData, bottomShelves, i, shelveMarkersGrObject, leftOrRight);
                    this.drawShelve(shelveDataObject);
                }
            }

            // rearange shelves by depth
            for (i = 0; i < topShelves.children.length; i += 1) {
                topShelves.setChildIndex(topShelves.children[i], i);
            }

            bottomShelves.children = this.graphicsBubleSort('y', bottomShelves.children, phaser.Group.SORT_DESCENDING);

            for (j = 0, k = bottomShelves.children.length - 1; j < bottomShelves.children.length; j += 1, k -= 1) {
                bottomShelves.setChildIndex(bottomShelves.children[j], k);
            }
        },

        drawShelveWallAndShadow: function(dataObject, shelveGraphics, shelveMarkerGraphics) {
            var i = 0,
                slotRect = null,
                shelveSlots = null,
                fcdo = frnConstr.getFrnConstrDataObject(),
                rect = dataObject.rect,
                polygon = dataObject.polygon,
                shelvesMarkersData = dataObject.shelvesData.markers,
                shelveMarkers = null,
                markerWidthPx = (dataObject.key === constAppKeys.LEFT_SHELVE_WALL_KEY ?
                    fcdo.leftShelveWidthPx :
                    fcdo.rightShelveWidthPx),
                markerLabelText = (dataObject.key === constAppKeys.LEFT_SHELVE_WALL_KEY ?
                    fcdo.leftShelveWidth.toString() :
                    fcdo.rightShelveWidth.toString());

            this.drawRect(shelveGraphics,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                dataObject.borderSize,
                dataObject.borderColor,
                dataObject.borderAlpha,
                rect.fillColor,
                rect.fillAlpha,
                dataObject.key);

            shelveSlots = this.makeNewGraphicsObject(shelveSlots, 0, 0, "shelveSlots", shelveGraphics);
            shelveSlots.name = constAppKeys.SHELVE_SLOTS_KEY;

            for (i = 0; i < fcdo.maxNumOfShelves; i += 1) {
                this.drawSprite(frnConstr.ImageAssetKeys.SHELVE_SLOT,
                    rect.x, rect.y + ((rect.height / fcdo.maxNumOfShelves) * i),
                    rect.width, (rect.height / fcdo.maxNumOfShelves),
                    0.0,
                    rect.fillColor,
                    "slot" + i,
                    shelveSlots);
            }

            /* TODO fix the left shelves walls shadow. THe values are wrong. It goes reverse direction*/
            /*this.drawShelveShadow(shelveGraphics,
                                    {
                                        pt1: polygon.pt1,
                                        pt2: polygon.pt2,
                                        cp: polygon.cp,
                                        pt3: polygon.pt3,
                                        pt4: polygon.pt4
                                    },
                                    polygon.fillColor,
                                    polygon.fillAlpha);*/

            return shelveGraphics;
        },

        drawCeilOrFloorWall: function(dataObject, wallGraphics) {
            var rect = dataObject.rect,
                line = dataObject.line,
                polygon = dataObject.polygon,
                ceilingLabel = null,
                topLine = null,
                frontRect = null,
                wallPolygon = null,
                grObject = null;

            grObject = gameObject.add.graphics(0, 0);
            frontRect = this.drawRect(grObject,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                0,
                dataObject.borderColor,
                0,
                rect.fillColor,
                rect.fillAlpha,
                dataObject.key);

            topLine = this.drawLine(grObject,
                line.pt1.x,
                line.pt1.y,
                line.pt2.x,
                line.pt2.y,
                dataObject.borderSize,
                dataObject.borderColor,
                dataObject.borderAlpha,
                "top");

            wallPolygon = this.drawPolygon(grObject, [polygon.pt1, polygon.pt2, polygon.pt3, polygon.pt4],
                dataObject.borderSize,
                dataObject.borderColor,
                dataObject.borderAlpha,
                polygon.fillColor,
                polygon.fillAlpha,
                "ceilOrFloor");
            wallGraphics.addChild(grObject);

            return grObject;
        },

        drawRearWall: function(dataObject, wallGraphics) {
            var rect = this.drawRect(wallGraphics,
                dataObject.x,
                dataObject.y,
                dataObject.width,
                dataObject.height,
                dataObject.borderSize,
                dataObject.borderColor,
                dataObject.borderAlpha,
                dataObject.fillColor,
                dataObject.fillAlpha,
                "rearWall");
            return rect;
        },

        drawLeftOrRightWall: function(dataObject, wallGraphics, wallMarkersGraphics) {
            var fcdo = frnConstr.getFrnConstrDataObject(),
                rect = dataObject.rect,
                polygon = dataObject.polygon,
                leftWallLabel = null,
                depthTextLabel = null,
                markerShitX = (fcdo.leftShelveChkBox ? constGr.DEFAULT_GRAPHIC_X - 55 : rect.x - 30),
                vrMarkerShiftX = (fcdo.leftShelveChkBox ? constGr.DEFAULT_GRAPHIC_X - 35 : rect.x - 20),
                grObject = null,
                depthMarkers = null;

            grObject = gameObject.add.graphics(0, 0);
            this.drawRect(grObject,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                dataObject.borderAlpha,
                dataObject.borderColor,
                dataObject.borderSize,
                rect.fillColor,
                rect.fillAlpha,
                dataObject.key);

            this.drawPolygon(grObject, [polygon.pt1, polygon.pt2, polygon.pt3, polygon.pt4],
                dataObject.borderSize,
                dataObject.borderColor,
                dataObject.borderAlpha,
                polygon.fillColor,
                polygon.fillAlpha,
                "leftOrRightWall");

            if (fcdo.leftShelveChkBox) {

                this.drawLeftRightMarker(
                    wallMarkersGraphics,
                    (fcdo.artmTree.frameX.value / 2) - 5,
                    fcdo.artmTree.frameY.doubleFrameY.value,
                    fcdo.artmTree.frameX.value + fcdo.leftShelveWidthPx + (fcdo.artmTree.frameX.value / 2) + 5,
                    fcdo.cupboardHeightPx,
                    constGr.DEFAULT_TOP_MARKERS_PERCENT,
                    true,
                    fcdo.cupboardHeight.toString(),
                    utils.getTextStyle10(),
                    constGr.Colors.DEFAULT_EDGE_COLOR);
            }

            wallGraphics.addChild(grObject);
            return grObject;
        },

        makeNewGraphicsObject: function (current, x, y, name, parent) {

            if (utils.isTruthy(current)) {
                current.destroy();
            }

            current = gameObject.add.graphics(x, y);
            current.name = name + "Graphics";

            if (utils.isTruthy(parent)) {
                parent.addChild(current);
            }

            return current;
        },

        drawInnerParts: function(fcdo, innerSlotTwoDimArray, partsArray, partType, partName, grObject, partColor) {
            var r = 0,
                partCoord = {};

            for (r = 0; r < partsArray.length; r += 1) {

                partCoord = partsArray[r];

                switch (partType) {
                    case constAppKeys.HORZ_BAFFLE_KEY:
                        this.drawHorizontalBeam(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partName, partType);
                        break;
                    case constAppKeys.HORZ_BEAM_KEY:
                        this.drawHorizontalBeam(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partName, partType);
                        break;
                    case constAppKeys.VERT_BAFFLE_KEY:
                        this.drawVerticalBeam(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partName, partType);
                        break;
                    case constAppKeys.VERT_BEAM_KEY:
                        this.drawVerticalBeam(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partName, partType);
                        break;
                    case constAppKeys.DRAWER_KEY:
                        this.drawDrawerOrPtgr(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partName, partType);
                        break;
                    case constAppKeys.PANTOGRAPH_KEY:
                        this.drawDrawerOrPtgr(fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partName, partType);
                        break;
                    case constAppKeys.TIE_KEY:
                        this.drawAreaPart(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partType, partType);
                        break;
                    case constAppKeys.SHOES_KEY:
                        this.drawAreaPart(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partType, partType);
                        break;
                    case constAppKeys.TROUSER_KEY:
                        this.drawAreaPart(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partType, partType);
                        break;
                    case constAppKeys.HANGER_KEY:
                        this.drawAreaPart(
                            fcdo, grObject,
                            partCoord.row, partCoord.col,
                            partCoord.rowShift, partCoord.colShift,
                            innerSlotTwoDimArray, partColor,
                            partType, partType);
                        break;
                }

            }
        }
    };
    }(window.FrnConstr, Phaser)));