const Match = require('../models/Match');

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    if (matches.length === 0) {
      return res.status(404).json({ msg: 'No matches found.' });
    }
    res.status(200).json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};

// Create a match (Admin only)
exports.createMatch = async (req, res) => {
  try {
    const { teamA, teamB, date, venue, chair } = req.body;
    const created_by = req.user.id;

    if (!teamA || !teamB || !date || !venue || !chair) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    const match = new Match({ teamA, teamB, date, venue, chair, created_by });
    await match.save();

    res.status(201).json({ msg: 'Match created successfully.', match });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.', error: err.message });
  }
};

// Update match details (Admin only)
exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamA, teamB, date, venue, chair } = req.body;
    const updated_by = req.user.id;

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found.' });
    }

    // Update only the fields that are provided
    match.teamA = teamA || match.teamA;
    match.teamB = teamB || match.teamB;
    match.date = date || match.date;
    match.venue = venue || match.venue;
    match.chair = chair || match.chair;
    match.updated_by = updated_by;
    match.updatedAt = new Date();

    await match.save();
    res.status(200).json({ msg: 'Match updated successfully.', match });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.', error: err.message });
  }
};

// Delete a match (Admin only)
exports.deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMatch = await Match.findByIdAndDelete(id);
    if (!deletedMatch) {
      return res.status(404).json({ msg: 'Match not found.' });
    }

    res.status(200).json({ msg: 'Match deleted successfully.', match: deletedMatch });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.', error: err.message });
  }
};

// Get match details by ID
exports.getMatchDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    res.status(200).json(match); // Return match details
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
