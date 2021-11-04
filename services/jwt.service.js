const jwt = require('jsonwebtoken');

const {
    config: { JWT_ACTION_SECRET, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET },
    tokenTypeEnum
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { INVALID_TOKEN, ClientErrorUnauthorized, ServerErrorInternal} = require('../configs/error_enum');
const actionTokenTypeEnum = require('../configs/token_type_enum');
const { JWT_ACTION_FORGOT_SECRET } = require('../configs/config');

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

    verifyToken: async (token, tokenType = tokenTypeEnum) => {
        try {
            let secret = '';

            switch (tokenType) {
                case tokenTypeEnum.ACTION:
                    secret = JWT_ACTION_SECRET;
                    break;
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case tokenTypeEnum.FORGOT_PASSWORD :
                    secret = JWT_ACTION_FORGOT_SECRET;
                    break;
                case tokenTypeEnum.CHANGE_FORGOT_PASSWORD :
                    secret = JWT_ACTION_FORGOT_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
        }
    },

    generateForgotActionToken: (actionTokenType) => {
        try {
            let secretWord;

            switch (actionTokenType) {
                case actionTokenTypeEnum.FORGOT_PASSWORD :
                    secretWord = JWT_ACTION_FORGOT_SECRET;

                    break;
                default:
                    throw new ErrorHandler(INVALID_TOKEN, ServerErrorInternal);
            }

            const generate_forgot_token = jwt.sign({}, secretWord, { expiresIn: '24h' });

            return generate_forgot_token;
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
        }

    }
};
