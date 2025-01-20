const DeviceEnums = {
    CPU: {
        BRANDS: {
            INTEL_I5: 'Intel Core i5',
            INTEL_I7: 'Intel Core i7',
            INTEL_I9: 'Intel Core i9',
            AMD_R5: 'AMD Ryzen 5',
            AMD_R7: 'AMD Ryzen 7',
            AMD_R9: 'AMD Ryzen 9'
        },
        GENERATIONS: {
            GEN_11: '11th Gen',
            GEN_12: '12th Gen',
            GEN_13: '13th Gen'
        }
    },

    STORAGE: {
        SIZE_256: '256 GB',
        SIZE_512: '512 GB',
        SIZE_1TB: '1 TB',
        SIZE_2TB: '2 TB',
        SIZE_4TB: '4 TB'
    },

    DEVICE: {
        BRANDS: {
            APPLE: 'Apple',
            DELL: 'Dell',
            HP: 'HP',
            LENOVO: 'Lenovo',
            ASUS: 'ASUS'
        },
        SERIES: {
            MACBOOK: 'MacBook Pro',
            XPS: 'XPS',
            SPECTRE: 'Spectre',
            THINKPAD: 'ThinkPad',
            ZENBOOK: 'ZenBook'
        },
        SIZES: {
            S13: '13',
            S14: '14',
            S15: '15',
            S16: '16',
            S17: '17'
        }
    }
}

const HttpStatusCode = {
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
        // Add other status codes as needed
}

const getEnumValues = (enumObj) => Object.values(enumObj)

module.exports = {
    EnumsValues: DeviceEnums,
    HttpStatusCode,
    getEnumValues
}