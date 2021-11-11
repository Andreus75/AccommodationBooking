const cron = require('node-cron');

const deleteOldToken = require('./old-token-delete');
const deleteOldBooking = require('./old-booking-delete');

module.exports = () => {
    cron.schedule('0 0 1 * *', async () => {
        console.log('Cron start at', new Date().toISOString());
        await deleteOldToken();
        console.log('Cron stop at', new Date().toISOString());
    });

    cron.schedule('0 0 1 * *', async () => {
        console.log('Cron start at', new Date().toISOString());
        await deleteOldBooking();
        console.log('Cron stop at', new Date().toISOString());
    });
};
