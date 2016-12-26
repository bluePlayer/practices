/**
 * @see http://bl.ocks.org/mbostock/1582075
 * @param {Object} d3
 */
window.Quicksort = window.Quicksort || (function(d3) {
    'use strict';

    var self = null,

        margin = {
            top: 230,
            right: 30,
            bottom: 230,
            left: 30
        },

        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,

        n = 240,
        index = d3.range(n),
        data = null,

        x = d3.scale
        .ordinal()
        .domain(index)
        .rangePoints([0, width]),

        a = d3.scale
        .linear()
        .domain([0, n - 1])
        .range([-Math.PI / 4, Math.PI / 4]),

        svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ')'),

        line = null,
        actions = [];

    return {
        quicksort: function(array) {
            self.recurse(0, array.length);

            return actions;
        },

        recurse: function(left, right) {
            var pivot = 0;

            if (left < right) {
                pivot = left + ~~(Math.random() * (right - left));

                actions.push({
                    type: 'partition',
                    pivot: pivot
                });

                pivot = self.partition(left, right, pivot);
                self.recurse(left, pivot);
                self.recurse(pivot + 1, right);
            }
        },

        partition: function(left, right, pivot) {
            var v = data[pivot],
                i = left + 1;

            right -= 1;
            self.swap(pivot, right);

            for (i = left; i < right; i += 1) {
                if (data[i] <= v) {
                    self.swap(i, left);
                    left += 1;
                }
            }

            self.swap(left, right);
            return left;
        },

        swap: function(i, j) {
            var t = data[i];
            data[i] = data[j];
            data[j] = t;
            actions.push({
                type: 'swap',
                i: i,
                j: j
            });
        },

        /**
         * Fisher–Yates shuffle
         * @param {Object} array
         */
        shuffle: function(array) {
            var i = array.length - 1,
                j, t;

            while (i > 0) {
                j = ~~(Math.random() * (i + 1));
                t = array[j];
                array[j] = array[i];
                array[i] = t;
                i -= 1;
            }

            return array;
        },

        run: function() {
            self = this;

            data = self.shuffle(index.slice());

            line = svg.selectAll('line')
                .data(data)
                .enter()
                .append('line')
                .attr('index', function(d, i) {
                    return 'i' + i;
                })
                .attr('x2', function(d) {
                    return height * Math.sin(a(d));
                })
                .attr('y2', function(d) {
                    return -height * Math.cos(a(d));
                })
                .attr('transform', function(d, i) {
                    return 'translate(' + x(i) + ')';
                });

            actions = self.quicksort(data).reverse();

            setInterval(function step() {
                var action = null,
                    t = null;

                if (actions.length > 1) {
                    action = actions.pop();

                    switch (action.type) {
                    case 'partition':
                        line.style('stroke', function(d, i) {
                            return i === action.pivot ? 'red' : null;
                        });

                        step();
                        break;

                    case 'swap':
                        t = line[0][action.i];
                        line[0][action.i] = line[0][action.j];
                        line[0][action.j] = t;
                        line.attr('transform', function(d, i) {
                            return 'translate(' + x(i) + ')';
                        });
                        break;
                    }
                }
            }, 20);
        }
    };

}(d3));

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var Quicksort = window.Quicksort;

    Quicksort.run();
});