/**
 * @see http://bl.ocks.org/tomgp/6475678
 * @param {Object} jq
 * @param {Object} d3
 */
(function(jq, d3) {
    'use strict';
    var radians = 0.0174532925,
        clockRadius = 200,
        margin = 50,
        width = ((clockRadius + margin) * 2),
        height = ((clockRadius + margin) * 2),
        hourHandLength = (2 * (clockRadius / 3)),
        minuteHandLength = clockRadius,
        secondHandLength = (clockRadius - 12),
        secondHandBalance = 30,
        secondTickStart = clockRadius,
        secondTickLength = -10,
        hourTickStart = clockRadius,
        hourTickLength = -18,
        secondLabelRadius = (clockRadius + 16),
        secondLabelYOffset = 5,
        hourLabelRadius = (clockRadius - 40),
        hourLabelYOffset = 7,
        hourScale = d3.scale.linear()
        .range([0, 330])
        .domain([0, 11]),
        minuteScale = d3.scale.linear()
        .range([0, 354])
        .domain([0, 59]),
        secondScale = minuteScale,

        handData = [{
            type: 'hour',
            value: 0,
            length: -hourHandLength,
            scale: hourScale
        }, {
            type: 'minute',
            value: 0,
            length: -minuteHandLength,
            scale: minuteScale
        }, {
            type: 'second',
            value: 0,
            length: -secondHandLength,
            scale: secondScale,
            balance: secondHandBalance
        }],

        updateData = function() {
            var t = new Date();

            handData[0].value = ((t.getHours() % 12) + (t.getMinutes() / 60));
            handData[1].value = t.getMinutes();
            handData[2].value = t.getSeconds();
        },

        drawClock = function() { //create all the clock elements
            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height),
                hands = null,
                face = svg.append('g')
                .attr('id', 'clock-face')
                .attr('transform', 'translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

            updateData(); //draw them in the correct starting position
            //add marks for seconds
            face.selectAll('.second-tick')
                .data(d3.range(0, 60)).enter()
                .append('line')
                .attr('class', 'second-tick')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', secondTickStart)
                .attr('y2', (secondTickStart + secondTickLength))
                .attr('transform', function(d) {
                    return 'rotate(' + secondScale(d) + ')';
                });
            //and labels

            face.selectAll('.second-label')
                .data(d3.range(5, 61, 5))
                .enter()
                .append('text')
                .attr('class', 'second-label')
                .attr('text-anchor', 'middle')
                .attr('x', function(d) {
                    return (secondLabelRadius * Math.sin(secondScale(d) * radians));
                })
                .attr('y', function(d) {
                    return ((-secondLabelRadius * Math.cos(secondScale(d) * radians)) + secondLabelYOffset);
                })
                .text(function(d) {
                    return d;
                });

            //... and hours
            face.selectAll('.hour-tick')
                .data(d3.range(0, 12)).enter()
                .append('line')
                .attr('class', 'hour-tick')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', hourTickStart)
                .attr('y2', (hourTickStart + hourTickLength))
                .attr('transform', function(d) {
                    return 'rotate(' + hourScale(d) + ')';
                });

            face.selectAll('.hour-label')
                .data(d3.range(3, 13, 3))
                .enter()
                .append('text')
                .attr('class', 'hour-label')
                .attr('text-anchor', 'middle')
                .attr('x', function(d) {
                    return (hourLabelRadius * Math.sin(hourScale(d) * radians));
                })
                .attr('y', function(d) {
                    return ((-hourLabelRadius * Math.cos(hourScale(d) * radians)) + hourLabelYOffset);
                })
                .text(function(d) {
                    return d;
                });

            hands = face.append('g').attr('id', 'clock-hands');

            face.append('g').attr('id', 'face-overlay')
                .append('circle').attr('class', 'hands-cover')
                .attr('x', 0)
                .attr('y', 0)
                .attr('r', (clockRadius / 20));

            hands.selectAll('line')
                .data(handData)
                .enter()
                .append('line')
                .attr('class', function(d) {
                    return (d.type + '-hand');
                })
                .attr('x1', 0)
                .attr('y1', function(d) {
                    return (d.balance ? true : 0);
                })
                .attr('x2', 0)
                .attr('y2', function(d) {
                    return d.length;
                })
                .attr('transform', function(d) {
                    return 'rotate(' + d.scale(d.value) + ')';
                });
        },

        moveHands = function() {
            d3.select('#clock-hands').selectAll('line')
                .data(handData)
                .transition()
                .attr('transform', function(d) {
                    return 'rotate(' + d.scale(d.value) + ')';
                });
        };

    drawClock();

    setInterval(function() {
        updateData();
        moveHands();
    }, 1000);

}($, d3));