import { setupNode } from "./node-implement";
import { setupNodeQuery } from "./node-query";

export function registerNode() {

    setupNode()
    setupNodeQuery()
}
