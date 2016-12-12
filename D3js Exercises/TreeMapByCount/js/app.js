/**
 * @see http://bl.ocks.org/mbostock/b4c0f143db88a9eb01a315a1063c1d77
 * @param {Object} d3
 */
window.TreeMapByCount = window.TreeMapByCount || (function(d3) {
    'use strict';

    var self = null,
        width = 960,
        height = 1060,
        format = d3.format(",d"),

        color = d3.scaleOrdinal()
            .range(d3.schemeCategory10
            .map(function(c) {
                c = d3.rgb(c);
                c.opacity = 0.6;
                return c;
            })),

        stratify = d3.stratify()
            .parentId(function(d) {
                return d.id.substring(0, d.id.lastIndexOf("."));
            }),

        treemap = d3.treemap()
            .size([width, height])
            .padding(1)
            .round(true);

    return {
        type: function(d) {
            d.value = +d.value;
            return d;
        },

        run: function() {
            self = this;

            d3.csv("flare.csv", self.type, function(error, data) {
                var root = stratify(data)
                    .sum(function(d) {
                        return d.value ? 1 : 0;
                    })
                    .sort(function(a, b) {
                        return b.height - a.height || b.value - a.value;
                    });

                if (error) {
                    throw error;
                }

                treemap(root);

                d3.select("body")
                    .selectAll(".node")
                    .data(root.leaves())
                    .enter().append("div")
                    .attr("class", "node")
                    .attr("title", function(d) {
                        return d.id;
                    })
                    .style("left", function(d) {
                        return d.x0 + "px";
                    })
                    .style("top", function(d) {
                        return d.y0 + "px";
                    })
                    .style("width", function(d) {
                        return d.x1 - d.x0 + "px";
                    })
                    .style("height", function(d) {
                        return d.y1 - d.y0 + "px";
                    })
                    .style("background", function(d) {
                        while (d.depth > 1) {
                            d = d.parent;
                        }
                        return color(d.id);
                    })
                    .append("div")
                    .attr("class", "node-label")
                    .text(function(d) {
                        return d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g).join("\n");
                    });
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var TreeMapByCount = window.TreeMapByCount;

    TreeMapByCount.run();
});