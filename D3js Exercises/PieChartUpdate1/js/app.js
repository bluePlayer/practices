/**
 * @see http://bl.ocks.org/mbostock/1346395
 * @param {Object} d3
 */
window.PieChartUpdate1 = window.PieChartUpdate1 || (function (d3) {
    'use strict';

    var self = null,
        tsvUrl = "data.tsv",
        width = 960,
        height = 500,
        radius = Math.min(width, height) / 2,
        color = d3.scale.category20(),

        pie = d3.layout
            .pie()
            .value(function(d) { 
                return d.apples; 
            })
            .sort(null),

        arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 20),

        svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
            
        timeout = setTimeout(function() {
            d3.select("input[value=\"oranges\"]").property("checked", true).each(self.change);
        }, 2000),
        
        path = null;

    return {
        type: function (d) {
            d.apples = +d.apples;
            d.oranges = +d.oranges;
            
            return d;
        },
        
        change: function () {
            var value = this.value;
                    
            clearTimeout(timeout);
            pie.value(function(d) { 
                return d[value]; 
            }); // change the value function
            
            path = path.data(pie); // compute the new angles
            path.attr("d", arc); // redraw the arcs
        },
                
        run: function () {
            self = this;
            
            d3.tsv(tsvUrl, self.type, function(error, data) {
                path = svg.datum(data)
                    .selectAll("path")
                    .data(pie)
                    .enter()
                    .append("path")
                    .attr("fill", function(d, i) { 
                        return color(i); 
                    })
                    .attr("d", arc);

                d3.selectAll("input")
                    .on("change", self.change);
                    
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var PieChartUpdate1 = window.PieChartUpdate1;

    PieChartUpdate1.run();
});