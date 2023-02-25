const response = require("../utils/response");
const { ticketQueryParamSchema } = require("../validators/ticket-query.validator");


const validateUserSchema = async(req, res, next) => {
    const joiOptions = {allowUnknown: false, stripUnknown: true}
    try { 
        if(req.method === "POST" || req.method === "PUT") {
            await ticketQueryParamSchema.validateAsync(req.body, joiOptions)
        }

        if(req.method === "GET") {
            await ticketQueryParamSchema.validateAsync(req.query, joiOptions)
        }
        next();
    } catch (error) {
      return response.error(res, 400, error.message)
    }
};

module.exports = {
    validateUserSchema
}
