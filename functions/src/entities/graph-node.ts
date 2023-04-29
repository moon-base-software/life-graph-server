import { DocumentData } from "firebase/firestore/lite";

export class GraphNode {
    // typename: string
    id: string
    incomingEdgeIDs: string[]
    outgoingEdgeIDs: string[]

    constructor(id: string, data: DocumentData | undefined) {
      this.id = id
      if (data === undefined) {
        // this.typename = "Node"
        this.incomingEdgeIDs = []
        this.outgoingEdgeIDs = []
      } else {
        // this.typename = data["__typename"] ?? "Node" 
        this.incomingEdgeIDs = data["incomingEdgeIDs"] ?? []
        this.outgoingEdgeIDs = data["outcomingEdgeIDs"] ?? []
      }
    }
  }