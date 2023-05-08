import { edgeFromID } from "../edge/edge-from-id";
import { EdgeRef } from "../edge/edge-ref";
import { GraphEdge } from "../edge/graph-edge";
import { PropertyRef } from "../property/property-ref";
import { NodeRef } from "./node-ref";

NodeRef.implement({
    description: 'A node in the graph',
    fields: (t) => ({
        id: t.exposeString('id', {}),
        incomingEdges: t.field({
            type: [EdgeRef],
            resolve: async (parent) => {
                var edges: GraphEdge[] = []

                for (const edgeID of parent.incomingEdgeIDs) {
                    const edge = await edgeFromID(edgeID)
                    if (edge !== undefined) {
                        edges.push(edge)
                    }
                }
                return edges
            },
        }),
        outgoingEdges: t.field({
            type: [EdgeRef],
            resolve: async (parent) => {
                var edges: GraphEdge[] = []

                for (const edgeID of parent.outgoingEdgeIDs) {
                    const edge = await edgeFromID(edgeID)
                    if (edge !== undefined) {
                        edges.push(edge)
                    }
                }
                return edges
            },
        }),
        properties: t.field({
            type: [PropertyRef],
            resolve: (parent) => Array.from(parent.properties.values()),
        }),
    }),
});
