/**
 * @see http://bl.ocks.org/mbostock/3886208
 * @param {Object} d3
 */
window.StackedBarChart = window.StackedBarChart || (function(d3) {
    'use strict';

    var self = null,
        csvUrl = "data.csv",
        svg = d3.select("svg"),
    
        margin = {
            top: 20, 
            right: 20, 
            bottom: 30, 
            left: 40
        },
        
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),

        x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .align(0.1),

        y = d3.scaleLinear()
            .rangeRound([height, 0]),

        z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]),

        stack = d3.stack(),
        legend = null;

    return {
        type: function (d, i, columns) {
            var t = 0;
            
            for (i = 1, t = 0; i < columns.length; i += 1) {
                t += d[columns[i]] = +d[columns[i]];
            }
            
            d.total = t;
            
            return d;
        },
        
        run: function () {
            self = this;
            
            d3.csv(csvUrl, self.type, function(error, data) {
                if (error) {
                    throw error;
                }

                data.sort(function(a, b) { 
                    return b.total - a.total; 
                });

                x.domain(data.map(function(d) { 
                    return d.State; 
                }));
                
                y.domain([0, d3.max(data, function(d) {
                    return d.total; 
                })]).nice();
                
                z.domain(data.columns.slice(1));

                g.selectAll(".serie")
                    .data(stack.keys(data.columns.slice(1))(data))
                    .enter().append("g")
                    .attr("class", "serie")
                    .attr("fill", function(d) { 
                        return z(d.key); 
                    })
                    .selectAll("rect")
                    .data(function(d) { 
                        return d; 
                    })
                    .enter().append("rect")
                    .attr("x", function(d) { 
                        return x(d.data.State); 
                    })
                    .attr("y", function(d) { 
                        return y(d[1]); 
                    })
                    .attr("height", function(d) { 
                        return y(d[0]) - y(d[1]); 
                    })
                    .attr("width", x.bandwidth());

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .attr("class", "axis axis--y")
                    .call(d3.axisLeft(y).ticks(10, "s"))
                    .append("text")
                    .attr("x", 2)
                    .attr("y", y(y.ticks(10).pop()))
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "start")
                    .attr("fill", "#000")
                    .text("Population");

                legend = g.selectAll(".legend")
                    .data(data.columns.slice(1).reverse())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) { 
                        return "translate(0," + (i * 20) + ")"; 
                    })
                    .style("font", "10px sans-serif");

                legend.append("rect")
                    .attr("x", width - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    .attr("fill", z);

                legend.append("text")
                    .attr("x", width - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .attr("text-anchor", "end")
                    .text(function(d) { 
                        return d; 
                    });
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var StackedBarChart = window.StackedBarChart;

    StackedBarChart.run();
});