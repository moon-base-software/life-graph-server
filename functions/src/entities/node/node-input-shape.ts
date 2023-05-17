import { Property } from "../property/property"


export interface NodeInputShape {
    typename: string
    properties: [Property] | undefined
}
