import { setupPropertyValue } from "./property-value/property-value-implement"
import { setupStringPropertyValue } from "./string-property-value/string-property-value-implement"

export function registerPropertyBaseTypes() {

    setupPropertyValue()
    setupStringPropertyValue()
}