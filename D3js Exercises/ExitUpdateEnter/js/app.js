/**
 * @see http://bl.ocks.org/mbostock/5779682
 * @param {Object} d3
 */
window.ExitUpdateEnter = window.ExitUpdateEnter || (function(d3) {
    'use strict';

    var duration = 750,
    
        div = d3.select("body")
            .selectAll("div")
            .data(["enter", "update"], function(d) { 
                return (d || this.textContent); 
            });

    return {
        run: function () {
            // 2. update
            div.transition()
                .duration(duration)
                .delay(!div.exit().empty() * duration)
                .style("background", "orange");

            // 3. enter
            div.enter()
                .append("div")
                .text(function(d) { 
                    return d; 
                })
                .style("opacity", 0)
                .transition()
                .duration(duration)
                .delay((!div.exit().empty() + !div.enter().empty()) * duration)
                .style("background", "green")
                .style("opacity", 1);

            // 1. exit
            div.exit()
                .style("background", "red")
                .transition()
                .duration(duration)
                .style("opacity", 0)
                .remove();
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var ExitUpdateEnter = window.ExitUpdateEnter;

    ExitUpdateEnter.run();
});