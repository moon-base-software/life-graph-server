import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'Thought model' })
export class Thought {

    constructor(id: String, text: String, createdAt: Date) {
        this.id = id
        this.text = text
        this.createdAt = createdAt
    }

    @Field(() => ID)
    id: String;

    @Field()
    text: String;

    @Field()
    createdAt: Date
}
