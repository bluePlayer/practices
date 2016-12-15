/**
 * @see http://bl.ocks.org/mbostock/4348373
 * @param {Object} d3
 */
window.ZoomableSunburst = window.ZoomableSunburst || (function(d3) {
    'use strict';

    var self = null,
        jsonUrl = "flare.json",
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

        svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    return { 
        click: function (d) {
            svg.transition()
                .duration(750)
                .tween("scale", function() {
                    var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                        yd = d3.interpolate(y.domain(), [d.y, 1]),
                        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                    return function (t) { 
                        x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); 
                    };
                })
                .selectAll("path")
                .attrTween("d", function(d) { 
                    return function() { 
                        return arc(d); 
                    }; 
                });
        },

        run: function() {
            self = this;
            
            d3.json(jsonUrl, function(error, root) {
                if (error) {
                    throw error;
                }

                svg.selectAll("path")
                    .data(partition.nodes(root))
                    .enter().append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { 
                        return color((d.children ? d : d.parent).name); 
                    })
                    .on("click", self.click)
                    .append("title")
                    .text(function(d) { 
                        return d.name + "\n" + formatNumber(d.value); 
                    });
            });
            
            d3.select(self.frameElement).style("height", height + "px");
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var ZoomableSunburst = window.ZoomableSunburst;

    ZoomableSunburst.run();
});