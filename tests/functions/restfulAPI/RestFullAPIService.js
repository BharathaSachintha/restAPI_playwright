const { APIUtils } = require('../../support/utils/APIUtils')
const { APIEndpoints } = require('../../support/config/APIConfig')
const { HttpStatusCode } = require('../../support/utils/enums/Enums')

class RestFullAPIService
{
    constructor()
    {
        this.apiUtils = new APIUtils()
    }

    async getAllObjects(request)
    {
        const response = await this.apiUtils.get(request, APIEndpoints.OBJECTS.BASE)
        return this.apiUtils.validateResponse(response, HttpStatusCode.OK)
    }

    async createObject(request, data)
    {
        const response = await this.apiUtils.post(
            request,
            APIEndpoints.OBJECTS.BASE,
            data
        )
        return this.apiUtils.validateResponse(response, HttpStatusCode.OK)
    }

    async getObjectById(request, objectId)
    {
        const response = await this.apiUtils.get(
            request,
            APIEndpoints.OBJECTS.BY_ID(objectId)
        )
        return this.apiUtils.validateResponse(response, HttpStatusCode.OK)
    }

    async updateObject(request, objectId, updateData)
    {
        const response = await this.apiUtils.put(
            request,
            APIEndpoints.OBJECTS.BY_ID(objectId),
            updateData
        )
        return this.apiUtils.validateResponse(response, HttpStatusCode.OK)
    }

    async deleteObject(request, objectId)
    {
        const response = await this.apiUtils.delete(
            request,
            APIEndpoints.OBJECTS.BY_ID(objectId)
        )
        return this.apiUtils.validateResponse(response, HttpStatusCode.OK)
    }

    async verifyObjectDeleted(request, objectId)
    {
        const response = await this.apiUtils.get(
            request,
            APIEndpoints.OBJECTS.BY_ID(objectId)
        )
        return response.status()
    }
}

export default new RestFullAPIService()
