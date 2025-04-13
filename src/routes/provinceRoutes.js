const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const provinceController = require('../controllers/provinceController');

// Get all provinces and create new province
router.route('/').get(authenticateToken, provinceController.getProvinces).post(authenticateToken, provinceController.createProvince);

// Get regencies by province
router.get('/:province_id/regencies', authenticateToken, provinceController.getRegenciesByProvince);

// Get, update and delete specific province
router.route('/:id').get(authenticateToken, provinceController.getProvince).patch(authenticateToken, provinceController.updateProvince).delete(authenticateToken, provinceController.deleteProvince);

module.exports = router;
