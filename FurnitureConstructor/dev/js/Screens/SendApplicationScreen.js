window.FrnConstr.namespace('SendApplicationScreen', window.FrnConstr.Screen, (function (frnConstr) {'use strict';
    var thisObject = null,
        gameObject = null,
        sceneTitle = null,
        mainMenuBg = null,
        playButton = null,
        helpButton = null,
        sbButton = null,
        twitterButton = null,
        facebookButton = null,
        optionsButton = null;

    return {

        init: function () {
            thisObject = this;
            gameObject = frnConstr.gameObject;
            thisObject.screenObjects = gameObject.add.group();
        },

        create: function () {
            sceneTitle = gameObject.add.text(100, 100, "Send Application Scene");
            thisObject.screenObjects.add(sceneTitle);

            //console.log( frnConstr.getEnteriorBmpData());
            //console.log( frnConstr.getExteriorBmpData());
            //gameObject.add.image(0, 0,  gameObject.cache.getBitmapData('enterior'));
            //gameObject.add.image(150, 0,  gameObject.cache.getBitmapData('exterior'));

           // frnConstr.Utility.addScreenBmpData(frnConstr.getEnteriorBmpData(), 0, 0);
           // frnConstr.Utility.addScreenBmpData(frnConstr.getExteriorBmpData(), 300, 0);

            frnConstr.fadeInGroup(thisObject.screenObjects);
        },

        shutdown: function () {
            thisObject.screenObjects = null;
            gameObject = null;
        }
    };
    }(window.FrnConstr)));
