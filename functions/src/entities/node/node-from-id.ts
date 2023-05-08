import { collection, doc, getDoc } from "firebase/firestore/lite"
import { GraphQLError } from "graphql/error"
import { GraphNode } from "./graph-node"
import { db } from "../../architecture/app-setup"

const nodeCollectionName = "nodes"

export const nodeFromID = async (id: string | undefined) => {

    if (id === undefined) {
        throw new GraphQLError('Node ID is required')
    }

    const collectionRef = collection(db, nodeCollectionName)
    const docRef = doc(collectionRef, id)
    const docSnap = await getDoc(docRef)
    // TODO need to return the right Object type, eg. Thought
    return new GraphNode(id, docSnap.data())
}