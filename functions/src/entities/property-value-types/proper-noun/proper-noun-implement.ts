import { PropertyValueRef } from "../property-value/property-value-ref"
import { StringPropertyValueRef } from "../string-property-value/string-property-value-ref"
import { ProperNounRef } from "./proper-noun-ref"

export function setupProperNoun() {

    ProperNounRef.implement({
        description: 'A proper noun value',
        interfaces: [StringPropertyValueRef, PropertyValueRef],
    })
}
