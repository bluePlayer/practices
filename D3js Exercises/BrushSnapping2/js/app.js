/**
 * @see http://bl.ocks.org/mbostock/6232620
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

var margin = {top: 200, right: 40, bottom: 200, left: 40},
    width = (960 - margin.left - margin.right),
    height = (500 - margin.top - margin.bottom),
    x = d3.scaleTime()
        .domain([new Date(2013, 7, 1), (new Date(2013, 7, 15) - 1)])
        .rangeRound([0, width]),
    svg = d3.select("body")
        .append("svg")
        .attr("width", (width + margin.left + margin.right))
        .attr("height", (height + margin.top + margin.bottom))
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"),

    brushed = function () {
        var d0 = null,
            d1 = null;

        if (d3.event.sourceEvent.type === "brush") {
            return;
        }

        d0 = d3.event.selection.map(x.invert);
        d1 = d0.map(d3.timeDay.round);

        // If empty when rounded, use floor instead.
        if (d1[0] >= d1[1]) {
            d1[0] = d3.timeDay.floor(d0[0]);
            d1[1] = d3.timeDay.offset(d1[0]);
        }

        d3.select(this).call(d3.event.target.move, d1.map(x));
    };

svg.append("g")
    .attr("class", "axis axis--grid")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(x).ticks(d3.timeHour, 12).tickSize(-height).tickFormat(function () {return null;}))
    .selectAll(".tick")
    .classed("tick--minor", function (d) {return d.getHours();});

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(x).ticks(d3.timeDay).tickPadding(0))
    .attr("text-anchor", null)
    .selectAll("text")
    .attr("x", 6);

svg.append("g")
    .attr("class", "brush")
    .call(d3.brushX()
    .extent([[0, 0], [width, height]])
    .on("brush", brushed));

}(d3));