const { test } = require('@playwright/test')

class Logger
{
    static async logRequest(method, url, data = null)
    {
        const logMessage = [
            '\n=== Request ===',
            `${method} ${url}`,
            data ? `Request Body: ${JSON.stringify(data, null, 2)}` : '',
        ].join('\n')

        console.log(logMessage)

        // Add to HTML report
        await test.info().attach('testCaseAPI Request', {
            body: logMessage,
            contentType: 'text/plain'
        })
    }

    static async logResponse(response, body)
    {
        const logMessage = [
            '\n=== Response ===',
            `Status: ${response.status()}`,
            `Status Text: ${response.statusText()}`,
            `Response Body: ${JSON.stringify(body, null, 2)}`,
            '=============\n'
        ].join('\n')

        console.log(logMessage)

        // Add to HTML report
        await test.info().attach('testCaseAPI Response', {
            body: logMessage,
            contentType: 'text/plain'
        })

        // Add the raw response body
        await test.info().attach('Response Body', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json'
        })
    }

    static async logError(error)
    {
        const logMessage = [
            '\n=== Error ===',
            `Message: ${error.message}`,
            `Stack: ${error.stack}`,
            '=============\n'
        ].join('\n')

        console.error(logMessage)

        // Add to HTML report
        await test.info().attach('testCaseAPI Error', {
            body: logMessage,
            contentType: 'text/plain'
        })
    }
}

module.exports = { Logger }; 