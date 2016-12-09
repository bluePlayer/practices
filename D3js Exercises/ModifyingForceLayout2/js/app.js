/**
 * @see http://bl.ocks.org/mbostock/0adcc447925ffae87975a3a81628a196
 * @param {Object} d3
 */
(function(d3) {
    "use strict";

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        color = d3.scaleOrdinal(d3.schemeCategory10),

        a = {
            id: "a"
        },
        b = {
            id: "b"
        },
        c = {
            id: "c"
        },
        nodes = [a, b, c],
        links = [],

        g = svg.append("g").attr("transform", "translate(" + (width / 2) + ", " + (height / 2) + ")"),
        link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
        node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node"),

        ticked = function() {
            node.attr("cx", function(d) {
                return d.x;
            }).attr("cy", function(d) {
                return d.y;
            });

            link.attr("x1", function(d) {
                return d.source.x;
            }).attr("y1", function(d) {
                return d.source.y;
            }).attr("x2", function(d) {
                return d.target.x;
            }).attr("y2", function(d) {
                return d.target.y;
            });
        },

        simulation = d3.forceSimulation(nodes).force("charge", d3.forceManyBody().strength(-1000)).force("link", d3.forceLink(links).distance(200)).force("x", d3.forceX()).force("y", d3.forceY()).alphaTarget(1).on("tick", ticked),

        restart = function() {
            // Apply the general update pattern to the nodes.
            node = node.data(nodes, function(d) {
                return d.id;
            });

            node.exit().transition().attr("r", 0).remove();

            node = node.enter().append("circle").attr("fill", function(d) {
                return color(d.id);
            }).call(function(node) {
                node.transition().attr("r", 8);
            }).merge(node);

            // Apply the general update pattern to the links.
            link = link.data(links, function(d) {
                return d.source.id + "-" + d.target.id;
            });

            // Keep the exiting links connected to the moving remaining nodes.
            link.exit().transition().attr("stroke-opacity", 0).attrTween("x1", function(d) {
                return function() {
                    return d.source.x;
                };
            }).attrTween("x2", function(d) {
                return function() {
                    return d.target.x;
                };
            }).attrTween("y1", function(d) {
                return function() {
                    return d.source.y;
                };
            }).attrTween("y2", function(d) {
                return function() {
                    return d.target.y;
                };
            }).remove();

            link = link.enter().append("line").call(function(link) {
                link.transition().attr("stroke-opacity", 1);
            }).merge(link);

            // Update and restart the simulation.
            simulation.nodes(nodes);
            simulation.force("link").links(links);
            simulation.alpha(1).restart();
        };

    restart();

    d3.timeout(function() {
        links.push({
            source: a,
            target: b
        });
        links.push({
            source: b,
            target: c
        });
        links.push({
            source: c,
            target: a
        });
        restart();
    }, 1000);

    d3.interval(function() {
        nodes.pop();
        links.pop();
        links.pop();
        restart();
    }, 2000, d3.now());

    d3.interval(function() {
        nodes.push(c);
        links.push({
            source: b,
            target: c
        });
        links.push({
            source: c,
            target: a
        });
        restart();
    }, 2000, d3.now() + 1000);

}(d3));