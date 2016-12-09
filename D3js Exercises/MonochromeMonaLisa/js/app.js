/**
 * @see http://bl.ocks.org/tomgp/6475678
 * @param {Object} jq
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

var brush = d3.brush(),
    svg = d3.select("svg");

svg.append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, [[307, 167], [611, 539]])
    .select(".selection")
    .attr("id", "brush-selection");

svg.append("clipPath")
    .attr("id", "brush-clip")
    .append("use")
    .attr("xlink:href", "#brush-selection");

svg.select("#color-image")
    .attr("clip-path", "url(#brush-clip)");

}(d3));