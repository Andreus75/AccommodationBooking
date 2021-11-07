const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');

router.post(
    '/',
    userMiddleware.checkRole,
    userMiddleware.isUserBodyValid(userValidator.createUserValidator),
    userMiddleware.checkEmail,
    userController.createUser);

router.use(authMiddleware.checkAccessToken, userMiddleware.isUserActive);

router.get('/', userController.getUsers);

router.get('/:user_id', userMiddleware.findUserById, userController.getUserById);

router.delete('/', authMiddleware.checkAccessToken, userController.deleteUser);

module.exports = router;
