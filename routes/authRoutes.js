const express = require('express');
const { createMatch, deleteMatch, getMatchDetail } = require('../controllers/matchController'); // Import functions
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Routes for matches
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/create', createMatch);             // Create a new match
router.delete('/delete/:id', deleteMatch);       // Delete a match by ID
router.get('/detail/:id', getMatchDetail);       // Get match details by ID

module.exports = router;
