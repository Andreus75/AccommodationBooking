const {
    INVALID_TOKEN,
    ClientErrorUnauthorized,
    EMAIL_OR_PASSWORD_IS_WRONG,
    ClientErrorNotFound
} = require('../configs');
const { jwtService, passwordService} = require('../services');
const { actionTokenTypeEnum } = require('../configs');
const Action = require('../dataBase/Action');
const ErrorHandler = require('../errors/ErrorHandler');
const User = require('../dataBase/User');

module.exports = {
    checkActivateToken: async (req, res, next) => {
        try {
            const { token } = req.params;

            await jwtService.verifyToken(token, actionTokenTypeEnum.ACTION);

            const { user_id: user, _id } = await Action.findOne({ token, type: actionTokenTypeEnum.ACTION }).populate('user_id');

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

    }
};
