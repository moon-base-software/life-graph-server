import { DocumentData } from "firebase/firestore/lite"
import { GraphNode } from "../node/graph-node"
import { Property } from "../property/property"
import { StringPropertyValue } from "../string-property-value"

export class URLNode extends GraphNode {

    constructor(id: string, data: DocumentData | undefined) {
        super(id, data)
    }

    get scheme(): string {
        const prop = this.properties.get("scheme") as unknown as Property
        const value = prop.value as StringPropertyValue
        return value.stringValue
    }

    get domain(): string {
        const prop = this.properties.get("domain") as unknown as Property
        const value = prop.value as StringPropertyValue
        return value.stringValue
    }

    get urlString(): string {
        return this.scheme + "://" + this.domain
    }
  }
