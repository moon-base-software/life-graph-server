import { builder } from "../../architecture/schema-builder";
import { nodeFromID } from "./node-from-id";
import { NodeRef } from "./node-ref";

export function setupNodeQuery() {

    builder.queryFields((t) => ({
        node: t.field({
            type: NodeRef,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (parent, args) => nodeFromID(args.id),
        }),
    }))
}
