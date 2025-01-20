const { apiConfig } = require('../config/APIConfig')
const { Logger } = require('./log/Logger')

class APIUtils
{
    /**
     * Initialize testCaseAPI Utils
     * @param {string} baseURL - Base URL of the testCaseAPI
     * @param {Object} defaultHeaders - Default headers to be sent with each request
     */
    constructor(customConfig = {})
    {
        this.config = {
            ...apiConfig,
            ...customConfig
        }
        
        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    /**
     * Validates the response status and body
     * @param {Response} response - The testCaseAPI response object
     * @param {number} expectedStatus - Expected HTTP status code
     * @returns {Promise<any>} - Parsed response body
     */
    async validateResponse(response, expectedStatus)
    {
        const responseBody = await response.json()
        
        // Log response details
        await Logger.logResponse(response, responseBody)

        if (response.status() !== expectedStatus)
        {
            const error = new Error(`Expected status ${expectedStatus} but got ${response.status()}`)
            await Logger.logError(error)
            throw error
        }

        if (!responseBody)
        {
            const error = new Error('Response body is empty')
            await Logger.logError(error)
            throw error
        }

        return responseBody
    }

    /**
     * Validates object properties
     * @param {Object} object - Object to validate
     * @param {Array<string>} requiredProps - Array of required property names
     */
    validateObjectProperties(object, requiredProps)
    {
        for (const prop of requiredProps)
        {
            if (!(prop in object))
            {
                throw new Error(`Missing required property: ${prop}`)
            }
        }
    }

    /**
     * Build URL with query parameters
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} queryParams - Query parameters
     * @returns {string} - Complete URL
     */
    buildUrl(endpoint, queryParams = {})
    {
        const url = new URL(endpoint, this.config.baseURL)
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.append(key, value)
        })
        return url.toString()
    }

    /**
     * Make HTTP request
     * @param {Object} request - Playwright request object
     * @param {string} method - HTTP method
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} options - Request options
     */
    async makeRequest(request, method, endpoint, options = {})
    {
        try
        {
            const url = this.buildUrl(endpoint, options.queryParams)
            const requestOptions = {
                ...options,
                headers: {
                    ...this.defaultHeaders,
                    ...options.headers
                }
            }

            // Log request details
            await Logger.logRequest(method, url, options.data)

            const response = await request[method.toLowerCase()](url, requestOptions)
            return response
        }
        catch (error)
        {
            await Logger.logError(error)
            throw error
        }
    }

    /**
     * GET request
     * @param {Object} request - Playwright request object
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} options - Request options
     */
    async get(request, endpoint, options = {})
    {
        return this.makeRequest(request, 'GET', endpoint, options)
    }

    /**
     * POST request
     * @param {Object} request - Playwright request object
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} data - Request payload
     * @param {Object} options - Additional request options
     */
    async post(request, endpoint, data, options = {})
    {
        return this.makeRequest(request, 'POST', endpoint, {
            ...options,
            data
        })
    }

    /**
     * PUT request
     * @param {Object} request - Playwright request object
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} data - Request payload
     * @param {Object} options - Additional request options
     */
    async put(request, endpoint, data, options = {})
    {
        return this.makeRequest(request, 'PUT', endpoint, {
            ...options,
            data
        })
    }

    /**
     * DELETE request
     * @param {Object} request - Playwright request object
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} options - Request options
     */
    async delete(request, endpoint, options = {})
    {
        return this.makeRequest(request, 'DELETE', endpoint, options)
    }

    /**
     * PATCH request
     * @param {Object} request - Playwright request object
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} data - Request payload
     * @param {Object} options - Additional request options
     */
    async patch(request, endpoint, data, options = {})
    {
        return this.makeRequest(request, 'PATCH', endpoint, {
            ...options,
            data
        })
    }

    /**
     * Verify response schema
     * @param {Object} response - Response object
     * @param {Object} schema - Expected schema
     */
    validateSchema(response, schema)
    {
        Object.entries(schema).forEach(([key, type]) => {
            if (!(key in response))
            {
                throw new Error(`Missing required field: ${key}`)
            }
            if (typeof response[key] !== type)
            {
                throw new Error(`Invalid type for ${key}: expected ${type}, got ${typeof response[key]}`)
            }
        })
    }

    /**
     * Handle pagination
     * @param {Object} request - Playwright request object
     * @param {string} endpoint - testCaseAPI endpoint
     * @param {Object} paginationConfig - Pagination configuration
     * @param {string} statusCode - status Code configuration
     */
    async getPaginatedResults(request, endpoint, paginationConfig,statusCode)
    {
        const results = []
        let currentPage = 1
        let hasMore = true

        while (hasMore)
        {
            const response = await this.get(request, endpoint, {
                queryParams: {
                    ...paginationConfig,
                    page: currentPage
                }
            })

            const data = await this.validateResponse(response,statusCode)
            results.push(...data.items)

            hasMore = currentPage < data.totalPages
            currentPage++
        }

        return results
    }

    /**
     * Retry request with exponential backoff
     * @param {Function} requestFn - Request function to retry
     * @param {Object} options - Retry options
     */
    async retryRequest(requestFn, options = {
        maxRetries: 3,
        initialDelay: 1000,
        maxDelay: 5000
    }) {
        let lastError
        let delay = options.initialDelay

        for (let attempt = 1; attempt <= options.maxRetries; attempt++)
        {
            try
            {
                return await requestFn()
            }
            catch (error)
            {
                lastError = error
                if (attempt === options.maxRetries) break

                await new Promise(resolve => setTimeout(resolve, delay))
                delay = Math.min(delay * 2, options.maxDelay)
            }
        }

        throw lastError
    }
}

module.exports = { APIUtils }