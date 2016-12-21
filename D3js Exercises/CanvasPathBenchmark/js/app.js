/**
 * @see http://bl.ocks.org/GerHobbelt/3331937
 * @param {Object} d3
 */
window.CanvasPathBenchmark = window.CanvasPathBenchmark || (function(windowObject) {
    'use strict';
    
    var self = null,
        user_agent = document.getElementById("user-agent"),
        canvas = document.getElementById("canvas"),
        results = document.getElementById("results"),
        half_width = 0,
        half_height = 0,
        xpos = 0,
        ypos = 0,
        ctx = canvas.getContext('2d'),
        i = 0,
        j = 0,
        factor = 15,
        factor_div_2 = (factor / 2),
        correction = 0.0035,
        maxSeconds = 5000,

        table_row = null,
        table_data = null,
        increment = 250,
        count = 0,
        elapsed_time = 0,
        sample_time = 0,
        sample_start = 0,
        sample_end = 0,

        requestAnimFrame = (function () {
            return (windowObject.requestAnimationFrame ||
                windowObject.webkitRequestAnimationFrame ||
                windowObject.mozRequestAnimationFrame ||
                windowObject.oRequestAnimationFrame ||
                windowObject.msRequestAnimationFrame ||
                self.frameRequest);
        }()),
        
        cancelRequestAnimFrame = (function () {
            return (windowObject.cancelCancelRequestAnimationFrame ||
                windowObject.webkitCancelRequestAnimationFrame ||
                windowObject.mozCancelRequestAnimationFrame ||
                windowObject.oCancelRequestAnimationFrame ||
                windowObject.msCancelRequestAnimationFrame ||
                windowObject.clearTimeout);
        }());

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    user_agent.innerHTML = navigator.userAgent;

    half_width = (canvas.width / 2);
    half_height = (canvas.height / 2);

    xpos = half_width;
    ypos = half_height;

    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,65,0, 1.0)";

    return {
        /**
         * @param frameRequestCallback {Function}
         * @param DOMElement Element {Object}
         */
        frameRequest: function (callback, element) {
            return windowObject.setTimeout(callback, (1000 / 60));
        },
        
        addLineSegments: function (num) {
            for (i = 0; i < num; i += 1) {
                ctx.beginPath();
                ctx.moveTo(xpos, ypos);
                xpos += (factor * Math.random() - factor_div_2) + (half_width - xpos) * correction;
                ypos += (factor * Math.random() - factor_div_2) + (half_height - ypos) * correction;
                ctx.lineTo(xpos, ypos);
                ctx.closePath();
                ctx.stroke();
            }
        },
        
        addToResults: function (samples, elapsed_time, sample_time) {
            table_row = document.createElement('tr');
            table_data = document.createElement('td');
            table_data.innerHTML = samples;
            table_row.appendChild(table_data);
            table_data = document.createElement('td');
            table_data.innerHTML = elapsed_time;
            table_row.appendChild(table_data);
            table_data = document.createElement('td');
            table_data.innerHTML = sample_time;
            table_row.appendChild(table_data);
            results.appendChild(table_row);
        },

        benchmark: function () {
            if (count < maxSeconds) {
                requestAnimFrame(self.benchmark, canvas);
                self.runSet();
            }
        },

        runSet: function () {
            sample_start = +new Date();
            self.addLineSegments(increment);
            sample_end = +new Date();
            sample_time = sample_end - sample_start;
            elapsed_time += sample_time;
            count += increment;
            self.addToResults(count, elapsed_time, sample_time);
        },
        
        clear: function () {
            count = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            while (results.firstChild) {
                results.removeChild(results.firstChild);
            }
        },
        
        init: function () {
            self = this;
            self.run();
        },

        run: function () {
            requestAnimFrame(self.benchmark, canvas);
            self.clear();
        }
    };

}(window));

window.document.addEventListener("DOMContentLoaded", function (event) {
    'use strict';
    var CanvasPathBenchmark = window.CanvasPathBenchmark;

    CanvasPathBenchmark.init();
});