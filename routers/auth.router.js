const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.get('/activate/:token', authMiddleware.checkActivateToken, authController.activate);

module.exports = router;
