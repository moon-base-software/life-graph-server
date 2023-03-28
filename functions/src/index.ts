import { ApolloServer } from "apollo-server-cloud-functions";
import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
const { defineString } = require('firebase-functions/params');
import { GraphQLError } from 'graphql';
import { GraphQLScalarType, Kind } from 'graphql';
const { loadFile } = require('graphql-import-files')

const authKey = defineString('AUTH_KEY');

// For accessing Firestore database
const admin = require("firebase-admin");

// Will initialize with default settings and database
admin.initializeApp();
const db = admin.firestore();

const dateTimeScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Custom scalar type for Date and Time',
    serialize(value) {
      if (value instanceof Timestamp) {
        return value.toDate(); // Convert outgoing Date to integer for JSON
      }
      throw Error('GraphQL DateTime Scalar serializer expected a `Timestamp` object');
    },
    parseValue(value) {
      if (typeof value === 'number') {
        return new Date(value); // Convert incoming integer to Date
      }
      throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // Convert hard-coded AST string to integer and then to Date
        return new Date(parseInt(ast.value, 10));
      }
      // Invalid hard-coded value (not an integer)
      return null;
    },
  });

const resolvers = {
    DateTime: dateTimeScalar,
    Query: {
        thoughts: () => {
            return new Promise((resolve, reject) => {
                fetchAllThoughts((data) => {
                    resolve(data);
                });
            });
        }
    }
}

// Function to fetch all data points from database
const fetchAllThoughts = (callback: { (data: any): void; (arg0: any[]): any; }) => {
    db.collection("thoughts")
    .get()
    .then((item: { docs: any[]; }) => {
        const items: any[] = [];
        item.docs.forEach((item: { data: () => any; }) => {
            items.push(item.data())
        });
        return callback(items);
    })
    .catch((e: any) => console.log(e));
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: loadFile('./src/schema/schema.gql'),
    resolvers,
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
    
        // add the user to the context
        return { isAuthenticated: true };
    }
});

export const graphql = functions.https.onRequest(server.createHandler());
