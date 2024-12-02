const mongoose = require('mongoose');

// Define the Match Schema
const MatchSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  teamA: {
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  teamB: {
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  chair: {
    type: Number,
    required: true
  },
  created_by: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updated_by: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

}, { timestamps: true }); // Enable createdAt and updatedAt

module.exports = mongoose.model('Match', MatchSchema);
