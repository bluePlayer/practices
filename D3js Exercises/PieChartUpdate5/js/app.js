/**
 * @see http://bl.ocks.org/mbostock/5682158
 * @param {Object} d3
 */
window.PieChartUpdate5 = window.PieChartUpdate5 || (function (d3) {
    'use strict';

    var self = null,
        j = 0,
        k = 0,
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
        findNeighborArc: function (i, data0, data1, key) {
            var d;
            
            return (d = self.findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
                : (d = self.findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
                : null;
        },

        /**
         * Find the element in data0 that joins the highest preceding element in data1.
         */
        findPreceding: function (i, data0, data1, key) {
            var m = data0.length;
            
            while ((i -= 1) >= 0) {
                k = key(data1[i]);
                
                for (j = 0; j < m; j += 1) {
                    if (key(data0[j]) === k) {
                        return data0[j];
                    }
                }
            }
        },

        /**
         * Find the element in data0 that joins the lowest following element in data1.
         */
        findFollowing: function (i, data0, data1, key) {
            var n = data1.length, 
                m = data0.length;
            
            while ((i += 1) < n) {
                k = key(data1[i]);
                
                for (j = 0; j < m; j += 1) {
                    if (key(data0[j]) === k) {
                        return data0[j];
                    }
                }
            }
        },
        
        arcTween: function (d) {
            var i = d3.interpolate(this.current, d);
            
            this.current = i(0);
            
            return function (t) { 
                return arc(i(t)); 
            };
        },
        
        key: function (d) {
          return d.data.region;
        },

        type: function (d) {
            d.count = +d.count;
            
            return d;
        },
        
        change: function (region) {
            var data0 = path.data(),
                data1 = pie(region.values);

            path = path.data(data1, self.key);

            path.enter().append("path")
                .each(function (d, i) { 
                    this.current = (self.findNeighborArc(i, data0, data1, self.key) || d); 
                })
                .attr("fill", function (d) { 
                    return color(d.data.region); 
                })
                .append("title")
                .text(function (d) { 
                    return d.data.region; 
                });

            path.exit()
                .datum(function (d, i) { 
                    return (self.findNeighborArc(i, data1, data0, self.key) || d); 
                })
                .transition()
                .duration(750)
                .attrTween("d", self.arcTween)
                .remove();

            path.transition()
                .duration(750)
                .attrTween("d", self.arcTween);
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
    var PieChartUpdate5 = window.PieChartUpdate5;

    PieChartUpdate5.run();
});