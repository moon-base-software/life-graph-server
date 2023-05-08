import { collection, doc, getDoc } from "firebase/firestore/lite"
import { GraphQLError } from "graphql/error"
import { db } from "../../architecture/app-setup"
import { GraphEdge } from "./graph-edge"

const edgeCollectionName = "edges"

export const edgeFromID = async (id: string | undefined) => {

    if (id === undefined) {
        throw new GraphQLError('Edge ID is required')
    }

    const collectionRef = collection(db, edgeCollectionName)
    const docRef = doc(collectionRef, id)
    const docSnap = await getDoc(docRef)
    return new GraphEdge(id, docSnap.data())
}
