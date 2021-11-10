const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const { PORT, MONGO_CONNECT_URL } = require('./configs/config');
const Sentry = require('./logger/sentry');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected successfully');
});

app.use(Sentry.Handlers.requestHandler());

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { apartmentRouter, authRouter, userRouter, bookingRouter } = require('./routers');

app.use('/apartment', apartmentRouter);
app.use('/auth', authRouter);
app.use('/booking', bookingRouter);
app.use('/users', userRouter);

app.use(Sentry.Handlers.errorHandler());

// eslint-disable-next-line no-unused-vars
app.use('*', (err, request, response, next) => {
    Sentry.captureException(err);

    response
        .status(err.status || 500)
        .json({
            msg: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
