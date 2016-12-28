/**
 * @see http://bl.ocks.org/mbostock/3885705
 * @param {Object} d3
 */
window.SortableBarChat = window.SortableBarChat || ( function(d3) {
        'use strict';

        var self = null,
            tsvUrl = "data.tsv",

            transitionDuration = 750,
            timeOutDuration = 2000,

            margin = {
                top : 20,
                right : 20,
                bottom : 30,
                left : 40
            },

            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,

            formatPercent = d3.format(".0%"),

            x = d3.scale
                .ordinal()
                .rangeRoundBands([0, width], 0.1, 1),

            y = d3.scale
                .linear()
                .range([height, 0]),

            xAxis = d3.svg
                .axis()
                .scale(x)
                .orient("bottom"),

            yAxis = d3.svg
                .axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent),

            svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),

            sortTimeout = null,
            tsvData = null;

        return {
            unsortedFrequency: function (a, b) {
                return b.frequency - a.frequency;
            },

            sortedFrequency: function (a, b) {
                return d3.ascending(a.letter, b.letter);
            },

            delay: function(d, i) {
                return i * 50;
            },

            change: function () {
                // Copy-on-write since tweens are evaluated after a delay.
                var x0 = x.domain(tsvData.sort(this.checked ? self.unsortedFrequency : self.sortedFrequency)
                    .map(function(d) {
                        return d.letter;
                    }))
                    .copy(),
                    transition = svg.transition()
                        .duration(transitionDuration);

                clearTimeout(sortTimeout);

                svg.selectAll(".bar")
                    .sort(function(a, b) {
                        return x0(a.letter) - x0(b.letter);
                    });

                transition.selectAll(".bar")
                    .delay(self.delay)
                    .attr("x", function(d) {
                        return x0(d.letter);
                    });

                transition.select(".x.axis")
                    .call(xAxis)
                    .selectAll("g")
                    .delay(self.delay);
            },

            run : function() {
                self = this;

                d3.tsv(tsvUrl, function(error, data) {
                    tsvData = data;

                    sortTimeout = setTimeout(function() {
                        d3.select("input")
                            .property("checked", true)
                            .each(self.change);
                    }, timeOutDuration);

                    data.forEach(function(d) {
                        d.frequency = +d.frequency;
                    });

                    x.domain(data.map(function(d) {
                        return d.letter;
                    }));

                    y.domain([0, d3.max(data, function(d) {
                        return d.frequency;
                    })]);

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
                        .text("Frequency");

                    svg.selectAll(".bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) {
                            return x(d.letter);
                        })
                        .attr("width", x.rangeBand())
                        .attr("y", function(d) {
                            return y(d.frequency);
                        }).attr("height", function(d) {
                            return height - y(d.frequency);
                        });

                    d3.select("input")
                        .on("change", self.change);
                });
            }
        };

    }(d3));

window.document.addEventListener('DOMContentLoaded', function(event) {
    'use strict';
    var SortableBarChat = window.SortableBarChat;

    SortableBarChat.run();
});