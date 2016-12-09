/**
 * @see https://bl.ocks.org/mbostock/4062045
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

    var g, i = 0,
        colorId,
        numNodes = 50,
        nodes = [],
        width = 900,
        height = 500,
        padding = 10,
        minR = 5,
        maxR = 40,
        position = "positive",
        circle = null,
        label = null,

        svg = d3.select("#canvas")
            .append("svg")
            .attr({width: width, height: height}),

        scales = {
            x: d3.scale.linear()
                      .domain([0, numNodes])
                      .range([(((width / 12.5) - 10) * -1), ((width - 20) / 12.5)]),
            colorX: d3.scale.linear()
                      .domain([0, 10])
                      .range([(((width / 12.5) - 10) * -1), ((width - 20) / 12.5)]),
            y: d3.scale.linear()
                      .domain([0, numNodes])
                      .range([((height / 25) * -1), (height / 25)]),
            r: d3.scale.sqrt()
                      .domain([1, 10])
                      .range([minR, maxR])
        },

        randomRadius = function () {
            return scales.r(Math.floor(Math.random() * 10) + 1);
        },

        /**
         * @see http://bl.ocks.org/3116713
         */
        collide = function (alpha, nodes, scale) {
            var quadtree = d3.geom.quadtree(nodes),
                r = 0, nx1 = 0, nx2 = 0, ny1 = 0, ny2 = 0;

            return function (d) {
                r = d.r + scale.domain()[1] + padding;
                nx1 = d.x - r;
                nx2 = d.x + r;
                ny1 = d.y - r;
                ny2 = d.y + r;

                return quadtree.visit(function(quad, x1, y1, x2, y2) {
                    var l, x, y;

                    if (quad.point && quad.point !== d) {
                        x = d.x - quad.point.x;
                        y = d.y - quad.point.y;
                        l = Math.sqrt(x * x + y * y);
                        r = d.r + quad.point.r + padding;

                        if (l < r) {
                            l = (l - r) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }

                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
            };
        },

        /**
         * @see https://github.com/mbostock/d3/wiki/Force-Layout
         * @param {Object} e
         */
        tick = function (e) {
            var k = (10 * e.alpha);

            nodes.forEach(function(d, i) {
                d.x += k * d.cx;
                d.y += k * d.cy;
            });

            g.each(collide(0.1, nodes, scales.r))
                .attr({
                    transform: function(d, i) {
                    return "translate(" + d.x + "," + d.y + ")";
                }
            });
        },

        force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .size([width, height])
            .charge(function(d) {
                return -1 * (Math.pow(d.r * 5.0, 2.0) / 8);
            })
            .gravity(2.75)
            .on("tick", tick),

        update = function (nodes) {

            g = svg.selectAll("g.node")
                .data(nodes, function(d, i) {
                    return d.id;
                });

            g.enter().append("g")
                .attr({
                    "class": "node"
                });

            if (g.selectAll("circle").empty()) {

                circle = g.append("circle")
                    .attr({r: function(d) {return d.r;}})
                    .style({fill: function(d) {return d.color;}});

                label = g.append("text")
                    .attr({x: 0, y: 3})
                    .text(function(d) {return d.id;});

            } else {
                circle.transition()
                    .duration(1000)
                    .attr({r: function(d) {return d.r;}});
            }

            g.exit().remove();
            force.nodes(nodes).start();
        };

    for (i = 0; i < numNodes; i += 1) {
        colorId = (Math.random() * 10);
        nodes.push({
            id: i,
            r: randomRadius(),
            cx: scales.x(i),
            cy: scales.y(Math.floor(Math.random() * numNodes)),
            colorId: colorId,
            color: d3.scale.category10().range()[Math.floor(colorId)]
        });
    }

    update(nodes);

    d3.selectAll("button").on("click", function() {
        var sort = this.getAttribute("value");

        nodes.forEach(function(node) {

            if (sort === "positive") {
                node.cx = scales.x(node.id);
            } else if (sort === "negative") {
                node.cx = scales.x(numNodes-node.id);
            } else if (sort === "color") {
                node.cx = scales.colorX(node.colorId);
            }

            node.r = randomRadius();
        });

        update(nodes);
    });

}(d3));