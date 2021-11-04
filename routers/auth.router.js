const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.passwordAndEmailValidator),
    authMiddleware.authUserToEmail,
    authMiddleware.authUserToPassword,
    authController.login);

router.post('/logout');

router.get('/activate/:token', authMiddleware.checkActivateToken, authController.activate);

module.exports = router;
