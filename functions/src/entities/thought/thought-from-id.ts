import { collection, doc, getDoc } from "firebase/firestore/lite"
import { GraphQLError } from "graphql/error"
import { db } from "../../architecture/app-setup"
import { ThoughtNode } from "./thought-node"

const nodeCollectionName = "nodes"

export const thoughtFromID = async (id: string | undefined) => {

    if (id === undefined) {
        throw new GraphQLError('Node ID is required')
    }

    const collectionRef = collection(db, nodeCollectionName)
    const docRef = doc(collectionRef, id)
    const docSnap = await getDoc(docRef)
    // TODO need to return the right Object type, eg. Thought
    return new ThoughtNode(id, docSnap.data())
}