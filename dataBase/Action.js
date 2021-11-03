const { Schema, model } = require('mongoose');
const tokenEnum = require('../configs/action_token_type_enam');

const actionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        required: true,
        enum: Object.values(tokenEnum)
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('action', actionSchema);
