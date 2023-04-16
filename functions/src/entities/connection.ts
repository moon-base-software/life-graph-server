import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: 'Connection model' })
export class Connection {

    constructor(
        id: String,
        from: Node,
        to: Node,
        creationDateTime: Date,
        creationLocalTimezone: String,
        ) {
        this.id = id
        this.from = from
        this.to = to
        this.creationDateTime = creationDateTime
        this.creationLocalTimezone = creationLocalTimezone
    }

    @Field(type => ID)
    id: String;

    @Field()
    from: Node

    @Field()
    to: Node

    @Field()
    creationDateTime: Date

    @Field()
    creationLocalTimezone: String
}
