const logger = require("../logger/api.logger");
const userService = require("../service/user.service");
const response = require("../utils/response");
const { createJsonToken } = require("../utils/utils");

class UserController {
    constructor() {}

    async getAllUsers(req, res, next) {
        logger.info("UserController::getAllUsers")
        console.log(req.query)
        try {
            let users = await userService.getAllUsers()
            return response.success(res, 200, "fetch", users)
        } catch(error) {
            logger.error(`UserController::getAllUser ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }

    async getTechnicians(req, res, next) {
        logger.info("UserController::getTechnicians")
        try {
            let user = await userService.getTechnicians()
            if(!user) {
                return response.error(res, 404)
            }
            return response.success(res, 200, "fetch", user)
        } catch(error) {
            logger.error(`UserController::getTechnicians ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }
    
    async getUser(req, res, next) {
        logger.info("UserController::getUser")
        let userId = req.params.id
        try {
            let user = await userService.getUser(userId)
            if(!user) {
                return response.error(res, 404)
            }
            return response.success(res, 200, "fetch", user)
        } catch(error) {
            logger.error(`UserController::getUser ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }

    async loginUser(req, res, next) {
        logger.info("UserController::loginUser")
        let payload = req.body
        try {
            let {user, isLoginSuccess} = await userService.loginUser(payload)
            if(!isLoginSuccess) {
                return response.error(res, 401)
            }

            let token = createJsonToken(user)
            return response.success(res, 200, "fetch", {isLoggedIn: isLoginSuccess, token: token})
        } catch(error) {
            logger.error(`UserController::loginUser ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }

    async createUser(req, res, next) {
        logger.info("UserController::createUser")
        let payload = req.body
        try {
            let user = await userService.createUser(payload)
            return response.success(res, 201, "create", user)
        } catch (err) {
            logger.error(`UserController::createUser ${err.message}`)
            return response.error(res, 400, err.message)
        }
    }

    async updateUser(req, res, next) {
        logger.info("UserController::updateUser")
        let userId = req.params.id
        let payload = req.body
        if(!payload || Object.keys(payload).length === 0) {
            return response.error(res, 400)
        }
        try {
            let user = await userService.updateUser(userId, payload)
            if(!user) {
                return response.error(res, 404)
            }
            return response.success(res, 200, "update", user)
        } catch (err) {
            logger.error(`UserController::updateUser ${err.message}`)
            return response.error(res, 500, err.message)
        }
    }

    async deleteUser(req, res, next) {
        logger.info("UserController::deleteUser")
        let userId = req.params.id
        try {
            let user = await userService.deleteUser(userId)
            if(!user || user.deletedCount === 0) {
                return response.error(res, 404)
            }
            return response.success(res, 204, "delete", user)
        } catch (err) {
            logger.error(`UserController::deleteUser ${err.message}`)
            return response.error(res, 500, err.message)
        }
    }
    
}

module.exports = new UserController()