/**
 * @see http://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
 * @param {Object} d3
 */
window.BrushAndZoom1 = window.BrushAndZoom1 || (function(d3) {
    'use strict';

    var self = null,
        csvUrl = "sp500.csv",
        svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 110, left: 40},
        margin2 = {top: 430, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom,

        parseDate = d3.timeParse("%b %Y"),

        x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]),

        xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y),

        focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),

        context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")"),

        area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.price); }),

        area2 = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x2(d.date); })
            .y0(height2)
            .y1(function(d) { return y2(d.price); }),

        zoom = null,
        brush = null;

    return {
        type: function (d) {
            d.date = parseDate(d.date);
            d.price = +d.price;

            return d;
        },

        brushed: function () {
            var s = d3.event.selection || x2.range();

            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") {
                return; // ignore brush-by-zoom
            }

            x.domain(s.map(x2.invert, x2));
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));
        },

        zoomed: function() {
            var t = d3.event.transform;

            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") {
                return; // ignore zoom-by-brush
            }

            x.domain(t.rescaleX(x2).domain());
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        },

        run: function () {
            self = this;

            zoom = d3.zoom()
                .scaleExtent([1, Infinity])
                .translateExtent([[0, 0], [width, height]])
                .extent([[0, 0], [width, height]])
                .on("zoom", self.zoomed);

            brush = d3.brushX()
                .extent([[0, 0], [width, height2]])
                .on("brush end", self.brushed);

            svg.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            d3.csv(csvUrl, self.type, function(error, data) {
                if (error) {
                    throw error;
                }

                x.domain(d3.extent(data, function(d) { return d.date; }));
                y.domain([0, d3.max(data, function(d) { return d.price; })]);
                x2.domain(x.domain());
                y2.domain(y.domain());

                focus.append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area);

                focus.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                focus.append("g")
                    .attr("class", "axis axis--y")
                    .call(yAxis);

                context.append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area2);

                context.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height2 + ")")
                    .call(xAxis2);

                context.append("g")
                    .attr("class", "brush")
                    .call(brush)
                    .call(brush.move, x.range());

                svg.append("rect")
                    .attr("class", "zoom")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .call(zoom);
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var BrushAndZoom1 = window.BrushAndZoom1;

    BrushAndZoom1.run();
});