/**
 * @see https://bl.ocks.org/kerryrodden/7090426
 * @param {Object} d3
 */
window.SequenceSunburst = window.SequenceSunburst || (function(d3) {
    'use strict';

    // Dimensions of sunburst.
    var self = null,
        csvUrl = "visit-sequences.csv",
        width = 750,
        height = 600,
        radius = (Math.min(width, height) / 2),
        nodes = [],
        currentNode = null,

        // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
        b = {
            w: 75,
            h: 30,
            s: 3,
            t: 10
        },
        
        // Dimensions of legend item: width, height, spacing, radius of rounded rect.
        li = {
            w: 75,
            h: 30,
            s: 3,
            r: 3
        },
        
        root = {
            "name": "root",
            "children": []
        },

        // Mapping of step names to colors.
        colors = {
            "home": "#5687d1",
            "product": "#7b615c",
            "search": "#de783b",
            "account": "#6ab975",
            "other": "#a173d1",
            "end": "#bbbbbb"
        },

        // Total size of all segments; we set this later, after loading the data.
        totalSize = 0,

        vis = d3.select("#chart").append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),

        partition = d3.layout.partition()
            .size([2 * Math.PI, radius * radius])
            .value(function(d) {
                return d.size;
            }),

        arc = d3.svg.arc()
            .startAngle(function(d) {
                return d.x;
            })
            .endAngle(function(d) {
                return d.x + d.dx;
            })
            .innerRadius(function(d) {
                return Math.sqrt(d.y);
            })
            .outerRadius(function(d) {
                return Math.sqrt(d.y + d.dy);
            }),
        // Add the svg area.
        sequence = d3.select("#sequence")
            .append("svg:svg")
            .attr("width", width)
            .attr("height", 50)
            .attr("id", "trail"),
        
        legend = null,
        legendGr = null;

    return {
        /**
         * Main function to draw and set up the visualization, once we have the data.
         */
        createVisualization: function (json) {
            var path = null;
            // Basic setup of page elements.
            self.initializeBreadcrumbTrail();
            self.drawLegend();
            d3.select("#togglelegend").on("click", self.toggleLegend);

            // Bounding circle underneath the sunburst, to make it easier to detect
            // when the mouse leaves the parent g.
            vis.append("svg:circle")
                .attr("r", radius)
                .style("opacity", 0);

            // For efficiency, filter nodes to keep only those large enough to see.
            nodes = partition.nodes(json)
                .filter(function(d) {
                    return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                });

            path = vis.data([json]).selectAll("path")
                .data(nodes)
                .enter().append("svg:path")
                .attr("display", function(d) {
                    return d.depth ? null : "none";
                })
                .attr("d", arc)
                .attr("fill-rule", "evenodd")
                .style("fill", function(d) {
                    return colors[d.name];
                })
                .style("opacity", 1)
                .on("mouseover", self.mouseover);

            // Add the mouseleave handler to the bounding circle.
            d3.select("#container").on("mouseleave", self.mouseleave);

            // Get total size of the tree = value of root node from partition.
            totalSize = path.node().__data__.value;
        },
        /**
         * Fade all but the current sequence, and show it in the breadcrumb trail.
         */
        mouseover: function (d) {
            var percentage = (100 * d.value / totalSize).toPrecision(3),
                percentageString = percentage + "%",
                sequenceArray = [];
                
            if (percentage < 0.1) {
                percentageString = "< 0.1%";
            }

            d3.select("#percentage")
                .text(percentageString);

            d3.select("#explanation")
                .style("visibility", "");

            sequenceArray = self.getAncestors(d);
            self.updateBreadcrumbs(sequenceArray, percentageString);

            // Fade all the segments.
            d3.selectAll("path")
                .style("opacity", 0.3);

            // Then highlight only those that are an ancestor of the current segment.
            vis.selectAll("path")
                .filter(function(node) {
                    return (sequenceArray.indexOf(node) >= 0);
                })
                .style("opacity", 1);
        },
        /**
         * Restore everything to full opacity when moving off the visualization.
         */
        mouseleave: function (d) {

            // Hide the breadcrumb trail
            d3.select("#trail")
                .style("visibility", "hidden");

            // Deactivate all segments during transition.
            d3.selectAll("path").on("mouseover", null);

            // Transition each segment to full opacity and then reactivate it.
            d3.selectAll("path")
                .transition()
                .duration(1000)
                .style("opacity", 1)
                .each("end", function() {
                    d3.select(this).on("mouseover", self.mouseover);
                });

            d3.select("#explanation")
                .style("visibility", "hidden");
        },
        /**
         * Given a node in a partition layout, return an array of all of its ancestor
         * nodes, highest first, but excluding the root.
         */
        getAncestors: function (node) {
            var path = [],
                current = node;
            
            while (current.parent) {
                path.unshift(current);
                current = current.parent;
            }
            
            return path;
        },
    
        initializeBreadcrumbTrail: function () {
            // Add the label at the end, for the percentage.
            sequence.append("svg:text")
                .attr("id", "endlabel")
                .style("fill", "#000");
        },
        /**
         * Generate a string that describes the points of a breadcrumb polygon.
         */
        breadcrumbPoints: function (d, i) {
            var points = [];
            
            points.push("0,0");
            points.push(b.w + ",0");
            points.push(b.w + b.t + "," + (b.h / 2));
            points.push(b.w + "," + b.h);
            points.push("0," + b.h);
            
            if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                points.push(b.t + "," + (b.h / 2));
            }
            
            return points.join(" ");
        },
    
        /**
         * Update the breadcrumb trail to show the current sequence and percentage.
         */
        updateBreadcrumbs: function (nodeArray, percentageString) {
            // Data join; key function combines name and depth (= position in sequence).
            var trail = d3.select("#trail")
                .selectAll("g")
                .data(nodeArray, function(d) {
                    return d.name + d.depth;
                }),

                // Add breadcrumb and label for entering nodes.
                entering = trail.enter().append("svg:g");

            entering.append("svg:polygon")
                .attr("points", self.breadcrumbPoints)
                .style("fill", function(d) {
                    return colors[d.name];
                });

            entering.append("svg:text")
                .attr("x", (b.w + b.t) / 2)
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function(d) {
                    return d.name;
                });

            // Set position for entering and updating nodes.
            trail.attr("transform", function(d, i) {
                return "translate(" + i * (b.w + b.s) + ", 0)";
            });

            // Remove exiting nodes.
            trail.exit().remove();

            // Now move and update the percentage at the end.
            d3.select("#trail").select("#endlabel")
                .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(percentageString);

            // Make the breadcrumb trail visible, if it's hidden.
            d3.select("#trail")
                .style("visibility", "");

        },
    
        /**
         * Take a 2-column CSV and transform it into a hierarchical structure suitable
         * for a partition layout. The first column is a sequence of step names, from
         * root to leaf, separated by hyphens. The second column is a count of how 
         * often that sequence occurred.
         */
        buildHierarchy: function (csv) {
            var sequence = [],
                size = 0,
                i = 0, j = 0, k = 0,
                parts = null,
                children = null,
                nodeName = "",
                childNode = null,
                foundChild = true;
                
            for (i = 0; i < csv.length; i += 1) {
                sequence = csv[i][0];
                size = +csv[i][1];
                
                if (isNaN(size)) { // e.g. if this is a header row
                    continue;
                }
                
                parts = sequence.split("-");
                currentNode = root;
                
                for (j = 0; j < parts.length; j += 1) {
                    
                    children = currentNode.children;
                    nodeName = parts[j];
                    
                    if (j + 1 < parts.length) {
                        // Not yet at the end of the sequence; move down the tree.
                        foundChild = false;
                        
                        for (k = 0; k < children.length; k += 1) {
                            if (children[k].name === nodeName) {
                                childNode = children[k];
                                foundChild = true;
                                break;
                            }
                        }
                        // If we don't already have a child node for this branch, create it.
                        if (!foundChild) {
                            childNode = {
                                "name": nodeName,
                                "children": []
                            };
                            
                            children.push(childNode);
                        }
                        
                        currentNode = childNode;
                    } else {
                        // Reached the end of the sequence; create a leaf node.
                        childNode = {
                            "name": nodeName,
                            "size": size
                        };
                        
                        children.push(childNode);
                    }
                }
            }

            return root;
        },
    
        toggleLegend: function () {
            legend = d3.select("#legend");
            
            if (legend.style("visibility") === "hidden") {
                legend.style("visibility", "");
            } else {
                legend.style("visibility", "hidden");
            }
        },
    
        drawLegend: function () {
            legend = d3.select("#legend").append("svg:svg")
                .attr("width", li.w)
                .attr("height", d3.keys(colors).length * (li.h + li.s));

            legendGr = legend.selectAll("g")
                .data(d3.entries(colors))
                .enter().append("svg:g")
                .attr("transform", function(d, i) {
                    return "translate(0," + i * (li.h + li.s) + ")";
                });

            legendGr.append("svg:rect")
                .attr("rx", li.r)
                .attr("ry", li.r)
                .attr("width", li.w)
                .attr("height", li.h)
                .style("fill", function(d) {
                    return d.value;
                });

            legendGr.append("svg:text")
                .attr("x", li.w / 2)
                .attr("y", li.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function(d) {
                    return d.key;
                });
        },
        
        run: function() {
            self = this;
            // Use d3.text and d3.csv.parseRows so that we do not need to have a header
            // row, and can receive the csv as an array of arrays.
            d3.text(csvUrl, function(text) {
                var csv = d3.csv.parseRows(text),
                    json = self.buildHierarchy(csv);
                console.dir(csv);
                self.createVisualization(json);
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var SequenceSunburst = window.SequenceSunburst;

    SequenceSunburst.run();
});