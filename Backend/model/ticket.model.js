const mongoose = require("mongoose")
const { ticketStatus, ticketSeverity } = require("../utils/constants")


const Schema = mongoose.Schema


const ticketSchema = new Schema({
    ticket_id: {
        type: String,
        unique: true,
        index: true,
        default: generate = () =>{
            return `INC${Date.now() % 1000000}`
        }
    },
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: 4

    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 4
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        enum: [ticketStatus.new, ticketStatus.open, ticketStatus.closed],
        default: ticketStatus.new
    },
    severity: {
        type: String,
        enum: [ticketSeverity.low, ticketSeverity.medium, ticketSeverity.high],
        default: ticketSeverity.low
    },
    comment: {
        type: String,
        trim: true,
        minLength: 4,
    }
}, { timestamps: { createDate: "created_at", updatedDate: "updated_at" } })

const Ticket = mongoose.model("ticket", ticketSchema, "ticket");

module.exports = {
    Ticket
}
