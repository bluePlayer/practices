/**
 * @see http://bl.ocks.org/mbostock/2368837
 * @param {Object} d3
 * @author Mike Bostock
 * modified by me
 * @autor Vlado aka bluePlayer
 */
window.BarChartWithNegativeValues = window.BarChartWithNegativeValues || ( function(d3) {
        'use strict';

        var self = null,
            tsvUrl = "data.tsv",

            margin = {
                top : 20,
                right : 30,
                bottom : 40,
                left : 30
            },

            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,

            x = d3.scale
                .linear()
                .range([0, width]),

            y = d3.scale
                .ordinal()
                .rangeRoundBands([0, height], 0.1),

            xAxis = d3.svg
                .axis()
                .scale(x)
                .orient("bottom"),

            yAxis = d3.svg
                .axis()
                .scale(y)
                .orient("left")
                .tickSize(0)
                .tickPadding(6),

            svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        return {
            type: function (d) {
                d.value = +d.value;
                return d;
            },

            run : function() {
                self = this;

                d3.tsv(tsvUrl, self.type, function(error, data) {
                    x.domain(d3.extent(data, function(d) {
                        return d.value;
                    }))
                    .nice();

                    y.domain(data.map(function(d) {
                        return d.name;
                    }));

                    svg.selectAll(".bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", function(d) {
                            return "bar bar--" + (d.value < 0 ? "negative" : "positive");
                        })
                        .attr("x", function(d) {
                            return x(Math.min(0, d.value));
                        })
                        .attr("y", function(d) {
                            return y(d.name);
                        })
                        .attr("width", function(d) {
                            return Math.abs(x(d.value) - x(0));
                        })
                        .attr("height", y.rangeBand());

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + x(0) + ",0)")
                        .call(yAxis);
                });
            }
        };

    }(d3));

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var BarChartWithNegativeValues = window.BarChartWithNegativeValues;

    BarChartWithNegativeValues.run();
});