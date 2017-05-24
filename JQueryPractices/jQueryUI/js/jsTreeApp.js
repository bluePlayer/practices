/**
 * @author vlado
 */
var jsTreeApp = (function (jq) {'use strict';
    var jsTree = null;

    return {
        pageReady: function () {
            jsTree = jq('#jstree_demo_div').jstree({
                'core' : {
                    'data' : [
                        'Simple root node', {
                             'text' : 'Root node 2',
                             'state' : {
                               'opened' : true,
                               'selected' : true
                             },
                             'children' : [
                               { 'text' : 'Child 1' },
                               'Child 2'
                             ]
                        },
                        {
                            'text': 'DZS',
                            'state' : {
                                'oppened' : true,
                                'selected': false
                            },
                            'children' : [
                                {'text' : 'Одделение за ИТ'},
                                {'text' : 'Одделение за Метаподатоци'},
                                {'text' : 'Одделение за Математика'},
                                {'text' : 'Одделение за собирање податоци'}
                            ]
                        }
                    ]
                }
            });

            jsTree.on('init.jstree', function (e, data) {
                console.log("Initializing tree...");
            });

            jsTree.on('loading.jstree', function (e, data) {
                console.log("Loading tree...");
            });

            jsTree.on('loaded.jstree', function (e, data) {
                console.log("Tree loaded...");
            });

            jsTree.on('ready.jstree', function (e, data) {
                console.log("Tree ready...");
            });

            jsTree.on('load_node.jstree', function (node, status) {
                console.log("Node loaded...");
                //console.dir(node);
                //console.dir(status);
            });

            jsTree.on('load_all.jstree', function (node) {
                console.log("All nodes loaded...");
                //console.dir(node);
                //console.dir(status);
            });

            jsTree.on('model.jstree', function (nodes, parent) {
                console.log("New model inserted...");
            });

            jsTree.on('redraw.jstree', function (nodes) {
                console.log("Tree redrawn...");
            });

            jsTree.on('before_open.jstree', function (node) {
                console.log("Before open node...");
                console.dir(node);
            });

            jsTree.on('open_node.jstree', function (node) {
                console.log("Open node...");
                //console.dir(node);
            });

            jsTree.on('after_open.jstree', function (node) {
                console.log("After open node...");
                //console.dir(node);
            });

            jsTree.on('close_node.jstree', function (node) {
                console.log("Close node...");
                //console.dir(node);
            });

            jsTree.on('after_close.jstree', function (node) {
                console.log("After close node...");
                //console.dir(node);
            });

            jsTree.on('open_all.jstree', function (node) {
                console.log("Open all nodes...");
                //console.dir(node);
            });

            jsTree.on('close_all.jstree', function (node) {
                console.log("Close all nodes...");
                //console.dir(node);
            });

            jsTree.on('enable_node.jstree', function (node) {
                console.log("Node enabled...");
                //console.dir(node);
            });

            jsTree.on('disable_node.jstree', function (node) {
                console.log("Node disabled...");
                //console.dir(node);
            });

            jsTree.on('hide_node.jstree', function (node) {
                console.log("Node hidden...");
                //console.dir(node);
            });

            jsTree.on('show_node.jstree', function (node) {
                console.log("Node shown...");
                //console.dir(node);
            });

            jsTree.on('hide_all.jstree', function (nodes) {
                console.log("All nodes hidden...");
                //console.dir(node);
            });

            jsTree.on('show_all.jstree', function (nodes) {
                console.log("All nodes shown...");
                //console.dir(node);
            });

            jsTree.on('activate_node.jstree', function (node, event) {
                console.log("Activate node...");
                //console.dir(node);
            });

            jsTree.on('hover_node.jstree', function (node) {
                console.log("Hovering node...");
                //console.dir(node);
            });

            jsTree.on('dehover_node.jstree', function (node) {
                console.log("Dehovering node...");
                //console.dir(node);
            });

            jsTree.on('select_node.jstree', function (node, selected, event) {
                console.log("Selecting node...");
                //console.dir(node);
            });

            /*jsTree.on('changed.jstree', function (node, action, selected, event) {
                console.log("Selecting node changed...");
            });*/

            jsTree.on('changed.jstree', function (node, data) {
                var i, j, r = [];

                console.log("Selecting node changed...");

                for(i = 0, j = data.selected.length; i < j; i += 1) {
                    r.push(data.instance.get_node(data.selected[i]).text);
                }

                jq('#statusMsg').html('Selected: ' + r.join(', '));
            });

            jsTree.on('deselect_node.jstree', function (node, selected, event) {
                console.log("Deselecting node...");
                //console.dir(node);
            });

            jsTree.on('select_all.jstree', function (selected) {
                console.log("All nodes selected...");
                //console.dir(node);
            });

            jsTree.on('deselect_all.jstree', function (node, selected) {
                console.log("All nodes deselected...");
                //console.dir(node);
            });

            jsTree.on('set_state.jstree', function (node, selected) {
                console.log("Set state...");
                //console.dir(node);
            });

            jsTree.on('refresh.jstree', function (node, selected) {
                console.log("Refreshing...");
                //console.dir(node);
            });

            jsTree.on('refresh_node.jstree', function (node, nodes) {
                console.log("Refreshing node...");
                //console.dir(node);
            });

            jsTree.on('set_id.jstree', function (node, old) {
                console.log("Setting id to node...");
                //console.dir(node);
            });

            jsTree.on('set_text.jstree', function (obj, text) {
                console.log("Setting text to node...");
                //console.dir(node);
            });

            jsTree.on('create_node.jstree', function (node, parent, position) {
                console.log("Creating node...");
                //console.dir(node);
            });

            jsTree.on('rename_node.jstree', function (node, text, old) {
                console.log("Renaming node...");
                //console.dir(node);
            });

            jsTree.on('delete_node.jstree', function (node, parent) {
                console.log("Deleting node...");
                //console.dir(node);
            });

            /*jsTree.on("changed.jstree", function (e, data) {
                console.log(data.selected);
            });

            jq('button').on('click', function () {
                jq('#jstree').jstree(true).select_node('child_node_1');
                jq('#jstree').jstree('select_node', 'child_node_1');
                jq.jstree.reference('#jstree').select_node('child_node_1');
            });*/
        }
    };
}($));

$(document).ready(jsTreeApp.pageReady);
