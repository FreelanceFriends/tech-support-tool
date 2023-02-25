const ticketController = require("../controller/ticket.controller");
const router = require("express").Router()

router.route("/")
       .get(ticketController.getAllTickets)
       .post(ticketController.createTicket)

router.route("/:id")
        .get(ticketController.getTicket)
        .put(ticketController.updateTicket)
        .delete(ticketController.deleteTicket)

module.exports = router