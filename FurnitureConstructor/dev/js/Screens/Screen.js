window.FrnConstr.namespace('Screen', window.FrnConstr.State, (function (FrnConstr, phaser) {'use strict';
    var gameObject = FrnConstr.gameObject,
        bmpData = null;

    return {
        redrawnObjects: null,
        screenObjects: null,
        bottomObjects: null,
        topObjects: null,

        clearScreenState: function () {
            this.screenObjects = null;
        }
    };
    }(window.FrnConstr, Phaser)));
