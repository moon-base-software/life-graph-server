import { builder } from "../../architecture/schema-builder"
import { GraphNode } from "./graph-node";

export const NodeRef = builder.interfaceRef<GraphNode>('Node')
