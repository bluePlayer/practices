window.FrnConstr.namespace('ExteriorScreen', window.FrnConstr.Screen, (function (frnConstr, phaser, jq) {'use strict';
    var thisObject = null,
        gameObject = null,
        sceneTitle = null,
        mainMenuBg = null,
        constGr = frnConstr.Const.Graphics,
        grUtils = frnConstr.GraphicsUtility,
        grObject = null,
        colorPicker = null,
        swatchesShown = false,
        shelveCssColor = constGr.Colors.Material.MAT_DARK_BLUE;

    return {

        init: function () {
            thisObject = this;
            gameObject = frnConstr.gameObject;
            thisObject.screenObjects = gameObject.add.group();
        },

        create: function () {

            grObject = gameObject.add.graphics(0, 0);

            mainMenuBg = grUtils.drawRect(grObject, 0, 0, gameObject.world.width, gameObject.world.height, 0, constGr.Colors.BLACK, 0, constGr.Colors.BACKGROUND_COLOR, 1, "background");
            grObject.addChild(mainMenuBg);

            sceneTitle = grUtils.drawText(grObject, 100, 100, "Exterior Scene", utils.getTextStyle12(), "sceneTitle");
            grObject.addChild(sceneTitle);

            thisObject.screenObjects.add(grObject);

            colorPicker = grUtils.drawColorPicker(
                                    grObject,
                                    200, 200,
                                    shelveCssColor,
                                    constGr.Colors.Material,
                                    swatchesShown,
                                    thisObject.changeColor);
            //swatchesShown = (swatchesShown ? false : true);

            frnConstr.fadeInGroup(thisObject.screenObjects);
            //frnConstr.setExteriorBmpData(frnConstr.Utility.saveCanvasData());
            //frnConstr.setExteriorBmpData(jq.extend({}, frnConstr.Utility.saveCanvasData('exterior')));
            //window.localStorage.setItem('exterior', frnConstr.Utility.stringifyCyclic(frnConstr.Utility.saveCanvasData()));
        },

        shutdown: function () {
            thisObject.screenObjects = null;
            gameObject = null;
        },

        changeColor: function () {
            var rc = this.rectColor;

            shelveCssColor = rc;

            if (colorPicker !== null || colorPicker !== undefined) {
                colorPicker.destroy();
            }
            colorPicker = grUtils.drawColorPicker(
                                    grObject,
                                    200, 200,
                                    rc,
                                    constGr.Colors.Material,
                                    swatchesShown,
                                    thisObject.changeColor);

        }
    };
    }(window.FrnConstr, Phaser, $)));
