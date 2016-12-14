/**
 * @see http://stackoverflow.com/questions/41135706/getting-error-with-d3-v4-stacked-bar-chart
 * @param {Object} d3
 */
window.StackedBarChartError = window.StackedBarChartError || (function(d3) {
    'use strict';

    var self = null,
        data = [
            { month: 'Jan', A: 20, B: 5, C: 10 },
            { month: 'Feb', A: 30, B: 10, C: 20 },
            { month: 'March', A: 50, B: 25, C: 65 }
        ],

        keys = ["A", "B", "C"],

        margin = { 
            top: 20, 
            right: 50, 
            bottom: 30, 
            left: 0 
        },

        width = 350 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,

        x = d3.scaleBand().range([0, width]).padding(0.35).align(0.1),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]),

        color = d3.scaleOrdinal(d3.schemeCategory20),

        xAxis = d3.axisBottom(x),

        svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
        
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),

        dataIntermediate = keys.map(function (c) {
            return data.map(function (d) {
                return { x: d.month, y: d[c] };
            });
        }),

        dataStackLayout = d3.stack()
            .keys(keys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone),
        
        series = dataStackLayout(data),
        
        layer = svg.selectAll(".stack")
            .data(series)
            .enter().append("g")
            .attr("class", "stack")
            .style("fill", function (d, i) {
                return color(i);
            });

    return {
        type: function (d, columns) {
            var t = 0, i = 0, j = 0;
            
            for (i = 0, t = 0; i < columns.length; i += 1) {
                for (j = 0; j < keys.length; j += 1) {
                    console.log(columns[i][keys[j]]);
                    t += columns[i][keys[j]];//d[columns[i]] = +d[columns[i]];
                }
            }
            
            d.total = t;
            
            return d;
        },
        
        run: function () {
            self = this;
            console.dir(series);
            
            //data.sort(function(a, b) { 
            //    return b.total - a.total; 
            //});
        
            x.domain(data.map(function (d) {
                //console.dir(d);
                return d.month;
            }));
            
            y.domain([0, d3.max(data, function(d) {
                d = self.type(d, data);
                console.dir(d);
                return d.total; 
            })])
            .nice();

            /*y
                .domain([
                    0, 
                    d3.max(series[series.length - 1],
                    function (d) {
                        console.dir(d);
                        return d.y0 + d.y; 
                    })
                ])
                .nice();*/
            
            g.selectAll(".serie")
                .data(data)
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
                    //console.dir(d);
                    return x(d.data.State); 
                })
                .attr("y", function(d) {
                    //console.dir(d);
                    return y(d[1]); 
                })
                .attr("height", function(d) { 
                    //console.dir(d);
                    return y(d[0]) - y(d[1]); 
                })
                .attr("width", x.bandwidth());

            /*layer.selectAll("rect")
                .data(function (d) {
                    return d;
                })
                .enter().append("rect")
                .attr("x", function (d) {
                    return x(d.x);
                })
                .attr("y", function (d) {
                    return y(d.y + d.y0);
                })
                .attr("height", function (d) {
                    return y(d.y0) - y(d.y + d.y0);
                })
                .attr("width", x.range());

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0, " + height + ")")
                .call(xAxis);*/
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var StackedBarChartError = window.StackedBarChartError;

    StackedBarChartError.run();
});