import { Field, ID, InterfaceType } from 'type-graphql'
import { Connection } from './connection';

@InterfaceType({ description: 'Node model' })
export abstract class Node {

    constructor(
        id: String,
        outgoingConnections: [Connection],
        incomingConnections: [Connection],
        creationDateTime: Date,
        creationLocalTimezone: String,
        ) {
        this.id = id
        this.outgoingConnections = outgoingConnections
        this.incomingConnections = incomingConnections
        this.creationDateTime = creationDateTime
        this.creationLocalTimezone = creationLocalTimezone
    }

    @Field(type => ID)
    id: String;

    @Field()
    outgoingConnections: [Connection]

    @Field()
    incomingConnections: [Connection]

    @Field()
    creationDateTime: Date

    @Field()
    creationLocalTimezone: String
}
