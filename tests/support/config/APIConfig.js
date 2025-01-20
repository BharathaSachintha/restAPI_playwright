class APIEndpoints
{
    static get OBJECTS()
    {
        return {
            BASE: '/objects',
            BY_ID: (id) => `/objects/${id}`,
            BY_SINGLE_PARAM: (param) => `/objects?id=${param}`,
            BATCH: '/objects/batch',
            FILTER: (params) => `/objects?${new URLSearchParams(params).toString()}`
        }
    }

    static get HEALTH()
    {
        return '/health'
    }

    // Add other endpoint categories as needed
}

const APIConfig = {
    baseURL: process.env.API_BASE_URL,
    timeout: parseInt(process.env.API_TIMEOUT),
    version: process.env.API_VERSION,
    endpoints: APIEndpoints
}

module.exports = { apiConfig: APIConfig, APIEndpoints }