const Joi = require('joi');

const userRoleEnum = require('../configs');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');

const createUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    surname: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    age: Joi.number()
        .integer()
        .positive()
        .required(),
    role: Joi.string()
        .allow(...Object.values(userRoleEnum)),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
});

module.exports = { createUserValidator };

