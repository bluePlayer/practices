/**
 * Custom Chord Layout Function.
 * Places the Chords in the visually best order to reduce overlap.
 *
 * Slightly adjusted by Nadieh Bremer
 * @see VisualCinnamon.com
 * @see http://bl.ocks.org/nbremer/4de6f0a9d9d06373fc639e32e9c346cc
 *
 * Original from the d3.layout.chord() function from the d3.js library
 * @author Mike Bostock
 */
window.ChordDiagramUtils = window.ChordDiagramUtils || ( function(d3) {
        'use strict';
        var self = null,
            E = 1e-6,
            ESquared = E * E,
            PI = Math.PI,
            theta = 2 * PI,
            thetaMinusE = theta - E,
            halfPI = PI / 2,
            d3_radians = PI / 180,
            d3_degrees = 180 / PI,
            chord = {},
            chords = [],
            groups = [],
            matrix = [],
            n = 0,
            padding = 0,
            sortGroups,
            sortSubgroups,
            sortChords;

        return {
            resort : function() {
                chords.sort(function(a, b) {
                    return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
                });
            },

            relayout : function() {
                var k = -1,
                    x = 0,
                    x0 = 0,
                    i = -1,
                    j = -1,
                    m = 0,
                    di = 0,
                    dj = 0,
                    v = 0,
                    a0 = 0,
                    a1 = 0,
                    subgroups = {},
                    groupSums = [],
                    groupIndex = d3.range(n),
                    subgroupIndex = [],
                    numSeq = null,
                    source = null,
                    target = null;

                chords = [];
                groups = [];

                while ((i += 1) < n) {
                    x = 0;
                    j = -1;
                    numSeq = [];

                    while ((j += 1) < n) {
                        x += matrix[i][j];
                    }

                    groupSums.push(x);
                    //New part
                    for ( m = 0; m < n; m += 1) {
                        numSeq[m] = (n + (i - 1) - m) % 6;
                    }

                    subgroupIndex.push(numSeq);
                    // End new part
                    k += x;
                }//while

                k = (theta - padding * n) / k;
                x = 0;
                i = -1;

                while ((i += 1) < n) {
                    x0 = x;
                    j = -1;

                    while ((j += 1) < n) {
                        di = groupIndex[i];
                        dj = subgroupIndex[di][j];
                        v = matrix[di][dj];
                        a0 = x;
                        a1 = x += v * k;

                        subgroups[di + "-" + dj] = {
                            index : di,
                            subindex : dj,
                            startAngle : a0,
                            endAngle : a1,
                            value : v
                        };
                    }//while

                    groups[di] = {
                        index : di,
                        startAngle : x0,
                        endAngle : x,
                        value : (x - x0) / k
                    };
                    x += padding;
                }//while

                i = -1;

                while ((i += 1) < n) {
                    j = i - 1;
                    while ((j += 1) < n) {
                        source = subgroups[i + "-" + j];
                        target = subgroups[j + "-" + i];

                        if (source.value || target.value) {
                            chords.push(source.value < target.value ? {
                                source : target,
                                target : source
                            } : {
                                source : source,
                                target : target
                            });
                        }//if
                    }//while
                }//while

                if (sortChords) {
                    self.resort();
                }
            }, //function relayout

            customChordLayout : function() {
                self = this;

                chord.matrix = function(x) {
                    if (!arguments.length) {
                        return matrix;
                    }

                    matrix = x;
                    n = (matrix && matrix.length);
                    chords = groups = null;

                    return chord;
                };

                chord.padding = function(x) {
                    if (!arguments.length) {
                        return padding;
                    }

                    padding = x;
                    chords = groups = null;

                    return chord;
                };

                chord.sortGroups = function(x) {
                    if (!arguments.length) {
                        return sortGroups;
                    }

                    sortGroups = x;
                    chords = groups = null;

                    return chord;
                };

                chord.sortSubgroups = function(x) {
                    if (!arguments.length) {
                        return sortSubgroups;
                    }

                    sortSubgroups = x;
                    chords = null;

                    return chord;
                };

                chord.sortChords = function(x) {
                    if (!arguments.length) {
                        return sortChords;
                    }

                    sortChords = x;

                    if (chords) {
                        self.resort();
                    }

                    return chord;
                };

                chord.chords = function() {
                    if (!chords) {
                        self.relayout();
                    }

                    return chords;
                };

                chord.groups = function() {
                    if (!groups) {
                        self.relayout();
                    }

                    return groups;
                };

                return chord;
            }
        };
    }(d3));