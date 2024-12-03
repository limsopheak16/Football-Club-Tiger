const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Get all tickets
router.get('/all', TicketController.getAllTickets);

// Get ticket details by ID
router.get('/:id', TicketController.getTicketDetail);

// Create a ticket (Admin only)
router.post('/create', authMiddleware, roleMiddleware('admin'), TicketController.createTicket);

// Update a ticket (Admin only)
router.put('/update/:id', authMiddleware, roleMiddleware('admin'), TicketController.updateTicket);

// Delete a ticket (Admin only)
router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), TicketController.deleteTicket);

module.exports = router;
