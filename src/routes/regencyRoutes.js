const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const regencyController = require('../controllers/regencyController');

// Get all regencies and create new regency
router.route('/').get(authenticateToken, regencyController.getRegencies).post(authenticateToken, regencyController.createRegency);

// Get districts by regency
router.get('/:regency_id/districts', authenticateToken, regencyController.getDistrictsByRegency);

// Get, update and delete specific regency
router.route('/:id').get(authenticateToken, regencyController.getRegency).patch(authenticateToken, regencyController.updateRegency).delete(authenticateToken, regencyController.deleteRegency);

module.exports = router;
