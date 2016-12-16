/**
 * @see http://bl.ocks.org/mbostock/4348373
 * @param {Object} d3
 * @param {Object} jq
 */
window.ZoomableSunburst = window.ZoomableSunburst || (function(d3, jq) {
    'use strict';

    var self = null,
        jsonUrl = "flare.json",
        jsonUrl1 = "flare1.json",
        jsonUrl2 = "flare2.json",
        width = 960,
        height = 700,
        radius = (Math.min(width, height) / 2) - 10,

        formatNumber = d3.format(",d"),

        x = d3.scale.linear()
            .range([0, 2 * Math.PI]),

        y = d3.scale.sqrt()
            .range([0, radius]),

        color = d3.scale.category20c(),

        partition = d3.layout.partition()
            .value(function(d) { 
                return d.size; 
            }),

        arc = d3.svg.arc()
            .startAngle(function(d) { 
                return Math.max(0, Math.min(2 * Math.PI, x(d.x))); 
            })
            .endAngle(function(d) { 
                return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); 
            })
            .innerRadius(function(d) { 
                return Math.max(0, y(d.y)); 
            })
            .outerRadius(function(d) { 
                return Math.max(0, y(d.y + d.dy)); 
            }),

        svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")"),
        
        g = null,
        xd = null,
        yd = null,
        yr = null;

    return { 
        click: function (d) {
            svg.transition()
                .duration(750)
                .tween("scale", function() {
                    xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                    yd = d3.interpolate(y.domain(), [d.y, 1]),
                    yr = d3.interpolate(y.range(), [(d.y ? 20 : 0), radius]);
                        
                    return function (t) { 
                        x.domain(xd(t)); 
                        y.domain(yd(t)).range(yr(t)); 
                    };
                })
                .selectAll("path")
                .attrTween("d", function(d) { 
                    return function() { 
                        return arc(d); 
                    }; 
                });
        },
        
        loadDataFile: function (dataFile) {
            d3.json(dataFile, function(error, data) {
                if (error) {
                    throw error;
                }
                
                g = svg.selectAll(".arc")
                    .data(partition.nodes(data))
                    .enter()
                    .append("g")
                    .attr("class", "arc");
                    
                g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { 
                        return color((d.children ? d : d.parent).name); 
                    })
                    .on("click", self.click);
                    
                g.append("text")
                    .attr("transform", function (d) { 
                        return "translate(" + arc.centroid(d) + ")"; 
                    })
                    .attr("dy", ".35em")
                    .text(function (d) { 
                        return d.name + "\n" + formatNumber(d.value);
                    });
            });
        },

        run: function() {
            self = this;
            
            self.loadDataFile(jsonUrl);
            
            jq("#btn1").click(function () {
                self.loadDataFile(jsonUrl);
            });
            
            jq("#btn2").click(function () {
                self.loadDataFile(jsonUrl1);
            });
            
            jq("#btn3").click(function () {
                self.loadDataFile(jsonUrl2);
            });
            
            d3.select(self.frameElement).style("height", height + "px");
        }
    };

}(d3, $));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var ZoomableSunburst = window.ZoomableSunburst;

    ZoomableSunburst.run();
});