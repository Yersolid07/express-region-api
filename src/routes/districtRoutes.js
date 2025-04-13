const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const districtController = require('../controllers/districtController');

// Get all districts and create new district
router.route('/').get(authenticateToken, districtController.getDistricts).post(authenticateToken, districtController.createDistrict);

// Get villages by district
router.get('/:district_id/villages', authenticateToken, districtController.getVillagesByDistrict);

// Get, update and delete specific district
router.route('/:id').get(authenticateToken, districtController.getDistrict).patch(authenticateToken, districtController.updateDistrict).delete(authenticateToken, districtController.deleteDistrict);

module.exports = router;
