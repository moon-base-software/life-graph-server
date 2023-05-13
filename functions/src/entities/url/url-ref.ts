import { builder } from "../../architecture/schema-builder"
import { URLNode } from "./url-node"

export const URLRef = builder.objectRef<URLNode>('URL')
