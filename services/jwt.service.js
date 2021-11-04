const jwt = require('jsonwebtoken');

const {
    config: { JWT_ACTION_SECRET, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET },
    tokenTypeEnum: { ACCESS, REFRESH },
    actionTokenTypeEnum: { ACTION }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { INVALID_TOKEN, ClientErrorUnauthorized } = require('../configs/error_enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    createActivateToken: () => jwt.sign({}, JWT_ACTION_SECRET, {expiresIn: '24h'}),

    verifyToken: async (token, tokenType = ACTION) => {
        try {
            let secret = '';

            switch (tokenType) {
                case ACTION:
                    secret = JWT_ACTION_SECRET;
                    break;
                case ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
        }

    }
};
