module.exports = {
    userNormalization: (userToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    },

    userNormaliseToAuth: (userToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize._doc[field];
        });

        return userToNormalize;
    }
};
