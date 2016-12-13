/**
 * @see http://bl.ocks.org/mbostock/5c50a377e76a1974248bd628befdec95
 * @param {Object} d3
 */
window.StretchedTreemap = window.StretchedTreemap || (function (d3) {
    'use strict';

    var self = null,
        csvUrl = "flare.csv",
        width = 961,
        height = 1061,
        ratio = 4,
        format = d3.format(",d"),

        color = d3.scaleOrdinal()
            .range(d3.schemeCategory10
                .map(function (c) {
                    c = d3.rgb(c);
                    c.opacity = 0.6;
                    return c;
                })),

        stratify = d3.stratify()
            .parentId(function (d) {
                return d.id.substring(0, d.id.lastIndexOf("."));
            }),

        treemap = d3.treemap()
            .tile(d3.treemapSquarify.ratio(1))
            .size([width / ratio, height]);

    return {
        type: function (d) {
            d.value = +d.value;
            return d;
        },

        run: function () {
            self = this;

            d3.csv(csvUrl, self.type, function (error, data) {
                var root = stratify(data)
                    .sum(function (d) {
                        return d.value;
                    })
                    .sort(function (a, b) {
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
                    .attr("title", function (d) {
                        return d.id + "\n" + format(d.value);
                    })
                    .style("left", function (d) {
                        return Math.round(d.x0 * ratio) + "px";
                    })
                    .style("top", function (d) {
                        return Math.round(d.y0) + "px";
                    })
                    .style("width", function (d) {
                        return Math.round(d.x1 * ratio) - Math.round(d.x0 * ratio) - 1 + "px";
                    })
                    .style("height", function (d) {
                        return Math.round(d.y1) - Math.round(d.y0) - 1 + "px";
                    })
                    .style("background", function (d) {
                        while (d.depth > 1) {
                            d = d.parent;
                        }

                        return color(d.id);
                    })
                    .append("div")
                    .attr("class", "node-label")
                    .text(function (d) {
                        return d.id.substring(d.id.lastIndexOf(".") + 1);
                    })
                    .append("div")
                    .attr("class", "node-value")
                    .text(function (d) {
                        return format(d.value);
                    });
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function (event) {
    'use strict';
    var StretchedTreemap = window.StretchedTreemap;

    StretchedTreemap.run();
});