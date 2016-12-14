/**
 * @see http://stackoverflow.com/questions/41136300/how-do-i-make-draggable-circles-around-a-fixed-circle-d3-js
 * @param {Object} d3
 */
window.DraggableCircles = window.DraggableCircles || (function(d3) {
    'use strict';

    var svg = d3.select('svg'),
        originX = 200,
        originY = 200,
        circleOX = originX + (60 * Math.sin(0)),
        circleOY = originY - (60 * Math.cos(0)),

        tween1 = function (d, i, a) {
            return d3.interpolateString("rotate(0, 200, 200)", "rotate(45, 200, 200)");
        },
        
        tween2 = function (d, i, a) {
            return d3.interpolateString("rotate(0, 200, 200)", "rotate(10, 200, 200)");
        },
        
        t1 = d3.transition().delay(1500).duration(500),
        t2 = d3.transition().delay(2000).duration(500);

    return {
        run: function () {
            svg.append("circle")
                .attr("cx", circleOX - 10)
                .attr("cy", circleOY - 10)
                .attr("r", 10)
                .attr("opacity", 1)
                .attr("fill", "none")
                .attr("stroke", "blue")
                .transition(t1)
                .attrTween("transform", tween1);
            
            svg.append("circle")
                .attr("cx", circleOX - 10)
                .attr("cy", circleOY - 10)
                .attr("r", 20)
                .attr("opacity", 1)
                .attr("fill", "none")
                .attr("stroke", "blue")
                .transition(t2)
                .attrTween("transform", tween2);
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var DraggableCircles = window.DraggableCircles;

    DraggableCircles.run();
});