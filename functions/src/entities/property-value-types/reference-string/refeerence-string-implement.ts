import { PropertyValueRef } from "../property-value/property-value-ref";
import { StringPropertyValue } from "../string-property-value/string-property-value";
import { StringPropertyValueRef } from "../string-property-value/string-property-value-ref";
import { ReferenceStringRef } from "./reference-string-ref";


export function setupReferenceString() {

    ReferenceStringRef.implement({
        description: 'A reference string',
        interfaces: [StringPropertyValueRef, PropertyValueRef],
        isTypeOf: (value) => isReferenceString(value),
    })
}

function isReferenceString(toBeDetermined: unknown): toBeDetermined is StringPropertyValue {
    if ((toBeDetermined as StringPropertyValue).__typename == "ReferenceString") {
        return true
    }
    return false
}