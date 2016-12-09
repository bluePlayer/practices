/**
 * @see http://bl.ocks.org/mbostock/6f14f7b7f267a85f7cdc
 * @param {Object} window
 * @param {Object} d3_random
 * @param {Object} d3_polygon
 */
(function(window, d3_random, d3_polygon) {
    'use strict';

    var i = 0,
        n = 0,
        canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height,
        randomX = d3_random.normal(width / 2, 60),
        randomY = d3_random.normal(height / 2, 60),
        points = new Array(100),

        render = function () {
            var hull = d3_polygon.hull(points);

            context.beginPath();
            context.moveTo(hull[0][0], hull[0][1]);
            context.clearRect(0, 0, width, height);

            for (i = 1, n = hull.length; i < n; i += 1) {
                context.lineTo(hull[i][0], hull[i][1]);
            }

            context.closePath();
            context.fillStyle = "steelblue";
            context.fill();
            context.lineWidth = 15;
            context.lineJoin = "round";
            context.strokeStyle = "steelblue";
            context.stroke();
            context.beginPath();

            for (i = 0, n = points.length; i < n; i += 1) {
                context.moveTo(points[i][0] + 2.5, points[i][1]);
                context.arc(points[i][0], points[i][1], 2.5, 0, 2 * Math.PI);
            }

            context.fillStyle = "white";
            context.fill();
            context.lineWidth = 1.5;
            context.strokeStyle = "black";
            context.stroke();
        };

    for (i = 0, n = points.length; i < n; i += 1) {
        points[i] = [randomX(), randomY()];
    }

    render();

    window.addEventListener("mousemove", function(event) {
        var rect = canvas.getBoundingClientRect(),
            x = event.clientX - rect.left - canvas.clientLeft,
            y = event.clientY - rect.top - canvas.clientTop;

        points[0][0] = x;
        points[0][1] = y;
        render();
    });

}(window, d3_random, d3_polygon));