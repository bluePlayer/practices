/**
 * @see http://bl.ocks.org/mbostock/4254963
 * @param {Object} jq
 * @param {Object} d3
 */
(function(jq, d3) {
    'use strict';

    var width = 960,
        height = 500,
        m = 5, // number of series
        n = 90, // number of values
        svg = null,

        generate = function () {
            var data = d3.range(m).map(function() {
                    return d3.range(n).map(function() {
                        return ((Math.random() * 100) || 0);
                    });
                }),

                x = d3.scale.linear()
                    .domain([0, (n - 1)])
                    .range([0, width]),

                y = d3.scale.ordinal()
                    .domain(d3.range(m))
                    .rangePoints([0, height], 1),

                color = d3.scale.ordinal()
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]),

                area = d3.svg.area()
                    .interpolate("basis")
                    .x(function(d, i) { return x(i); })
                    .y0(function(d) { return (-d / 2); })
                    .y1(function(d) { return (d / 2); }),

                svg = d3.select("body").append("svg")
                    .attr("width", width)
                    .attr("height", height);

            svg.selectAll("path")
                .data(data)
                .enter().append("path")
                .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("d", area);

            return svg;
        };

    svg = generate();

    jq("#generateBtn").click(function (event) {
        svg.remove();
        svg = generate();
    });

}($, d3));