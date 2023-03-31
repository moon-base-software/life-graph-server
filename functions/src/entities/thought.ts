import { GeoPoint } from 'firebase/firestore/lite';
import { ObjectType, Field, ID } from 'type-graphql';
import { GeoPointScalar } from '../scalars/geopoint';

@ObjectType({ description: 'Thought model' })
export class Thought {

    constructor(
        id: String,
        text: String,
        creationDateTime: Date,
        creationLocalTimezone: String,
        creationLocation: GeoPoint | undefined,
        ) {
        this.id = id
        this.text = text
        this.creationDateTime = creationDateTime
        this.creationLocalTimezone = creationLocalTimezone
        this.creationLocation = creationLocation
    }

    @Field(type => ID)
    id: String;

    @Field()
    text: String;

    @Field()
    creationDateTime: Date

    @Field()
    creationLocalTimezone: String

    @Field(type => GeoPointScalar, { nullable: true })
    creationLocation: GeoPoint | undefined
}
