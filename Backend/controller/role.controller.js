const logger = require("../logger/api.logger");
const roleService = require("../service/role.service");
const response = require("../utils/response")

class RoleController {
    constructor() {}

    async getAllRoles(req, res, next) {
        logger.info("RoleController::getAllRoles")
        try {
            let roles = await roleService.getAllRoles()
            return response.success(res, 200, "fetch", roles)
        } catch(error) {
            logger.error(`RoleController::getAllRole ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }
    
    async getRole(req, res, next) {
        logger.info("RoleController::getRole")
        let roleName = req.params.name
        try {
            let role = await roleService.getRole(roleName)
            if(!role) {
                return response.error(res, 404)
            }
            return response.success(res, 200, "fetch", role)
        } catch(error) {
            logger.error(`RoleController::getRole ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }

    async createRole(req, res, next) {
        logger.info("RoleController::createRole")
        let payload = req.body
        try {
            let role = await roleService.createRole(payload)
            return response.success(res, 201, "create", role)
        } catch (err) {
            logger.error(`RoleController::createRole ${err.message}`)
            return response.error(res, 400, err.message)
        }
    }

    async updateRole(req, res, next) {
        logger.info("RoleController::updateRole")
        let roleId = req.params.id
        let payload = req.body
        try {
            let role = await roleService.updateRole(roleId, payload)
            if(!role) {
                return response.error(res, 404)
            }
            return response.success(res, 200, "update", role)
        } catch (err) {
            logger.error(`RoleController::updateRole ${err.message}`)
            return response.error(res, 500, err.message)
        }
    }

    async deleteRole(req, res, next) {
        logger.info("RoleController::deleteRole")
        let roleId = req.params.id
        try {
            let role = await roleService.deleteRole(roleId)
            if(!role || role.deletedCount === 0) {
                return response.error(res, 404)
            }
            return response.success(res, 204, "delete", role)
        } catch (err) {
            logger.error(`RoleController::deleteRole ${err.message}`)
            return response.error(res, 500, err.message)
        }
    }
    
}

module.exports = new RoleController()