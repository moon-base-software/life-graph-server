import { setupNode } from "./node-implement";
import { setupNodeQuery } from "./node-query";
import { setupNodeMutation } from "./node-mutation";

export function registerNode() {

    setupNode()
    setupNodeQuery()
    setupNodeMutation()
}

