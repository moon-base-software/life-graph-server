import { GraphQLScalarType, Kind } from "graphql";
import { GeoPoint } from 'firebase/firestore/lite';

class GeoPointLike {
    latitude: number
    longitude: number

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude
        this.longitude = longitude
    }
}

export const GeoPointScalar = new GraphQLScalarType({
    name: "GeoPoint",
    description: "Firebase GeoPoint scalar type",
    serialize(value: unknown): Object {
        // check the type of received value
        if (!(value instanceof GeoPoint)) {
            throw new Error("GeoPointScalar can only serialize GeoPoint values")
        }
        return { "lat": value.latitude, "lon": value.longitude };
    },
    parseValue(value: unknown): GeoPoint {
        // check the type of received value
        if (typeof value !== "object" || value === undefined || value == null) {
            throw new Error("GeoPointScalar can only parse object values")
        }
        const geoPoint = value as GeoPointLike
        const lat = geoPoint.latitude
        const lon = geoPoint.longitude
        if (lat === undefined || lon === undefined) {
            throw new Error("GeoPointScalar can only parse objects with the right information")
        }
        return new GeoPoint(lat, lon)
    },
    parseLiteral(ast): GeoPoint {
        // check the type of received value
        if (ast.kind !== Kind.OBJECT) {
            throw new Error("GeoPointScalar can only parse object values");
        }
        const geoPoint = ast as unknown as GeoPointLike
        const lat = geoPoint.latitude
        const lon = geoPoint.longitude
        if (lat === undefined || lon === undefined) {
            throw new Error("GeoPointScalar can only parse objects with the right information")
        }
        return new GeoPoint(lat, lon)
    },
});