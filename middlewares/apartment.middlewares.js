const Apartment = require('../dataBase/Apartment');
const {
    APARTMENT_WITH_THIS_ID_IS_MISSING,
    ClientErrorNotFound,
    ClientErrorBadRequest
} = require('../configs/error_enum');
const {Error} = require('mongoose');

module.exports = {
    findApartmentById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const apartment = await Apartment.findById({apartment_id: id});

            if (!apartment) {
                return next({
                    message: APARTMENT_WITH_THIS_ID_IS_MISSING,
                    status: ClientErrorNotFound
                });
            }

            req.apartment = apartment;

            next();
        } catch (e) {
            next(e);
        }
    },

    isApartmentValid: (validator) => (req, res, next) => {
        try {
            const { error, value } = validator.validate(req.body);

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    filterApartmentValid: (validator) => (req, res, next) => {
        try {
            const { error, value } = validator.validate(req.body);

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
