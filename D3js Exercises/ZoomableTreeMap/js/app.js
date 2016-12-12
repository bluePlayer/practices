/**
 * @see https://bl.ocks.org/fallenartist/f3438a9d17e481199e04c8e7d431dbd1
 * @see http://jsfiddle.net/ramnathv/amszcymq/
 * @param {Object} d3
 */
window.ZoomableTreeMap = window.ZoomableTreeMap || (function(d3) {
    'use strict';

    var self = null,
        dataFileName = "processData.json",

        width = 100, // % of the parent element
        height = 100,

        x = d3.scaleLinear().domain([0, width]).range([0, width]),
        y = d3.scaleLinear().domain([0, height]).range([0, height]),

        imgUrl = "",
        blue = d3.hsl(216, 0.92, 0.68),

        color = d3.scaleOrdinal()
            .range([
                d3.rgb(blue).brighter([0.25]),
                d3.rgb(blue),
                d3.rgb(blue).darker([0.25])
            ]
            .map(function(c) {
                c = d3.rgb(c);
                return c;
            })),

        treemap = d3.treemap()
            .size([width, height])
            .paddingInner(0)
            .round(true),

        nodes = null,
        chart = d3.select("#chart"),
        cell = null,

        zoom = function(d) {
            var t = d3.transition()
                .duration(800)
                .ease(d3.easeCubicOut);

            console.log('clicked: ' + d.data.name + ', depth: ' + d.depth);
            console.log('cell x0: ' + d.x0 + ', y0: ' + d.y0 + ', x1: ' + d.x1 + ', y1: ' + d.y1);

            x.domain([d.x0, d.x1]);
            y.domain([d.y0, d.y1]);

            chart
                .merge(cell)
                .transition(t)
                .style("left", x(d.x0) + "%")
                .style("top", y(d.y0) + "%")
                .style("width", x(d.x1 - d.x0) + "%" )
                .style("height", y(d.y1 - d.y0) + "%");

            //processData = d;
            //d3.event.stopPropagation();
        };

    d3.json(dataFileName, function (error, data) {
        if (error) {
            throw error;
        }

        nodes = d3.hierarchy(data)
            .sum(function(d) {
                return (d.value ? 1 : 0);
            });

        treemap(nodes);

        cell = chart
            .selectAll(".node")
            .data(nodes.descendants())
            .enter().append("div")
            .attr("class", function(d) {
                return "node level-" + d.depth;
            })
            .attr("title", function(d) {
                return d.data.name || "null";
            })
            .style("left", function(d) {
                return x(d.x0) + "%";
            })
            .style("top", function(d) {
                return y(d.y0) + "%";
            })
            .style("width", function(d) {
                return x(d.x1 - d.x0) + "%";
            })
            .style("height", function(d) {
                return y(d.y1 - d.y0) + "%";
            })
            //.style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
            .style("background-color", function(d) {
                while (d.depth > 1) {
                    d = d.parent;
                }

                return color(d.data.name);
            })
            .on("mousedown touchstart", zoom)//function(d) {
                //zoom(d);
                //zoom(node == d.parent ? root : d.parent);
                //zoom(d.children !== null ? d : root);
            //})
            .append("p")
            .attr("class", "label")
            .text(function(d) {
                return d.data.name || "null";
            });

        console.dir(data);
    });

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var ZoomableTreeMap = window.ZoomableTreeMap;

    //ZoomableTreeMap.run();
});