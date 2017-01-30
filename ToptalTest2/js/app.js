/**
 *
 */
window.ToptalTestE2 = window.ToptalTestE2 || ( function() {
        'use strict';

        var self = null;

        return {
            findSumOfArray: function (arr) {
                var i = 0,
                    sum = 0;

                for (i = 0; i < arr.length; i += 1) {
                    sum += arr[i];
                }

                return sum;
            },

            solution : function(A) {
                var N = A.length,
                    B = 0,
                    i = 0,
                    inverseB = 0;

                for (i = 0; i < N; i += 1) {
                    B += A[i] * Math.pow(-2, i);
                }

                inverseB = -B;

                //console.log(inverseB.toString());
                //console.log(parseInt(inverseB.toString(), 2));
                //console.log((inverseB >>> 0).toString(2));
            }
        };

    }());

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var ToptalTestE2 = window.ToptalTestE2;

    ToptalTestE2.solution([1, 0, 0, 1, 1]);
    ToptalTestE2.solution([1, 0, 0, 1, 1, 1]);
});