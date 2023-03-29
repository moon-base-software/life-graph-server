import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { collection, getDocs, getDoc, setDoc, doc, DocumentSnapshot, DocumentData, Timestamp, deleteDoc } from 'firebase/firestore/lite';
import { Thought } from '../entities/thought';
import { DataStore } from '../datastore'

const firebaseCollection = "thoughts"

@Resolver()
export class ThoughtsResolver {

    db = DataStore.singleton.db

    makeThought(docRef: DocumentSnapshot<DocumentData>): Thought {
        const data = docRef.data()
        if (data === undefined) {
            throw new Error("No thought with that id")
        }
        const text = data["text"]
        if (text === undefined) {
            throw new Error("Thought has no text")
        }
        return new Thought(docRef.id, text)
    }

    @Query((_returns) => Thought, { nullable: false })
    async getThought(@Arg('id') id: string): Promise<Thought> {
        const docRef = doc(this.db, firebaseCollection, id)
        return await getDoc(docRef)
            .then(docRef => this.makeThought(docRef))
    }

    @Query(() => [Thought])
    async allThoughts() {
        const thoughtsCollection = collection(this.db, firebaseCollection)
        const thoughtsSnapshot = await getDocs(thoughtsCollection)
        return thoughtsSnapshot.docs.map(docRef => this.makeThought(docRef))
    }

    @Mutation(() => Thought)
    async createThought(
        @Arg('text') text: String
    ): Promise<Thought> {

        const thoughtsCollection = collection(this.db, firebaseCollection)
        const docRef = doc(thoughtsCollection)
        await setDoc(docRef, {
            text: text,
            createdAt: Timestamp.now()
        })
        return await this.getThought(docRef.id)
    }

    @Mutation(() => Boolean)
    async deleteThought(@Arg('id') id: string): Promise<boolean> {
        return await deleteDoc(doc(this.db, firebaseCollection, id))
        .then(docRef => true)
    }
}
