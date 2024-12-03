const mongoose = require('mongoose');

const BuyingTicketSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('BuyingTicket', BuyingTicketSchema);
