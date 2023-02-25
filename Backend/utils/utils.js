const bcrypt = require("bcryptjs");
const logger = require("../logger/api.logger");
const { Role } = require("../model/role.model");
const jwt = require("jsonwebtoken")
const Datatype = require("mongoose").Types


const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const hashPassword = function(next) {
    const user = this
    if(!user) {
        throw new Error("User not found!!")
    }
    // get password from both new and update payload
    let password = user?.password ?? user._update.password
    // isModified only availble on new document
    let isModified = user?.isModified ? user.isModified('password') : undefined
    
    if(isModified || user?.isNew || user?._update?.password) {
        bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_COUNT), (saltErr, salt) => {
            if(saltErr) return next(saltErr)
            else {
                bcrypt.hash(password, salt, (hashErr, hash) => {
                    if(hashErr) return next(hashErr)
                    
                    // Apply has on new document
                    if(user?.password) {
                        user.password = hash
                    }
                    
                    // Apply hash on update
                    if(user?._update?.password) {
                        user["_update"]["password"] = hash
                    }
                    
                    next()
                })
            }
        })
    }
    else {
        return next()
    }
}


const comapreHashPassword = async function(password) {
    if(!password) throw new Error("Password is missing, Unable to proceed!!")

    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch(err) {
        logger.error(err.message)
    }
}

const checkValidUserRole = async (role_name) => {
    if(!role_name) {
        return null
    }
    try {
        let role = await Role.findOne({name: role_name})
        return role
    } catch(error) {
        logger.error(error.message)
        return null
    }
}

const createJsonToken = (user) => {
    let token = jwt.sign(
    { email: user.email, role: user.role.name, userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "12h" }
  );
  return token
}

// Finds whether the user requested with _id for ticekt_id
const getTicketIdFilter = (id) => {
    let filter = {}
    if(id.includes("INC")) {
        filter = {ticket_id: id}
    } else {
        filter = {_id: Datatype.ObjectId(id)}
    }
    return filter
}

module.exports = {
    validateEmail,
    hashPassword,
    comapreHashPassword,
    checkValidUserRole,
    createJsonToken,
    getTicketIdFilter
}



