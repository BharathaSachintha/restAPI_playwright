const { test, expect } = require('@playwright/test')
const RestFullAPIService = require('../../functions/restfulAPI/RestFullAPIService').default
const { DataGenerator } = require('../../support/dataGenerator/actions/randomDataGenerator/DataGenerator')
const { EnumsValues, HttpStatusCode } = require('../../support/utils/enums/Enums')
const { TestAssertions } = require('../../support/utils/TestAssertions')

test.describe('RestAPI Tests for Objects', () => {
    let createdObjectId

    test('should get all objects with validation', async ({ request }) => {

        const objects = await RestFullAPIService.getAllObjects(request)
        
        expect(Array.isArray(objects)).toBeTruthy()
        expect(objects.length).toBeGreaterThan(0)
    })

    test('should create a new object with random data', async ({ request }) => {

        const randomData = DataGenerator.generateDeviceData()
        const createdObject = await RestFullAPIService.createObject(request, randomData)
        
        expect(createdObject.name).toBe(randomData.name)
        expect(createdObject.data).toEqual(randomData.data)
        createdObjectId = createdObject.id
    })

    test('should get single object using created ID', async ({ request }) => {

        expect(createdObjectId).toBeDefined()
        
        const object = await RestFullAPIService.getObjectById(request, createdObjectId)
        TestAssertions.validateDeviceDataStructure(object.data)
    })

    test('should update existing object with new data', async ({ request }) => {

        // First, get the current object data
        const currentObject = await RestFullAPIService.getObjectById(request, createdObjectId)

        // Prepare update data
        const updateData = {
            name: `${currentObject.name} (Updated)`,
            data: {
                ...currentObject.data,
                price: DataGenerator.getRandomPrice(),
                "Hard disk size": EnumsValues.STORAGE.SIZE_2TB,
                year: new Date().getFullYear()
            }
        }

        // Update the object
        const updatedObject = await RestFullAPIService.updateObject(request, createdObjectId, updateData)
        TestAssertions.validateUpdatedObject(updatedObject, updateData, createdObjectId)

        // Verify update with a GET request
        const verifiedObject = await RestFullAPIService.getObjectById(request, createdObjectId)
        TestAssertions.validateUpdatedObject(verifiedObject, updateData, createdObjectId)
    })

    test('should perform complete CRUD flow', async ({ request }) => {

        // CREATE
        const newData = DataGenerator.generateDeviceData({
            data: {
                "CPU model": `${EnumsValues.CPU.GENERATIONS.GEN_12} ${EnumsValues.CPU.BRANDS.AMD_R7}`,
                "Hard disk size": EnumsValues.STORAGE.SIZE_512
            }
        })
        
        const createdObject = await RestFullAPIService.createObject(request, newData)
        TestAssertions.validateObjectProperties(createdObject, newData)
        const objectId = createdObject.id

        // READ
        const retrievedObject = await RestFullAPIService.getObjectById(request, objectId)
        TestAssertions.validateObjectProperties(retrievedObject, newData)

        // UPDATE
        const updateData = {
            name: `${newData.name} (Modified)`,
            data: {
                ...newData.data,
                year: new Date().getFullYear(),
                price: DataGenerator.getRandomPrice(),
                "Hard disk size": EnumsValues.STORAGE.SIZE_1TB
            }
        }

        const updatedObject = await RestFullAPIService.updateObject(request, objectId, updateData)
        TestAssertions.validateUpdatedObject(updatedObject, updateData, objectId)

        // DELETE
        await RestFullAPIService.deleteObject(request, objectId)

        // Verify DELETE with GET - Should return 404
        const deleteStatus = await RestFullAPIService.verifyObjectDeleted(request, objectId)
        expect(deleteStatus).toBe(HttpStatusCode.NOT_FOUND)
    })
})