const logger = require("../logger/api.logger");
const { Ticket } = require("../model/ticket.model");
const { PAGE_SIZE } = require("../utils/constants");

const Datatype = require("mongoose").Types

class TicketRepository {
    constructor() {}

    async createTicket(payload) {
        logger.info("entering TicketRepository::createTicket")
        let ticket = await Ticket.create(payload);
        logger.info(" exitting TicketRepository::createTicket Success")
        return ticket.populate([
            {path: "created_by", select: "firstname lastname email -_id"},
            {path: "assigned_to", select: "firstname lastname email -_id"}
        ]);
    }

    async getTicket(filter) {
        logger.info(`entering TicketRepository::getTicket Id: ${JSON.stringify(filter)}`)
        let ticket = await Ticket.findOne(filter).populate([
            {path: "created_by", select: "firstname lastname email -_id"},
            {path: "assigned_to", select: "firstname lastname email -_id"}
        ]);
        logger.info(`exitting TicketRepository::getTicket Success`)
        return ticket
    }

    async getAllTickets(filters, sort, pageNo) {
        logger.info("entering TicketRepository::getAllTickets")
        const tickets = await Ticket.find(filters).limit(PAGE_SIZE).skip(pageNo*PAGE_SIZE).sort(sort).populate([
            {path: "created_by", select: "firstname lastname email -_id"},
            {path: "assigned_to", select: "firstname lastname email -_id"}
        ]);
        logger.info(" exitting TicketRepository::getAllTickets Success")
        return tickets;
    }

    async updateTicket(filter, payload) {
        logger.info(`entering TicketRepository::updateTicket id - ${filter}`)
        
        let ticket = await Ticket.findOneAndUpdate(filter, payload, {
            new: true
        })
        logger.info(`exiting TicketRepository::updateTicket Sucess! ticket - ${ticket}`)
        return ticket.populate([
            {path: "created_by", select: "firstname lastname email -_id"},
            {path: "assigned_to", select: "firstname lastname email -_id"}
        ]);
    }

    async deleteTicket(filter) {
        logger.info(`entering TicketRepository::deleteTicket id - ${filter}`)
        let ticket = await Ticket.deleteOne(filter);
        logger.info(`exitting TicketRepository::deleteTicket Success! ticket - ${ticket}`)
        return ticket
    }   
}

module.exports = new TicketRepository()