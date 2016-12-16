/**
 * @see http://bl.ocks.org/mbostock/5779690
 * @param {Object} d3
 */
window.ExitUpdateEnter2 = window.ExitUpdateEnter2 || (function (d3) {
    'use strict';

    var duration = 750,
    
        div = d3.select("body")
            .selectAll("div")
            .data(["enter", "update"], function (d) { 
                return (d || this.textContent); 
            }),

        // 1. exit
        exitTransition = d3.transition().duration(750).each(function () {
            div.exit()
                .style("background", "red")
                .transition()
                .style("opacity", 0)
                .remove();
        }),

        // 2. update
        updateTransition = exitTransition.transition().each(function () {
            div.transition()
                .style("background", "orange");
        }),

        // 3. enter
        enterTransition = updateTransition.transition().each(function () {
            div.enter().append("div")
                .text(function(d) { 
                    return d; 
                })
                .style("opacity", 0)
                .transition()
                .style("background", "green")
                .style("opacity", 1);
        });

    return {
        run: function () {
            
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var ExitUpdateEnter2 = window.ExitUpdateEnter2;

    ExitUpdateEnter2.run();
});