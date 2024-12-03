const Ticket = require('../models/Tickets');

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    if (tickets.length === 0) {
      return res.status(404).json({ msg: 'No tickets found.' });
    }
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};


exports.createTicket = async (req, res) => {
    try {
      // Ensure req.user exists and contains the id
      if (!req.user || !req.user.id) {
        return res.status(400).json({ msg: 'User information is missing from the token.' });
      }
  
      const { match_id, price, availability } = req.body;
      const created_by = req.user.id; // Get user ID from the token
  
      const ticket = new Ticket({ match_id, price, availability, created_by });
      await ticket.save();
  
      res.status(201).json({ msg: 'Ticket created successfully.', ticket });
    } catch (err) {
      console.error('Create Ticket Error:', err.message);
      res.status(500).json({ msg: 'Server error.', error: err.message });
    }
  };
  
  
  
// Update a ticket (Admin only)
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, availability } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found.' });
    }

    ticket.price = price || ticket.price;
    ticket.availability = availability || ticket.availability;

    await ticket.save();

    res.status(200).json({ msg: 'Ticket updated successfully.', ticket });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};

// Delete a ticket (Admin only)
exports.deleteTicket = async (req, res) => {
    try {
      const { id } = req.params;
  
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket not found.' });
      }
  
      res.status(200).json({ msg: 'Ticket deleted successfully.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error.' });
    }
  };

// Get ticket details by ID
exports.getTicketDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate('match_id');

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found.' });
    }

    res.status(200).json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};
