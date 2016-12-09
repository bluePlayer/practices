/**
 * @see http://bl.ocks.org/tomgp/6475678
 * @param {Object} jq
 * @param {Object} d3
 */
(function(jq, d3) {
    'use strict';

    d3.csv("js/data.csv", function (csv) {
        var svg = d3.select('body')
            .append('g');
        // we first sort the data

        csv.sort(function(a, b) {
            return b.population - a.population;
        });

        // then we create the marks, which we put in an initial position

        svg.selectAll("circle").data(csv).enter()
            .append("circle")
            .attr("cx", function(d) {
                return x(0);
            })
            .attr("cy", function(d) {
                return y(0);
            })
            .attr("r", function(d) {
                return r(0);
            })

        .style("fill", function(d) {
                return c(d.continent);
            })
            .style("opacity", function(d) {
                return o(+d.GDPcap);
            })

        .append("title")
            .text(function(d) {
                return d.country;
            })

        // now we initiate - moving the marks to their position

        svg.selectAll("circle").transition().duration(1000)
            .attr("cx", function(d) {
                return x(+d.GERD);
            })
            .attr("cy", function(d) {
                return y(+d.growth);
            })
            .attr("r", function(d) {
                return r(Math.sqrt(+d.population));
            })
    });

}($, d3));