import { DocumentData } from "firebase/firestore/lite"
import { GraphQLError } from "graphql/error/GraphQLError"

export class GraphEdge {
  id: string
  fromNodeID: string
  toNodeID: string

  constructor(id: string, data: DocumentData | undefined) {

    if (data === undefined) {
      throw new GraphQLError('No DocumentData when creating edge. ID: '+id)
    }

    const fromNodeID = data["fromNodeID"]
    const toNodeID = data["toNodeID"]

    if (fromNodeID === undefined || toNodeID === undefined) {
      throw new GraphQLError('No Node IDs when creating Edge')
    }

    this.id = id
    this.fromNodeID = fromNodeID
    this.toNodeID = toNodeID
  }
}
