import { DocumentData } from "firebase/firestore/lite";
import { GraphNode } from "./graph-node";

export class NodeBuilder {
    nodesBuildersByTypeName: Map<string, (id: string, data: DocumentData | undefined) => GraphNode>

    constructor() {
        this.nodesBuildersByTypeName = new Map<string, (id: string, data: DocumentData | undefined) => GraphNode>()
    }

    register(typename: string, builder: (id: string, data: DocumentData | undefined) => GraphNode) {
        this.nodesBuildersByTypeName.set(typename, builder)
    }

    build(id: string, data: DocumentData | undefined) {

        if (data === undefined) {
            return new GraphNode(id, data)
        } else {
            const typename = data["__typename"] as string
            const builder = this.nodesBuildersByTypeName.get(typename)
            if (builder === undefined) {
                return new GraphNode(id, data)
            } else {
                return builder(id, data)
            }
        }
    }
}
