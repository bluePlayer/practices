/**
 * @see http://bl.ocks.org/nbremer/864b11eb83aac3a1f6a2
 * @param {Object} d3
 */
window.ChordDiagramStep4 = window.ChordDiagramStep4 || (function (d3Utils, d3, jq) {
        'use strict';

        var self = null,

            margin = {
                left : 90,
                top : 90,
                right : 90,
                bottom : 90
            },

            width = Math.min(window.innerWidth, 700) - margin.left - margin.right,
            height = Math.min(window.innerWidth, 700) - margin.top - margin.bottom,
            innerRadius = Math.min(width, height) * 0.39,
            outerRadius = innerRadius * 1.1,

            Names = ["Black Widow", "Captain America", "Hawkeye", "the Hulk", "Iron Man", "Thor"],
            colorSet = ["#301E1E", "#083E77", "#342350", "#567235", "#8B161C", "#DF7C00"],
            opacityDefault = 0.8,

            total = 10000,
            values = [1200, 3400, 400, 2500, 2000, 500],

            matrix = [
                [0, 4, 3, 2, 5, 2], //Black Widow
                [4, 0, 3, 2, 4, 3], //Captain America
                [3, 3, 0, 2, 3, 3], //Hawkeye
                [2, 2, 2, 0, 3, 3], //The Hulk
                [5, 4, 3, 3, 0, 2], //Iron Man
                [2, 3, 3, 3, 2, 0] //Thor
            ],
            // Create scale and layout functions
            colors = d3.scale
                .ordinal()
                .domain(d3.range(Names.length))
                .range(colorSet),

            chord = d3Utils.customChordLayout()
                .padding(0.15)
                .sortChords(d3.descending)
                .matrix(matrix),

            arc = d3.svg
                .arc()
                .innerRadius(innerRadius * 1.01)
                .outerRadius(outerRadius),

            path = d3.svg
                .chord()
                .radius(innerRadius),
            //Create SVG
            svg = d3.select("#chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")"),

            outerArcs = null,

            grads = null;

        return {
            /**
             * Function to create the unique id for each chord gradient
             */
            getGradID: function (d) {
                return ("linkGrad-" + d.source.index + "-" + d.target.index);
            },
            /**
             * Returns an event handler for fading a given chord group.
             * @param {Object} opacity
             */
            fade: function (opacity) {
                return function(d, i) {console.dir(d);console.log(i);
                    svg.selectAll("path.chord")
                        .filter(function(d) {
                            return ((d.source.index !== i) && (d.target.index !== i));
                        })
                        .transition()
                        .style("opacity", opacity);
                };
            },
            /**
             * Highlight hovered over arc
             * @param {Object} d
             */
            mouseoverArc: function (d, i) {
                var value = values[d.index];

                //Decrease opacity to all
                svg.selectAll("path.chord")
                    .filter(function(d) {
                            return ((d.source.index !== i) && (d.target.index !== i));
                    })
                    .transition()
                    .style("opacity", 0.1);

                //Show hovered over chord with full opacity
                d3.select(this)
                    //.filter(self.fade(0.1))
                    .transition()
                    .style("opacity", 1);

                console.dir(d);

                //Define and show the tooltip over the mouse location
                jq(this).popover({
                    placement: 'auto top',
                    container: 'body',
                    mouseOffset: 10,
                    followMouse: true,
                    trigger: 'hover',
                    html : true,
                    content: (function() {
                        return "<p style='font-size: 11px; text-align: center;'>Appeared in <span style='font-weight:900'>" + ((value * 100) / total) + "% </span> movies </p>";
                    }())
                });

                jq(this).popover('show');
            },//mouseoverArc
            /**
             * Highlight hovered over chord
             * @param {Object} d
             * @param {Object} i
             */
            mouseoverChord: function (d, i) {
                //Decrease opacity to all
                svg.selectAll("path.chord")
                    .transition()
                    .style("opacity", 0.1);
                //Show hovered over chord with full opacity
                d3.select(this)
                    .transition()
                    .style("opacity", 1);

                //Define and show the tooltip over the mouse location
                jq(this).popover({
                    placement: 'auto top',
                    container: 'body',
                    mouseOffset: 10,
                    followMouse: true,
                    trigger: 'hover',
                    html : true,
                    content: (function() {
                        return "<p style='font-size: 11px; text-align: center;'><span style='font-weight:900'>" + Names[d.source.index] +
                               "</span> and <span style='font-weight:900'>" + Names[d.target.index] +
                               "</span> appeared together in <span style='font-weight:900'>" + d.source.value + "</span> movies </p>";
                    }())
                });

                jq(this).popover('show');
            },//mouseoverChord
            /**
             * Bring all chords back to default opacity
             * @param {Object} d
             */
            mouseoutChord: function (d) {
                //Hide the tooltip
                jq('.popover').each(function() {
                    jq(this).remove();
                });
                //Set opacity back to default for all
                svg.selectAll("path.chord")
                    .transition()
                    .style("opacity", opacityDefault);
            },//function mouseoutChord

            run : function() {
                self = this;

                grads = svg.append("defs")
                    .selectAll("linearGradient")
                    .data(chord.chords())
                    .enter()
                    .append("linearGradient")
                    //Create the unique ID for this specific source-target pairing
                    .attr("id", self.getGradID)
                    .attr("gradientUnits", "userSpaceOnUse")
                    //Find the location where the source chord starts
                    .attr("x1", function (d, i) {
                            return innerRadius * Math.cos((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2);
                    })
                    .attr("y1", function (d, i) {
                        return innerRadius * Math.sin((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2);
                    })
                    //Find the location where the target chord starts
                    .attr("x2", function (d, i) {
                        return innerRadius * Math.cos((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2);
                    })
                    .attr("y2", function (d, i) {
                        return innerRadius * Math.sin((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2);
                    });

                //Set the starting color (at 0%)
                grads.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", function (d) {
                        return colors(d.source.index);
                });

                //Set the ending color (at 100%)
                grads.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", function (d) {
                        return colors(d.target.index);
                });

                // Draw outer Arcs
                outerArcs = svg.selectAll("g.group")
                    .data(chord.groups)
                    .enter()
                    .append("g")
                    .attr("class", "group")
                    .on("mouseover", self.mouseoverArc)
                    .on("mouseout", self.mouseoutChord);
                    //.on("mouseover", self.fade(0.1))
                    //.on("mouseout", self.fade(opacityDefault));

                outerArcs.append("path")
                    .style("fill", function(d) {
                        return colors(d.index);
                    })
                    .attr("d", arc);
                //Append the label names on the outside
                outerArcs.append("text")
                    .each(function(d) {
                        d.angle = (d.startAngle + d.endAngle) / 2;
                    })
                    .attr("dy", ".35em")
                    .attr("class", "titles")
                    .attr("text-anchor", function(d) {
                        return ((d.angle > Math.PI) ? "end" : null);
                    }).attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (outerRadius + 10) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
                    }).text(function(d, i) {
                        return Names[i];
                    });
                //Draw inner chords
                svg.selectAll("path.chord")
                    .data(chord.chords)
                    .enter()
                    .append("path")
                    .attr("class", "chord")
                    .style("fill", function(d) {
                        return "url(#" + self.getGradID(d) + ")";
                    })
                    .style("opacity", opacityDefault)
                    .attr("d", path)
                    .on("mouseover", self.mouseoverChord)
                    .on("mouseout", self.mouseoutChord);
            }
        };

    }(ChordDiagramUtils, d3, $));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var ChordDiagramStep4 = window.ChordDiagramStep4;

    ChordDiagramStep4.run();
});