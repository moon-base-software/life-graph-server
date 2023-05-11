import { builder } from "../../architecture/schema-builder"
import { edgeFromID } from "./edge-from-id"
import { EdgeRef } from "./edge-ref"

export function setupEdgeQuery() {

    builder.queryFields((t) => ({
        edge: t.field({
            type: EdgeRef,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (parent, args) => edgeFromID(args.id),
        }),
    }))
}
