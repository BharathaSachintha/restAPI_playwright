class AuthManager
{
    constructor()
    {
        this.authToken = null
        this.refreshToken = null
        this.tokenType = 'Bearer'
        this.expiresIn = null
    }

    /**
     * Set authentication tokens
     * @param {Object} tokenData - Token data from authentication response
     */
    setTokens(tokenData)
    {
        this.authToken = tokenData.access_token
        this.refreshToken = tokenData.refresh_token
        this.tokenType = tokenData.token_type || 'Bearer'
        this.expiresIn = tokenData.expires_in
        
        // Set expiry time if expires_in is provided
        if (this.expiresIn)
        {
            this.expiryTime = new Date(Date.now() + this.expiresIn * 1000)
        }
    }

    /**
     * Get authorization header
     * @returns {Object} Headers with authorization
     */
    getAuthHeader()
    {
        if (!this.authToken)
        {
            throw new Error('No authentication token available')
        }
        return {
            'Authorization': `${this.tokenType} ${this.authToken}`
        }
    }

    /**
     * Check if token is expired
     * @returns {boolean}
     */
    isTokenExpired()
    {
        if (!this.expiryTime) return false
        // Add buffer of 60 seconds
        return Date.now() >= (this.expiryTime.getTime() - 60000)
    }

    /**
     * Refresh authentication token
     * @param {Object} request - Playwright request object
     * @param {string} refreshEndpoint - Refresh token endpoint
     */
    async refreshAuthToken(request, refreshEndpoint)
    {
        if (!this.refreshToken)
        {
            throw new Error('No refresh token available')
        }

        try
        {
            const response = await request.post(refreshEndpoint, {
                data: {
                    refresh_token: this.refreshToken
                }
            })

            const tokenData = await response.json()
            this.setTokens(tokenData)
            return this.authToken
        }
        catch (error)
        {
            throw new Error(`Failed to refresh token: ${error.message}`)
        }
    }

    /**
     * Clear authentication tokens
     */
    clearTokens()
    {
        this.authToken = null
        this.refreshToken = null
        this.expiryTime = null
    }

    /**
     * Get current token status
     * @returns {Object} Token status
     */
    getTokenStatus()
    {
        return {
            hasToken: !!this.authToken,
            isExpired: this.isTokenExpired(),
            expiresIn: this.expiryTime ? 
                Math.max(0, Math.floor((this.expiryTime - Date.now()) / 1000)) : 
                null
        }
    }
}

module.exports = { AuthManager }