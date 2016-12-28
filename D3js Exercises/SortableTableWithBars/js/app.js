/**
 * @see http://bl.ocks.org/mbostock/3719724
 * @param {Object} d3
 * @author Mike Bostock
 */
window.SortableTableWithBars = window.SortableTableWithBars || ( function(d3) {
        'use strict';

        var self = null,
            csvUrl = "states.csv",
            width = 71,
            height = 12,
            ages = null,
            tr = null;

        return {
            filter: function(key) {
                return ((key !== "State") && (key !== "Total"));
            },

            click: function(k) {
                tr.sort(function(a, b) {
                    return (b[k] / b.Total) - (a[k] / a.Total);
                });
            },

            run : function() {
                self = this;

                d3.csv(csvUrl, function(error, states) {
                    if (error) {
                        throw error;
                    }

                    ages = d3.keys(states[0])
                        .filter(self.filter);

                    d3.selectAll("thead td")
                        .data(ages)
                        .on("click", self.click);

                    tr = d3.select("tbody")
                        .selectAll("tr")
                        .data(states)
                        .enter()
                        .append("tr");

                    tr.append("th")
                        .text(function(d) {
                            return d.State;
                        });

                    tr.selectAll("td")
                        .data(function(d) {
                            return ages.map(function(k) {
                                return d[k] / d.Total;
                            });
                        })
                        .enter()
                        .append("td")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("rect")
                        .attr("height", height)
                        .attr("width", function(d) {
                            return d * width;
                        });
                });
            }
        };

    }(d3));

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var SortableTableWithBars = window.SortableTableWithBars;

    SortableTableWithBars.run();
});