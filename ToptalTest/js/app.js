/**
 *
 */
window.ToptalTestE1 = window.ToptalTestE1 || ( function() {
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

            solution : function(S) {
                var openBr = '(',
                    closedBr = ')',
                    numOfOpen = 0,
                    numOfClosed = 0,
                    containsOpen = S.indexOf(openBr),
                    containsClosed = S.indexOf(closedBr),
                    countingArray = [],
                    openBrArray = [],
                    closedBrArray = [],
                    brackets = [],
                    i = 0,
                    j = 0,
                    N = S.length,
                    K = -1;

                if ((containsOpen !== -1) && (containsClosed !== -1)) {
                    brackets = S.split('');

                    for (i = 0; i < N; i += 1) {
                        if (S[i] === openBr) {
                            numOfOpen += 1;
                        }

                        if (S[i] === closedBr) {
                            numOfClosed += 1;
                        }
                    }

                    if ((numOfOpen === numOfClosed) ||
                        (numOfClosed === (numOfOpen + 1)) ||
                        (numOfOpen === (numOfClosed + 1))) {

                        openBrArray = S.split(closedBr);
                        closedBrArray = S.split(openBr);

                        for (i = 0; i < N; i += 1) {
                            if (S[i] === openBr) {
                                countingArray.push(openBr);
                            }
                        }

                        console.log("open: " + numOfOpen + ", closed: " + numOfClosed);

                        console.dir(openBrArray);
                        console.dir(closedBrArray);
                    }
                }

                return K;
            }
        };

    }());

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var ToptalTestE1 = window.ToptalTestE1;

    ToptalTestE1.solution("((((((");
    ToptalTestE1.solution("))))))");
    ToptalTestE1.solution("(())))(");
    ToptalTestE1.solution("()))))))");
    ToptalTestE1.solution("())()(()");
    ToptalTestE1.solution("(()(())");
});