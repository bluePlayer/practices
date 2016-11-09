window.FrnConstr.namespace('FrnConstrMessages', {}, (function (frnConstr) {'use strict';
    var frnData = frnConstr.Const.Application.FrnData,
        utils = frnConstr.Utility;

    return {
        init: function (fcdo) {

            frnConstr.addConstant(frnConstr.Const.Messages, 'NON_NUMERIC_DATA_MSG', 'Non numeric data entered!');

            frnConstr.addConstant(frnConstr.Const.Messages,
                                    'LEFT_SHELVE_CANNOT_FIT_MSG', 'The left shelve cannot fit! Min. width for the cupboard is ' + frnData.cupboardWidth.MIN_VAL + " millimeters.");
            frnConstr.addConstant(frnConstr.Const.Messages,
                                    'RIGHT_SHELVE_CANNOT_FIT_MSG', 'The right shelve cannot fit! Min. width for the cupboard is ' + frnData.cupboardWidth.MIN_VAL + " millimeters.");

            // mills per pixel
            frnConstr.addConstant(frnConstr.Const.Messages.millsPerPixel,
                                    'VERY_LOW_MSG',
                                    'Millimeters per pixels is very low! ' + frnData.millsPerPixel.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.millsPerPixel,
                                    'VERY_HIGH_MSG',
                                    'Millimeters per pixels is very high! ' + frnData.millsPerPixel.RANGE_LABEL);

            // mills per pixels for depth
            frnConstr.addConstant(frnConstr.Const.Messages.millsPerPixelForDepth,
                                    'VERY_LOW_MSG',
                                    'Millimeters per pixels for depth is very low! ' + frnData.millsPerPixelForDepth.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.millsPerPixelForDepth,
                                    'VERY_HIGH_MSG',
                                    'Millimeters per pixels for depth is very high! ' + frnData.millsPerPixelForDepth.RANGE_LABEL);

            // cupboard width
            frnConstr.addConstant(frnConstr.Const.Messages.cupboardWidth,
                                    'VERY_LOW_MSG',
                                    'Cupboard width is very low! ' + frnData.cupboardWidth.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.cupboardWidth,
                                    'VERY_HIGH_MSG',
                                    'Cupboard width is very high! ' + frnData.cupboardWidth.RANGE_LABEL);

            // cupboard height
            frnConstr.addConstant(frnConstr.Const.Messages.cupboardHeight,
                                    'VERY_LOW_MSG',
                                    'Cupboard height is very low! ' + frnData.cupboardHeight.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.cupboardHeight,
                                    'VERY_HIGH_MSG',
                                    'Cupboard height is very high! ' + frnData.cupboardHeight.RANGE_LABEL);

            // cupboard depth
            frnConstr.addConstant(frnConstr.Const.Messages.cupboardDepth,
                                    'VERY_LOW_MSG',
                                    'Cupboard depth is very low! ' + frnData.cupboardDepth.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.cupboardDepth,
                                    'VERY_HIGH_MSG',
                                    'Cupboard depth is very high! ' + frnData.cupboardDepth.RANGE_LABEL);

            // left shelve width
            frnConstr.addConstant(frnConstr.Const.Messages.leftShelveWidth,
                                    'VERY_LOW_MSG',
                                    'Left shelve width is very low! ' + frnData.leftShelveWidth.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.leftShelveWidth,
                                    'VERY_HIGH_MSG',
                                    'Left shelve width is very high! ' + frnData.leftShelveWidth.RANGE_LABEL);

            // right shelve width
            frnConstr.addConstant(frnConstr.Const.Messages.rightShelveWidth,
                                    'VERY_LOW_MSG',
                                    'Right shelve width is very low! ' + frnData.rightShelveWidth.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.rightShelveWidth,
                                    'VERY_HIGH_MSG',
                                    'Right shelve width is very high! ' + frnData.rightShelveWidth.RANGE_LABEL);

            // thickness
            frnConstr.addConstant(frnConstr.Const.Messages.thickness,
                                    'VERY_LOW_MSG',
                                    'Thickness is very low! ' + frnData.thickness.RANGE_LABEL);
            frnConstr.addConstant(frnConstr.Const.Messages.thickness,
                                    'VERY_HIGH_MSG',
                                    'Thickness is very high! ' + frnData.thickness.RANGE_LABEL);

            frnConstr.addConstant(frnConstr.Const.Messages, 'LEFT_MAX_NUM_OF_SHELVES_REACHED_MSG',
                                    'Number of shelves for left wall is reached! Max: ' + fcdo.maxNumOfShelves);

            frnConstr.addConstant(frnConstr.Const.Messages, 'RIGHT_MAX_NUM_OF_SHELVES_REACHED_MSG',
                                    'Number of shelves for right wall is reached! Max: ' + fcdo.maxNumOfShelves);
        }
    };
    }(window.FrnConstr)));