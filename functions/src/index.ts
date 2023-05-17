import "reflect-metadata"
import { ApolloServer } from "apollo-server-cloud-functions"
import * as functions from "firebase-functions"
const { defineString } = require('firebase-functions/params')
import { GraphQLError } from "graphql/error/GraphQLError"
import { builder } from "./architecture/schema-builder"
import { registerNode } from "./entities/node/node-registration"
import { registerEdge } from "./entities/edge/edge-registration"
import { registerProperty } from "./entities/property/property-registration"
import { registerPropertyBaseTypes } from "./entities/property-value-types/property-base-types-registration"
import { registerThought } from "./entities/thought/thought-registration"
import { registerURL } from "./entities/url/url-registration"
import { registerGivenName } from "./entities/property-value-types/given-name/given-name-registration"
import { registerReferenceString } from "./entities/property-value-types/reference-string/reference-string-registration"
import { registerProperNoun } from "./entities/property-value-types/proper-noun/proper-noun-registration"

const authKey = defineString('AUTH_KEY');

builder.queryType({})

registerNode()
registerEdge()
registerProperty()
registerPropertyBaseTypes()

registerThought()
registerURL()

registerProperNoun()
registerGivenName()
registerReferenceString()

const schema = builder.toSchema();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema: schema,
    // typeDefs: typeDefs,
    // resolvers: resolvers,
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
