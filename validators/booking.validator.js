const Joi = require('joi');

const createBookingValidator = Joi.object({
    start_day: Joi.date()
        .required(),
    end_day: Joi.date()
        .required(),
    price: Joi.number()
        .integer()
        .positive()
        .required(),
    apartment_id: Joi.string()
        .alphanum()
        .required(),
    owner_id: Joi.string()
        .alphanum()
        .required(),
    client_id: Joi.string()
        .alphanum()
        .required()
});

module.exports = { createBookingValidator };
