const logger = require("../logger/api.logger");
const { Role } = require("../model/role.model");


class RoleRepository {
    constructor() {}

    async createRole(payload) {
        logger.info("entering RoleRepository::createRole")
        let role = await Role.create(payload);
        logger.info(" exitting RoleRepository::createRole Success")
        return role;
    }

    async getRole(name) {
        logger.info(`entering RoleRepository::getRole Id: ${id}`)
        let role = await Role.findOne({name: name});
        logger.info(`exitting RoleRepository::getRole Success`)
        return role
    }

    async getAllRoles() {
        logger.info("entering RoleRepository::getAllRoles")
        const roles = await Role.find({});
        logger.info(" exitting RoleRepository::getAllRoles Success")
        return roles;
    }

    async updateRole(id, payload) {
        logger.info(`entering RoleRepository::updateRole id - ${id}`)
        let filter = {role_id: parseInt(id) };
        let role = await Role.findOneAndUpdate(filter, payload, {
            new: true
        })
        logger.info(`exiting RoleRepository::updateRole Sucess! role - ${role}`)
        return role;
    }

    async deleteRole(id) {
        logger.info(`entering RoleRepository::deleteRole id - ${id}`)
        let filter = {role_id: parseInt(id)};
        let role = await Role.deleteOne(filter);
        logger.info(`exitting RoleRepository::deleteRole Success! role - ${role}`)
        return role
    }   
}

module.exports = new RoleRepository()