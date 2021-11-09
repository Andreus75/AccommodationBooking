const { Error } = require('mongoose');

const User = require('../dataBase/User');
const {
    EMAIL_ALREADY_EXIST,
    ClientErrorNotFound,
    ClientErrorBadRequest,
    USER_WITH_THIS_ID_IS_MISSING,
    USER_IS_NOT_ACTIVE,
    ClientErrorForbidden,
    NOT_PERMISSION
} = require('../configs/error_enum');

module.exports = {
    checkEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                return next({
                    message: EMAIL_ALREADY_EXIST,
                    status: ClientErrorNotFound
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRole: (req, res, next) => {
        try {
            const { role } = req.body;

            if (role !== 'user') {
                return next({
                    message: NOT_PERMISSION,
                    status: ClientErrorBadRequest
                });
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const { error, value } = validator.validate(req.body);

            req.body = value;

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailValid: (validator) => (req, res, next) => {
        try {
            const email = req.body;

            const { error, value } = validator.validate(email);

            req.body = value;

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordValid: (validator) => (req, res, next) => {
        try {
            const password = req.body;

            const { error, value } = validator.validate(password);

            req.body = value;

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserActive: (request, response, next) => {
        try {
            const {user} = request;

            if (!user.is_active) {
                return next({
                    message: USER_IS_NOT_ACTIVE,
                    status: ClientErrorForbidden
                });
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    findUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return next({
                    message: USER_WITH_THIS_ID_IS_MISSING,
                    status: ClientErrorNotFound
                });
            }

            req.userUpdate = user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
