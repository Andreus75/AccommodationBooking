const O_Auth = require('../dataBase/O_Auth');
const User = require('../dataBase/User');
const {
    SuccessOK,
    USER_IS_ACTIVE,
    TO_MACH_LOGINS,
    ClientErrorConflict
} = require('../configs/error_enum');
const { jwtService } = require('../services');
const { userNormalization } = require('../util/user.util');

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
    }
};

