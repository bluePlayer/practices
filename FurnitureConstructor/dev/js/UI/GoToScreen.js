window.FrnConstr.namespace('GoToScreen', window.FrnConstr.frnConstrButton, (function (FrnConstr) {'use strict';
    var gameObject = FrnConstr.gameObject,
        phaserButton = null,
        clickHandler = null;

    return {

        Button: function (screenKeyName, screenObjects, x, y, key, context, overHandler, outHandler, downHandler, upHandler,
                            overFrame, outFrame, downFrame, upFrame, params, callback) {

            clickHandler = this.CreateGoToScreenClickHandler(FrnConstr, screenObjects, screenKeyName, params, callback);
            phaserButton = this.frnConstrButton(x, y, key, context, clickHandler, overHandler, outHandler, downHandler, upHandler,
                                            null, null, overFrame, outFrame, downFrame, upFrame);
            return phaserButton;
        },

        CreateGoToScreenClickHandler: function (frnConstrParam, screenObjects, screenKeyName, params, callback) {
            return function () {
                if (callback !== undefined && callback !== null && typeof callback === 'function') {
                    if (params !== null && params !== undefined) {
                        callback.apply(callback, params);
                    } else {
                        callback();
                    }
                }

                frnConstrParam.fadeOutGroup(screenObjects).onComplete.add(function () {
                    var frnConstrObject = this;

                    frnConstrObject.gameObject.state.start(screenKeyName, true, false, params);
                    frnConstrObject.gameObject.state.clearCurrentState();
                }, frnConstrParam);
            };
        }
    };
    }(window.FrnConstr)));