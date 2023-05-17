import { builder } from "../../../architecture/schema-builder";
import { StringPropertyValue } from "../string-property-value/string-property-value";

export const GivenNameRef = builder.objectRef<StringPropertyValue>('GivenName')
