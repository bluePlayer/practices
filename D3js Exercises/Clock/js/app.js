(function (jq, d3) {'use strict';
    var width = 400, height = 200,
        offSetX = 150, offSetY = 100,
        pi = Math.PI,
        scaleSecs = d3.scale.linear().domain([0, (59 + (999 / 1000))]).range([0, (2 * pi)]),
        scaleMins = d3.scale.linear().domain([0, (59 + (59 / 60))]).range([0, (2 * pi)]),
        scaleHours = d3.scale.linear().domain([0, (11 + (59 / 60))]).range([0, (2 * pi)]),
        vis = null, clockGroup = null,

        fields = function generate() {
            var currentTime = 0,
                hour = 0, minute = 0, second = 0,
                data = null;

            currentTime = new Date();
            second = currentTime.getSeconds();
            minute = currentTime.getMinutes();
            hour = currentTime.getHours() + minute / 60;

            data = [
                {
                    "unit": "seconds",
                    "numeric": second
                }, {
                    "unit": "minutes",
                    "numeric": minute
                }, {
                    "unit": "hours",
                    "numeric": hour
                }
            ];

            return data;
        },

        render = function(data) {
            var hourArc = null,
                minuteArc = null,
                secondArc = null;

            jq('#chart > svg').remove();

            vis = d3.selectAll("#chart")
                .append("svg:svg")
                .attr("width", width)
                .attr("height", height);

            clockGroup = vis.append("svg:g")
                .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

            clockGroup.append("svg:circle")
                .attr("r", 80).attr("fill", "none")
                .attr("class", "clock outercircle")
                .attr("stroke", "black")
                .attr("stroke-width", 2);

            clockGroup.append("svg:circle")
                .attr("r", 4)
                .attr("fill", "black")
                .attr("class", "clock innercircle");

            clockGroup.selectAll("#clockhand").remove();

            secondArc = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(70)
                .startAngle(function(d) {
                    return scaleSecs(d.numeric);
                })
                .endAngle(function(d) {
                    return scaleSecs(d.numeric);
                });

            minuteArc = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(70)
                .startAngle(function(d) {
                    return scaleMins(d.numeric);
                })
                .endAngle(function(d) {
                    return scaleMins(d.numeric);
                });

            hourArc = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(50)
                .startAngle(function(d) {
                    return scaleHours(d.numeric % 12);
                })
                .endAngle(function(d) {
                    return scaleHours(d.numeric % 12);
                });

            clockGroup.selectAll("#clockhand")
                .data(data)
                .enter()
                .append("svg:path")
                .attr("d", function(d) {
                    var result = null;

                    if (d.unit === "seconds") {
                        result = secondArc(d);
                    } else if (d.unit === "minutes") {
                        result = minuteArc(d);
                    } else if (d.unit === "hours") {
                        result = hourArc(d);
                    }

                    return result;
                })
                .attr("class", "clockhand")
                .attr("stroke", "black")
                .attr("stroke-width", function(d) {
                    var result = null;

                    if (d.unit === "seconds") {
                        result = 2;
                    } else if (d.unit === "minutes") {
                        result = 3;
                    } else if (d.unit === "hours") {
                        result = 3;
                    }

                    return result;
                })
                .attr("fill", "none");
        };

setInterval(function() {
  var data;
  data = fields();
  return render(data);
}, 1000);

}($, d3));
