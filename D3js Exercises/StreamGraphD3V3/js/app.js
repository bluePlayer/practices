/**
 * @see http://bl.ocks.org/mbostock/4060954
 * @param {Object} jq
 * @param {Object} d3
 */
(function(jq, d3) {
    'use strict';

    var width = 960,
        height = 500,
        n = 20, // number of layers
        m = 200, // number of samples per layer
        stack = d3.layout.stack().offset("wiggle"),

        /**
         * Inspired by Lee Byron's test data generator.
         */
        bumpLayer = function (n) {

            var bump = function (a) {
                var i = 0,
                w = 0,
                x = 1 / (0.1 + Math.random()),
                y = 2 * Math.random() - 0.5,
                z = 10 / (0.1 + Math.random());

                for (i = 0; i < n; i += 1) {
                    w = (i / n - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            },
            a = [], i;

            for (i = 0; i < n; i += 1) {
                a[i] = 0;
            }

            for (i = 0; i < 5; i += 1) {
                bump(a);
            }

            return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
        },

        layers0 = stack(d3.range(n).map(function() { return bumpLayer(m); })),
        layers1 = stack(d3.range(n).map(function() { return bumpLayer(m); })),

        x = d3.scale.linear()
            .domain([0, m - 1])
            .range([0, width]),

        y = d3.scale.linear()
            .domain([0, d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
            .range([height, 0]),

        color = d3.scale.linear()
            .range(["#aad", "#556"]),

        area = d3.svg.area()
            .x(function(d) { return x(d.x); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); }),

        svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height),

        transition = function () {
            d3.selectAll("path")
                .data(function() {
                    var d = layers1;

                    layers1 = layers0;
                    layers0 = d;

                    return layers0;
                })
                .transition()
                .duration(2500)
                .attr("d", area);
        };

    svg.selectAll("path")
        .data(layers0)
        .enter().append("path")
        .attr("d", area)
        .style("fill", function() { return color(Math.random()); });

    jq("#generateBtn").click(function (event) {
        transition();
    });

}($, d3));