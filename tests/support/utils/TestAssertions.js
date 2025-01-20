const {expect} = require("@playwright/test");

class TestAssertions {
    /**
     * Validates common object properties and structure
     * @param {Object} object - The object to validate
     * @param {Object} expectedData - The expected data to compare against
     */
    static validateObjectProperties(object, expectedData) {
        expect(object).toBeDefined()
        expect(object.id).toBeDefined()
        expect(object.name).toBe(expectedData.name)
        expect(object.data).toEqual(expectedData.data)
    }

    /**
     * Validates device data structure and types
     * @param {Object} deviceData - The device data object to validate
     */
    static validateDeviceDataStructure(deviceData) {
        // Validate data structure
        expect(deviceData).toHaveProperty('year')
        expect(deviceData).toHaveProperty('price')
        expect(deviceData).toHaveProperty('CPU model')
        expect(deviceData).toHaveProperty('Hard disk size')
        
        // Validate data types
        expect(typeof deviceData.year).toBe('number')
        expect(typeof deviceData.price).toBe('number')
        expect(typeof deviceData["CPU model"]).toBe('string')
        expect(typeof deviceData["Hard disk size"]).toBe('string')
    }

    /**
     * Validates updated object matches expected changes
     * @param {Object} updatedObject - The updated object
     * @param {Object} expectedData - The expected data after update
     * @param {string} objectId - The ID of the object
     */
    static validateUpdatedObject(updatedObject, expectedData, objectId) {
        expect(updatedObject.id).toBe(objectId)
        expect(updatedObject.name).toBe(expectedData.name)
        expect(updatedObject.data).toEqual(expectedData.data)
    }
}

module.exports = { TestAssertions } 