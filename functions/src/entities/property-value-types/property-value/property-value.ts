
export class PropertyValue {

    __typename: string
    basetype: string
    data: any

    constructor(data: Object) {

        type ObjectKey = keyof typeof data
        const typeName = data["__typename" as ObjectKey] as unknown as string
        const baseType = data["basetype" as ObjectKey] as unknown as string

        this.__typename = typeName
        this.basetype = baseType
        this.data = data
    }
}
