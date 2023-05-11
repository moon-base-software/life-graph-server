import { NodeRef } from "../node/node-ref"
import { ThoughtNode } from "./thought-node"
import { ThoughtRef } from "./thought-ref"

export function setupThought() {

    ThoughtRef.implement({
        description: 'A thought',
        interfaces: [NodeRef],
        isTypeOf: (value) => isThought(value),
        fields: (t) => ({
            text: t.string({
                resolve: (parent) => parent.text,
            }),
        })
    })
}

function isThought(toBeDetermined: unknown): toBeDetermined is ThoughtNode {
    if ((toBeDetermined as ThoughtNode).__typename) {
        return true
    }
    return false
}
