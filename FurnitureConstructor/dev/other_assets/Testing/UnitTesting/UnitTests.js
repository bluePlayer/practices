window.UnitTests = window.UnitTests || (function (unitTestsObject) {'use strict';

    return {
        namespace: function (namespaceStr, inheritObject, newObject) {
            var parts = namespaceStr.split('.'),
                helpObject = Object.create(inheritObject),
                utObject = this,
                i = 0,
                prop = {};

            if (inheritObject === null || inheritObject === undefined) {
                inheritObject = {};
            }

            //if (parts[0] === unitTestsObject.Const.GAME_NAME) {
            //    parts = parts.slice(1);
            //}

            for (i = 0; i < parts.length; i += 1) {
                if (utObject[parts[i]] === undefined) {
                    for (prop in newObject) {
                        if (newObject.hasOwnProperty(prop)) {
                            helpObject[prop] = newObject[prop];
                        }
                    }
                    utObject[parts[i]] = helpObject;
                }
                utObject = utObject[parts[i]];
            }
            return utObject;
        }
    };
    }(window.UnitTests));