import { PropertyValue } from "./property-value";

export class StringPropertyValue extends PropertyValue {

    // stringValue: string

    constructor(data: Object) {
        super(data)
        // type ObjectKey = keyof typeof data
        // const stringValue = data["stringValue" as ObjectKey] as unknown as string
        // this.stringValue = stringValue
    }

    get stringValue(): string {
        type ObjectKey = keyof typeof this.data
        return this.data["stringValue" as ObjectKey] as unknown as string
    }
}
