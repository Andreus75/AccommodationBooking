const User = require('../dataBase/User');
const { DEFAULT_PASSWORD } = require('../configs/config');
const { passwordService, emailService, jwtService} = require('../services');
const { ADMIN } = require('../configs/user_role_enum');
const { WELCOME } = require('../configs/email_action_enum');
const Action = require('../dataBase/Action');
const { ACTION } = require('../configs/token_type_enum');

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if (!user) {
        const hashedPassword = await passwordService.hash(DEFAULT_PASSWORD);

        const newAdmin = await User.create({
            name: 'Anna',
            surname: 'Koolya',
            age: 25,
            role: ADMIN,
            email: 'Anna.admin@gmail.com',
            password: hashedPassword,
        });
        const token = jwtService.createActivateToken();

        await Action.create({ token, type: ACTION, user_id: newAdmin._id });
        await emailService.sendMail(newAdmin.email, WELCOME, { userName: name, token });
    }
};
