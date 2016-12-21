/**
 * @see https://plnkr.co/edit/SgrHixnqnLHcra3Tv65H?p=preview
 * @param {Object} d3
 */
window.StackedBarChartNatasha = window.StackedBarChartNatasha || (function(d3) {
    'use strict';

    var self = null,
        csvUrl = "data.csv",
        margin = {
            top: 20, 
            right: 20, 
            bottom: 30, 
            left: 40
        },
        
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,

        y = d3.scale
            .ordinal()
            .rangeRoundBands([height, 0], 0.1),

        x = d3.scale
            .linear()
            .rangeRound([0, width]),

        yAxis = d3.svg
            .axis()
            .scale(y)
            .orient("left"),

        xAxis = d3.svg
            .axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.format(".2s")),

        svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
        
        color = d3.scale
            .ordinal()
            .range(['green', 'yellow', 'red', 'blue','grey', 'orange', 'purple' ]),
            
        state = null;

    return {
        
        run: function () {
            self = true;
            
            d3.csv(csvUrl, function(error, data) {
                if (error) {
                    throw error;
                }
                console.dir(data);
                // ugly code that works, fix it*
                data.forEach(function(d) {
                    console.dir(d);
                    if(d.p1 < 1){
                        d.p1 = 1;
                    } 
                  
                    if(d.p2 < 1) {
                        d.p2 = 1;
                    } 
                  
                    if(d.p3 < 1){
                        d.p3 = 1;
                    } 
                  
                    if (d.p4 < 1){
                        d.p4 = 1;
                    } 
                  
                    if (d.p5 < 1){
                        d.p5 = 1;
                    } 
                  
                    if(d.p6 < 1){
                        d.p6 = 1;
                    } 
                  
                    if(d.p7 < 1){
                        d.p7 = 1;
                    }
                });
    
                /*color.domain(d3.keys(data[0]).filter(function (key) { 
                    return (key !== "State"); 
                }));
  
                data.forEach(function (d) {
                    var y0 = 0;
                
                    d.ages = color.domain().map(function (name) { 
                        return {
                            name: name, 
                            y0: y0, 
                            y1: y0 += +d[name]
                        }; 
                    });
                    
                    d.total = d.ages[d.ages.length - 1].y1;
                });

                data.sort(function (a, b) { 
                    return b.total - a.total; 
                });

                y.domain(data.map(function(d) { 
                    return d.State; 
                }));
                
                x.domain([0, 7]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Population");

                state = svg.selectAll(".state")
                    .data(data)
                    .enter().append("g")
                    .attr("class", "g")
                    .attr("transform", function(d) { 
                        return "translate(0," + y(d.State) + ")"; 
                    });

                state.selectAll("rect")
                    .data(function(d) { 
                        return d.ages; 
                    })
                    .enter().append("rect")
                    .attr("height", y.rangeBand())
                    .attr("x", function(d) { 
                        return x(d.y0); 
                    })
                    .attr("width", function(d) { 
                        return x(d.y1) - x(d.y0); 
                    })
                    .style("fill", function(d) { 
                        return color(d.name);
                    });
                */
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var StackedBarChartNatasha = window.StackedBarChartNatasha;

    StackedBarChartNatasha.run();
});