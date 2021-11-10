const Joi = require('joi');

const createApartmentValidator = Joi.object({
    country: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .trim()
        .required(),
    city: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .trim()
        .required(),
    street: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .trim()
        .required(),
    area: Joi.number()
        .integer()
        .positive()
        .required(),
    number_of_person: Joi.number()
        .integer()
        .min(1)
        .positive()
        .required(),
    price: Joi.number()
        .integer()
        .positive()
        .required(),
    rooms: Joi.number()
        .integer()
        .positive(),
    kitchen: Joi.boolean()
        .allow(false, true),
    bathroom: Joi.boolean()
        .allow(false, true),
    parking: Joi.boolean()
        .allow(false, true),
    available: Joi.boolean()
        .allow(false, true),
    user_id: Joi.string()
        .alphanum()
});

const filterApartmentValidator = Joi.object({
    country: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .trim()
        .required(),
    city: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .trim()
        .required(),
    district: Joi.string()
        .alphanum()
        .min(2)
        .max(40)
        .trim()
        .required(),
    area: Joi.number()
        .integer()
        .positive()
        .required(),
    number_of_person: Joi.number()
        .integer()
        .min(1)
        .positive()
        .required(),
    price_start: Joi.number()
        .integer()
        .positive()
        .required(),
    price_end: Joi.number()
        .integer()
        .positive()
        .required()
});

module.exports = { createApartmentValidator, filterApartmentValidator };
