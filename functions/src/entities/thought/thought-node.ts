import { DocumentData } from "firebase/firestore/lite"
import { GraphNode } from "../node/graph-node"
import { Property } from "../property/property"
import { StringPropertyValue } from "../property-value-types/string-property-value/string-property-value"

export class ThoughtNode extends GraphNode {

    constructor(id: string, data: DocumentData | undefined) {
        super(id, data)
    }

    get text(): string {
        const prop = this.properties.get("text") as unknown as Property
        const value = prop.value as StringPropertyValue
        return value.stringValue
    }
  }
