/**
 * @see http://bl.ocks.org/tomgp/6475678
 * @param {Object} jq
 * @param {Object} d3
 */
(function(d3, topojson) {
    'use strict';

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    path = d3.geoPath(),
    color = d3.scaleThreshold()
        .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
        .range(d3.schemeOrRd[9]),
    x = d3.scaleSqrt()
        .domain([0, 4500])
        .rangeRound([440, 950]),
    g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(0, 40)"),
    axisBottom = d3.axisBottom(x)
        .tickSize(13)
        .tickValues(color.domain());

g.selectAll("rect")
    .data(color.range().map(function (d) {
        d = color.invertExtent(d);
        if (d[0] === null) {
            d[0] = x.domain()[0];
        }
        if (d[1] === null) {
            d[1] = x.domain()[1];
        }

        return d;
    }))
    .enter()
    .append("rect")
    .attr("height", 8)
    .attr("x", function (d) {
        return x(d[0]);
    })
    .attr("width", function (d) {
        return x(d[1]) - x(d[0]);
    })
    .attr("fill", function (d) {
        color(d[0]);
    });

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Population per squre mile");

g.call(axisBottom)
    .select(".domain")
    .remove();

d3.json("topo.json", function (error, topology) {

    if (error) {
        throw error;
    }

    svg.append("g")
        .selectAll("path")
        .data(topojson.feature(topology, topology.objects.tracts).features)
        .enter()
        .append("path")
        .attr("fill", function (d) {
            return d3.schemeOrRd[9][d.id];
        })
        .attr("d", path);

    svg.append("path")
        .datum(topojson.feature(topology, topology.objects.counties))
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.3)
        .attr("d", path);

});

}(d3, topojson));