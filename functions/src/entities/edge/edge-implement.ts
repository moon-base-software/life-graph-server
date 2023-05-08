import { nodeFromID } from "../node/node-from-id";
import { NodeRef } from "../node/node-ref";
import { EdgeRef } from "./edge-ref";

EdgeRef.implement({
    description: 'A edge in the graph',
    fields: (t) => ({
        id: t.exposeID('id', {}),
        from: t.field({
            type: NodeRef,
            resolve: (parent) => nodeFromID(parent.fromNodeID),
        }),
        to: t.field({
            type: NodeRef,
            resolve: (parent) => nodeFromID(parent.toNodeID),
        }),
    }),
});
