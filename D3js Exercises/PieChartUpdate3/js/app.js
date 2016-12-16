/**
 * @see http://bl.ocks.org/mbostock/5681842
 * @param {Object} d3
 */
window.PieChartUpdate3 = window.PieChartUpdate3 || (function (d3) {
    'use strict';

    var self = null,
        tsvUrl = "data.tsv",
        
        width = 960,
        height = 500,
        
        radius = Math.min(width, height) / 2,
        innerRadius = radius - 100,
        outerRadius = radius - 20,
        
        duration = 750,
        timeoutTime = 2000,
        
        color = d3.scale.category20(),

        pie = d3.layout
            .pie()
            .value(function (d) { 
                return d.apples; 
            })
            .sort(null),

        arc = d3.svg
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius),

        svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
            
        timeout = setTimeout(function () {
            d3.select("input[value=\"oranges\"]").property("checked", true).each(self.change);
        }, timeoutTime),
            
        path = null;

    return {
        /**
         * Store the displayed angles in current.
         * Then, interpolate from current to the new angles.
         * During the transition, current is updated in-place by d3.interpolate.
         */
        arcTween: function (a) {
            var i = d3.interpolate(this.current, a);
            
            this.current = i(0);
            
            return function (t) {
                return arc(i(t));
            };
        },

        type: function (d) {
            d.apples = (+d.apples || 0);
            d.oranges = (+d.oranges || 0);
            
            return d;
        },
        
        change: function () {
            var value = this.value;
            
            clearTimeout(timeout);
            pie.value(function (d) { 
                return d[value]; 
            }); // change the value function
            
            path = path.data(pie); // compute the new angles
            path.transition()
                .duration(duration)
                .attrTween("d", self.arcTween); // redraw the arcs
        },

        run: function () {
            self = this;
            
            d3.tsv(tsvUrl, self.type, function (error, data) {
                if (error) {
                    throw error;
                }

                path = svg.datum(data)
                    .selectAll("path")
                    .data(pie)
                    .enter()
                    .append("path")
                    .attr("fill", function (d, i) { 
                        return color(i); 
                    })
                    .attr("d", arc)
                    .each(function (d) { 
                        this.current = d; 
                    }); // store the initial angles

                d3.selectAll("input")
                    .on("change", self.change);

            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function (event) {
    'use strict';
    var PieChartUpdate3 = window.PieChartUpdate3;

    PieChartUpdate3.run();
});