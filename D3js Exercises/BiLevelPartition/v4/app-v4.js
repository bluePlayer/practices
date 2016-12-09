/**
 * @see http://bl.ocks.org/mbostock/5944371
 * @param {Object} d3
 */
(function(window, d3) {
    'use strict';

    var self = this,
        margin = {
            top: 350,
            right: 480,
            bottom: 350,
            left: 480
        },
        radius = Math.min(margin.top, margin.right, margin.bottom, margin.left) - 10,
        hue = d3.schemeCategory10,
        outsideAngle = d3.scaleLinear().domain([0, 2 * Math.PI]),
        luminance = d3.scaleSqrt()
            .domain([0, 1e6])
            .clamp(true)
            .range([90, 20]),
        svg = d3.select("body")
            .append("svg")
            .attr("width", margin.left + margin.right)
            .attr("height", margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"),
        partition = null, /*d3.partition(root
                .sum(function(d) { return d.value; })
                .sort(function(a, b) { return b.value - a.value; }
            ))*/
            //.sort(function(a, b) {
            //    return d3.ascending(a.name, b.name);
            //})
            //.size([(2 * Math.PI), radius]),
        arc = d3.arc()
            .startAngle(function(d) {
                return d.x;
            })
            .endAngle(function(d) {
                return d.x + d.dx;
            })
            .padAngle(0.01)
            .padRadius(radius / 3)
            .innerRadius(function(d) {
                return ((radius / 3) * d.depth);
            })
            .outerRadius(function(d) {
                return ((radius / 3) * ((d.depth + 1) - 1));
            }),

        key = function(d) {
            var k = [],
                p = d;

            while (p.depth) {
                k.push(p.name);
                p = p.parent;
            }

            return k.reverse().join(".");
        },

        fill = function(d) {
            var p = d,
                c = null;

            while (p.depth > 1) {
                p = p.parent;
            }

            c = d3.lab(hue[p.value]);
            c.l = luminance(d.sum);

            return c;
        },

        artTween = function(b) {
            var i = d3.interpolate(this._current, b);

            this._current = i(0);

            return function(t) {
                return arc(i(t));
            };
        },

        updateArc = function(d) {
            return {
                depth: d.depth,
                x: d.x,
                dx: d.dx
            };
        },

        insideArc = function (d, p) {
            return p.key > d.key
                  ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
                  ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0}
                  : {depth: 0, x: 0, dx: 2 * Math.PI};
        },

        outsideArc = function (d) {
            return {depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
        },

        zoom = function(root, p) {
            // Rescale outside angles to match the new layout.
            var enterArc,
                exitArc,
                center,
                path;

            if (document.documentElement.__transition__) {
                return;
            }

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
                  .attrTween("d", function(d, arcTween) { return arcTween.call(this, exitArc(d, p)); })
                  .remove();

              path.enter().append("path")
                  .style("fill-opacity", function(d) { return d.depth === 2 - (root === p) ? 1 : 0; })
                  .style("fill", function(d) { return d.fill; })
                  .on("click", function(p) {

                    if (p.depth > 1) {
                        p = p.parent;
                    }

                    if (!p.children) {
                        return;
                    }

                    zoom(p, p);
                  })
                  .each(function(d) { this._current = enterArc(d, p); });

              path.transition()
                  .style("fill-opacity", 1)
                  .attrTween("d", function(d, arcTween) { return arcTween.call(this, updateArc(d)); });
            });
        },

        zoomIn = function(p) {

            if (p.depth > 1) {
                p = p.parent;
            }

            if (!p.children) {
                return;
            }

            zoom(p, p);
        },

        zoomOut = function(p) {
            if (!p.parent) {
                return;
            }
            zoom(p.parent, p);
        };

    d3.json("flare.json", function(error, root) {
        var center = svg.append("circle")
                .attr("r", radius / 3)
                .on("click", zoomOut),
            hierarchy = d3.hierarchy(root),
            path = null;

        partition = d3.partition(hierarchy
            .sum(function(d) { return d.value; })
            .sort(function(a, b) { return b.value - a.value; }
        )).size([(2 * Math.PI), radius]);

        path = svg.selectAll("path")
            //.data(partition.nodes(root).slice(1))
            .data(root)
            .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return d.fill;
            })
            .each(function(d) {
                this._current = updateArc(d);
            })
            .on("click", zoomIn);

        if (error) {
            throw error;
        }

        // Compute the initial layout on the entire tree to sum sizes.
        // Also compute the full name and fill color for each node,
        // and stash the children so they can be restored as we descend.
        /*partition.value(function(d) {
                return d.size;
            })
            .nodes(root)*/
            hierarchy.each(function(d) {
                d._children = d.children;
                d.sum = d.value;
                d.key = key(d);
                d.fill = fill(d);
            });

        // Now redefine the value function to use the previously-computed sum.
        hierarchy = d3.hierarchy(root, function(d, depth) {
                return ((depth < 2) ? d._children : null);
            });
       /* partition
            .children(function(d, depth) {
                return ((depth < 2) ? d._children : null);
            })
            .value(function(d) {
                return d.sum;
            });*/

    });

    d3.select(window.frameElement).style("height", margin.top + margin.bottom + "px");

}(window, d3));