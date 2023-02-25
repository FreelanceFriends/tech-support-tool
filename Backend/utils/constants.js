const PAGE_SIZE = 25

const TICKET_NOT_AUTH_ERROR = "You are not authorized to do this action"


const userRoles = {
    user: "USER",
    admin: "ADMIN",
    technician: "TECHNICIAN"
}


const ticketSeverity = {
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH"
}

const ticketStatus = {
    new: "NEW",
    open: "OPEN",
    closed: "CLOSED"
}

module.exports = {
    PAGE_SIZE,
    TICKET_NOT_AUTH_ERROR,
    userRoles,
    ticketSeverity,
    ticketStatus
}