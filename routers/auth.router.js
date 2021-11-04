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

router.post('/logout', authController.logout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.login);

router.get('/activate/:token', authMiddleware.checkActivateToken, authController.activate);

router.post('/password/forgot',
    userMiddleware.isEmailValid(userValidator.emailValidator),
    authController.sendMailForgotPassword);

router.put('/password/forgot',
    userMiddleware.isPasswordValid(userValidator.passwordValidator),
    authMiddleware.chekAccessNewToken,
    authController.setNewPasswordAfterForgot);

module.exports = router;
