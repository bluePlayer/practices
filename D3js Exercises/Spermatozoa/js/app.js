/**
 * @see http://bl.ocks.org/mbostock/1136236
 * @param {Object} d3
 */
window.Spermatozoa = window.Spermatozoa || (function(d3) {
    'use strict';

    var width = 960,
        height = 500,
        n = 10,
        m = 12,
        delay = 0,
        time = Date.now(),
        factor = 300,
        degrees = (180 / Math.PI),
        ellipseRx = 6.5,
        ellipseRy = 4,
        tailSpeed = 10,
        tailLength = -5,

        i = 0,
        j = 0,
        dx = 0,
        dy = 0,
        x = 0,
        y = 0,
        speed = 0,
        count = 0,
        k1 = 0,
        k2 = 0,
        vx = 0,
        vy = 0,
        
        spermatozoon = null,
        path = null,
        self = null,

        spermatozoa = d3.range(n).map(function () {
            var spx = Math.random() * width,
                spy = Math.random() * height;

            return {
                vx: ((Math.random() * 2) - 1),
                vy: ((Math.random() * 2) - 1),
                path: d3.range(m).map(function () {
                    return [spx, spy];
                }),
                count: 0
            };
        }),

        svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height),

        g = svg.selectAll("g")
            .data(spermatozoa)
            .enter()
            .append("g"),

        head = g.append("ellipse")
            .attr("rx", ellipseRx)
            .attr("ry", ellipseRy),

        tail = null;

    g.append("path")
        .datum(function (d) {
            return d.path.slice(0, 3);
        })
        .attr("class", "mid");

    g.append("path")
        .datum(function (d) {
            return d.path;
        })
        .attr("class", "tail");

    tail = g.selectAll("path");

    return {
        headTransform: function (d) {
            return "translate(" + d.path[0] + ")rotate(" + (Math.atan2(d.vy, d.vx) * degrees) + ")";
        },

        tailPath: function (d) {
            return "M" + d.join("L");
        },

        tick: function () {
            for (i = 0; i < n; i += 1) {
                spermatozoon = spermatozoa[i];
                path = spermatozoon.path;
                
                dx = spermatozoon.vx;
                dy = spermatozoon.vy;
                
                x = (path[0][0] += dx);
                y = (path[0][1] += dy);
                
                speed = Math.sqrt((dx * dx) + (dy * dy));
                count = (speed * tailSpeed);
                k1 = (tailLength - (speed / 3));

                // Bounce off the walls.
                if ((x < 0) || (x > width)) {
                    spermatozoon.vx *= -1;
                }

                if ((y < 0) || (y > height)) {
                    spermatozoon.vy *= -1;
                }

                // Swim!
                for (j = 1; j < m; j += 1) {
                    vx = (x - path[j][0]);
                    vy = (y - path[j][1]);
                    
                    spermatozoon.count += count;
                    k2 = (Math.sin((spermatozoon.count + (j * 3)) / factor) / speed);
                    
                    x += ((dx / speed) * k1);
                    y += ((dy / speed) * k1);
                    
                    path[j][0] = x - (dy * k2);
                    path[j][1] = y + (dx * k2);
                    
                    dx = vx;
                    dy = vy;
                    
                    speed = Math.sqrt((dx * dx) + (dy * dy));
                }
            }

            head.attr("transform", self.headTransform);
            tail.attr("d", self.tailPath);
        },

        run: function() {
            self = this;

            d3.timer(self.tick, delay, time);
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var Spermatozoa = window.Spermatozoa;

    Spermatozoa.run();
});