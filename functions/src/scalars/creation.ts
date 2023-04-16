import { GeoPoint } from "firebase/firestore/lite";
import { GraphQLScalarType, Kind } from "graphql";

export class CreationLike {
    dateTime: Date
    localTimezone: String
    location: GeoPoint | undefined

    constructor(dateTime: Date, localTimezone: String, location: GeoPoint | undefined) {
        this.dateTime = dateTime
        this.localTimezone = localTimezone
        this.location = location
    }
}

export const CreationScalar = new GraphQLScalarType({
    name: "Creation",
    description: "Details relating to an objects creation",
    serialize(value: unknown): Object {
        // check the type of received value
        if (typeof value !== "object" || value === undefined || value == null) {
            throw new Error("CreationScalar can only parse object values")
        }
        const creation = value as CreationLike
        const dateTime = creation.dateTime
        const localTimezone = creation.localTimezone
        const location = creation.location
        if (dateTime === undefined || localTimezone === undefined) {
            throw new Error("CreationScalar can only parse objects with the right information")
        }

        if (location === undefined) {
            return { "dateTime": dateTime, "localTimeZone": localTimezone, "location": { "lat" : location!.latitude, "lon" : location!.longitude } }
        } else {
            return { "dateTime": dateTime, "localTimeZone": localTimezone, "location": null }
        }
    },
    parseValue(value: unknown): CreationLike {
        // check the type of received value
        if (typeof value !== "object" || value === undefined || value == null) {
            throw new Error("CreationScalar can only parse object values")
        }
        const creation = value as CreationLike
        const dateTime = creation.dateTime
        const localTimezone = creation.localTimezone
        const location = creation.location
        if (dateTime === undefined || localTimezone === undefined) {
            throw new Error("CreationScalar can only parse objects with the right information")
        }
        return new CreationLike(dateTime, localTimezone, location)
    },
    parseLiteral(ast): CreationLike {
        // check the type of received value
        if (ast.kind !== Kind.OBJECT) {
            throw new Error("CreationScalar can only parse object values");
        }
        const creation = ast as unknown as CreationLike
        const dateTime = creation.dateTime
        const localTimezone = creation.localTimezone
        const location = creation.location
        if (dateTime === undefined || localTimezone === undefined) {
            throw new Error("CreationScalar can only parse objects with the right information")
        }
        return new CreationLike(dateTime, localTimezone, location)
    },
});