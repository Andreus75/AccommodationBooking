module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/bookingDB',
    PORT: process.env.PORT || 5000,

    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'ppp',

    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD
};
