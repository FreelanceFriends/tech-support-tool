const mongoose = require("mongoose")
const { validateEmail, hashPassword, comapreHashPassword } = require("../utils/utils")

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, "Firstname is Mandatory"]
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, "Lastname is Mandatory"]
    },
    email: {
        type: String,
        required: [true, "Email is Mandatory"],
        unique: true,
        validate: [validateEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "role",
    },
    phone: {
        type: String
    }
})

userSchema.pre("save", hashPassword)

userSchema.pre("findOneAndUpdate", hashPassword)

userSchema.methods.comparePassword = comapreHashPassword


const User = mongoose.model("user", userSchema, "user");

module.exports = {
    User
}
