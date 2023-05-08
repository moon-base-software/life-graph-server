import { DocumentData } from "firebase/firestore/lite"
import { Property } from "../property/property"

export class GraphNode {
    __typename: string
    id: string
    incomingEdgeIDs: string[]
    outgoingEdgeIDs: string[]
    properties: Map<string, Property>

    constructor(id: string, data: DocumentData | undefined) {
      this.id = id
      if (data === undefined) {
        this.__typename = "Node"
        this.incomingEdgeIDs = []
        this.outgoingEdgeIDs = []
        this.properties = new Map<string, Property>()
      } else {
        this.__typename = data["__typename"] ?? "Node" 
        this.incomingEdgeIDs = data["incomingEdgeIDs"] ?? []
        this.outgoingEdgeIDs = data["outcomingEdgeIDs"] ?? []
        this.properties = this.makeProperties(data["properties"])
      }
    }

    makeProperties = (data: any): Map<string, Property> => {
      
      const propertyData = data as Object
      
      if (propertyData === undefined || propertyData == null) {
        return new Map<string, Property>()
      } else {

        var props = new Map<string, Property>()

        type ObjectKey = keyof typeof propertyData

        for (const key in propertyData) {
          const propName = key as ObjectKey
          const propValue = propertyData[propName]

          props.set(propName, new Property(propName, propValue))
        }
        return props
      }
    }
  }