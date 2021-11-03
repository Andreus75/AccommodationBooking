const jwt = require('jsonwebtoken');

const { JWT_ACTION_SECRET } = require('../configs/config');
const actionTokenTypeEnum = require('../configs/action_token_type_enam');
const ErrorHandler = require('../errors/ErrorHandler');
const { INVALID_TOKEN, ClientErrorUnauthorized } = require('../configs/error_enum');

module.exports = {
    verifyToken: async (token, tokenType = actionTokenTypeEnum.ACTION) => {
        try {
            let secret = '';

            switch (tokenType) {
                case actionTokenTypeEnum.ACTION:
                    secret = JWT_ACTION_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
        }

    },

    createActivateToken: () => {
        const activate_token = jwt.sign({}, JWT_ACTION_SECRET, { expiresIn: '24h' });

        return activate_token;
    }


};
