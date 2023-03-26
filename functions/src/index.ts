import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";
const { defineString } = require('firebase-functions/params');
import { GraphQLError } from 'graphql';

const authKey = defineString('AUTH_KEY');

// For accessing Firestore database
const admin = require("firebase-admin");

// Will initialize with default settings and database
admin.initializeApp();
const db = admin.firestore();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
type DataPoint {
    uuid: String
    seriesValues: [SeriesValue]
}

type Series {
    identifier: String
}

type SeriesValue {
    series: String
    value: String
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "dataPoints" query returns an array of zero or more DataPoints (defined above).
type Query {
    dataPoints: [DataPoint]
}
`;

const resolvers = {
    Query: {
        dataPoints: () => {
            return new Promise((resolve, reject) => {
                fetchAllDataPoints((data) => {
                    resolve(data);
                });
            });
        }
    }
}

// Function to fetch all data points from database
const fetchAllDataPoints = (callback: { (data: any): void; (arg0: any[]): any; }) => {
    db.collection("data-points")
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
    typeDefs,
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
