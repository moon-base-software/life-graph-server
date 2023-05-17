import { nodeBuilder } from "../../architecture/app-setup"
import { setupThought } from "./thought-implement"
import { ThoughtNode } from "./thought-node"
import { setupThoughtQuery } from "./thought-query"

export function registerThought() {

    setupThought()
    setupThoughtQuery()

    nodeBuilder.register("Thought", (id, data) => new ThoughtNode(id, data))
}