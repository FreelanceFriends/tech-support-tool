const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const logger = require("../logger/api.logger");



const checkAuth = (req, res, next) => {
    if(!req?.headers?.authorization?.split(" ")?.length > 0) {
        return response.error(res, 401)
    }
    try { 
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify( token, process.env.SECRET_KEY); 
        req.userData = {
           email: decodedToken.email,
           userId: decodedToken.userId,
           role: decodedToken.role
        };
        console.log(req.userData)
        next();
    } catch (error) {
        logger.error(error.message)
        return response.error(res, 401, error.message)
    }
};

module.exports = {
    checkAuth
}