window.FrnConstr.namespace('TestScreen', window.FrnConstr.Screen, (function (frnConstr) {'use strict';
    var gameObject = null,
        artmTree = {};

    return {

        init: function () {
            gameObject = frnConstr.gameObject;
        },

        create: function () {
            var shiftX = 100,
                shiftY = 100,
                testGraphics = gameObject.add.graphics(shiftX, shiftY),
                rect = null;

            rect = frnConstr.GraphicsUtility.drawRect(testGraphics, 0, 0, 100, 100, 0.5, 0x000000, 1, 0xff0000, 1, "testGraphics");

            /*
             * var hexRegEx = /[0-9A-Fa-f]/gi,
    hexRegEx1 = /[0-9A-Fa-f]{6}/gi
    chars = "abcidefghij123233232bfdaaa".match(hexRegEx).join("");
console.log("abcidefghij123233232bfda" + ", " + chars);
console.log(chars.match(hexRegEx1));
//console.log(parseInt("abcdefghij", 16));
//console.log(parseInt("abcdef", 16));
//console.log(parseInt(" abcdef ", 16));
//console.log(parseInt("   abc   idef", 16));
//console.log(parseInt("0abcdef", 16));
             */
                            /*opGraph = {
                    frmX: {
                        value: frmX,
                        sumLeftShelveWidth:{
                            value: opGraph.frmX.value + opGraph.leftShelveWidth.value,
                            sumThickness: {
                                value: opGraph.frmX.sumLeftShelveWidth.value + opGraph.thickness.value
                            },
                            sumFrmWidth: {
                                value: opGraph.frmX.sumLeftShelveWidth.value + opGraph.frmWidth.value,
                                sumThickness: {
                                    value: opGraph.frmX.sumLeftShelveWidth.sumFrmWidth + opGraph.thickness.value
                                },
                                subHalfCupboardWidth: {
                                    value: opGraph.frmX.sumLeftShelveWidth.sumFrmWidth.value - opGraph.cupboardDepth.divHalfCupboardDepth.value
                                }
                            }
                        }
                    },
                    frmY: {
                        value: frmY,
                        sumHalfCupboardDepth: {
                            value: opGraph.frmY.value + opGraph.cupboardDepth.halfCupboardDepth
                        }
                    },
                    cupboardDepth: {
                        value: cupboardDepth,
                        divHalfCupboardDepth: {
                            value: (cupboardDepth / 2)
                        },
                        subDoubleThickness: {
                            value: opGraph.cupboardDepth.value - opGraph.thickness.mulDoubleThickness.value
                        }
                    },
                    thickness: {
                        value: thickness,
                        mulDoubleThickness: {
                            value: (thickness * 2)
                        }
                    },
                    leftShelveWidth: {
                        value: leftShelveWidth
                    },
                    frmWidth: {
                        value: frmWidth,
                        subCupboardDepth: {
                            value: opGraph.frmWidth.value - opGraph.cupboardDepth.subDoubleThickness.value
                        }
                    },
                    frmHeight: {
                        value: frmHeight
                    },
                    rearWallWidth: {
                        value: opGraph.frmWidth.value - opGraph.cupboardDepth.value - opGraph.thickness.mulDoubleThickness.value
                    }
                };

console.log(opGraph);*/
            //this.addSum(3, "op1", 2, "op2");
            //this.addMul(3, "op1", 2, "op2");
            //this.addSub(3, "op1", 2, "op2");
            //this.addDiv(3, "op1", 2, "op2");
            //console.log(artmTree);
        },

        render: function () {
            //gameObject.debug.spriteInfo(boxes[3], 32, 32);
        },

        addSum: function (op1, op1name, op2, op2name) {
            var newName = "sum" + op2name.charAt(0).toUpperCase() + op2name.substring(1);
            artmTree[op1name] = {};
            artmTree[op1name].value = op1;
            artmTree[op1name][newName] = (op1 + op2);
        },

        addMul: function (op1, op1name, op2, op2name) {
            var newName = "mul" + op2name.charAt(0).toUpperCase() + op2name.substring(1);
            artmTree[op1name] = {};
            artmTree[op1name].value = op1;
            artmTree[op1name][newName] = (op1 * op2);
        },

        addSub: function (op1, op1name, op2, op2name) {
            var newName = "sub" + op2name.charAt(0).toUpperCase() + op2name.substring(1);
            artmTree[op1name] = {};
            artmTree[op1name].value = op1;
            artmTree[op1name][newName] = (op1 - op2);
        },

        addDiv: function (op1, op1name, op2, op2name) {
            var newName = "div" + op2name.charAt(0).toUpperCase() + op2name.substring(1);
            artmTree[op1name] = {};
            artmTree[op1name].value = op1;
            artmTree[op1name][newName] = ((op2 === 0) ? 0 : op1 / op2);
        },

        shutdown: function () {

        }
    };
    }(window.FrnConstr)));
