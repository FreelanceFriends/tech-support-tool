const mongoose = require("mongoose")
const { userRoles } = require("../utils/constants")
const AutoIncrement = require("mongoose-sequence")(mongoose)

const Schema = mongoose.Schema

const roleSchema = new Schema({
    role_id: {
        type: Number,
        unique: true,
        index: true
    },
    name: {
        type: String,
        enum: [userRoles.user, userRoles.admin, userRoles.technician],
        required: [true, "role name is Mandatory"]
    },
})

roleSchema.plugin(AutoIncrement, {id: "role_seq", inc_field: "role_id", start_seq: 1, inc_amount: 1})

const Role = mongoose.model("role", roleSchema, "role");

module.exports = {
    Role
}
