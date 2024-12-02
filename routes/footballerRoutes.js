const express = require('express');
const { 
  addFootballer, 
  updateFootballer, 
  getAllFootballers, 
  getFootballerById, 
  deleteFootballer ,
} = require('../controllers/footballerController');

const authMiddleware = require('../middleware/authMiddleware'); 
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Admin-only routes
router.post('/add', authMiddleware, roleMiddleware('admin'), addFootballer); 
router.put('/update/:id', authMiddleware, roleMiddleware('admin'), updateFootballer);
router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), deleteFootballer); // Admin-only delete route

// Public routes for both admin and users
router.get('/all', authMiddleware, getAllFootballers); 
router.get('/:id', authMiddleware, getFootballerById);

module.exports = router;
