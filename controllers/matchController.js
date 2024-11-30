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
    const { id, teamA, teamB, date, venue, created_by } = req.body;

    const existingMatch = await Match.findOne({ id });
    if (existingMatch) {
      return res.status(400).json({ msg: 'Match with this ID already exists.' });
    }

    const match = new Match({ id, teamA, teamB, date, venue, created_by });
    await match.save();

    res.status(201).json({ msg: 'Match created successfully.', match });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};

// Update match details (Admin only)
exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamA, teamB, date, venue, created_by } = req.body;

    const match = await Match.findOne({ id });
    if (!match) {
      return res.status(404).json({ msg: 'Match not found.' });
    }

    // Update nested fields for teamA and teamB
    if (teamA) {
      if (teamA.name !== undefined) match.teamA.name = teamA.name;
      if (teamA.logo !== undefined) match.teamA.logo = teamA.logo;
    }
    if (teamB) {
      if (teamB.name !== undefined) match.teamB.name = teamB.name;
      if (teamB.logo !== undefined) match.teamB.logo = teamB.logo;
    }

    // Update other fields
    if (date !== undefined) match.date = date;
    if (venue !== undefined) match.venue = venue;
    if (created_by !== undefined) match.created_by = created_by;

    await match.save();

    res.status(200).json({ msg: 'Match updated successfully.', match });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};


// Delete a match (Admin only)
exports.deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMatch = await Match.findOneAndDelete({ id });
    if (!deletedMatch) {
      return res.status(404).json({ msg: 'Match not found.' });
    }

    res.status(200).json({ msg: 'Match deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
};

// Get match details by ID
exports.getMatchDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findOne({ id });

    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    res.status(200).json(match); // Return match details
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
