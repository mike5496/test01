export class Node {
    id: string;
    /** List of input links. */
    inputLinks: Link[] = [];
    /** List of output links. */
    outputs: Link[] = [];

    /**
     * Creates a new node with the provided id and activation function.
     */
    constructor(id: string) {
        this.id = id;
    }
}


export class Link {
    id: string;
    source: Node;
    dest: Node;
    weight = Math.random() - 0.5;

    /**
     * Constructs a link in the neural network initialized with random weight.
     *
     * @param source The source node.
     * @param dest The destination node.
     * @param regularization The regularization function that computes the
     *     penalty for this weight. If null, there will be no regularization.
     */
    constructor(source: Node, dest: Node) {
        this.id = source.id + "-" + dest.id;
        this.source = source;
        this.dest = dest;
    }
}

/**
 * Builds a neural network.
 *
 * @param networkShape The shape of the network. E.g. [1, 2, 3, 1] means
 *   the network will have one input node, 2 nodes in first hidden layer,
 *   3 nodes in second hidden layer and 1 output node.
 * @param inputIds List of ids for the input nodes.
 */
export function buildNetwork(
    networkShape: number[]): Node[][] {
    let numLayers = networkShape.length;
    let id = 1;
    /** List of layers, with each layer being a list of nodes. */
    let network: Node[][] = [];
    for (let layerIdx = 0; layerIdx < numLayers; layerIdx++) {
        let currentLayer: Node[] = [];
        network.push(currentLayer);
        let numNodes = networkShape[layerIdx];
        for (let i = 0; i < numNodes; i++) {
            let nodeId = id.toString();
            id++;
            let node = new Node(nodeId);
            currentLayer.push(node);
            if (layerIdx >= 1) {
                // Add links from nodes in the previous layer to this node.
                for (let j = 0; j < network[layerIdx - 1].length; j++) {
                    let prevNode = network[layerIdx - 1][j];
                    let link = new Link(prevNode, node);
                    prevNode.outputs.push(link);
                    node.inputLinks.push(link);
                }
            }
        }
    }
    return network;
}
