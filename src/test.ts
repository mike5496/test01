import * as d3 from 'd3';
import * as network from "./network";

const DIAGRAM_X = 800;
const DIAGRAM_Y = 600;

const COLS = 2;
const ROWS = 6;

const NODE_SIZE = 35;
const X_SPACING = (DIAGRAM_X / (COLS - 1));
const Y_SPACING = (DIAGRAM_Y / (ROWS - 1));

let net: network.Node[][] = null;
let shape: number[] = [ROWS, COLS];
net = network.buildNetwork(shape);

// Draw nodes
function drawNodes(network: network.Node[][], svg): void {

	svg.append("rect")
		.attr("x",0).attr("y", 0)
		.attr("width", DIAGRAM_X - 1).attr("height", DIAGRAM_Y - 1)
		.attr("fill","lightgray");

	for (let row = 0; row < ROWS; row++) {
		for (let col = 0; col < COLS; col++) {
			let x = col * X_SPACING;
			let y = row * Y_SPACING;

			let circle = svg.append("circle")
				.attr("cx", x)
				.attr("cy", y)
				.attr("r", NODE_SIZE);
		}
	}
}

// Draw nodes
function drawLinks(network: network.Node[][], svg): void {

	for (let row = 0; row < ROWS; row++) {
		console.log("ROW: " + row);
		for (let col = 0; col < COLS; col++) {
			console.log("COL: " + col);
			let node: network.Node = network[col][row];
			if (node) {
				for (let linkIndex = 0; linkIndex < node.outputs.length; linkIndex++) {
					let link: network.Link = node.outputs[linkIndex]
					console.log("LINK: " + link.id + "--" + link.source + "--" + link.dest);
				}
			} else {
				console.log("NULL NODE: " + "ROW: " + row + "-- COL: " + col);
			}
		}
	}
}

	/*
		for (let j = 0; j < node.inputLinks.length; j++) {
			let link = node.inputLinks[j];
			let path: SVGPathElement = drawLink(link, node2coord, network,
				container, j === 0, j, node.inputLinks.length).node() as any;
			// Show callout to weights.
			let prevLayer = network[layerIdx - 1];
			let lastNodePrevLayer = prevLayer[prevLayer.length - 1];
			if (targetIdWithCallout == null &&
				i === numNodes - 1 &&
				link.source.id === lastNodePrevLayer.id &&
				(link.source.id !== idWithCallout || numLayers <= 5) &&
				link.dest.id !== idWithCallout &&
				prevLayer.length >= numNodes) {
				let midPoint = path.getPointAtLength(path.getTotalLength() * 0.7);
				calloutWeights.style({
					display: null,
					top: `${midPoint.y + 5}px`,
					left: `${midPoint.x + 3}px`
				});
				targetIdWithCallout = link.dest.id;
			}
		}
	*/

	function drawNetwork(network: network.Node[][]): void {
		let container = d3.select("#network");
		let svg = container.append("svg")
			.attr("width", DIAGRAM_X)
			.attr("height", DIAGRAM_Y);

		drawNodes(network, svg);
		drawLinks(network, svg);
	}

	drawNetwork(net);
