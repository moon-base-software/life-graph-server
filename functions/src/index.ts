import "reflect-metadata";
import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";
const { defineString } = require('firebase-functions/params');
import { GraphQLError } from "graphql/error/GraphQLError";
import { StringPropertyValue } from "./entities/property-value-types/string-property-value/string-property-value";
import { builder } from "./architecture/schema-builder";
import { PropertyValueRef } from "./entities/property-value-types/property-value/property-value-ref";
import { setupThought } from "./entities/thought/thought-implement";
import { setupThoughtQuery } from "./entities/thought/thought-query";
import { nodeBuilder } from "./architecture/app-setup";
import { ThoughtNode } from "./entities/thought/thought-node";
import { setupURL } from "./entities/url/url-implement";
import { URLNode } from "./entities/url/url-node";
import { registerNode } from "./entities/node/node-registration";
import { registerEdge } from "./entities/edge/edge-registration";
import { registerProperty } from "./entities/property/property-registration";
import { StringPropertyValueRef } from "./entities/property-value-types/string-property-value/string-property-value-ref";
import { registerPropertyBaseTypes } from "./entities/property-value-types/property-base-types-registration";

const authKey = defineString('AUTH_KEY');

const ProperNounRef = builder.interfaceRef<StringPropertyValue>('ProperNoun')
const GivenNameRef = builder.objectRef<StringPropertyValue>('GivenName')
const ReferenceStringRef = builder.objectRef<StringPropertyValue>('ReferenceString')

builder.queryType({})

registerNode()
registerEdge()
registerProperty()
registerPropertyBaseTypes()

setupThought()
setupThoughtQuery()

setupURL()

nodeBuilder.register("Thought", (id, data) => new ThoughtNode(id, data))
nodeBuilder.register("URL", (id, data) => new URLNode(id, data))

ProperNounRef.implement({
    description: 'A proper noun value',
    interfaces: [StringPropertyValueRef, PropertyValueRef],
})

GivenNameRef.implement({
    description: 'A given name',
    interfaces: [ProperNounRef, StringPropertyValueRef, PropertyValueRef],
    isTypeOf: (value) => isGivenName(value),
})

ReferenceStringRef.implement({
    description: 'A reference string',
    interfaces: [StringPropertyValueRef, PropertyValueRef],
    isTypeOf: (value) => isReferenceString(value),
})

function isGivenName(toBeDetermined: unknown): toBeDetermined is StringPropertyValue {
    if ((toBeDetermined as StringPropertyValue).__typename == "GivenName") {
        return true
    }
    return false
}

function isReferenceString(toBeDetermined: unknown): toBeDetermined is StringPropertyValue {
    if ((toBeDetermined as StringPropertyValue).__typename == "ReferenceString") {
        return true
    }
    return false
}

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
