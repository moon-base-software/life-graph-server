import { builder } from "../../architecture/schema-builder"
import { ThoughtNode } from "./thought-node"

export const ThoughtRef = builder.objectRef<ThoughtNode>('Thought')
