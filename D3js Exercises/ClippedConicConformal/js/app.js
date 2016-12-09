/**
 * @see http://bl.ocks.org/mbostock/0adcc447925ffae87975a3a81628a196
 * @param {Object} d3
 */
(function(d3, tpjsn) {
    "use strict";

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),

    graticule = d3.geoGraticule().extentMajor([[-135, 0], [135, 90]]),
    outline = graticule.outline(),
    projection = d3.geoConicConformal().fitSize([width, height], outline),
    path = d3.geoPath().projection(projection),

    defs = svg.append("defs"),

    g = svg.append("g")
        .attr("clip-path", "url(#clip)");

defs.append("path")
    .attr("id", "extent")
    .attr("d", path(outline));

defs.append("clipPath")
    .attr("id", "clip")
    .append("use")
    .attr("xlink:href", "#extent");

g.append("path")
    .attr("id", "graticule")
    .attr("fill", "none")
    .attr("stroke", "#777")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.5)
    .attr("d", path(graticule()));

g.append("use")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("xlink:href", "#extent");

d3.json("https://d3js.org/world-50m.v1.json", function(error, world) {
    if (error) {
        throw error;
    }

    g.insert("path", "#graticule")
        .attr("fill", "#222")
        .attr("d", path(tpjsn.feature(world, world.objects.land)));

    g.insert("path", "#graticule")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .attr("d", path(tpjsn.mesh(world, world.objects.countries, function(a, b) { return a !== b; })));
});

}(d3, topojson));