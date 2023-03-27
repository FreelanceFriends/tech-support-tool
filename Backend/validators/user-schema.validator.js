const Joi = require('joi');
const { userRoles } = require('../utils/constants');

const userSchema = Joi.object({
    firstname: Joi.string()
        .min(2)
        .max(100),
    
    lastname: Joi.string()
        .min(2)
        .max(100),
    
    password: Joi.string()
        .min(8)
        .max(32),
    
    email: Joi.string(),
       
    role: Joi.string().min(4).max(5)
        .valid(userRoles.user, userRoles.admin, userRoles.technician)
        .uppercase(),
})

module.exports = {
    userSchema
}

