import { ObjectType, Field, ID, Float } from 'type-graphql';

@ObjectType({ description: 'Thought model' })
export class Thought {

    constructor(
        id: String,
        text: String,
        creationDateTime: Date,
        creationLocalTimezone: String,
        creationLocationLat: number | undefined,
        creationLocationLon: number | undefined,
        ) {
        this.id = id
        this.text = text
        this.creationDateTime = creationDateTime
        this.creationLocalTimezone = creationLocalTimezone
        this.creationLocationLat = creationLocationLat
        this.creationLocationLon = creationLocationLon
    }

    @Field(type => ID)
    id: String;

    @Field()
    text: String;

    @Field()
    creationDateTime: Date

    @Field()
    creationLocalTimezone: String

    @Field(type => Float, { nullable: true })
    creationLocationLat: number | undefined

    @Field(type => Float, { nullable: true })
    creationLocationLon: number | undefined
}
