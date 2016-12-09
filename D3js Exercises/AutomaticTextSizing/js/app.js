/**
 * @see http://bl.ocks.org/mbostock/5944371
 * @param {Object} d3
 */
(function(window, d3) {
    'use strict';

var bleed = 100,
    width = 960,
    height = 760,
    pack = d3.layout.pack()
        .sort(null)
        .size([width, height + bleed * 2])
        .padding(2),
    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0," + -bleed + ")"),
    /**
     * Returns a flattened hierarchy containing all leaf nodes under the root.
     */
    flatten = function (root) {
        var nodes = [],
            recurse = function (node) {
                if (node.children) {
                    node.children.forEach(recurse);
                } else {
                    nodes.push({name: node.name, value: node.size});
                }
            };

        recurse(root);

        return {children: nodes};
    };

d3.json("flare.json", function(error, json) {
    var node = null;

    if (error) {
        throw error;
    }

    node = svg.selectAll(".node")
        .data(pack.nodes(flatten(json))
        .filter(function(d) { return !d.children; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("r", function(d) { return d.r; });

    node.append("text")
        .text(function(d) { return d.name; })
        .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
        .attr("dy", ".35em");
});

}(window, d3));