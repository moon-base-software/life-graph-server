import { StringPropertyValue } from "./string-property-value";

export class GivenNamePropertyValue extends StringPropertyValue {

    constructor(data: {__typename: string, basetype: string, stringValue: string}) {
        super(data)
    }
}
