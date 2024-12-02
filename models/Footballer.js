const mongoose = require('mongoose');

const FootballerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the user who created the entry
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the user who last updated the entry
    ref: 'User',
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Footballer', FootballerSchema);
