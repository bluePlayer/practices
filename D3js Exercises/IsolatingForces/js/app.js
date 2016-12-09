/**
 * @see http://bl.ocks.org/tomgp/6475678
 * @param {Object} jq
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

var n = 20,
    canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,

    nodes = d3.range(n * n).map(function (i) {
        return {
            index: i,
            color: ((i < 200) ? "brown" : "steelblue")
        };
    }),

    isolate = function (force, filter) {
        var initialize = force.initialize;

        force.initialize = function () {
            initialize.call(force, nodes.filter(filter));
        };

        return force;
    },

    drawNode = function (d) {
        context.beginPath();
        context.moveTo((d.x + 3), d.y);
        context.arc(d.x, d.y, 3, 0, (2 * Math.PI));
        context.fillStyle = d.color;
        context.fill();
    },

    ticked = function () {
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate((width / 2), (height / 2));
        nodes.forEach(drawNode);
        context.restore();
    },

    simulation = d3.forceSimulation(nodes)
        .force("y", d3.forceY())
        .force("brown", isolate(d3.forceX(-width / 6), function (d) {
            return d.color === "brown";
        }))
        .force("steelblue", isolate(d3.forceX(width / 6), function (d) {
            return d.color === "steelblue";
        }))
        .force("charge", d3.forceManyBody().strength(-10))
        .on("tick", ticked);

}(d3));