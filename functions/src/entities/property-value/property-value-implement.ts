import { PropertyValueRef } from "./property-value-ref"


export function setupPropertyValue() {

    PropertyValueRef.implement({
        description: 'The abstract property value',
        fields: (t) => ({
            basetype: t.exposeString('basetype', {}),
        })
    })
}


