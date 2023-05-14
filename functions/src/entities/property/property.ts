import { PropertyValue } from "../property-value-types/property-value/property-value"
import { StringPropertyValue } from "../property-value-types/string-property-value/string-property-value"


export class Property {

    name: string 
    value: PropertyValue

    constructor(name: string, data: Object) {
        this.name = name

        if ("stringValue" in data) {
            this.value = new StringPropertyValue(data)
        } else {
            this.value = new PropertyValue(data)
        }
    }
}

//
// Might need to define a Unit or Series type.
//

// Can't have all subtypes work without loading them all in and Switching to building using the right object.
// So instead, maybe have the server always provide Nodes and Edges, with just properties in the base types.
// and have the client do the specificity based on a type name, maybe with a lookup.

