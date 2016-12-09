/**
 * @see https://bl.ocks.org/mbostock/4062045
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        color = d3.scaleOrdinal(d3.schemeCategory20),

        simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2)),

        dragstarted = function (d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart();
            }

            d.fx = d.x;
            d.fy = d.y;
        },

        dragged = function (d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        },

        dragended = function (d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }

            d.fx = null;
            d.fy = null;
        };

    d3.json("miserables.json", function(error, graph) {
        var link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter()
                .append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.value); }),

             node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("fill", function(d) { return color(d.group); })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)),

             ticked = function () {
                link
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                node
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
              };

        if (error) {
            throw error;
        }

        node.append("title")
            .text(function(d) { return d.id; });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);
    });

}(d3));