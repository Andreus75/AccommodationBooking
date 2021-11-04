const ActionForgot = require('../dataBase/Action_forgot');
const O_Auth = require('../dataBase/O_Auth');
const User = require('../dataBase/User');
const {
    SuccessOK,
    USER_IS_ACTIVE,
    TO_MACH_LOGINS,
    ClientErrorConflict,
    USER_NOT_FOUND,
    ClientErrorNotFound
} = require('../configs/error_enum');
const { jwtService, emailService, passwordService} = require('../services');
const { userNormalization } = require('../util/user.util');
const {
    tokenTypeEnum,
    config: { HTTP },
    constants: { AUTHORIZATION },
    emailActionEnum
} = require('../configs');

module.exports = {
    activate: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await User.updateOne({_id}, {is_active: true});

            res.status(SuccessOK).json(USER_IS_ACTIVE);
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const { user } = req;

            const tokenPair = jwtService.generateTokenPair();

            user.is_login = true;

            await User.updateOne(user, {is_login: true});

            const logCount = await O_Auth.count({ user_id: user._id});

            if (logCount > 10) {
                return next({
                    message: TO_MACH_LOGINS,
                    status: ClientErrorConflict
                });
            }

            const userNormalised = userNormalization(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalised._id
            });

            res.json({
                user: userNormalised,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const userToken = await O_Auth.findOne({access_token: token});

            const user = await User.findOne({_id: userToken.user_id});

            await User.updateOne(user, { is_login: false});

            await O_Auth.deleteOne({access_token: token});

            res.json('logout');
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (request, response, next) => {
        try {
            const { email } = request.body;

            const user = await User.findOne({email});

            if (!user) {
                return next({
                    message: USER_NOT_FOUND,
                    status: ClientErrorNotFound
                });
            }

            const actionForgotToken = jwtService.generateForgotActionToken(tokenTypeEnum.FORGOT_PASSWORD);

            await ActionForgot.create({
                token_forgot: actionForgotToken,
                token_type: tokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: HTTP + `passwordForgot?token=${actionForgotToken}`});

            response.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);

            const { user, user: { _id, email, name }} = request;

            const { password } = request.body;

            const hashNewPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate(_id, { password: hashNewPassword });

            await ActionForgot.deleteOne({ token });

            await O_Auth.deleteMany({user_id: user._id});

            await emailService.sendMail(
                email,
                emailActionEnum.CHANGE_FORGOT_PASSWORD,
                { userName: name});

            response.jsonp('ok');
        } catch (e) {
            next(e);
        }
    }
};

