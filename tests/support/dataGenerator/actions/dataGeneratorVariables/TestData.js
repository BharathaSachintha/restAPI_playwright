const { DataGenerator } = require('../randomDataGenerator/DataGenerator')
const { EnumsValues } = require('../../../utils/enums/Enums')
const APIEndpoints = require('../../../utils/config/APIConfig')

// Base device data with random values
const getBaseDeviceData = () => ({
    name: `Apple MacBook Pro ${EnumsValues.DEVICE.SIZES.S16}`,
    data: {
        year: DataGenerator.getRandomInt(2019, new Date().getFullYear()),
        price: DataGenerator.getRandomPrice(1500, 3000),
        "CPU model": `${DataGenerator.getRandomFromEnum(EnumsValues.CPU.GENERATIONS)} ${EnumsValues.CPU.BRANDS.INTEL_I9}`,
        "Hard disk size": DataGenerator.getRandomFromEnum(EnumsValues.STORAGE)
    }
})

// Generate new object with random data but maintaining structure
const newObjectData = DataGenerator.generateDeviceData({
    ...getBaseDeviceData()
})

// Generate update data with meaningful changes
const updateObjectData = {
    name: `${newObjectData.name} (Updated)`,
    data: {
        ...newObjectData.data,
        price: DataGenerator.getRandomPrice(3000, 4000),
        "Hard disk size": EnumsValues.STORAGE.SIZE_2TB,
        year: new Date().getFullYear()
    }
}

// Completely random test data
const randomTestData = DataGenerator.generateDeviceData()

// Generate multiple test devices with different configurations
const multipleDevices = Array.from({ length: 3 }, () => 
    DataGenerator.generateDeviceData({
        data: {
            "CPU model": `${DataGenerator.getRandomFromEnum(EnumsValues.CPU.GENERATIONS)} ${DataGenerator.getRandomFromEnum(EnumsValues.CPU.BRANDS)}`,
            "Hard disk size": DataGenerator.getRandomFromEnum(EnumsValues.STORAGE)
        }
    })
)

// Helper function to generate custom test data
const generateCustomTestData = (customConfig = {}) => {
    return DataGenerator.generateDeviceData({
        ...getBaseDeviceData(),
        ...customConfig
    })
}

// Query Parameters Examples
const queryParams = {
    // Single parameter
    singleParam: {
        id: '123'
    },
    
    // Multiple parameters
    multipleParams: {
        id: '123',
        bodyshop: '123',
        type: 'laptop'
    },
    
    // Filter parameters
    filterParams: {
        brand: EnumsValues.DEVICE.BRANDS.APPLE,
        year: '2023',
        price: '1000'
    }
}

// Usage examples in tests:
const testUsage = async (apiUtils, request) => {
    // Example 1: Single parameter
    const singleParamResponse = await apiUtils.get(
        request,
        APIEndpoints.OBJECTS.BY_SINGLE_PARAM('123')
    )

    // Example 2: Multiple parameters using FILTER
    const multiParamResponse = await apiUtils.get(
        request,
        APIEndpoints.OBJECTS.FILTER(queryParams.multipleParams)
    )
    
    // Example 3: Using buildUrl method from APIUtils
    const url = apiUtils.buildUrl(
        APIEndpoints.OBJECTS.BASE,
        queryParams.filterParams
    )
}

module.exports = {
    newObjectData,
    updateObjectData,
    randomTestData,
    multipleDevices,
    generateCustomTestData,
    queryParams,
    testUsage
}