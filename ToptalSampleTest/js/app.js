/**
 *
 */
window.ToptalSampleTest = window.ToptalSampleTest || ( function() {
        'use strict';

        var self = null,
            equilibriums = [];

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
                var j = 0,
                    P = 0,
                    N = A.length,
                    leftArray = [],
                    rightArray = [],
                    sum1 = 0,
                    sum2 = 0,
                    sum = 0,
                    result = -1;

                self = this;

                sum = self.findSumOfArray(A);

                for (P = 0; P < N; P += 1) {

                    if (P === 0) {
                        sum1 = 0;
                        sum2 = sum;
                    } else if (P === N - 1) {
                        sum1 = sum;
                        sum2 = 0;
                    } else {
                        for (j = 0; j < P; j += 1) {
                            leftArray.push(A[j]);
                        }

                        sum1 = self.findSumOfArray(leftArray);

                        for (j = P; j < N; j += 1) {
                            rightArray.push(A[j]);
                        }

                        sum2 = self.findSumOfArray(rightArray);

                        if (sum1 === sum2) {
                            equilibriums.push(P);
                        }
                    }
                }

                if (equilibriums.length !== 0) {
                    result = equilibriums[0];
                }

                return result;
            }
        };

    }());

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var ToptalSampleTest = window.ToptalSampleTest;

    console.log(ToptalSampleTest.solution([-1, 3, -4, 5, 1, -6, 2, 1]));
});