const logger = require("../logger/api.logger");
const roleRepository = require("../repository/role.repository");
const userRepository = require("../repository/user.repository");
const { userRoles } = require("../utils/constants");


class UserService {
    constructor() {}

    async getAllUsers() {
        logger.info("entering UserService::getAllUsers")
        let users = await userRepository.getAllUsers();
        logger.info("exitting UserService::getAllUsers")
        return users
    }

    async getTechnicians() {
        logger.info("entering UserService::getTechnicians")
        let technicianRole = await roleRepository.getRole(userRoles.technician)
        let technicians = await userRepository.getTechnicians(technicianRole._id);
        logger.info("exitting UserService::getTechnicians")
        return technicians
    }

    async getUser(id) {
        logger.info("entering UserService::getUser")
        let user = await userRepository.getUser(id)
        logger.info(`exiting UserService::getUser user - ${user}`)
        return user
    }

    async loginUser(payload) {
        logger.info("entering UserService::loginUser")
        let email = payload.email
        let password = payload.password
        let {user, isPasswordMatch: isLoginSuccess} = await userRepository.loginUser(email, password)
        logger.info("exiting UserService::loginUser ")
        return {user, isLoginSuccess}

    }

    async createUser(payload) {
        logger.info("entering UserService::createUser")
        let user = await userRepository.createUser(payload)
        logger.info("exiting UserService::createUser")
        return user
    }

    async updateUser(id, payload) {
        logger.info(`entering UserService::updateUser ${id}`)
        let updatedUser = await userRepository.updateUser(id, payload)
        logger.info(`exiting UserService::updateUser`)
        return updatedUser
    }

    async deleteUser(id) {
        logger.info(`entering UserService::deleteUser ${id}`)
        let deletedUser = await userRepository.deleteUser(id)
        logger.info(`exitting UserService::deleteUser`)
        return deletedUser
    }
}

module.exports = new UserService()