const { EnumsValues, getEnumValues } = require('../../../utils/enums/Enums')

class DataGenerator
{
    static getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    static getRandomPrice(min = 1000, max = 3000)
    {
        return Number((Math.random() * (max - min) + min).toFixed(2))
    }

    static getRandomFromEnum(enumObj)
    {
        const values = getEnumValues(enumObj)
        return values[Math.floor(Math.random() * values.length)]
    }

    static getRandomCPUModel()
    {
        const randomBrand = this.getRandomFromEnum(EnumsValues.CPU.BRANDS)
        const randomGen = this.getRandomFromEnum(EnumsValues.CPU.GENERATIONS)
        
        return `${randomGen} ${randomBrand}`
    }

    static getRandomStorage()
    {
        return this.getRandomFromEnum(EnumsValues.STORAGE)
    }

    static getRandomDeviceName()
    {
        const randomBrand = this.getRandomFromEnum(EnumsValues.DEVICE.BRANDS)
        const randomSeries = this.getRandomFromEnum(EnumsValues.DEVICE.SERIES)
        const randomSize = this.getRandomFromEnum(EnumsValues.DEVICE.SIZES)

        return `${randomBrand} ${randomSeries} ${randomSize}`
    }

    /**
     * Generate random device data
     * @param {Object} overrides - Optional properties to override random values
     * @returns {Object} Device data object
     */
    static generateDeviceData(overrides = {})
    {
        const currentYear = new Date().getFullYear()
        
        const defaultData = {
            name: this.getRandomDeviceName(),
            data: {
                year: this.getRandomInt(currentYear - 3, currentYear),
                price: this.getRandomPrice(),
                "CPU model": this.getRandomCPUModel(),
                "Hard disk size": this.getRandomStorage()
            }
        }

        return {
            ...defaultData,
            data: {
                ...defaultData.data,
                ...(overrides.data || {})
            },
            ...(overrides.name ? { name: overrides.name } : {})
        }
    }

    /**
     * Generate multiple random device data
     * @param {number} count - Number of devices to generate
     * @returns {Array<Object>} Array of device data objects
     */
    static generateMultipleDevices(count = 1)
    {
        return Array.from({ length: count }, () => this.generateDeviceData())
    }

    /**
     * Generate updated device data based on original
     * @param {Object} originalData - Original device data
     * @returns {Object} Updated device data
     */
    static generateUpdatedData(originalData)
    {
        const updatedData = this.generateDeviceData()
        return {
            name: `${originalData.name} (Updated)`,
            data: {
                ...originalData.data,
                price: this.getRandomPrice(),
                "Hard disk size": this.getRandomStorage()
            }
        }
    }
}

module.exports = { DataGenerator }