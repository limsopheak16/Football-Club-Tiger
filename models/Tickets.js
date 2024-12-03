const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available',
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true });

module.exports = mongoose.model('Tickets', TicketSchema);
