import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'Thought model' })
export class Thought {

    constructor(id: String, text: String) {
        this.id = id
        this.text = text
    }

    @Field(() => ID)
    id: String;

    @Field()
    text: String;
}
