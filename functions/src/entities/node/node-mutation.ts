import { builder } from "../../architecture/schema-builder";
import { createNode } from "./create-node";
import { NodeRef } from "./node-ref";

export function setupNodeMutation() {

    builder.mutationFields((t) => ({
        createNode: t.field({
            type: NodeRef,
            args: {
                typename: t.arg.string({ required: true }),
            },
            resolve: (parent, args) => createNode(args.typename)
        })
    }))
}