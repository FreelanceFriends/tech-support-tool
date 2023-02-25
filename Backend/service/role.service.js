const logger = require("../logger/api.logger");
const roleRepository = require("../repository/role.repository");


class RoleService {
    constructor() {}

    async getAllRoles() {
        logger.info("entering RoleService::getAllRoles")
        let roles = await roleRepository.getAllRoles();
        logger.info("exitting RoleService::getAllRoles")
        return roles
    }
    

    async getRole(name) {
        logger.info("entering RoleService::getRole")
        let role = await roleRepository.getRole(name)
        logger.info(`exiting RoleService::getRole role - ${role}`)
    }

    async createRole(payload) {
        logger.info("entering RoleService::createRole")
        let role = await roleRepository.createRole(payload)
        logger.info("exiting RoleService::createRole")
        return role
    }

    async updateRole(id, payload) {
        logger.info(`entering RoleService::updateRole ${id}`)
        let updatedRole = await roleRepository.updateRole(id, payload)
        logger.info(`exiting RoleService::updateRole`)
        return updatedRole
    }

    async deleteRole(id) {
        logger.info(`entering RoleService::deleteRole ${id}`)
        let deletedRole = await roleRepository.deleteRole(id)
        logger.info(`exitting RoleService::deleteRole`)
        return deletedRole
    }
}

module.exports = new RoleService()