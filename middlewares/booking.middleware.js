const Apartment = require('../dataBase/Apartment');
const {APARTMENT_WITH_THIS_ID_IS_MISSING, ClientErrorNotFound} = require('../configs/error_enum');

module.exports = {
    calculationPrice: async (req, res, next) => {
        try {
            const { apartment_id } = req.params;
            const { start_day, end_day } = req.body;

            const bookingApartment = await Apartment.findById({_id: apartment_id });

            if (!bookingApartment) {
                return next({
                    message: APARTMENT_WITH_THIS_ID_IS_MISSING,
                    status: ClientErrorNotFound
                });
            }

            const start_day_f = new Date(start_day);
            const end_day_f = new Date(end_day);

            const days = (end_day_f - start_day_f)/(24*60*60*1000);

            const bookingPrice = days * bookingApartment.price;

            req.price = bookingPrice;
            req.apartment = bookingApartment;

            next();
        } catch (e) {
            next(e);
        }
    }
};
