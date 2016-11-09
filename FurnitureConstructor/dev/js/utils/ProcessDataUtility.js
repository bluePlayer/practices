window.FrnConstr.namespace('ProcessDataUtility', window.FrnConstr.Screen, ( function(windowObject, frnConstr, phaser, jq) {
        'use strict';
        var thisObject = null,
            gameObject = null,
            utils = frnConstr.Utility,
            ismUtils = frnConstr.InnerSlotMatrixUtility,
            frnConst = frnConstr.Const,
            constGr = frnConst.Graphics,
            constAppKeys = frnConst.Application.Keys;

        return {

            processData : function(fcdo, shelveCssColor, millsPerPixel) {

                fcdo = this.preProcessData(fcdo, shelveCssColor, millsPerPixel);

                fcdo.artmTree = this.makeArtmTree(fcdo, frnConst.DECIMAL_ROUND_EXP);

                fcdo.constrData = this.makeConstrDataObject(fcdo);

                return fcdo;
            },

            preProcessData: function (fcdo, shelveCssColor, millsPerPixel) {

                fcdo.thicknessPx = utils.convertMillsToPixels(fcdo.thickness, millsPerPixel);
                fcdo.fullWidthPx = utils.convertMillsToPixels(fcdo.fullWidth, millsPerPixel);
                fcdo.cupboardWidthPx = utils.convertMillsToPixels(fcdo.cupboardWidth, millsPerPixel);
                fcdo.cupboardHeightPx = utils.convertMillsToPixels(fcdo.cupboardHeight, millsPerPixel);
                fcdo.cupboardDepthPx = utils.convertMillsToPixels(fcdo.cupboardDepth, fcdo.millsPerPixelForDepth);
                fcdo.leftShelveWidthPx = utils.convertMillsToPixels(fcdo.leftShelveWidth, millsPerPixel);
                fcdo.rightShelveWidthPx = utils.convertMillsToPixels(fcdo.rightShelveWidth, millsPerPixel);
                fcdo.frameX = constGr.DEFAULT_GRAPHIC_X;
                fcdo.frameY = constGr.DEFAULT_GRAPHIC_Y;
                fcdo.borderSize = constGr.DEFAULT_GRAPHICS_BORDER_SIZE;

                fcdo.currentMaterialColor = utils.getColor(constAppKeys.MATERIAL_COLOR_KEY, shelveCssColor);

                fcdo.currentDarkerMatColor = utils.getColor(constAppKeys.DARKER_COLOR_KEY, shelveCssColor);
                fcdo.currentEdgeColor = utils.getColor(constAppKeys.EDGE_COLOR_KEY, shelveCssColor);

                fcdo.shelveShiftFactor = utils.decimalRound(((fcdo.cupboardHeightPx - fcdo.cupboardDepthPx) / fcdo.maxNumOfShelves),
                    frnConst.DECIMAL_ROUND_EXP);

                fcdo.innerShelveSlotHeight = utils.decimalRound((fcdo.cupboardHeightPx / fcdo.maxNumOfInnerShelves),
                    frnConst.DECIMAL_ROUND_EXP);

                fcdo.innerShelveSlotWidth = utils.decimalRound(((fcdo.cupboardWidthPx) / fcdo.maxNumOfBeams),
                    frnConst.DECIMAL_ROUND_EXP);

                return fcdo;
            },

            makeArtmTree : function(fcdo, roundExponent) {
                var frameX = fcdo.frameX,
                    frameY = fcdo.frameY,
                    fullWidthPx = fcdo.fullWidthPx,
                    cupboardWidthPx = fcdo.cupboardWidthPx,
                    cupboardHeightPx = fcdo.cupboardHeightPx,
                    cupboardDepthPx = fcdo.cupboardDepthPx,
                    thicknessPx = fcdo.thicknessPx,
                    leftShelveWidthPx = fcdo.leftShelveWidthPx,
                    rightShelveWidthPx = fcdo.rightShelveWidthPx,
                    halfCupboardDepthPx = utils.decimalRound((cupboardDepthPx / 2), roundExponent),
                    shelveShiftFactor = fcdo.shelveShiftFactor,

                    artmTree = {
                        fullWidthPx : {
                            value : fullWidthPx,
                            sumThicknessPx : {
                                value : utils.decimalRound((fullWidthPx + thicknessPx), roundExponent),
                                subRightShelveWidthPx : {
                                    value : utils.decimalRound((fullWidthPx + thicknessPx - rightShelveWidthPx), roundExponent)
                                }
                            }
                        },
                        frameX : {
                            value : frameX,
                            doubleFrameX : {
                                value : utils.decimalRound((frameX * 2), roundExponent),
                                sumLeftShelveWidthPx : {
                                    value : utils.decimalRound(((frameX * 2) + leftShelveWidthPx), roundExponent)
                                }
                            },
                            sumFullWidthPx : {
                                value : utils.decimalRound((frameX + fullWidthPx), roundExponent),
                                subRightShelveWidthPx : {
                                    value : utils.decimalRound((frameX + fullWidthPx - rightShelveWidthPx), roundExponent),
                                    sumThicknessPx : {
                                        value : utils.decimalRound((frameX + fullWidthPx - rightShelveWidthPx + thicknessPx), roundExponent)
                                    }
                                }
                            },
                            sumLeftShelveWidthPx : {
                                value : utils.decimalRound(frameX + leftShelveWidthPx, roundExponent),
                                sumOne : {
                                    value : utils.decimalRound(frameX + leftShelveWidthPx + 1, roundExponent)
                                },
                                sumThicknessPx : {
                                    value : utils.decimalRound(frameX + leftShelveWidthPx + thicknessPx, roundExponent),
                                    sumHalfCupboardDepth : {
                                        value : utils.decimalRound(frameX + leftShelveWidthPx + thicknessPx + halfCupboardDepthPx, roundExponent)
                                    }
                                },

                                sumHalfCupboardDepth : {
                                    value : utils.decimalRound(frameX + leftShelveWidthPx + halfCupboardDepthPx,
                                        roundExponent),
                                    sumDoubleThicknessPx : {
                                        value : utils.decimalRound(frameX + leftShelveWidthPx + halfCupboardDepthPx + (thicknessPx * 2), roundExponent)
                                    }
                                },
                                sumCupboardWidthPx : {
                                    value : utils.decimalRound(frameX + leftShelveWidthPx + cupboardWidthPx, roundExponent),
                                    sumOne : {
                                        value : utils.decimalRound(frameX + leftShelveWidthPx + cupboardWidthPx + 1, roundExponent)
                                    },
                                    sumThicknessPx : {
                                        value :
                                            utils.decimalRound(frameX + leftShelveWidthPx + cupboardWidthPx + thicknessPx, roundExponent),
                                        sumRightShelveWidthPx : {
                                            value :
                                                utils.decimalRound(
                                                    frameX + leftShelveWidthPx + cupboardWidthPx + thicknessPx + rightShelveWidthPx, roundExponent)
                                        }
                                    },
                                    sumHalfCupboardDepth : {
                                        value :
                                            utils.decimalRound(frameX + leftShelveWidthPx + cupboardWidthPx + halfCupboardDepthPx, roundExponent),
                                        sumThicknessPx : {
                                            value :
                                                utils.decimalRound(
                                                    frameX + leftShelveWidthPx + cupboardWidthPx + halfCupboardDepthPx + thicknessPx, roundExponent)
                                        }
                                    },
                                    subHalfCupboardDepth : {
                                        value :
                                            utils.decimalRound(frameX + leftShelveWidthPx + cupboardWidthPx - halfCupboardDepthPx, roundExponent),
                                        subThicknessPx : {
                                            value :
                                                utils.decimalRound(
                                                    frameX + leftShelveWidthPx + cupboardWidthPx - halfCupboardDepthPx - thicknessPx, roundExponent)
                                        }
                                    }
                                }
                            }
                        },
                        leftShelveWidthPx : {
                            value: leftShelveWidthPx
                        },
                        rightShelveWidthPx : {
                            value: rightShelveWidthPx
                        },
                        halfCupboardDepthPx : {
                            value : halfCupboardDepthPx,
                            sumThicknessPx : {
                                value : utils.decimalRound(halfCupboardDepthPx + thicknessPx, roundExponent)
                            },
                            sumRearHeight : {
                                value : utils.decimalRound(cupboardHeightPx - halfCupboardDepthPx, roundExponent),
                                subShelveShiftFactor : {
                                    value :
                                        utils.decimalRound(cupboardHeightPx - halfCupboardDepthPx - shelveShiftFactor, roundExponent),
                                    sumThicknessPx : {
                                        value :
                                            utils.decimalRound(
                                                cupboardHeightPx - halfCupboardDepthPx - shelveShiftFactor + thicknessPx, roundExponent)
                                    }
                                }
                            }
                        },
                        frameY : {
                            value : frameY,
                            sumThicknessPx : {
                                value : utils.decimalRound(frameY + thicknessPx, roundExponent)
                            },
                            doubleFrameY : {
                                value : utils.decimalRound((frameY * 2), roundExponent)
                            },
                            sumHalfCupboardDepth : {
                                value : utils.decimalRound(frameY + halfCupboardDepthPx, roundExponent),
                                sumThicknessPx : {
                                    value : utils.decimalRound(frameY + halfCupboardDepthPx + thicknessPx, roundExponent)
                                },
                                subThicknessPx : {
                                    value : utils.decimalRound(frameY + halfCupboardDepthPx - thicknessPx, roundExponent)
                                },
                                sumRearHeight : {
                                    value : utils.decimalRound(frameY - halfCupboardDepthPx + cupboardHeightPx, roundExponent),
                                    subThicknessPx : {
                                        value : utils.decimalRound(frameY - halfCupboardDepthPx + cupboardHeightPx - thicknessPx, roundExponent)
                                    },
                                    subShelveShiftFactor : {
                                        value :
                                            utils.decimalRound(frameY - halfCupboardDepthPx + cupboardHeightPx - shelveShiftFactor, roundExponent),
                                        subThicknessPx : {
                                            value :
                                                utils.decimalRound(
                                                    frameY - halfCupboardDepthPx + cupboardHeightPx - shelveShiftFactor - thicknessPx, roundExponent)
                                        }
                                    }
                                }
                            },
                            sumHalfFrameHeight : {
                                value : utils.decimalRound(frameY + (cupboardHeightPx / 2), roundExponent)
                            },
                            sumFrameHeight : {
                                value : utils.decimalRound(frameY + cupboardHeightPx, roundExponent),
                                subHalfCupboardDepth : {
                                    value :
                                        utils.decimalRound(frameY + cupboardHeightPx - halfCupboardDepthPx, roundExponent),
                                    subThicknessPx : {
                                        value :
                                            utils.decimalRound(frameY + cupboardHeightPx - halfCupboardDepthPx - thicknessPx, roundExponent)
                                    },
                                    subShelveShiftFactor: {
                                        value: utils.decimalRound(frameY + cupboardHeightPx - halfCupboardDepthPx - shelveShiftFactor, roundExponent)
                                    }
                                },
                                subThicknessPx : {
                                    value : utils.decimalRound(frameY + cupboardHeightPx - thicknessPx, roundExponent)
                                },
                                subShelveShiftFactor: {
                                    value: utils.decimalRound(frameY + cupboardHeightPx - shelveShiftFactor, roundExponent),
                                    subTwo: {
                                        value: utils.decimalRound(frameY + cupboardHeightPx - shelveShiftFactor - 2, roundExponent)
                                    },
                                    sumThicknessPx : {
                                        value : utils.decimalRound(frameY + cupboardHeightPx - shelveShiftFactor + thicknessPx, roundExponent),
                                        subTwo: {
                                            value: utils.decimalRound(frameY + cupboardHeightPx - shelveShiftFactor + thicknessPx - 2, roundExponent)
                                        }
                                    }
                                }
                            }
                        },
                        cupboardHeightPx : {
                            value : cupboardHeightPx,
                            subCupboardDepthPx : {
                                value : utils.decimalRound(cupboardHeightPx - cupboardDepthPx, roundExponent),
                                halfSubCupboardDepthPx : {
                                    value : utils.decimalRound(((cupboardHeightPx - cupboardDepthPx) / 2), roundExponent)
                                },
                                subDoubleThicknessPx : {
                                    value : utils.decimalRound(cupboardHeightPx - cupboardDepthPx - (thicknessPx * 2), roundExponent)
                                }
                            }
                        },
                        cupboardDepthPx : {
                            value : cupboardDepthPx,
                            halfCupboardDepthPx : {
                                value : utils.decimalRound(halfCupboardDepthPx, roundExponent)
                            }
                        },
                        thicknessPx : {
                            value : thicknessPx,
                            doubleThicknessPx : {
                                value : utils.decimalRound((thicknessPx * 2), roundExponent)
                            }
                        },
                        cupboardWidthPx : {
                            value : cupboardWidthPx,
                            subCupboardDepthPx : {
                                value : utils.decimalRound(cupboardWidthPx - cupboardDepthPx, roundExponent),
                                subThicknessPx : {
                                    value : utils.decimalRound(cupboardWidthPx - cupboardDepthPx - thicknessPx, roundExponent)
                                }
                            },
                            sumThicknessPx : {
                                value : utils.decimalRound(cupboardWidthPx + thicknessPx, roundExponent),
                                subTwo : {
                                    value : utils.decimalRound(cupboardWidthPx + thicknessPx - 2, roundExponent)
                                }
                            }
                        }
                    };

                return artmTree;
            },

            makeConstrDataObject: function(fcdo) {
                var artmTree = fcdo.artmTree,
                    currentEdgeColor = fcdo.currentEdgeColor,
                    currentMaterialColor = fcdo.currentMaterialColor,
                    currentDarkerMatColor = fcdo.currentDarkerMatColor,
                    borderSize = fcdo.borderSize,

                    showLeftWall = true,
                    showRightWall = true,
                    leftShelvesArray = [],
                    rightShelvesArray = [],
                    constrData = {},
                    partCoords = {},
                    shelveSlotMatrix = [],
                    storageFrnConstrDataObject = JSON.parse(
                        windowObject.localStorage.getItem(frnConstr.Const.LocalStorage.FRN_CONSTR_DATA_OBJECT));

                constrData = {
                    rearWall: {
                        key: constAppKeys.REAR_WALL_KEY,
                        enabled: fcdo.rearChkBox,
                        x: artmTree.frameX.sumLeftShelveWidthPx.sumThicknessPx.sumHalfCupboardDepth.value,
                        y: artmTree.frameY.sumHalfCupboardDepth.value,
                        width: artmTree.cupboardWidthPx.subCupboardDepthPx.subThicknessPx.value,
                        height: artmTree.cupboardHeightPx.subCupboardDepthPx.value,
                        borderSize: 1,
                        borderColor: currentEdgeColor,
                        borderAlpha: 1,
                        fillColor: currentMaterialColor,
                        fillAlpha: 1
                    },
                    ceiling: {
                        key: constAppKeys.CEILING_KEY,
                        enabled: fcdo.ceilingChkBox,
                        borderSize: borderSize,
                        borderColor: currentEdgeColor,
                        borderAlpha: 1,
                        line: {
                            pt1: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.value,
                                y: artmTree.frameY.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.value
                            }
                        },
                        polygon: {
                            pt1: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.sumThicknessPx.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.value,
                                y: artmTree.frameY.sumThicknessPx.value
                            },
                            pt3: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.subHalfCupboardDepth.subThicknessPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumThicknessPx.value
                            },
                            pt4: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumHalfCupboardDepth.sumDoubleThicknessPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumThicknessPx.value
                            },
                            fillColor: currentDarkerMatColor,
                            fillAlpha: 1
                        },
                        rect: {
                            x: artmTree.frameX.sumLeftShelveWidthPx.sumOne.value,
                            y: artmTree.frameY.value,
                            width: artmTree.cupboardWidthPx.sumThicknessPx.subTwo.value,
                            height: artmTree.thicknessPx.value,
                            fillColor: currentMaterialColor,
                            fillAlpha: 1
                        }
                    },
                    floor: {
                        key: constAppKeys.FLOOR_KEY,
                        enabled: fcdo.floorChkBox,
                        borderSize: borderSize,
                        borderColor: currentEdgeColor,
                        borderAlpha: 1,
                        line: {
                            pt1: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.sumFrameHeight.subShelveShiftFactor.sumThicknessPx.subTwo.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.value,
                                y: artmTree.frameY.sumFrameHeight.subShelveShiftFactor.sumThicknessPx.subTwo.value
                            }
                        },
                        polygon: {
                            pt1: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.sumFrameHeight.subShelveShiftFactor.subTwo.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumHalfCupboardDepth.sumDoubleThicknessPx.value,
                                y: artmTree.frameY.sumFrameHeight.subHalfCupboardDepth.subShelveShiftFactor.value
                            },
                            pt3: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.subHalfCupboardDepth.subThicknessPx.value,
                                y: artmTree.frameY.sumFrameHeight.subHalfCupboardDepth.subShelveShiftFactor.value
                            },
                            pt4: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumOne.value,
                                y: artmTree.frameY.sumFrameHeight.subShelveShiftFactor.subTwo.value
                            },
                            fillColor: currentDarkerMatColor,
                            fillAlpha: 1
                        },
                        rect: {
                            x: artmTree.frameX.sumLeftShelveWidthPx.sumOne.value,
                            y: artmTree.frameY.sumFrameHeight.subShelveShiftFactor.subTwo.value,
                            width: artmTree.cupboardWidthPx.sumThicknessPx.subTwo.value,
                            height: artmTree.thicknessPx.value,
                            fillColor: currentMaterialColor,
                            fillAlpha: 1
                        }
                    },
                    leftWall: {
                        key: constAppKeys.LEFT_WALL_KEY,
                        enabled: showLeftWall,
                        borderSize: borderSize,
                        borderColor: currentEdgeColor,
                        borderAlpha: 1,
                        polygon: {
                            pt1: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumHalfCupboardDepth.sumDoubleThicknessPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.value
                            },
                            pt3: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumHalfCupboardDepth.sumDoubleThicknessPx.value,
                                y: artmTree.frameY.sumFrameHeight.subHalfCupboardDepth.value
                            },
                            pt4: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.sumFrameHeight.value
                            },
                            fillColor: currentDarkerMatColor,
                            fillAlpha: 1
                        },
                        rect: {
                            x: artmTree.frameX.sumLeftShelveWidthPx.value,
                            y: artmTree.frameY.value,
                            width: artmTree.thicknessPx.value,
                            height: artmTree.cupboardHeightPx.value,
                            fillColor: currentMaterialColor,
                            fillAlpha: 1
                        }
                    },
                    rightWall: {
                        key: constAppKeys.RIGHT_WALL_KEY,
                        enabled: showRightWall,
                        borderSize: borderSize,
                        borderColor: currentEdgeColor,
                        borderAlpha: 1,
                        polygon: {
                            pt1: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.subHalfCupboardDepth.subThicknessPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.value,
                                y: artmTree.frameY.value
                            },
                            pt3: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.value,
                                y: artmTree.frameY.sumFrameHeight.value
                            },
                            pt4: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.subHalfCupboardDepth.subThicknessPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumRearHeight.value
                            },
                            fillColor: currentDarkerMatColor,
                            fillAlpha: 1
                        },
                        rect: {
                            x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.value,
                            y: artmTree.frameY.value,
                            width: artmTree.thicknessPx.value,
                            height: artmTree.cupboardHeightPx.value,
                            fillColor: currentMaterialColor,
                            fillAlpha: 1
                        }
                    },
                    leftShelveWall: {
                        key: constAppKeys.LEFT_SHELVE_WALL_KEY,
                        enabled: fcdo.leftShelveChkBox,
                        borderSize: borderSize,
                        borderColor: currentEdgeColor,
                        borderAlpha: 1,
                        polygon: {
                            pt1: {
                                x: artmTree.frameY.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumThicknessPx.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumThicknessPx.value
                            },
                            cp: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.value,
                                y: artmTree.frameY.sumHalfFrameHeight.value
                            },
                            pt3: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumRearHeight.subThicknessPx.value
                            },
                            pt4: {
                                x: artmTree.frameY.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumRearHeight.subThicknessPx.value
                            },
                            fillColor: currentDarkerMatColor,
                            fillAlpha: constGr.DEFAULT_SHADOW_ALPHA
                        },
                        rect: {
                            x: artmTree.frameX.value,
                            y: artmTree.frameY.sumHalfCupboardDepth.value,
                            width: artmTree.leftShelveWidthPx.value,
                            height: artmTree.cupboardHeightPx.subCupboardDepthPx.value,
                            fillColor: currentMaterialColor,
                            fillAlpha: 1
                        },
                        shelvesData: {
                            key: constAppKeys.LEFT_SHELVE_KEY,
                            frameHeight: artmTree.cupboardHeightPx.value,
                            halfCupboardDepth: artmTree.cupboardDepthPx.halfCupboardDepthPx.value,
                            rearHeight: artmTree.cupboardHeightPx.subCupboardDepthPx.value,
                            thickness: artmTree.thicknessPx.value,
                            borderColor: currentEdgeColor,
                            frontColor: currentMaterialColor,
                            areaColor: currentDarkerMatColor
                        }
                    },
                    rightShelveWall: {
                        key: constAppKeys.RIGHT_SHELVE_WALL_KEY,
                        enabled: fcdo.rightShelveChkBox,
                        borderSize: borderSize,
                        borderColor: currentEdgeColor,
                        borderAlpha: 1,
                        polygon: {
                            pt1: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.sumRightShelveWidthPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumThicknessPx.value
                            },
                            pt2: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumThicknessPx.value
                            },
                            cp: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.sumHalfFrameHeight.value
                            },
                            pt3: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumRearHeight.subThicknessPx.value
                            },
                            pt4: {
                                x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.sumRightShelveWidthPx.value,
                                y: artmTree.frameY.sumHalfCupboardDepth.sumRearHeight.subThicknessPx.value
                            },
                            fillColor: currentDarkerMatColor,
                            fillAlpha: constGr.DEFAULT_SHADOW_ALPHA
                        },
                        rect: {
                            x: artmTree.frameX.sumLeftShelveWidthPx.sumCupboardWidthPx.sumThicknessPx.value,
                            y: artmTree.frameY.sumHalfCupboardDepth.value,
                            width: artmTree.rightShelveWidthPx.value,
                            height: artmTree.cupboardHeightPx.subCupboardDepthPx.value,
                            fillColor: currentMaterialColor,
                            fillAlpha: 1
                        },
                        shelvesData: {
                            key: constAppKeys.RIGHT_SHELVE_KEY,
                            frameHeight: artmTree.cupboardHeightPx.value,
                            halfCupboardDepth: artmTree.cupboardDepthPx.halfCupboardDepthPx.value,
                            rearHeight: artmTree.cupboardHeightPx.subCupboardDepthPx.value,
                            thickness: artmTree.thicknessPx.value,
                            borderColor: currentEdgeColor,
                            frontColor: currentMaterialColor,
                            areaColor: currentDarkerMatColor
                        }
                    }
                };

                if (utils.isTruthy(storageFrnConstrDataObject)) {
                    if (utils.isTruthy(storageFrnConstrDataObject.constrData)) {

                        leftShelvesArray = (utils.isTruthy(storageFrnConstrDataObject.constrData.leftShelveWall.shelvesData.shelves) ?
                        storageFrnConstrDataObject.constrData.leftShelveWall.shelvesData.shelves : []);

                        rightShelvesArray = (utils.isTruthy(storageFrnConstrDataObject.constrData.rightShelveWall.shelvesData.shelves) ?
                        storageFrnConstrDataObject.constrData.rightShelveWall.shelvesData.shelves : []);

                        partCoords = (utils.isTruthy(storageFrnConstrDataObject.constrData.partCoords) ?
                        storageFrnConstrDataObject.constrData.partCoords : this.defaultPartCoordsObject());

                        shelveSlotMatrix = (utils.isTruthy(storageFrnConstrDataObject.constrData.shelveSlotMatrix) ?
                        storageFrnConstrDataObject.constrData.shelveSlotMatrix : ismUtils.makeInnerPartsMatrix(
                            constrData.ceiling.enabled,
                            constrData.floor.enabled,
                            constrData.leftWall.enabled,
                            constrData.shelveSlotMatrix,
                            fcdo.maxNumOfInnerShelves,
                            fcdo.maxNumOfBeams));
                        // TODO optimize the removal of parts with separate garbage collected arrays of parts
                        if (shelveSlotMatrix[0].length < fcdo.maxNumOfBeams) {
                            shelveSlotMatrix = ismUtils.addColumns(
                                shelveSlotMatrix, fcdo.maxNumOfBeams - shelveSlotMatrix[0].length, constrData.ceiling.enabled, constrData.floor.enabled);

                            partCoords.horzBaffles = this.extendHorzBafflesAndBeams(partCoords.horzBaffles, fcdo.maxNumOfBeams);
                            partCoords.horzBaffles.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.HORZ_BAFFLE_KEY);
                            }, partCoords.horzBaffles);

                            partCoords.horzBeams = this.extendHorzBafflesAndBeams(partCoords.horzBeams, fcdo.maxNumOfBeams);
                            partCoords.horzBeams.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.HORZ_BEAM_KEY);
                            }, partCoords.horzBeams);

                            partCoords.drawers = this.extendDrawerOrPtgrs(partCoords.drawers, fcdo.maxNumOfBeams, constGr.DRAWER_MIN_WIDTH, constGr.DRAWER_MAX_WIDTH);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.DRAWER_KEY);
                            partCoords.drawers.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.DRAWER_KEY);
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.DUMMY_SLOT_KEY);
                            }, partCoords.drawers);

                            partCoords.pantographs = this.extendDrawerOrPtgrs(partCoords.pantographs, fcdo.maxNumOfBeams, constGr.PTGR_MIN_WIDTH, constGr.PTGR_MAX_WIDTH);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.PANTOGRAPH_KEY);
                            partCoords.pantographs.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.PANTOGRAPH_KEY);
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.DUMMY_SLOT_KEY);
                            }, partCoords.pantographs);
                        }
                        // TODO optimize the removal of parts with separate garbage collected arrays of parts
                        if (shelveSlotMatrix[0].length > fcdo.maxNumOfBeams) {
                            shelveSlotMatrix = ismUtils.removeColumns(shelveSlotMatrix, shelveSlotMatrix[0].length - fcdo.maxNumOfBeams);

                            partCoords.horzBaffles = this.shrinkHorzBafflesAndBeams(partCoords.horzBaffles, fcdo.maxNumOfBeams);
                            partCoords.horzBeams = this.shrinkHorzBafflesAndBeams(partCoords.horzBeams, fcdo.maxNumOfBeams);

                            partCoords.pantographs = this.shrinkDrawersOrPtgrs(partCoords.pantographs, fcdo.maxNumOfBeams, constGr.PTGR_MIN_WIDTH, constGr.PTGR_MAX_WIDTH);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.PANTOGRAPH_KEY);
                            partCoords.pantographs.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.PANTOGRAPH_KEY);
                            }, partCoords.pantographs);

                            partCoords.drawers = this.shrinkDrawersOrPtgrs(partCoords.drawers, fcdo.maxNumOfBeams, constGr.DRAWER_MIN_WIDTH, constGr.DRAWER_MAX_WIDTH);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.DRAWER_KEY);
                            partCoords.drawers.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.DRAWER_KEY);
                            }, partCoords.drawers);

                            partCoords.vertBaffles = this.removeVertBafflesBeamsAndHangers(partCoords.vertBaffles, fcdo.maxNumOfBeams);
                            partCoords.vertBeams = this.removeVertBafflesBeamsAndHangers(partCoords.vertBeams, fcdo.maxNumOfBeams);

                            partCoords.hangers = this.removeVertBafflesBeamsAndHangers(partCoords.hangers, fcdo.maxNumOfBeams);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.HANGER_KEY);
                            partCoords.hangers.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.HANGER_KEY);
                            }, partCoords.hangers);

                            partCoords.ties = this.removeVertBafflesBeamsAndHangers(partCoords.ties, fcdo.maxNumOfBeams);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.TIE_KEY);
                            partCoords.ties.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.TIE_KEY);
                            }, partCoords.ties);

                            partCoords.shoes = this.removeVertBafflesBeamsAndHangers(partCoords.shoes, fcdo.maxNumOfBeams);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.SHOES_KEY);
                            partCoords.shoes.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.SHOES_KEY);
                            }, partCoords.shoes);

                            partCoords.trousers = this.removeVertBafflesBeamsAndHangers(partCoords.trousers, fcdo.maxNumOfBeams);
                            shelveSlotMatrix = ismUtils.removeAreaOfParts(shelveSlotMatrix, 0, 0, fcdo.maxNumOfShelves, fcdo.maxNumOfBeams, constAppKeys.TROUSER_KEY);
                            partCoords.trousers.forEach(function (crv, index, arr) {
                                shelveSlotMatrix = ismUtils.addAreaOfParts(shelveSlotMatrix, crv.row, crv.col, crv.rowShift, crv.colShift, constAppKeys.TROUSER_KEY);
                            }, partCoords.trousers);
                        }
                        console.log("blabla: " + shelveSlotMatrix[0].length);
                    } else {

                        leftShelvesArray = [];
                        rightShelvesArray = [];
                        partCoords = this.defaultPartCoordsObject();
                        shelveSlotMatrix = ismUtils.makeInnerPartsMatrix(
                            constrData.ceiling.enabled,
                            constrData.floor.enabled,
                            constrData.leftWall.enabled,
                            constrData.shelveSlotMatrix,
                            fcdo.maxNumOfInnerShelves,
                            fcdo.maxNumOfBeams);

                        console.log("tralala");
                    }
                } else {
                    console.log("sama si go barala");
                }

                // left shelve slots
                constrData.leftShelveWall.shelvesData.shelves = this.createLeftWallSlots(fcdo, leftShelvesArray);

                // right shelve slots
                constrData.rightShelveWall.shelvesData.shelves = this.createRightWallSlots(fcdo, rightShelvesArray);

                constrData.partCoords = partCoords;

                constrData.shelveSlotMatrix = shelveSlotMatrix;

                return constrData;
            },
            // TODO removeVertBafflesBeamsAndHangers(partsArray, maxNumOfBeams) - add test coverage.
            removeVertBafflesBeamsAndHangers: function (partsArray, maxNumOfBeams) {
                var result = [],
                    partObj = {},
                    garbage = [],
                    b = 0;

                for (b = 0; b < partsArray.length; b += 1) {
                    partObj = partsArray[b];

                    if (partObj.colShift <= maxNumOfBeams) {
                        result.push(partObj);
                    } else {
                        garbage.push(partObj);
                    }

                }
                console.log("removeVertBafflesBeamsAndHangers garbage:");
                console.dir(garbage);
                return result;
            },
            // TODO extendHorzBafflesAndBeams(bafflesOrBeamsArray, maxNumOfBeams) - add test coverage.
            extendHorzBafflesAndBeams: function (bafflesOrBeamsArray, maxNumOfBeams) {
                var result = [],
                    garbage = [],
                    baffleOrBeamObj = {},
                    b = 0;

                for (b = 0; b < bafflesOrBeamsArray.length; b += 1) {
                    baffleOrBeamObj = bafflesOrBeamsArray[b];

                    if (baffleOrBeamObj.colShift <= maxNumOfBeams && baffleOrBeamObj.col < maxNumOfBeams) {
                        baffleOrBeamObj.colShift = maxNumOfBeams;
                        result.push(baffleOrBeamObj);
                    } else {
                        garbage.push(baffleOrBeamObj);
                    }

                }
                console.log("extendHorzBafflesAndBeams garbage:");
                console.dir(garbage);
                return result;
            },
            // TODO shrinkHorzBafflesAndBeams(bafflesOrBeamsArray, maxNumOfBeams) - add test coverage.
            shrinkHorzBafflesAndBeams: function (bafflesOrBeamsArray, maxNumOfBeams) {
                var result = [],
                    garbage = [],
                    baffleOrBeamObj = {},
                    b = 0;

                for (b = 0; b < bafflesOrBeamsArray.length; b += 1) {
                    baffleOrBeamObj = bafflesOrBeamsArray[b];

                    if (baffleOrBeamObj.colShift >= maxNumOfBeams && baffleOrBeamObj.col < maxNumOfBeams) {
                        baffleOrBeamObj.colShift = maxNumOfBeams;
                        result.push(baffleOrBeamObj);
                    } else if (baffleOrBeamObj.colShift < maxNumOfBeams && baffleOrBeamObj.col < maxNumOfBeams) {
                        result.push(baffleOrBeamObj);
                    } else {
                        garbage.push(baffleOrBeamObj);
                    }

                }
                console.log("shrinkHorzBafflesAndBeams garbage:");
                console.dir(garbage);
                return result;
            },
            // TODO extendDrawerOrPtgrs(drawersAndPtgrs, maxNumOfBeams, minWidth, maxWidth) - add test coverage.
            extendDrawerOrPtgrs: function (drawersAndPtgrs, maxNumOfBeams, minWidth, maxWidth) {
                var result = [],
                    garbage = [],
                    drawerOrPtgr = {},
                    b = 0;

                for (b = 0; b < drawersAndPtgrs.length; b += 1) {
                    drawerOrPtgr = drawersAndPtgrs[b];

                    if (drawerOrPtgr.colShift <= maxNumOfBeams && drawerOrPtgr.col < maxNumOfBeams) {console.log(drawerOrPtgr.colShift + "<=" + maxNumOfBeams);
                        if (maxNumOfBeams - drawerOrPtgr.col >= minWidth && maxNumOfBeams - drawerOrPtgr.col <= maxWidth) {
                            drawerOrPtgr.colShift = maxNumOfBeams;
                            result.push(drawerOrPtgr);
                        } else {
                            garbage.push(garbage);
                        }
                    } else {
                        garbage.push(garbage);
                    }

                }
                console.log("extendDrawerOrPtgrs garbage:");
                console.dir(garbage);
                return result;
            },
            // TODO shrinkDrawersOrPtgrs(drawersAndPtgrs, maxNumOfBeams, minWidth, maxWidth) - add test coverage.
            shrinkDrawersOrPtgrs: function (drawersAndPtgrs, maxNumOfBeams, minWidth, maxWidth) {
                var result = [],
                    garbage = [],
                    drawerOrPtgr = {},
                    b = 0;

                for (b = 0; b < drawersAndPtgrs.length; b += 1) {
                    drawerOrPtgr = drawersAndPtgrs[b];

                    if (drawerOrPtgr.colShift >= maxNumOfBeams && drawerOrPtgr.col < maxNumOfBeams) {
                        if (maxNumOfBeams - drawerOrPtgr.col >= minWidth && maxNumOfBeams - drawerOrPtgr.col <= maxWidth) {
                            drawerOrPtgr.colShift = maxNumOfBeams;
                            result.push(drawerOrPtgr);
                        } else {
                            garbage.push(drawerOrPtgr);
                        }
                    } else if (drawerOrPtgr.colShift < maxNumOfBeams && drawerOrPtgr.col < maxNumOfBeams) {
                        result.push(drawerOrPtgr);
                    } else {
                        garbage.push(drawerOrPtgr);
                    }

                }
                console.log("shrinkDrawersOrPtgrs garbage:");
                console.dir(garbage);
                return result;
            },

            defaultPartCoordsObject: function () {
                return {
                    horzBaffles: [],
                    horzBeams: [],
                    vertBaffles: [],
                    vertBeams: [],
                    drawers: [],
                    ties: [],
                    shoes: [],
                    trousers: [],
                    hangers: [],
                    pantographs: []
                 };
            },

            shelveSlotObject : function(x, y, shiftX, shiftY, busy) {
                return {
                    x : x,
                    y : y,
                    shiftX : shiftX,
                    shiftY : shiftY,
                    busy : busy
                };
            },

            leftShelveSlot : function(fcdo, busy, shiftY) {
                return this.shelveSlotObject(0, 0, utils.decimalRound(fcdo.artmTree.leftShelveWidthPx.value, frnConst.DECIMAL_ROUND_EXP), shiftY, busy);
            },

            rightShelveSlot : function(fcdo, busy, shiftY) {
                return this.shelveSlotObject(fcdo.artmTree.fullWidthPx.sumThicknessPx.value, 0,
                    fcdo.artmTree.fullWidthPx.sumThicknessPx.subRightShelveWidthPx.value, shiftY, busy);
            },

            createLeftWallSlots : function(fcdo, busyArray) {
                var i = 0,
                    artmTree = fcdo.artmTree,
                    shelveShiftFactor = fcdo.shelveShiftFactor,
                    maxNumOfShelves = fcdo.maxNumOfShelves,
                    halfNumOfShelves = utils.decimalRound((maxNumOfShelves / 2), 0),
                    currentNumOfShelves = busyArray.length,
                    shelves = [];

                shelves.push(this.leftShelveSlot(fcdo,
                    ((currentNumOfShelves === maxNumOfShelves) ? busyArray[0].busy : true),
                    utils.decimalRound(artmTree.halfCupboardDepthPx.value, frnConst.DECIMAL_ROUND_EXP)));

                for (i = 1; i < halfNumOfShelves; i += 1) {
                    shelves.push(this.leftShelveSlot(fcdo,
                        ((currentNumOfShelves === maxNumOfShelves) ? busyArray[i].busy : false),
                        utils.decimalRound(artmTree.halfCupboardDepthPx.value + (shelveShiftFactor * i),
                            frnConst.DECIMAL_ROUND_EXP)));
                }

                for (i = halfNumOfShelves; i < maxNumOfShelves - 1; i += 1) {
                    shelves.push(this.leftShelveSlot(fcdo,
                        ((currentNumOfShelves === maxNumOfShelves) ? busyArray[i].busy : false),
                        utils.decimalRound(artmTree.halfCupboardDepthPx.sumThicknessPx.value + (shelveShiftFactor * i),
                            frnConst.DECIMAL_ROUND_EXP)));
                }

                shelves.push(this.leftShelveSlot(fcdo,
                    ((currentNumOfShelves === maxNumOfShelves) ? busyArray[maxNumOfShelves - 1].busy : true),
                    utils.decimalRound(artmTree.halfCupboardDepthPx.sumRearHeight.subShelveShiftFactor.sumThicknessPx.value,
                        frnConst.DECIMAL_ROUND_EXP)));

                console.log(shelves.length + ", " + maxNumOfShelves);

                return shelves;
            },

            createRightWallSlots : function(fcdo, busyArray) {
                var i = 0,
                    artmTree = fcdo.artmTree,
                    maxNumOfShelves = fcdo.maxNumOfShelves,
                    shelveShiftFactor = fcdo.shelveShiftFactor,
                    shelves = [],
                    currentNumOfShelves = busyArray.length,
                    halfNumOfShelves = utils.decimalRound((maxNumOfShelves / 2), 0);

                shelves.push(this.rightShelveSlot(fcdo,
                    ((currentNumOfShelves === maxNumOfShelves) ? busyArray[0].busy : true),
                    utils.decimalRound(artmTree.halfCupboardDepthPx.value, frnConst.DECIMAL_ROUND_EXP)));

                for (i = 1; i < halfNumOfShelves; i += 1) {
                    shelves.push(this.rightShelveSlot(fcdo,
                        ((currentNumOfShelves === maxNumOfShelves) ? busyArray[i].busy : false),
                        utils.decimalRound(artmTree.halfCupboardDepthPx.value + (shelveShiftFactor * i),
                            frnConst.DECIMAL_ROUND_EXP)));
                }

                for (i = halfNumOfShelves; i < maxNumOfShelves - 1; i += 1) {
                    shelves.push(this.rightShelveSlot(fcdo,
                        ((currentNumOfShelves === maxNumOfShelves) ? busyArray[i].busy : false),
                        utils.decimalRound(artmTree.halfCupboardDepthPx.sumThicknessPx.value + (shelveShiftFactor * i),
                            frnConst.DECIMAL_ROUND_EXP)));
                }

                shelves.push(this.rightShelveSlot(fcdo,
                    ((currentNumOfShelves === maxNumOfShelves) ? busyArray[maxNumOfShelves - 1].busy : true),
                    utils.decimalRound(artmTree.halfCupboardDepthPx.sumRearHeight.subShelveShiftFactor.sumThicknessPx.value,
                        frnConst.DECIMAL_ROUND_EXP)));

                console.log(shelves.length + ", " + maxNumOfShelves);

                return shelves;
            }
        };
    }(window, window.FrnConstr, Phaser, $)));