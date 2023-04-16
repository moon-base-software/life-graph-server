import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { collection, getDocs, getDoc, setDoc, doc, DocumentSnapshot, DocumentData, Timestamp, deleteDoc } from 'firebase/firestore/lite'
import { Project } from '../entities/project'
import { DataStore } from '../datastore'

const firebaseCollection = "projects"

@Resolver()
export class ProjectsResolver {

    db = DataStore.singleton.db

    makeProject(docRef: DocumentSnapshot<DocumentData>): Project {
        const data = docRef.data() as DocumentData | undefined
        if (data === undefined) {
            throw new Error("No Project with that id")
        }
        const name = data["name"] as String | undefined
        if (name === undefined) {
            throw new Error("Project has no text")
        }
        const creationDateTime = data["creation_datetime"] as Timestamp | undefined
        if (creationDateTime === undefined) {
            throw new Error("Project has no creation date")
        }
        const creationTimezone = data["creation_timezone"] as String | undefined
        if (creationTimezone === undefined) {
            throw new Error("Project has no creation timezone")
        }
        return new Project(
            docRef.id, 
            name, 
            creationDateTime.toDate(), 
            creationTimezone,
            )
    }

    @Query((_returns) => Project, { nullable: false })
    async getProject(@Arg('id') id: string): Promise<Project> {
        const docRef = doc(this.db, firebaseCollection, id)
        return await getDoc(docRef)
            .then(docRef => this.makeProject(docRef))
    }

    @Query(() => [Project])
    async allProjects() {
        const ProjectsCollection = collection(this.db, firebaseCollection)
        const ProjectsSnapshot = await getDocs(ProjectsCollection)
        return ProjectsSnapshot.docs.map(docRef => this.makeProject(docRef))
    }

    @Mutation(() => Project)
    async createProject(
        @Arg('name') name: String,
        @Arg('creationTimezone') creationTimezone: String,
    ): Promise<Project> {

        const ProjectsCollection = collection(this.db, firebaseCollection)
        const docRef = doc(ProjectsCollection)
        await setDoc(docRef, {
            name: name,
            creation_datetime: Timestamp.now(),
            creation_timezone: creationTimezone,
        })
        return await this.getProject(docRef.id)
    }

    @Mutation(() => Boolean)
    async deleteProject(@Arg('id') id: string): Promise<boolean> {
        return await deleteDoc(doc(this.db, firebaseCollection, id))
        .then(docRef => true)
    }
}
