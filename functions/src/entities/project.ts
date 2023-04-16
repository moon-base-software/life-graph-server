import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: 'Project model' })
export class Project extends Node {

    constructor(
        id: String,
        name: String,
        creationDateTime: Date,
        creationLocalTimezone: String,
        ) {
        super()
        this.id = id
        this.name = name
        this.creationDateTime = creationDateTime
        this.creationLocalTimezone = creationLocalTimezone
    }

    @Field(type => ID)
    id: String;

    @Field()
    name: String;

    @Field()
    creationDateTime: Date

    @Field()
    creationLocalTimezone: String
}
