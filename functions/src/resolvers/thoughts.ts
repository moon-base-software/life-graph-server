import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { collection, getDocs, getDoc, setDoc, doc, DocumentSnapshot, DocumentData, Timestamp, deleteDoc, GeoPoint } from 'firebase/firestore/lite'
import { Thought } from '../entities/thought'
import { DataStore } from '../datastore'
import { CreationLike } from '../scalars/creation'

const firebaseCollection = "thoughts"

@Resolver()
export class ThoughtsResolver {

    db = DataStore.singleton.db

    makeThought(docRef: DocumentSnapshot<DocumentData>): Thought {
        const data = docRef.data() as DocumentData | undefined
        if (data === undefined) {
            throw new Error("No thought with that id")
        }
        const text = data["text"] as String | undefined
        if (text === undefined) {
            throw new Error("Thought has no text")
        }
        const creation = data["creation"] as CreationLike | undefined
        if (creation === undefined) {
            throw new Error("Thought has no creation information")
        }
        return new Thought(
            docRef.id, 
            text, 
            creation,
            // creationDateTime.toDate(), 
            )
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
        @Arg('text') text: String,
        @Arg('creationTimezone') creationTimezone: String,
        @Arg('creationLocationLat', { nullable: true }) creationLocationLat?: number,
        @Arg('creationLocationLon', { nullable: true }) creationLocationLon?: number,
    ): Promise<Thought> {

        const thoughtsCollection = collection(this.db, firebaseCollection)
        const docRef = doc(thoughtsCollection)
        var geoPoint: GeoPoint | undefined
        if (creationLocationLat != undefined && creationLocationLon != undefined) {
            geoPoint = new  GeoPoint(creationLocationLat, creationLocationLon)
        }
        await setDoc(docRef, {
            text: text,
            creation: {
                datetime: Timestamp.now(),
                timezone: creationTimezone,
                location: geoPoint,
            }
        })
        return await this.getThought(docRef.id)
    }

    @Mutation(() => Boolean)
    async deleteThought(@Arg('id') id: string): Promise<boolean> {
        return await deleteDoc(doc(this.db, firebaseCollection, id))
        .then(docRef => true)
    }
}
