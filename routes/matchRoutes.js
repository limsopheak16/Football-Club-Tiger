const express = require('express');
const router = express.Router();

const {
  getAllMatches,
  createMatch,
  updateMatch,
  deleteMatch,
  getMatchDetail,
} = require('../controllers/matchController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Define routes
router.get('/', authMiddleware, getAllMatches);
router.post('/create', authMiddleware, roleMiddleware('admin'), createMatch);
router.put('/update/:id', authMiddleware, roleMiddleware('admin'), updateMatch); // Updated route for updating match
router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), deleteMatch);
router.get('/get/:id', authMiddleware, getMatchDetail);

module.exports = router;
