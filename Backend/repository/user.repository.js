const logger = require("../logger/api.logger");
const { User } = require("../model/user.model");
const { userRoles } = require("../utils/constants");
const { checkValidUserRole} = require("../utils/utils");

const Datatype = require("mongoose").Types

class UserRepository {
    constructor() {}

    async createUser(payload) {
        logger.info("entering UserRepository::createUser")
        let role = await checkValidUserRole(userRoles.user)
        if(payload.role) {
            role = await checkValidUserRole(payload.role.toUpperCase())
        }

        if(!role) {
            throw Error(`Invalid Role ${payload.role}`)
        }
        
        if(role) payload.role = role
        
        let user = await User.create(payload)
        logger.info(" exitting UserRepository::createUser Success")
        return user.populate([
            {path: "role", select: "name role_id -_id"}
        ]);
    }

    async getUser(id) {
        logger.info(`entering UserRepository::getUser Id: ${id}`)
        let user = await User.findOne({_id: Datatype.ObjectId(id)}).populate([
            {path: "role", select: "name role_id -_id"}
        ])
        logger.info(`exitting UserRepository::getUser Success`)
        return user;
    }

    async getTechnicians(role_id) {
        logger.info(`entering UserRepository::getTechnicians Id: ${role_id}`)
        let user = await User.findOne({role: role_id}).populate([
            {path: "role", select: "name role_id -_id"}
        ])
        logger.info(`exitting UserRepository::getTechnicians Success`)
        return user;
    }

    async getAllUsers() {
        logger.info("entering UserRepository::getAllUsers")
        const users = await User.find({}).populate([
            {path: "role", select: "name role_id -_id"}
        ]);
        logger.info(" exitting UserRepository::getAllUsers Success")
        return users;
    }

    async loginUser(email, password) {
        logger.info("entering UserRepository::loginUser")
        let user = await User.findOne({email: email}).populate([
            {path: "role", select: "name role_id -_id"}
        ])
        let isPasswordMatch = false
        if(user) {
            isPasswordMatch = await user.comparePassword(password)
        }
        logger.info(`exitting UserRepository::loginUser isMatch ${isPasswordMatch}`)
        return {user, isPasswordMatch}
    }

    async updateUser(id, payload) {
        logger.info(`entering UserRepository::updateUser id - ${id}`)
        let filter = {_id: Datatype.ObjectId(id) };
        let user = await User.findOneAndUpdate(filter, payload, {
            new: true
        }).populate([
            {path: "role", select: "name role_id -_id"}
        ])
        logger.info(`exiting UserRepository::updateUser Sucess! user - ${user}`)
        return user;
    }

    async deleteUser(id) {
        logger.info(`entering UserRepository::deleteUser id - ${id}`)
        let filter = {_id: Datatype.ObjectId(id)};
        let user = await User.deleteOne(filter);
        logger.info(`exitting UserRepository::deleteUser Success! user - ${user}`)
        return user
    }   
}

module.exports = new UserRepository()