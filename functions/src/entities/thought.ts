import { ObjectType, Field, ID } from 'type-graphql'
import { CreationLike, CreationScalar } from '../scalars/creation'

@ObjectType({ description: 'Thought model' })
export class Thought extends Node {

    constructor(
        id: String,
        text: String,
        creation: CreationLike,
        ) {
        super()
        this.id = id
        this.text = text
        this.creation = creation
    }

    @Field(type => ID)
    id: String;

    @Field()
    text: String;

    @Field(type => CreationScalar, { nullable: false })
    creation: CreationLike
}
