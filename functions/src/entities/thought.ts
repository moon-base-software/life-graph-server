import { DocumentData } from "firebase/firestore/lite"
import { GraphNode } from "./graph-node"

export class Thought extends GraphNode {

    constructor(id: string, data: DocumentData | undefined) {
        super(id, data)
    }
  }
