import { PropertyValueRef } from "../property-value/property-value-ref";
import { PropertyRef } from "./property-ref";

PropertyRef.implement({
    description: 'Property on a node',
    fields: (t) => ({
        name: t.exposeString('name', {}),
        value: t.field({
            type: PropertyValueRef,
            resolve: (parent) => parent.value,
        }),
    })
})
