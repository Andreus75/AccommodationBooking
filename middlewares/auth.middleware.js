const {
    errorEnum: { INVALID_TOKEN, ClientErrorUnauthorized, EMAIL_OR_PASSWORD_IS_WRONG, ClientErrorNotFound},
    constants: { AUTHORIZATION }

} = require('../configs');
const { jwtService, passwordService} = require('../services');
const { tokenTypeEnum } = require('../configs');
const Action = require('../dataBase/Action');
const ErrorHandler = require('../errors/ErrorHandler');
const ActionForgot = require('../dataBase/Action_forgot');
const O_Auth = require('../dataBase/O_Auth');
const User = require('../dataBase/User');

module.exports = {
    checkActivateToken: async (req, res, next) => {
        try {
            const { token } = req.params;

            await jwtService.verifyToken(token, tokenTypeEnum.ACTION);

            const { user_id: user, _id } = await Action.findOne({ token, type: tokenTypeEnum.ACTION }).populate('user_id');

            if (!user) {
                throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
            }

            await Action.deleteOne({ _id });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN+ 'token',
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token, tokenTypeEnum.ACCESS);

            const tokenResponse = await O_Auth.findOne( { access_token: token }).populate('user_id');

            if (!tokenResponse) {
                return next({
                    message: INVALID_TOKEN+ 'tokenResponse',
                    status: ClientErrorUnauthorized
                });
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth.findOne({ refresh_token: token }).populate('user_id');

            if (!tokenResponse) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            request.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    authUserToEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User
                .findOne({ email })
                .select('+password')
                .lean();

            if (!userByEmail) {
                return next({
                    message: EMAIL_OR_PASSWORD_IS_WRONG,
                    status: ClientErrorNotFound
                });
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    authUserToPassword: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }

    },

    chekAccessNewToken: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token, tokenTypeEnum.FORGOT_PASSWORD);

            const tokenForgotNew = await ActionForgot
                .findOne({ token, type: tokenTypeEnum.FORGOT_PASSWORD })
                .populate('user_id');

            if (!tokenForgotNew) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            request.user = tokenForgotNew.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
