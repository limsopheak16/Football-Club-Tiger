const express = require('express');
const router = express.Router();
const BuyingTicketController = require('../controllers/BuyingTicketController');

// Get all buying tickets
router.get('/', BuyingTicketController.getAllBuyingTickets);

// Buy a ticket
router.post('/', BuyingTicketController.buyTicket);

// Cancel buying a ticket
router.delete('/:id', BuyingTicketController.cancelBuyingTicket);

module.exports = router;
