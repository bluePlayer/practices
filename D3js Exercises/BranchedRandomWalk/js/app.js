/**
 * @see http://bl.ocks.org/tomgp/6475678
 * @param {Object} jq
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,
    color = d3.scaleSequential(d3.interpolateRainbow).domain([0, 1000]),
    randomX = d3.randomNormal(0.3),
    randomY = d3.randomNormal(0),

    renderWalk = function (walk) {
        var i, n = walk.length;

        context.beginPath();
        context.moveTo(walk[0][0], walk[0][1]);

        for (i = 1; i < n; i += 1) {
            context.lineTo(walk[i][0], walk[i][1]);
        }

        context.stroke();
    },

    randomWalk = function (x0, y0, n) {
        var points = [], i;

        points[0] = [x0, y0];

        for (i = 1; i < n; i += 1) {
            points[i] = [(x0 += (randomX() * 2)), (y0 += (randomY() * 2))];
        }

        return points;
    },

    render = function () {
        var i = 0, j = 0, k = 0, m = 0,
            branchStart = 0,
            x0 = (width / 20), y0 = (height / 2),
            x1 = 0, y1 = 0,
            pieceWalk  = 0, pieceEnd = 0,
            mainWalk =  randomWalk(x0, y0, 1000);

        context.clearRect(0, 0, width, height);
        context.lineJoin = "round";
        context.lineCap = "round";
        context.lineWidth = 1.5;
        context.strokeStyle = "black";
        renderWalk(mainWalk);

        context.globalCompositeOperation = "multiply";
        context.lineWidth = 1;

        for (i = 0; i < mainWalk.length; i += 2) {

            branchStart = mainWalk[i];
            x0 = branchStart[0];
            y0 = branchStart[1];

            for (j = 0; j < 1; j += 1) {

              context.strokeStyle = color(i + (Math.random() - 0.5) * 50);
              x1 = x0;
              y1 = y0;

              for (k = 0, m = 20; k < m; k += 1) {

                context.globalAlpha = (m - k - 1) / m;
                pieceWalk = randomWalk(x1, y1, 10);
                pieceEnd = pieceWalk[pieceWalk.length - 1];
                renderWalk(pieceWalk);
                x1 = pieceEnd[0];
                y1 = pieceEnd[1];

              }

              context.globalAlpha = 1;

            }

        }
    };

render();
canvas.onclick = render;

}(d3));