import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite"
import { db, nodeBuilder } from "../../architecture/app-setup"

const nodeCollectionName = "nodes"

// TODO: Maybe use generics to ensure the right Node subclass is instantiated.

export const createNode = async (typename: string | undefined) => {

    const __typename = typename ?? "Node"

    const collectionRef = collection(db, nodeCollectionName)
    const docRef = doc(collectionRef)
    await setDoc(docRef, {
        __typename: __typename
    })
    const docSnap = await getDoc(docRef)
    return nodeBuilder.build(docRef.id, docSnap.data())
}