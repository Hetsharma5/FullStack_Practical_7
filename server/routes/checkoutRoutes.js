const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/checkoutController');
const { protect } = require('../middleware/authMiddleware');

router.post('/pay', protect, processPayment);

module.exports = router;
