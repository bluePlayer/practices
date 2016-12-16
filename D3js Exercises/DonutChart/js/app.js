/**
 * @see http://bl.ocks.org/mbostock/3887193
 * @param {Object} d3
 */
window.DonutChart = window.DonutChart || (function (d3) {
    'use strict';

    var self = null,
        csvUrl = "data.csv",
        width = 960,
        height = 500,
        radius = Math.min(width, height) / 2,

        color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#ff0000"]),

        arc = d3.svg
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70),

        pie = d3.layout
            .pie()
            .sort(null)
            .value(function(d) { 
                return d.population; 
            }),

        svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")"),
        
        g = null;

    return {
        type: function (d) {
            d.population = +d.population;
            
            return d;
        },
  
        run: function () {
            self = this;
            
            d3.csv(csvUrl, self.type, function (error, data) {
                if (error) {
                    throw error;
                }

                g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter()
                    .append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function (d) { 
                        return color(d.data.age); 
                    });

                g.append("text")
                    .attr("transform", function (d) { 
                        return "translate(" + arc.centroid(d) + ")"; 
                    })
                    .attr("dy", ".35em")
                    .text(function (d) { 
                        return d.data.age; 
                    });
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var DonutChart = window.DonutChart;

    DonutChart.run();
});