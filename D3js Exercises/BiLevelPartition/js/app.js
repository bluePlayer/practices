/**
 * @see http://bl.ocks.org/mbostock/5944371
 * @param {Object} d3
 */
(function(window, d3) {
    'use strict';

    var margin = {
            top: 350,
            right: 480,
            bottom: 350,
            left: 480
        },

        request = null,
        path = null,
        center = null,
        text = null,
        radius = Math.min(margin.top, margin.right, margin.bottom, margin.left) - 10,
        hue = d3.scale.category10(),

        luminance = d3.scale.sqrt()
            .domain([0, 1e6])
            .clamp(true)
            .range([90, 20]),

        svg = d3.select("body").append("svg")
            .attr("width", margin.left + margin.right)
            .attr("height", margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),

        partition = d3.layout.partition()
            .sort(function(a, b) { return d3.ascending(a.name, b.name); })
            .size([2 * Math.PI, radius]),

        arc = d3.svg.arc()
            .startAngle(function(d) { return d.x; })
            .endAngle(function(d) {return d.x + d.dx;})
            .padAngle(0.01)
            .padRadius(radius / 3)
            .innerRadius(function(d) { return ((radius / 3) * d.depth); })
            .outerRadius(function(d) { return ((radius / 3) * (d.depth + 1) - 1); }),

        key = function (d) {
            var k = [], p = d;

            while (p.depth) {
                k.push(p.name);
                p = p.parent;
            }

            return k.reverse().join(".");
        },

        fill = function (d) {
            var p = d,
                c = null;

            while (p.depth > 1) {
                p = p.parent;
            }

            c = d3.lab(hue(p.name));
            c.l = luminance(d.sum);

            return c;
        },

        arcTween = function (b) {
            var i = d3.interpolate(this.myCurrent, b);

            this.myCurrent = i(0);

            return function(t) {
                return arc(i(t));
            };
        },

        updateArc = function (d) {
            return {depth: d.depth, x: d.x, dx: d.dx};
        },

        // Zoom to the specified new root.
        zoom = function (root, p) {
            var enterArc = null,
                exitArc = null,
                outsideAngle = null,

                insideArc = function (d) {
                    return ((p.key > d.key)
                        ? {depth: (d.depth - 1), x: 0, dx: 0} : (p.key < d.key)
                        ? {depth: (d.depth - 1), x: (2 * Math.PI), dx: 0}
                        : {depth: 0, x: 0, dx: (2 * Math.PI)});
                },

                outsideArc = function (d) {
                    return {depth: (d.depth + 1), x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
                };

            if (document.documentElement.__transition__) {
                return;
            }

            // Rescale outside angles to match the new layout.
            outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);

            center.datum(root);

            // When zooming in, arcs enter from the outside and exit to the inside.
            // Entering outside arcs start from the old layout.
            if (root === p) {
                enterArc = outsideArc;
                exitArc = insideArc;
                outsideAngle.range([p.x, p.x + p.dx]);
            }

            path = path.data(partition.nodes(root).slice(1), function(d) { return d.key; });

            // When zooming out, arcs enter from the inside and exit to the outside.
            // Exiting outside arcs transition to the new layout.
            if (root !== p) {
                enterArc = insideArc;
                exitArc = outsideArc;
                outsideAngle.range([p.x, p.x + p.dx]);
            }

            d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function() {
                path.exit().transition()
                    .style("fill-opacity", function(d) { return d.depth === 1 + (root === p) ? 1 : 0; })
                    .attrTween("d", function(d) { return arcTween.call(this, exitArc(d)); })
                .remove();

                path.enter().append("path")
                    .style("fill-opacity", function(d) { return d.depth === 2 - (root === p) ? 1 : 0; })
                    .style("fill", function(d) { return d.fill; })
                    .on("click", function (p) {
                        if (p.depth > 1)
                        {
                            p = p.parent;
                        }

                        if (!p.children) {
                            return;
                        }
                        zoom(p, p);
                    })
                    .each(function(d) { this.myCurrent = enterArc(d); });

                path.transition()
                    .style("fill-opacity", 1)
                    .attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); });
            });
        },

        zoomIn = function (p) {

            if (p.depth > 1)
            {
                p = p.parent;
            }

            if (!p.children) {
                return;
            }
            zoom(p, p);
        },

        zoomOut = function (p) {
            if (!p || !p.parent) {
                return;
            }
            zoom(p.parent, p);
        };

    request = d3.json("flare.json", function(error, root) {

        if (error) {
            throw error;
        }

        console.dir(root);
        // Compute the initial layout on the entire tree to sum sizes.
        // Also compute the full name and fill color for each node,
        // and stash the children so they can be restored as we descend.
        partition
            .value(function(d) { return d.size; })
            .nodes(root)
            .forEach(function(d) {
                d.myChildren = d.children;
                d.sum = d.value;
                d.key = key(d);
                d.fill = fill(d);
            });

        // Now redefine the value function to use the previously-computed sum.
        partition
            .children(function(d, depth) { return ((depth < 2) ? d.myChildren : null); })
            .value(function(d) { return d.sum; });

        center = svg.append("circle")
            .attr("r", radius / 3)
            .on("click", zoomOut);

        center.append("title")
            .text("zoom out");

        /*path = svg.selectAll("path")
            .data(partition.nodes(root).slice(1))
            .enter()
            .append("g")
            .attr("class", "g");
            //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });*/

        path = svg.selectAll("path")
            .data(partition.nodes(root).slice(1))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", function(d) { return d.fill; })
            .each(function(d) { this.myCurrent = updateArc(d); })
            .on("click", zoomIn);

        /*path.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return d.fill; })
            .each(function(d) { this.myCurrent = updateArc(d); })
            .on("click", zoomIn);

        path.append("text")
            .text(function(d) { return d.name; })
            .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
            .attr("dy", ".35em");*/

        /*text = svg.selectAll("div")
            .data(partition.nodes(root).slice(1))
            .enter()
            .append("div")
            .text("hello")
            .attr("color", "#000");*/

    });

    console.dir(request);

    d3.select(window.frameElement).style("height", (margin.top + margin.bottom) + "px");

}(window, d3));