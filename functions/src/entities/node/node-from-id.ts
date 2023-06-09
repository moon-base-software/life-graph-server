import { collection, doc, getDoc } from "firebase/firestore/lite"
import { GraphQLError } from "graphql/error"
import { db, nodeBuilder } from "../../architecture/app-setup"

const nodeCollectionName = "nodes"

// TODO: Maybe use generics to ensure the right Node subclass is instantiated.

export const nodeFromID = async (id: string | undefined) => {

    if (id === undefined) {
        throw new GraphQLError('Node ID is required')
    }

    const collectionRef = collection(db, nodeCollectionName)
    const docRef = doc(collectionRef, id)
    const docSnap = await getDoc(docRef)
    return nodeBuilder.build(id, docSnap.data())
}