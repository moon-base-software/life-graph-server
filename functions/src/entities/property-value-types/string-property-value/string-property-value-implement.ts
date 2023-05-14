import { PropertyValueRef } from "../property-value/property-value-ref";
import { StringPropertyValueRef } from "./string-property-value-ref";

export function setupStringPropertyValue() {

StringPropertyValueRef.implement({
    description: 'A string property value',
    interfaces: [PropertyValueRef],
    fields: (t) => ({
        stringValue: t.exposeString('stringValue', {}),
    })
})
}