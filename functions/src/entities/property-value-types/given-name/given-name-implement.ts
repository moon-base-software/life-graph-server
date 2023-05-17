import { ProperNounRef } from "../proper-noun/proper-noun-ref";
import { PropertyValueRef } from "../property-value/property-value-ref";
import { StringPropertyValue } from "../string-property-value/string-property-value";
import { StringPropertyValueRef } from "../string-property-value/string-property-value-ref";
import { GivenNameRef } from "./given-name-ref";

export function setupGivenName() {

    GivenNameRef.implement({
        description: 'A given name',
        interfaces: [ProperNounRef, StringPropertyValueRef, PropertyValueRef],
        isTypeOf: (value) => isGivenName(value),
    })
}

function isGivenName(toBeDetermined: unknown): toBeDetermined is StringPropertyValue {
    if ((toBeDetermined as StringPropertyValue).__typename == "GivenName") {
        return true
    }
    return false
}
