const { INVALID_TOKEN, ClientErrorUnauthorized } = require('../configs');
const { jwtService } = require('../services');
const { actionTokenTypeEnum } = require('../configs');
const Action = require('../dataBase/Action');
const ErrorHandler = require('../errors/ErrorHandler');

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
    }
};
