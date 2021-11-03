const { Schema, model } = require('mongoose');

const { userRoleEnum } = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    surname: {
        type: String,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        trim: true
    },
    role: {
        type: String,
        default: userRoleEnum.USER,
        required: true,
        enum: Object.values(userRoleEnum)
    },
    email: {
        type: String,
        unambiguous: true,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        select: false
    },
    is_active: {
        type: Boolean,
        default: false,
        required: true
    },
    is_login: {
        type: Boolean,
        default: false,
        required: true
    },
    avatar: {
        type: String
    }
}, { timestamp: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('user', userSchema);

