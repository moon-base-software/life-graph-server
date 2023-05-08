import { DocumentData } from "firebase/firestore/lite"
import { Property } from "./property"

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

        // TESTING
        // const printString = Array.from(propertyData.keys()).toString()
        // const printString = typeof propertyData
        // props.set(printString, new Property(printString, {__typename: "type", basetype: "base"}))

        // for (const name of propertyData.keys()) {
        //   const value = propertyData.get(name)
        //   if (value === undefined) { continue }
        //   props.set(name, new Property(name, value))
        // }
        return props
      }
    }
  }