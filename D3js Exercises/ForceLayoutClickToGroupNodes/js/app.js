/**
 * @see http://bl.ocks.org/GerHobbelt/3071239
 * @param {Object} d3
 */
window.ForceLayoutClickToGroupNodes = window.ForceLayoutClickToGroupNodes || (function(d3) {
    'use strict';

    var self = null,
        width = 960, // svg width
        height = 600, // svg height
        dr = 4, // default point radius
        off = 15, // cluster hull offset
        expand = {}, // expanded clusters
        data, net, force, hullg, hull, linkg, link, nodeg, node,

        curve = d3.svg.line()
            .interpolate("cardinal-closed")
            .tension(0.85),

        fill = d3.scale.category20(),
        hullset = [],
        body = d3.select("body"),

        vis = body.append("svg")
            .attr("width", width)
            .attr("height", height),

        request = null;

    return {

        noop: function() {
            return false;
        },

        nodeid: function(n) {
            return (n.size ? ("_g_" + n.group) : n.name);
        },

        linkid: function(l) {
            var u = self.nodeid(l.source),
                v = self.nodeid(l.target);

            return ((u < v) ? (u + "|" + v) : (v + "|" + u));
        },

        getGroup: function(n) {
            return n.group;
        },

        /**
         * constructs the network to visualize
         * @param {Object} data
         * @param {Object} prev
         * @param {Object} index
         * @param {Object} expand
         */
        network: function(data, prev, index, expand) {
            var k = 0,
                n = 0,
                i = 0,
                l = 0,
                e = 0,
                u = 0,
                v = 0,
                gm = {}, // group map
                nm = {}, // node map
                lm = {}, // link map
                gn = {}, // previous group nodes
                gc = {}, // previous group centroids
                nodes = [], // output nodes
                links = []; // output links

            expand = expand || {};

            // process previous nodes for reuse or centroid calculation
            if (prev) {
                prev.nodes.forEach(function(n) {
                    var i = index(n),
                        o;
                    if (n.size > 0) {
                        gn[i] = n;
                        n.size = 0;
                    } else {
                        if (!gc[i]) {
                            gc[i] = {
                                x: 0,
                                y: 0,
                                count: 0
                            };
                        }

                        o = gc[i];
                        o.x += n.x;
                        o.y += n.y;
                        o.count += 1;
                    }
                });
            }

            // determine nodes
            for (k = 0; k < data.nodes.length; k += 1) {
                n = data.nodes[k];
                i = index(n);

                if (gm[i]) {
                    l = gm[i];
                } else if (gn[i]) {
                    gm[i] = gn[i];
                    l = gm[i];
                } else {
                    gm[i] = {
                        group: i,
                        size: 0,
                        nodes: []
                    };
                    l = gm[i];
                }

                if (expand[i]) {
                    // the node should be directly visible
                    nm[n.name] = nodes.length;
                    nodes.push(n);

                    if (gn[i]) {
                        // place new nodes at cluster location (plus jitter)
                        n.x = (gn[i].x + Math.random());
                        n.y = (gn[i].y + Math.random());
                    }

                } else {
                    // the node is part of a collapsed cluster
                    if (l.size === 0) {
                        // if new cluster, add to set and position at centroid of leaf nodes
                        nm[i] = nodes.length;
                        nodes.push(l);

                        if (gc[i]) {
                            l.x = (gc[i].x / gc[i].count);
                            l.y = (gc[i].y / gc[i].count);
                        }
                    }

                    l.nodes.push(n);
                }
                // always count group size as we also use it to tweak the force graph strengths/distances
                l.size += 1;
                n.group_data = l;
            }

            for (i in gm) {
                if (gm.hasOwnProperty(i)) {
                    gm[i].link_count = 0;
                }
            }

            // determine links
            for (k = 0; k < data.links.length; k += 1) {
                e = data.links[k];
                u = index(e.source);
                v = index(e.target);

                if (u !== v) {
                    gm[u].link_count += 1;
                    gm[v].link_count += 1;
                }

                u = expand[u] ? nm[e.source.name] : nm[u];
                v = expand[v] ? nm[e.target.name] : nm[v];
                i = ((u < v) ? (u + "|" + v) : (v + "|" + u));

                if (lm[i]) {
                    l = lm[i];
                } else {
                    lm[i] = {
                        source: u,
                        target: v,
                        size: 0
                    };
                    l = lm[i];
                }

                l.size += 1;
            }

            for (i in lm) {
                if (lm.hasOwnProperty(i)) {
                    links.push(lm[i]);
                }
            }

            return {
                nodes: nodes,
                links: links
            };
        },

        convexHulls: function(nodes, index, offset) {
            var hulls = {},
                k = 0,
                n = 0,
                i = 0,
                l = 0;

            // create point sets
            for (k = 0; k < nodes.length; k += 1) {
                n = nodes[k];

                if (!n.size) {
                    i = index(n);

                    if (hulls[i]) {
                        l = hulls[i];
                    } else {
                        hulls[i] = [];
                        l = hulls[i];
                    }

                    l.push([n.x - offset, n.y - offset]);
                    l.push([n.x - offset, n.y + offset]);
                    l.push([n.x + offset, n.y - offset]);
                    l.push([n.x + offset, n.y + offset]);
                }
            }

            // create convex hulls
            hullset = [];

            for (i in hulls) {
                if (hulls.hasOwnProperty(i)) {
                    hullset.push({
                        group: i,
                        path: d3.geom.hull(hulls[i])
                    });
                }
            }

            return hullset;
        },

        drawCluster: function(d) {
            return curve(d.path); // 0.8
        },

        init: function() {

            if (force) {
                force.stop();
            }

            net = this.network(data, net, this.getGroup, expand);

            force = d3.layout.force()
                .nodes(net.nodes)
                .links(net.links)
                .size([width, height])
                .linkDistance(function(l, i) {
                    var n1 = l.source,
                        n2 = l.target;

                    /**
                     * larger distance for bigger groups:
                     * both between single nodes and _other_ groups (where size of own node group still counts),
                     * and between two group nodes.
                     * reduce distance for groups with very few outer links,
                     * again both in expanded and grouped form, i.e. between individual nodes of a group and
                     * nodes of another group or other group node or between two group nodes.
                     * The latter was done to keep the single-link groups ('blue', rose, ...) close.
                     */
                    return 30 +
                        Math.min(20 * Math.min((n1.size || (n1.group !== n2.group ? n1.group_data.size : 0)),
                                (n2.size || (n1.group !== n2.group ? n2.group_data.size : 0))), -30 +
                            30 * Math.min((n1.link_count || (n1.group !== n2.group ? n1.group_data.link_count : 0)),
                                (n2.link_count || (n1.group !== n2.group ? n2.group_data.link_count : 0))),
                            100);
                    //return 150;
                })
                .linkStrength(function(l, i) {
                    return 1;
                })
                .gravity(0.05) // gravity + charge tweaked to ensure good 'grouped' view (e.g. green group not smack between blue&orange, ...
                .charge(-600) // ... charge is important to turn single-linked groups to the outside
                .friction(0.5) // friction adjusted to get dampened display: less bouncy bouncy ball [Swedish Chef, anyone?]
                .start();

            hullg.selectAll("path.hull").remove();
            hull = hullg.selectAll("path.hull")
                .data(this.convexHulls(net.nodes, this.getGroup, off))
                .enter().append("path")
                .attr("class", "hull")
                .attr("d", this.drawCluster)
                .style("fill", function(d) {
                    return fill(d.group);
                })
                .on("click", function(d) {
                    console.log("hull click", d, arguments, self, expand[d.group]);
                    expand[d.group] = false;
                    self.init();
                });

            link = linkg.selectAll("line.link").data(net.links, this.linkid);
            link.exit().remove();
            link.enter().append("line")
                .attr("class", "link")
                .attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                })
                .style("stroke-width", function(d) {
                    return d.size || 1;
                });

            node = nodeg.selectAll("circle.node").data(net.nodes, this.nodeid);
            node.exit().remove();
            node.enter().append("circle")
                // if (d.size) -- d.size > 0 when d is a group node.
                .attr("class", function(d) {
                    return "node" + (d.size ? "" : " leaf");
                })
                .attr("r", function(d) {
                    return d.size ? d.size + dr : dr + 1;
                })
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
                .style("fill", function(d) {
                    return fill(d.group);
                })
                .on("click", function(d) {
                    console.log("node click", d, arguments, self, expand[d.group]);
                    expand[d.group] = !expand[d.group];
                    self.init();
                });

            node.call(force.drag);

            force.on("tick", function() {
                if (!hull.empty()) {
                    hull.data(self.convexHulls(net.nodes, self.getGroup, off))
                        .attr("d", self.drawCluster);
                }

                link.attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });

                node.attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    });
            });
        },

        run: function () {
            self = this;

            request = d3.json("miserables.json", function(json) {
                var o = null,
                    i = 0;

                data = json;

                for (i = 0; i < data.links.length; i += 1) {
                    o = data.links[i];
                    o.source = data.nodes[o.source];
                    o.target = data.nodes[o.target];
                }

                hullg = vis.append("g");
                linkg = vis.append("g");
                nodeg = vis.append("g");

                self.init();

                vis.attr("opacity", 1e-6)
                    .transition()
                    .duration(1000)
                    .attr("opacity", 1);
            });

            console.dir(request);
        }
    };

}(d3));

window.document.addEventListener("DOMContentLoaded", function (event) {'use strict';
    var ForceLayoutClickToGroupNodes = window.ForceLayoutClickToGroupNodes;

    ForceLayoutClickToGroupNodes.run();
});