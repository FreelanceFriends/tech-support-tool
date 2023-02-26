const logger = require("../logger/api.logger");
const { userRoles, ticketStatus } = require("../utils/constants");
const ticketRepository = require("../repository/ticket.repository");
const userRepository = require("../repository/user.repository");
const { getTicketIdFilter } = require("../utils/utils");
const Datatype = require("mongoose").Types

class TicketService {
    constructor() {}

    async getAllTickets(role, userId, queryParams) {
        logger.info("entering TicketService::getAllTickets")
        let filters = {}
        let pageNo = 0
        let sort = queryParams.sort ? queryParams.sort : undefined 
        if(queryParams.page) {
            pageNo = Math.max(0, queryParams?.page);
        } 
        
        if(role === userRoles?.user) {
            filters = {created_by: Datatype.ObjectId(userId)}
        }
        if(role === userRoles?.technician) {
            filters = {assigned_to: Datatype.ObjectId(userId)}
        }
        if(queryParams?.status) {
            filters["status"] = queryParams.status
        }
        if(queryParams?.severity) {
            filters["severity"] = queryParams.severity
        }
        if(queryParams.title) {
            filters["title"] = queryParams.title
        }
        if(queryParams.ticketNo) {
            filters["ticket_id"] = queryParams.ticketNo
        }
        logger.info(`entering TicketService::getAllTickets filters - ${filters}  sort - ${sort}  page-no - ${pageNo}`)
        let tickets = await ticketRepository.getAllTickets(filters, sort, pageNo);
        logger.info("exitting TicketService::getAllTickets")
        return tickets
    }


    async getTicket(id, role, userId) {
        logger.info("entering TicketService::getTicket")
        let filter = getTicketIdFilter(id)
        if(role === userRoles.user) {
            filter["created_by"] = Datatype.ObjectId(userId)
        }
        let ticket = await ticketRepository.getTicket(filter)
        logger.info(`exiting TicketService::getTicket ticket - ${ticket}`)
        return ticket
    }

    async createTicket(payload) {
        logger.info("entering TicketService::createTicket")
        payload["created_by"] = await userRepository.getUser(payload["created_by"])
        let ticket = await ticketRepository.createTicket(payload)
        logger.info("exiting TicketService::createTicket")
        return ticket
    }

    async updateTicket(id, role, userId, payload) {
        logger.info(`entering TicketService::updateTicket ${id}`)
        if(payload.assigned_to) {
            let assignedUser = await userRepository.getUser(payload.assigned_to)
            if(!assignedUser || assignedUser?.role?.name !== userRoles.technician) {
                throw new Error("assigned_to user not found. Maybe not a technician !!")
            }
            payload.assigned_to = assignedUser
            payload["status"] = ticketStatus.open
        }
        let filter = getTicketIdFilter(id)
        let updatedTicket = await ticketRepository.updateTicket(filter, payload)
        logger.info(`exiting TicketService::updateTicket`)
        return updatedTicket
    }

    async deleteTicket(id, role, userId) {
        logger.info(`entering TicketService::deleteTicket ${id}`)
        if(role === userRoles.user) {
            filter["created_by"] = Datatype.ObjectId(userId)
        }
        let filter = getTicketIdFilter(id)
        let deletedTicket = await ticketRepository.deleteTicket(filter)
        logger.info(`exitting TicketService::deleteTicket`)
        return deletedTicket
    }
}

module.exports = new TicketService()