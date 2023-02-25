const { userSchema } = require("../validators/user-schema.validator");
const response = require("../utils/response");


const validateUserSchema = async(req, res, next) => {
    try { 
        if(req.method === "POST" || req.method === "PUT") {
            await userSchema.validateAsync(req.body, {allowUnknown: false, stripUnknown: true})
        }
        next();
    } catch (error) {
      return response.error(res, 400, error.message)
    }
};

module.exports = {
    validateUserSchema
}
