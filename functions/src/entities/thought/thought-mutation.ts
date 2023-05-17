// import { builder } from "../../architecture/schema-builder";
// import { createNode } from "../node/create-node";
// import { ThoughtRef } from "./thought-ref";

// export function setupThoughtMutation() {

//     builder.mutationFields((t) => ({
//         createNode: t.field({
//             type: ThoughtRef,
//             args: {
//                 typename: t.arg.string({ required: true }),
//             },
//             resolve: (parent, args) => createNode("Thought")
//         })
//     }))
// }