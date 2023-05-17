import { builder } from "../../../architecture/schema-builder";
import { StringPropertyValue } from "../string-property-value/string-property-value";

export const ReferenceStringRef = builder.objectRef<StringPropertyValue>('ReferenceString')