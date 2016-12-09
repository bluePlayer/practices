(function (jq, d3) {'use strict';
    function clickMe() {
        var chartdata = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
            135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410],
            margin = {top: 30, right: 10, bottom: 30, left: 50},
            height = 400 - margin.top - margin.bottom,
            width = 720 - margin.left - margin.right,
            barWidth = 40,
            barOffset = 20,
            yScale = d3.scale
                .linear()
                .domain([0, d3.max(chartdata)])
                .range([0, height]),
            xScale = d3.scale
                .ordinal()
                .domain(d3.range(0, chartdata.length))
                .rangeBands([0, width]),
            colors = d3.scale.linear()
                .domain([0, chartdata.length * 0.33, chartdata.length * 0.66, chartdata.length])
                .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1']),
            verticalGuideScale = null,
            vAxis = null,
            verticalGuide = null,
            hAxis = null,
            horizontalGuide = null,
            dynamicColor = null,
            graphic = null;

        jq('#bar-chart > svg').remove();

        graphic = d3.select("#bar-chart")
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background', '#bce8f1')
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
            .selectAll('rect')
            .data(chartdata)
            .enter()
            .append('rect')
            .style({
                'fill': function (data, i) {
                    return colors(i);
                },
                'stroke': '#31708f',
                'stroke-width': '5'
            })
            .attr('width', xScale.rangeBand())
            .attr('height', 0)
            .attr('x', function (data, i) {
                return xScale(i);
            })
            .attr('y', height)
            .on('mouseover', function (data) {
                dynamicColor = this.style.fill;
                d3.select(this).style('fill', '#3c763d');
            })
            .on('mouseout', function (data) {
                d3.select(this)
                    .style('fill', dynamicColor);
            });

        graphic.transition()
            .attr('height', function (data) {
                return yScale(data);
            })
            .attr('y', function (data) {
                return height - yScale(data);
            })
            .delay(function (data, i) {
                return i * 20;
            })
            .duration(2000)
            .ease('elastic');

        verticalGuideScale = d3.scale.linear()
            .domain([0, d3.max(chartdata)])
            .range([height, 0]);

        vAxis = d3.svg.axis()
            .scale(verticalGuideScale)
            .orient('left')
            .ticks(10);

        verticalGuide = d3.select('svg').append('g');
        vAxis(verticalGuide);
        verticalGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        verticalGuide.selectAll('path')
            .style({fill: 'none', stroke: "#3c763d"});
        verticalGuide.selectAll('line')
            .style({stroke: "#3c763d"});

        hAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .ticks(chartdata.length);

        horizontalGuide = d3.select('svg').append('g');
        hAxis(horizontalGuide);
        horizontalGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
        horizontalGuide.selectAll('path')
            .style({fill: 'none', stroke: "#3c763d"});
        horizontalGuide.selectAll('line')
            .style({stroke: "#3c763d"});
    }

    clickMe();

    jq('#generateBtn').click(clickMe);
}($, d3));
