import { nodeBuilder } from "../../architecture/app-setup"
import { setupURL } from "./url-implement"
import { URLNode } from "./url-node"

export function registerURL() {

    setupURL()

    nodeBuilder.register("URL", (id, data) => new URLNode(id, data))
}