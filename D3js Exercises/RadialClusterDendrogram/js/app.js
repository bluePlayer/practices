/**
 * @see http://bl.ocks.org/mbostock/4339607
 * @param {Object} d3
 */
window.RadialClusterDendrogram = window.RadialClusterDendrogram || (function(d3) {
    'use strict';

    var self = null,
        csvUrl = "flare.csv",
        svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        
        g = svg.append("g")
            .attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")"),

        stratify = d3.stratify()
            .parentId(function(d) { 
                return d.id.substring(0, d.id.lastIndexOf(".")); 
            }),

        tree = d3.cluster()
            .size([360, 390])
            .separation(function(a, b) { 
                return (a.parent == b.parent ? 1 : 2) / a.depth; 
            }),
            
        root = null,
        link = null,
        node = null;

    return {
        project: function (x, y) {
            var angle = (x - 90) / 180 * Math.PI, radius = y;
            return [radius * Math.cos(angle), radius * Math.sin(angle)];
        },
        
        run: function () {
            self = this;
            
            d3.csv(csvUrl, function(error, data) {
                if (error) {
                    throw error;
                }

                root = tree(stratify(data)
                    .sort(function(a, b) { 
                        return (a.height - b.height) || a.id.localeCompare(b.id); 
                    }));

                link = g.selectAll(".link")
                    .data(root.descendants().slice(1))
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        return "M" + self.project(d.x, d.y)
                            + "C" + self.project(d.x, (d.y + d.parent.y) / 2)
                            + " " + self.project(d.parent.x, (d.y + d.parent.y) / 2)
                            + " " + self.project(d.parent.x, d.parent.y);
                    });

                node = g.selectAll(".node")
                    .data(root.descendants())
                    .enter().append("g")
                    .attr("class", function(d) { 
                        return "node" + (d.children ? " node--internal" : " node--leaf"); 
                    })
                    .attr("transform", function(d) { 
                        return "translate(" + self.project(d.x, d.y) + ")"; 
                    });

                node.append("circle")
                    .attr("r", 2.5);

                node.append("text")
                    .attr("dy", ".31em")
                    .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
                    .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
                    .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
                    .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
            });
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var RadialClusterDendrogram = window.RadialClusterDendrogram;

    RadialClusterDendrogram.run();
});