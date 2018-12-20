"use strict";
exports.__esModule = true;
var Node = (function () {
    function Node(id) {
        this.inputLinks = [];
        this.outputs = [];
        this.id = id;
    }
    return Node;
}());
exports.Node = Node;
var Link = (function () {
    function Link(source, dest) {
        this.weight = Math.random() - 0.5;
        this.id = source.id + "-" + dest.id;
        this.source = source;
        this.dest = dest;
    }
    return Link;
}());
exports.Link = Link;
function buildNetwork(networkShape) {
    var numLayers = networkShape.length;
    var id = 1;
    var network = [];
    for (var layerIdx = 0; layerIdx < numLayers; layerIdx++) {
        var currentLayer = [];
        network.push(currentLayer);
        var numNodes = networkShape[layerIdx];
        for (var i = 0; i < numNodes; i++) {
            var nodeId = id.toString();
            id++;
            var node = new Node(nodeId);
            currentLayer.push(node);
            if (layerIdx >= 1) {
                for (var j = 0; j < network[layerIdx - 1].length; j++) {
                    var prevNode = network[layerIdx - 1][j];
                    var link = new Link(prevNode, node);
                    prevNode.outputs.push(link);
                    node.inputLinks.push(link);
                }
            }
        }
    }
    return network;
}
exports.buildNetwork = buildNetwork;
