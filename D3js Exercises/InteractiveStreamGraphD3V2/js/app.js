/**
 * @see http://bl.ocks.org/GerHobbelt/1965462
 * @param {Object} d3
 */
window.InteractiveStreamGraphD3V2 = window.InteractiveStreamGraphD3V2 || (function(d3) {
    'use strict';

    var self = null,
        n = 20, // number of layers
        m = 200, // number of samples per layer

        data1 = null,
        data0 = null,
        
        colors = d3.range(n).map(function () { 
            return d3.interpolateRgb("#aad", "#556")(Math.random()); 
        }),

        streamgraph = null;
    
    return {
        streamgraphChart: function () {
            var margin = {
                    top: 0, 
                    right: 0,
                    bottom: 0, 
                    left: 0
                },
                
                width = 960,
                height = 500,
                transitionDuration = 1000,
                
                color = function () { 
                    return d3.interpolateRgb("#aad", "#556")(Math.random()); 
                },
                
                eventHandlers = [],
                layers = null,

                streamgraph =  d3.layout.stack().offset("wiggle");

            function chart(selection) {
                selection.each(function (data) {

                    // Compute the streamgraph.
                    data = streamgraph(data);

                    var mx = data[0].length - 1, // assumes that all layers have same # of samples & that there is at least one layer
                        my = d3.max(data, function (d) {
                            return d3.max(d, function (d) {
                                return (d.y0 + d.y);
                            });
                        }),

                        // Select the svg element, if it exists.
                        svg = d3.select(this).selectAll("svg").data([data]),

                        // Otherwise, create the skeletal chart.
                        gEnter = svg.enter().append("svg").append("g");

                    // Update the outer dimensions.
                    svg .attr("width", width)
                        .attr("height", height);

                    // Update the inner dimensions.
                    var g = svg.select("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    // Update the streamgraph
                    var availableWidth = width - margin.left - margin.right,
                        availableHeight = height - margin.top - margin.bottom;

                    var area = d3.svg
                        .area()
                        .x(function (d) { 
                            return d.x * availableWidth / mx; 
                        })
                        .y0(function (d) { 
                            return availableHeight - d.y0 * availableHeight / my; 
                        })
                        .y1(function (d) { 
                            return availableHeight - (d.y + d.y0) * availableHeight / my; 
                        });

                    layers = g.selectAll("path").data(data);

                    var enterPath = layers.enter().append("path");
                    eventHandlers.forEach(function (d){
                        enterPath.on(d.type, d.handler);
                    });

                    layers.exit().remove();
                    layers.style("fill", color)
                        .transition()
                        .duration(transitionDuration)
                        .attr("d", area);
                });
            }
            
            /** 
             * TODO needs further work 
             */
            chart.on = function (_) {
                
                eventHandlers.push({
                    "type": arguments[0],
                    "handler": arguments[1]
                });

                return chart;
            };

            chart.color = function(_) {
                if (!arguments.length) {
                    return color;
                }
                
                color = _;
                return chart;
            };

            chart.transitionDuration = function(_) {
                if (!arguments.length) {
                    return transitionDuration;
                }
                
                transitionDuration = _;
                return chart;
            };

            chart.layers = function() {
                return layers;
            };

            chart.margin = function(_) {
                if (!arguments.length) {
                    return margin;
                }
                
                margin = _;
                return chart;
            };

            chart.width = function(_) {
                if (!arguments.length) {
                    return width;
                }
                
                width = _;
                return chart;
            };

            chart.height = function(_) {
                if (!arguments.length) {
                    return height;
                }
                
                height = _;
                return chart;
            };

            return chart;
        },
        
        bump: function (a) {
                var x = 1 / (0.1 + Math.random()),
                    y = 2 * Math.random() - 0.5,
                    z = 10 / (0.1 + Math.random()),
                    w = 0, i = 0;
                    
                for (i = 0; i < m; i += 1) {
                    w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            },
        /**
         * Inspired by Lee Byron's test data generator. 
         */
        stream_layers: function (n, m, o) {
            if (arguments.length < 3) {
                o = 0;
            }
          
            return d3.range(n).map(function() {
                var a = [], i;
                
                for (i = 0; i < m; i += 1) {
                    a[i] = o + o * Math.random();
                }
                
                for (i = 0; i < 5; i += 1) {
                    self.bump(a);
                }
                
                return a.map(stream_index);
            });
        },

        stream_index: function (d, i) {
            return {
                x: i, 
                y: Math.max(0, d)
            };
        },
        
        fade: function (opacity) {
            return function(g, i) {
                streamgraph.layers()
                    .filter(function(h, j) {
                        return j != i;
                    })
                    .transition(1000)
                    .style("opacity", opacity);
            };
        },
        
        transition: function () {
            data1 = self.stream_layers(n, m);
            data0 = self.stream_layers(n, m);
            
            d3.select("#chart")
                .datum(function() {
                    var d = data1;
                    
                    data1 = data0;
                    data0 = d;
                    
                    return data0;
                })
                .call(streamgraph);
        },
        
        run: function () {
            self = this;
            
            streamgraph = self.streamgraphChart()
                .margin({
                    top: 10, 
                    right: 10, 
                    bottom: 10, 
                    eft: 10
                })
                .color(function (d, i) { 
                    return colors[i]; 
                }) // use same colors for both data sets
                .transitionDuration(1500)
                .on("mouseover", self.fade(0.2))
                .on("mouseout", self.fade(1));
console.dir(streamgraph);
            d3.select("#chart")
                .datum(data0)
                .call(streamgraph);
        }
    };
    
}(d3));

window.document.addEventListener("DOMContentLoaded", function (event) {
    'use strict';
    var InteractiveStreamGraphD3V2 = window.InteractiveStreamGraphD3V2;

    InteractiveStreamGraphD3V2.run();
});