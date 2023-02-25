const logger = require("../logger/api.logger");
const ticketService = require("../service/ticket.service");
const response = require("../utils/response");
const { userRoles, ticketSeverity, ticketStatus, TICKET_NOT_AUTH_ERROR } = require("../utils/constants");


class TicketController {
    constructor() {}

    async getAllTickets(req, res, next) {
        logger.info("TicketController::getAllTickets")
        let role = req?.userData?.role
        console.log(req?.userData?.role)
        let myUserId = req.userData.userId
        if(!role) {
            return response.error(res, 401)
        }
        try {
            let tickets = await ticketService.getAllTickets(role, myUserId, req.query)
            return response.success(res, 200, "fetch", tickets)
        } catch(error) {
            logger.error(`TicketController::getAllTicket ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }
    
    async getTicket(req, res, next) {
        logger.info("TicketController::getTicket")
        let ticketId = req.params.id
        let role = req.userData.role
        let userId = req.userData.userId
        try {
            let ticket = await ticketService.getTicket(ticketId, role, userId)
            if(!ticket) {
                return response.error(res, 404)
            }
            return response.success(res, 200, "fetch", ticket)
        } catch(error) {
            logger.error(`TicketController::getTicket ${error.message}`)
            return response.error(res, 500, error.message)
        }
    }

    async createTicket(req, res, next) {
        logger.info("TicketController::createTicket")
        let payload = req.body
        if (!req?.userData?.userId) {
            return response.error(res, 401)
        }
        
        if(payload.comment) {
            delete payload.comment
        }
        if(payload.status) {
            delete payload.status
        }
        if(payload.assigned_to) {
            delete payload.assigned_to
        }
        if(payload.ticket_id) {
            delete payload.ticket_id
        }

        // set the loggedin user as ticket creator
        payload["created_by"] = req.userData.userId
        
        try {
            let ticket = await ticketService.createTicket(payload)
            return response.success(res, 201, "create", ticket)
        } catch (err) {
            logger.error(`TicketController::createTicket ${err.message}`)
            return response.error(res, 400, err.message)
        }
    }

    async updateTicket(req, res, next) {
        logger.info("TicketController::updateTicket")
        let ticketId = req.params.id
        let payload = req.body
        let role = req.userData.role
        let userId = req.userData.userId
        
        if(payload.ticket_id) {
            delete payload.ticket_id
        }
        if(role === userRoles.user && payload.status) {
            return response.error(res, 401, TICKET_NOT_AUTH_ERROR)
        }
        if(role === userRoles.user && payload.severity) {
            return response.error(res, 401, TICKET_NOT_AUTH_ERROR)
        }
        if(role === userRoles.user && payload.assigned_to) {
            return response.error(res, 401, TICKET_NOT_AUTH_ERROR)
        }
        if(role === userRoles.user && payload?.comment) {
            return response.error(res, 401, TICKET_NOT_AUTH_ERROR)
        }
        if((role === userRoles.technician) && (payload.status === ticketStatus.closed) && !payload.comment) {
            return response.err(res, 400,  "Seems like you are an Technician, Tying to close a ticket. Please provide comment")
        }

        try {
            let ticket = await ticketService.updateTicket(ticketId, role, userId, payload)
            if(!ticket) {
                return response.error(res, 404)
            }
            return response.success(res, 200, "update", ticket)
        } catch (err) {
            logger.error(`TicketController::updateTicket ${err.message}`)
            return response.error(res, 500, err.message)
        }
    }

    async deleteTicket(req, res, next) {
        logger.info("TicketController::deleteTicket")
        let ticketId = req.params.id
        let role = req.userData.role
        let userId = req.userData.userId
        try {
            let ticket = await ticketService.deleteTicket(ticketId, role, userId)
            if(!ticket || ticket.deletedCount === 0) {
                return response.error(res, 404)
            }
            return response.success(res, 204, "delete", ticket)
        } catch (err) {
            logger.error(`TicketController::deleteTicket ${err.message}`)
            return response.error(res, 500, err.message)
        }
    }
    
}

module.exports = new TicketController()