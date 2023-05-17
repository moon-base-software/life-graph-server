import { PropertyRef } from "../property/property-ref";
import { NodeInputRef } from "./node-input-ref";

NodeInputRef.implement({
    fields: (t) => ({
      typename: t.string({ required: true }),
      properties?: t.field({
        type: [PropertyRef]
      }),
    }),
  })
