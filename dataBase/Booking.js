const { Schema, model } = require('mongoose');

const bookingApartment = new Schema({
    start_day: {
        type: Date,
        required: true,
        trim: true,
    },
    end_day: {
        type: Date,
        required: true,
        trim: true
    },
    apartment_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'apartment'
    },
    count_person: {
        type: Number,
        required: true,
        trim:true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    client_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true}});

module.exports = model('booking', bookingApartment);


