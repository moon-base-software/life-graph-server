import { PropertyValueRef } from "./property-value-ref";

PropertyValueRef.implement({
    description: 'The abstract property value',
    fields: (t) => ({
        basetype: t.exposeString('basetype', {}),
    })
})
