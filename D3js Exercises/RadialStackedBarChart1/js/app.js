/**
 * @see http://bl.ocks.org/mbostock/6fead6d1378d6df5ae77bb6a719afcb2
 * @param {Object} d3
 */
window.RadialStackedBarChart = window.RadialStackedBarChart || ( function(d3, jq) {
        'use strict';

        var self = null,
            csvUrl1 = "data.csv",
            csvUrl2 = "data1.csv",
            svg = d3.select("svg"),

            time = 5000,

            transition = d3.transition()
                .duration(time)
                .ease(d3.easeLinear),

            label = null,
            yAxis = null,
            yTick = null,
            legend = null,

            width = +svg.attr("width"),
            height = +svg.attr("height"),

            innerRadius = 180,
            outerRadius = Math.min(width, height) / 2,

            g = svg.append("g")
                .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")"),

            x = d3.scaleBand()
                .range([0, (2 * Math.PI)])
                .align(0),

            y = d3.scaleRadial()
                .range([innerRadius, outerRadius]),

            z = d3.scaleOrdinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        return {

            getRow : function(d, i, columns) {
                var t = 0;

                for ( i = 1,
                t = 0; i < columns.length; i += 1) {
                    t += d[columns[i]] = +d[columns[i]];
                }

                d.total = t;

                return d;
            },

            loadData: function (dataUrl) {
                //d3.select("g")
                //   .remove();

                //g = svg.append("g")
                //    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

                d3.csv(dataUrl, self.getRow, function(error, data) {

                    if (error) {
                        throw error;
                    }

                    x.domain(data.map(function(d) {
                        return d.State;
                    }));

                    y.domain([0, d3.max(data, function(d) {
                        return d.total;
                    })]);

                    z.domain(data.columns.slice(1));

                    var arcs = g.append("g")
                        .selectAll("g")
                        .data(d3.stack().keys(data.columns.slice(1))(data))
                        .enter()
                        .append("g")
                        .attr("class", "arc")
                        .attr("fill", function(d) {
                            return z(d.key);
                        })
                        .selectAll("path")
                        .data(function(d) {
                            return d;
                        })
                        .enter()
                        .append("path")

                        .attr("d", d3.arc().innerRadius(function(d) {
                            return y(d[0]);
                        })
                        .outerRadius(function(d) {
                            return y(d[1]);
                        })
                        .startAngle(function(d) {
                            return x(d.data.State);
                        })
                        .endAngle(function(d) {
                            return x(d.data.State) + x.bandwidth();
                        })
                        .padAngle(0.01)
                        .padRadius(innerRadius));

                    //var paths = d3.selectAll(".arc");

                    arcs.exit().remove();
                    console.log(arcs.size());
                    console.dir(arcs);

                    /*label = g.append("g")
                        .selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("text-anchor", "middle")
                        .attr("transform", function(d) {
                            return "rotate(" + ((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
                        });

                    label.append("line")
                        .attr("x2", -5)
                        .attr("stroke", "#000");

                    label.append("text")
                        .attr("transform", function(d) {
                            return (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)";
                        }).text(function(d) {
                            return d.State;
                        });

                    yAxis = g.append("g")
                        .attr("text-anchor", "middle");

                    yTick = yAxis.selectAll("g")
                        .data(y.ticks(5).slice(1))
                        .enter()
                        .append("g");

                    yTick.append("circle")
                        .attr("fill", "none")
                        .attr("stroke", "#000")
                        .attr("r", y);

                    yTick.append("text")
                        .attr("y", function(d) {
                            return -y(d);
                        })
                        .attr("dy", "0.35em")
                        .attr("fill", "none")
                        .attr("stroke", "#fff")
                        .attr("stroke-width", 5)
                        .text(y.tickFormat(5, "s"));

                    yTick.append("text")
                        .attr("y", function(d) {
                            return -y(d);
                        })
                        .attr("dy", "0.35em")
                        .text(y.tickFormat(5, "s"));

                    yAxis.append("text")
                        .attr("y", function(d) {
                            return -y(y.ticks(5).pop());
                        })
                        .attr("dy", "-1em")
                        .text("Population");

                    legend = g.append("g")
                        .selectAll("g")
                        .data(data.columns.slice(1).reverse())
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {
                            return "translate(-40," + (i - (data.columns.length - 1) / 2) * 20 + ")";
                        });

                    legend.append("rect")
                        .attr("width", 18)
                        .attr("height", 18)
                        .attr("fill", z);

                    legend.append("text")
                        .attr("x", 24)
                        .attr("y", 9)
                        .attr("dy", "0.35em")
                        .text(function(d) {
                            return d;
                        });*/

                });
            },

            run : function() {
                self = this;

                jq("#btn1").click(function (event) {
                    self.loadData(csvUrl1);
                });

                jq("#btn2").click(function (event){
                    self.loadData(csvUrl2);
                });

                self.loadData(csvUrl1);
            }
        };

    }(d3, $));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var RadialStackedBarChart = window.RadialStackedBarChart;

    RadialStackedBarChart.run();
});