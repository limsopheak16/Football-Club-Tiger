const BuyingTicket = require('../models/BuyingTicket');

// Get all buying tickets
exports.getAllBuyingTickets = async (req, res) => {
  try {
    const buyingTickets = await BuyingTicket.find().populate('user_id').populate('ticket_id');
    if (buyingTickets.length === 0) {
      return res.status(404).json({ msg: 'No buying tickets found.' });
    }
    res.status(200).json(buyingTickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};

// Create a buying ticket (User can buy a ticket)
exports.buyTicket = async (req, res) => {
  try {
    const { user_id, ticket_id } = req.body;

    const ticket = await Ticket.findById(ticket_id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found.' });
    }

    if (ticket.availability === 'sold') {
      return res.status(400).json({ msg: 'This ticket is already sold.' });
    }

    ticket.availability = 'sold';
    await ticket.save();

    const buyingTicket = new BuyingTicket({ user_id, ticket_id });
    await buyingTicket.save();

    res.status(201).json({ msg: 'Ticket bought successfully.', buyingTicket });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};

// Delete a buying ticket (User can cancel)
exports.cancelBuyingTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const buyingTicket = await BuyingTicket.findById(id);
    if (!buyingTicket) {
      return res.status(404).json({ msg: 'Buying ticket not found.' });
    }

    const ticket = await Ticket.findById(buyingTicket.ticket_id);
    ticket.availability = 'available';
    await ticket.save();

    await buyingTicket.remove();
    res.status(200).json({ msg: 'Buying ticket cancelled successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};
