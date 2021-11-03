const User = require('../dataBase/User');
const { SuccessOK, USER_IS_ACTIVE } = require('../configs/error_enum');

module.exports = {
    activate: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await User.updateOne({_id}, {is_active: true});

            res.status(SuccessOK).json(USER_IS_ACTIVE);
        } catch (e) {
            next(e);
        }
    }
};

