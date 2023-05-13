import { NodeRef } from "../node/node-ref"
import { URLNode } from "./url-node"
import { URLRef } from "./url-ref"

export function setupURL() {

    URLRef.implement({
        description: 'A thought',
        interfaces: [NodeRef],
        isTypeOf: (value) => isSharedURL(value),
        fields: (t) => ({
            scheme: t.string({
                resolve: (parent) => parent.scheme,
            }),
            domain: t.string({
                resolve: (parent) => parent.domain,
            }),
            urlString: t.string({
                resolve: (parent) => parent.urlString
            })
        })
    })
}

function isSharedURL(toBeDetermined: unknown): toBeDetermined is URLNode {
    if ((toBeDetermined as URLNode).__typename == "URL") {
        return true
    }
    return false
}
