const Joi = require('joi');
const { ticketSeverity, ticketStatus } = require('../utils/constants');

console.log(ticketSeverity)
const ticketQueryParamSchema = Joi.object({
    description: Joi.string().min(4),

    title: Joi.string()
        .min(2)
        .max(100),
    
    severity: Joi.string()
        .min(3)
        .max(10)
        .valid(ticketSeverity.high, ticketSeverity.medium, ticketSeverity.low),
    
    status: Joi.string()
        .min(3)
        .max(10)
        .valid(ticketStatus.new, ticketStatus.open, ticketStatus.closed),
    
    assigned_to: Joi.string()
        .min(4)
        .max(60),
    created_by: Joi.string()
})

module.exports = {
    ticketQueryParamSchema
}

