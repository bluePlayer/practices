/**
 * @see http://bl.ocks.org/mbostock/582915
 * @param {Object} window
 * @param {Object} pv
 */
(function(window, jq, pv) {
    'use strict';

    var n = 20, // number of layers
        m = 400, // number of samples per layer
        w = window.innerWidth, //document.body.clientWidth,
        h = window.innerHeight, //document.body.clientHeight,
        x = pv.Scale.linear(0, m - 1).range(0, w),
        y = pv.Scale.linear(0, 2 * n).range(0, h),
        vis = new pv.Panel().width(w).height(h),

        layers = function (n, m) {
            var bump = function (a) {
                var i = 0,
                    w = 0,
                    x = 1 / (0.1 + Math.random()),
                    y = 2 * Math.random() - 0.5,
                    z = 10 / (0.1 + Math.random());

                for (i = 0; i < m; i += 1) {
                    w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            };

            return pv.range(n).map(function () {
                var a = [], i;

                for (i = 0; i < m; i += 1) {
                    a[i] = 0;
                }

                for (i = 0; i < 5; i += 1) {
                    bump(a);
                }

                return a;
            });
        },
        data = layers(n, m);//,

        /*
         * What is this function used for?
         waves = function (n, m) {
            return pv.range(n).map(function(i) {
                return pv.range(m).map(function(j) {
                    var x = 20 * j / m - i / 3;
                    return x > 0 ? 2 * x * Math.exp(-0.5 * x) : 0;
                });
            });
        };*/

    vis.add(pv.Layout.Stack)
        .layers(data)
        .order("inside-out")
        .offset("wiggle")
        .x(x.by(pv.index))
        .y(y)
        .layer.add(pv.Area)
        .fillStyle(pv.ramp("#aad", "#556").by(Math.random))
        .strokeStyle(function () {this.fillStyle().alpha(0.5);});

    vis.render();

    jq("#generateBtn").click(function (event) {
        data = layers(n, m);
        vis.add(pv.Layout.Stack)
            .layers(data)
            .order("inside-out")
            .offset("wiggle")
            .x(x.by(pv.index))
            .y(y)
            .layer.add(pv.Area)
            .fillStyle(pv.ramp("#aad", "#556").by(Math.random))
            .strokeStyle(function () {this.fillStyle().alpha(0.5);});
        vis.render();
    });

}(window, $, pv));