const Apartment = require('../dataBase/Apartment');
const Booking = require('../dataBase/Booking');
const User = require('../dataBase/User');
const { emailService } = require('../services');
const { SUCCESSFUL_BOOKING, APARTMENT_WAS_BOOKING } = require('../configs/email_action_enum');

module.exports = {
    createBooking: async (req, res, next) => {
        try {
            const user = req.user;
            const { user_id, _id, city, country, street } = req.apartment;
            const price = req.price;
            const { start_day, end_day, count_person } = req.body;

            const ownerUser = await User.findById({_id: user_id});

            const newBooking = await Booking.create({
                ...req.body, price,
                apartment_id: _id,
                owner_id: user_id,
                client_id: user._id});

            await Apartment.findByIdAndUpdate({_id}, { available: false }, { new: true });

            await emailService.sendMail(user.email, SUCCESSFUL_BOOKING, { userName: user.name, city });
            await emailService.sendMail(
                ownerUser.email,
                APARTMENT_WAS_BOOKING,
                {
                    userName: ownerUser.name,
                    country, city, street,
                    clientName: user.name,
                    clientLastname: user.surname,
                    startDate: start_day,
                    endDate: end_day,
                    number: count_person
                });

            res.json(newBooking);
        } catch (e) {
            next(e);
        }
    }
};
