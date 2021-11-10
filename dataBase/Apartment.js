const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    area: {
        type: Number,
        required: true,
        trim: true
    },
    number_of_person: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    rooms: {
        type: Number,
        trim: true
    },
    kitchen: {
        type: Boolean,
        trim: true
    },
    bathroom: {
        type: Boolean,
        trim: true
    },
    parking: {
        type: Boolean,
        trim: true
    },
    available: {
        type: Boolean,
        default: true,
        trim:true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    photo: {
        type: String
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('apartment', apartmentSchema);
