const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.createUserValidator),
    userMiddleware.checkEmail,
    userController.createUser);

router.get('/', userController.getUsers);

router.get('/:user_id', userMiddleware.findUserById, userController.getUserById);
module.exports = router;
