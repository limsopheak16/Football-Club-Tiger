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


// Admin-only routes
router.post('/create', authMiddleware, roleMiddleware('admin'), createMatch);
router.put('/update/:id', authMiddleware, roleMiddleware('admin'), updateMatch);
router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), deleteMatch);

// Public routes
router.get('/all', authMiddleware, getAllMatches);
router.get('/:id', authMiddleware, getMatchDetail);

module.exports = router;
