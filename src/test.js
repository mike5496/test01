"use strict";
exports.__esModule = true;
var d3 = require("d3");
var network = require("./network");
var DIAGRAM_X = 800;
var DIAGRAM_Y = 600;
var COLS = 2;
var ROWS = 6;
var NODE_SIZE = 35;
var X_SPACING = (DIAGRAM_X / (COLS - 1));
var Y_SPACING = (DIAGRAM_Y / (ROWS - 1));
var net = null;
var shape = [ROWS, COLS];
net = network.buildNetwork(shape);
function drawNodes(network, svg) {
    svg.append("rect")
        .attr("x", 0).attr("y", 0)
        .attr("width", DIAGRAM_X - 1).attr("height", DIAGRAM_Y - 1)
        .attr("fill", "lightgray");
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            var x = col * X_SPACING;
            var y = row * Y_SPACING;
            var circle = svg.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", NODE_SIZE);
        }
    }
}
function drawLinks(network, svg) {
    for (var row = 0; row < ROWS; row++) {
        console.log("ROW: " + row);
        for (var col = 0; col < COLS; col++) {
            console.log("COL: " + col);
            var node = network[col][row];
            if (node) {
                for (var linkIndex = 0; linkIndex < node.outputs.length; linkIndex++) {
                    var link = node.outputs[linkIndex];
                    console.log("LINK: " + link.id + "--" + link.source + "--" + link.dest);
                }
            }
            else {
                console.log("NULL NODE: " + "ROW: " + row + "-- COL: " + col);
            }
        }
    }
}
function drawNetwork(network) {
    var container = d3.select("#network");
    var svg = container.append("svg")
        .attr("width", DIAGRAM_X)
        .attr("height", DIAGRAM_Y);
    drawNodes(network, svg);
    drawLinks(network, svg);
}
drawNetwork(net);
