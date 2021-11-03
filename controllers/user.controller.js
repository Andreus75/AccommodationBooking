const User = require('../dataBase/User');
const userUtil = require('../util/user.util');

const Action = require('../dataBase/Action');
const { passwordService, jwtService, emailService } = require('../services');
const { SuccessCreated } = require('../configs/error_enum');
const { ACTION } = require('../configs/action_token_type_enam');
const { WELCOME } = require('../configs/email_action_enum');


module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            const userNormalise = userUtil.userNormalization(user);

            res.json(userNormalise);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { email, name } = req.body;

            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const token = jwtService.createActivateToken();

            await Action.create({ token, type: ACTION, user_id: newUser._id });

            await emailService.sendEmail(email, WELCOME, { userName: name, token });

            const newUserNormalise = userUtil.userNormaliseToAuth(newUser);

            res.status(SuccessCreated).json(newUserNormalise);
        } catch (e) {
            next(e);
        }
    }
};
