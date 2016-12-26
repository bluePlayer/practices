/**
 * @see http://bl.ocks.org/mbostock/1243323
 * @param {Object} d3
 */
window.Mergesort = window.Mergesort || (function(d3) {
    'use strict';

    // Based on http://vis.stanford.edu/protovis/ex/sort.html
    // Based on work by Robert Sedgewick

    var w = 960,
        h = 50,
        n = 240,
        duration = 250,

        self = null,

        x = d3.scale
            .linear()
            .domain([0, n])
            .range([h, w - h]),

        a = d3.scale
            .linear()
            .domain([0, n - 1])
            .range([90 + 60, 270 - 60]),

        data = d3.shuffle(d3.range(n)),

        svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h),

        line = null,
        passes = [];

    return {
        /**
         * Sorts the specified array using bottom-up mergesort, returning an array of
         * arrays representing the state of the specified array after each insertion for
         * each parallel pass. The first pass is performed at size = 2.
         */
        mergesort: function (array) {
            var i = 0,
                j = 0,
                n = array.length,
                m = 1;

            // double the size each pass
            while (m < array.length) {
                i = j = 0;

                while (i < array.length) {
                    j += self.merge(i, i += m, i += m);
                }

                if (j) {
                    passes.push(array.slice());
                } else {
                    m <<= 1;
                }
            }

            return passes;
        },
        /**
         * Inserts the value v into the subarray specified by start and end.
         */
        insert: function (start, end, v) {
            while (start + 1 < end && data[start + 1] < v) {
                var tmp = data[start];
                data[start] = data[start + 1];
                data[start + 1] = tmp;
                start += 1;
            }

            data[start] = v;
        },

        /**
         * Merges two adjacent sorted arrays in-place.
         */
        merge: function (start, middle, end) {
            middle = Math.min(data.length, middle);
            end = Math.min(data.length, end);

            for (start; start < middle; start += 1) {

                if (data[start] > data[middle]) {
                    var v = data[start];
                    data[start] = data[middle];
                    self.insert(middle, end, v);
                    return true;
                }
            }
            return false;
        },

        update: function () {
                var pass = passes.pop();

                line.data(pass, Number)
                    .transition()
                    .duration(duration)
                    .attr("transform", self.transform);

                if (passes.length) {
                    setTimeout(self.update, duration);
                } else {
                    d3.shuffle(data);
                    setTimeout(self.start, duration + 4000);
                }
        },

        /**
         * Start the animation!
         */
        start: function () {
            passes = self.mergesort(data).reverse();
            self.update();
        },

        transform: function (d, i) {
            return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
        },

        run: function() {
            self = this;

            line = svg.selectAll("line")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", h)
                .attr("transform", self.transform);

            self.start();
        }
    };

}(d3));

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var Mergesort = window.Mergesort;

    Mergesort.run();
});