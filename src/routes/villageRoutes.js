const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const villageController = require('../controllers/villageController');

// Get all villages and create new village
router.route('/').get(authenticateToken, villageController.getVillages).post(authenticateToken, villageController.createVillage);

// Get, update and delete specific village
router.route('/:id').get(authenticateToken, villageController.getVillage).patch(authenticateToken, villageController.updateVillage).delete(authenticateToken, villageController.deleteVillage);

module.exports = router;
