const router = require('express').Router();

const { bookingMiddleware, authMiddleware } = require('../middlewares');
const { bookingController } = require('../controllers');

router.use(authMiddleware.checkAccessToken);

router.post('/:apartment_id', bookingMiddleware.calculationPrice, bookingController.createBooking);

module.exports = router;
