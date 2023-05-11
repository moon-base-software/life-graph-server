import { builder } from "../../architecture/schema-builder"
import { thoughtFromID } from "./thought-from-id"
import { ThoughtRef } from "./thought-ref"

export function setupThoughtQuery() {

    builder.queryFields((t) => ({
        thought: t.field({
            type: ThoughtRef,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (parent, args) => thoughtFromID(args.id),
        }),
    }))
}
