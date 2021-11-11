const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const Booking = require('../dataBase/Booking');

module.exports = async () => {
    const previousDay = dayJs.utc().subtract(1, 'day');

    const deleteOldBooking = await Booking.deleteMany({
        end_day: {$lt: previousDay}
    });
    console.log(deleteOldBooking);
};
