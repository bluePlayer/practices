window.FrnConstr.namespace('ISMUConstants', {}, (function (frnConstr) {'use strict';

    return {
        init: function () {
            var frnConst = frnConstr.Const,
                frnConstGr = frnConst.Graphics,
                frnConstApp = frnConst.Application,
                frnConstLS = frnConst.LocalStorage;

            // application settings
            frnConstr.addConstant(frnConstApp.Keys, 'DEFAULT_SLOT_MATRIX', 'defaultMatrix');
            frnConstr.addConstant(frnConstApp.Keys, 'NO_CEIL_DEFAULT_MATRIX', 'noCeil');
            frnConstr.addConstant(frnConstApp.Keys, 'NO_FLOOR_DEFAULT_MATRIX', 'noFloor');
            frnConstr.addConstant(frnConstApp.Keys, 'NO_LEFT_WALL_DEFAULT_MATRIX', 'noLeftWall');
            frnConstr.addConstant(frnConstApp.Keys, 'NO_CEIL_NO_FLOOR_DEFAULT_MATRIX', 'noCeilNoFloor');
            frnConstr.addConstant(frnConstApp.Keys, 'NO_CEIL_NO_LEFT_WALL_DEFAULT_MATRIX', 'noCeilNoLeftWall');
            frnConstr.addConstant(frnConstApp.Keys, 'NO_FLOOR_NO_LEFT_WALL_DEFAULT_MATRIX', 'noFloorNoLeftWall');
            frnConstr.addConstant(frnConstApp.Keys, 'NO_CEIL_NO_FLOOR_NO_LEFT_WALL_DEFAULT_MATRIX', 'noCeilNoFloorNoLeftWall');


        }
    };
    }(window.FrnConstr)).init());