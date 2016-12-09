/**
 * @see http://bl.ocks.org/mbostock/3074470
 * @param {Object} d3
 */
(function(d3) {
    'use strict';

    var width = 960,
        height = 500,
        svg = null;

    d3.json("heatmap.json", function(error, heatmap) {
        var dx = heatmap[0].length,
            dy = heatmap.length,
            /**
             * Fix the aspect ratio.
             * var ka = dy / dx, kb = height / width;
             * if (ka < kb) height = width * ka;
             * else width = height / ka;
             */
            x = d3.scale.linear()
                .domain([0, dx])
                .range([0, width]),

            y = d3.scale.linear()
                .domain([0, dy])
                .range([height, 0]),

            color = d3.scale.linear()
                .domain([95, 115, 135, 155, 175, 195])
                .range(["#0a0", "#6c0", "#ee0", "#eb4", "#eb9", "#fff"]),

            xAxis = d3.svg.axis()
                .scale(x)
                .orient("top")
                .ticks(20),

            yAxis = d3.svg.axis()
                .scale(y)
                .orient("right"),
            /**
             * Compute the pixel colors; scaled by CSS.
             */
            drawImage = function (canvas) {
                var context = canvas.node().getContext("2d"),
                    image = context.createImageData(dx, dy),
                    j = 0, i = 0, c = 0, p = 0;

                for (i = 0, p = -1; i < dy; i += 1) {
                    for (j = 0; j < dx; j += 1) {
                        c = d3.rgb(color(heatmap[i][j]));

                        p += 1;
                        image.data[p] = c.r;

                        p += 1;
                        image.data[p] = c.g;

                        p += 1;
                        image.data[p] = c.b;

                        p += 1;
                        image.data[p] = 255;
                    }
                }

                context.putImageData(image, 0, 0);
            },

            removeZero = function (axis) {
                axis.selectAll("g").filter(function(d) { return !d; }).remove();
            };

      if (error) {
          throw error;
      }

      d3.select("body").append("canvas")
          .attr("width", dx)
          .attr("height", dy)
          .style("width", width + "px")
          .style("height", height + "px")
          .call(drawImage);

      svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .call(removeZero);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .call(removeZero);
    });

}(d3));