/**
 * @see http://bl.ocks.org/tomgp/6475678
 * @param {Object} jq
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

var svg = d3.select("svg"),
    g = svg.select("g"),
    image = g.select("image"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    x0 = +image.attr("x"),
    y0 = +image.attr("y"),
    x1 = +image.attr("width") + x0,
    y1 = +image.attr("height") + y0,

    zoomed = function () {
        var t = d3.event.transform;

        if (t.invertX(0) > x0) {
            t.x = (-x0 * t.k);
        } else if (t.invertX(width) < x1) {
            t.x = (width - (x1 * t.k));
        }

        if (t.invertY(0) > y0) {
            t.y = (-y0 * t.k);
        } else if (t.invertY(height) < y1) {
            t.y = (height - (y1 * t.k));
        }

        g.attr("transform", t);
    },

    zoom = d3.zoom().on("zoom", zoomed);

svg.call(zoom);
zoom.scaleExtent([1, Math.min((width / (x1 - x0)), (height / (y1 - y0)))]);

}(d3));