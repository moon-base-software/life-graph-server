import { builder } from "../../architecture/schema-builder";
import { GraphEdge } from "./graph-edge";

export const EdgeRef = builder.objectRef<GraphEdge>('Edge')
