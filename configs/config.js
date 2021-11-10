module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/bookingDB',
    PORT: process.env.PORT || 5000,

    HTTP: 'http://localhost:3000/',

    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'ppp',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'aaa',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'rrr',
    JWT_ACTION_FORGOT_SECRET: process.env.JWT_ACTION_FORGOT_SECRET || 'fff',

    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,

    SENTRY_DSN: process.env.SENTRY_DSN || 'https://856f8b4c69f54f9881709201ea973bbd@o1062748.ingest.sentry.io/6053208',

    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,

    AWS_SE_REGION: process.env.AWS_SE_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY
};
