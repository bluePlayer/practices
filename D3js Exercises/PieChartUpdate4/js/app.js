/**
 * @see http://bl.ocks.org/mbostock/5681974
 * @param {Object} d3
 */
window.PieChartUpdate4 = window.PieChartUpdate4 || (function (d3) {
    'use strict';

    var self = null,
        tsvUrl = "data.tsv",
        width = 960,
        height = 500,
        radius = Math.min(width, height) / 2,

        color = d3.scale.category20(),

        pie = d3.layout
            .pie()
            .value(function (d) { 
                return d.count; 
            })
            .sort(null),

        arc = d3.svg
            .arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 20),

        svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),

        path = svg.selectAll("path"),
        regionsByFruit = null,
        label = null;

    return {
        type: function (d) {
            d.count = +d.count;
            
            return d;
        },
        
        change: function (region) {
            path = path.data(pie(region.values), function (d) { 
                return d.data.region; 
            });
                    
            path.enter()
                .append("path")
                .attr("fill", function (d) { 
                    return color(d.data.region); 
                });
                    
            path.exit().remove();
            path.attr("d", arc);
        },

        run: function () {
            self = this;
            
            d3.tsv(tsvUrl, self.type, function (error, data) {
                regionsByFruit = d3.nest()
                    .key(function (d) { 
                        return d.fruit; 
                    })
                    .entries(data);

                label = d3.select("form")
                    .selectAll("label")
                    .data(regionsByFruit)
                    .enter()
                    .append("label");

                label.append("input")
                    .attr("type", "radio")
                    .attr("name", "fruit")
                    .attr("value", function (d) { 
                        return d.key; 
                    })
                    .on("change", self.change)
                    .filter(function (d, i) { 
                        return !i; 
                    })
                    .each(self.change)
                    .property("checked", true);

                label.append("span")
                    .text(function (d) { 
                        return d.key; 
                    });
                    
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function (event) {
    'use strict';
    var PieChartUpdate4 = window.PieChartUpdate4;

    PieChartUpdate4.run();
});