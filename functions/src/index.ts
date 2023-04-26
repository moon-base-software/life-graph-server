import "reflect-metadata";
import { ApolloServer } from "apollo-server-cloud-functions";
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore/lite';
// import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
const { defineString } = require('firebase-functions/params');
import { GraphQLError } from 'graphql';
// import { buildSchemaSync } from "type-graphql";
// import { ThoughtsResolver } from "./resolvers/thoughts";
// import { ProjectsResolver } from "./resolvers/projects";
import { DataStore } from "./datastore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { DocumentData, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore/lite";
// import { GraphQLScalarType, Kind } from 'graphql';
const { loadFile } = require('graphql-import-files')

const authKey = defineString('AUTH_KEY');

// Ensure Firebase app and store initialisation
const app = initializeApp(firebaseConfig)
const dataStore = new DataStore(app)

const db = dataStore.db

// const dateTimeScalar = new GraphQLScalarType({
//     name: 'DateTime',
//     description: 'Custom scalar type for Date and Time',
//     serialize(value) {
//       if (value instanceof Timestamp) {
//         return value.toDate(); // Convert outgoing Date to integer for JSON
//       }
//       throw Error('GraphQL DateTime Scalar serializer expected a `Timestamp` object');
//     },
//     parseValue(value) {
//       if (typeof value === 'number') {
//         return new Date(value); // Convert incoming integer to Date
//       }
//       throw new Error('GraphQL Date Scalar parser expected a `number`');
//     },
//     parseLiteral(ast) {
//       if (ast.kind === Kind.INT) {
//         // Convert hard-coded AST string to integer and then to Date
//         return new Date(parseInt(ast.value, 10));
//       }
//       // Invalid hard-coded value (not an integer)
//       return null;
//     },
//   });

const typeDefs = loadFile("schema.gql")

const resolvers = {
    Edge: {
        __resolveType(edge: { __typename: String }, contextValue: any, info: any) {
            return edge.__typename
          },
    },
    Node: {
        __resolveType: (node: { __typename: String }) => {
            return node.__typename
        },
    },
    Query: {
        allNodes: () => {
            return new Promise((resolve, reject) => {
                fetchAllNodes('nodes', (data) => {
                    resolve(data);
                });
            });
        },
        allEdges: () => {
            return new Promise((resolve, reject) => {
                fetchAllEdges('edges', (data) => {
                    resolve(data);
                });
            });
        },
    },
    Mutation: {
        createNode: async (parent: any, arg: { typename: String }) => {
            const node = await createNode(arg.typename)
            return node
        },
        createEdge: async (parent: any, arg: { typename: String, fromNodeID: String, toNodeID: String }) => {
            const edge = await createEdge(arg.typename, arg.fromNodeID, arg.toNodeID)
            return edge
        }
    }
}

// Function to fetch all nodes from database
const fetchAllNodes = async (collectionName: string, callback: (data: any) => void) => {

    const firebaseCollection = collection(db, collectionName)
    const snapshot = await getDocs(firebaseCollection)
    const items: DocumentData[] = [];
    snapshot.docs.forEach(item => {
        items.push(makeNodeData(item.id, item.data()))
    });
    return callback(items);
}

const fetchAllEdges = async (collectionName: string, callback: (data: any) => void) => {

    const firebaseCollection = collection(db, collectionName)
    const snapshot = await getDocs(firebaseCollection)
    const items: DocumentData[] = [];
    snapshot.docs.forEach(item => {
        items.push(makeEdgeData(item.id, item.data()))
    });
    return callback(items);
}

// Function to create a node from database
async function createNode(typename: String): Promise<any> {

    // Add a new document in collection
    const docRef = doc(collection(db, "nodes"))
    await setDoc(docRef, {
        __typename: typename
    });
    const docSnap = await getDoc(docRef)
    return makeNodeData(docSnap.id, docSnap.data()) 
}

// Function to create a node from database
async function createEdge(typename: String, fromNodeID: String, toNodeID: String): Promise<any> {

    // Add a new document in collection
    const docRef = doc(collection(db, "edges"))
    await setDoc(docRef, {
        __typename: typename,
        fromNodeID: fromNodeID,
        toNodeID: toNodeID,
    });
    const docSnap = await getDoc(docRef)
    return makeEdgeData(docSnap.id, docSnap.data()) 
}

function makeNodeData(id: String, data: DocumentData | undefined): any {
    var nodeData = data ?? {}
    nodeData["id"] = id
    return nodeData
}

async function makeEdgeData(id: String, data: DocumentData | undefined): Promise<any> {
    var nodeData = data ?? { fromNodeID: null, toNodeID: null }
    const fromNodeID = nodeData["fromNodeID"]
    const toNodeID = nodeData["toNodeID"]
    const firebaseCollection = collection(db, "nodes")
    // Get references
    const fromNodeRef = doc(firebaseCollection, fromNodeID)
    const toNodeRef = doc(firebaseCollection, toNodeID)
    // Set Edge reference
    await updateDoc(fromNodeRef, {
        outgoingEdges: arrayUnion(id)
    })
    await updateDoc(toNodeRef, {
        incomingEdges: arrayUnion(id)
    }) 
    // Get full Node
    const fromNodeSnap = await getDoc(fromNodeRef)
    const toNodeSnap = await getDoc(toNodeRef)
    nodeData["id"] = id
    nodeData["from"] = makeNodeData(fromNodeSnap.id, fromNodeSnap.data())
    nodeData["to"] = makeNodeData(toNodeSnap.id, toNodeSnap.data())
    return nodeData
}

// const schema = buildSchemaSync({
//     resolvers: [ThoughtsResolver, ProjectsResolver],
//     dateScalarMode: "isoDate", // "timestamp",
//     emitSchemaFile: process.env.GENERATE_SCHEMA == "true" ?? false
// });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    // schema: schema,
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    context: async ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization;

        // Block requests
        if (token != authKey.value())
            // throwing a `GraphQLError` here allows us to specify an HTTP status code,
            // standard `Error`s will have a 500 status code by default
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });

        // add the authentication state to the context
        return { isAuthenticated: true };
    }
});

export const graphql = functions.https.onRequest(server.createHandler());
