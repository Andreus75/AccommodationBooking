const User = require('../dataBase/User');
const { DEFAULT_PASSWORD } = require('../configs/config');
const { passwordService } = require('../services');
const { ADMIN } = require('../configs/user_role_enum');

module.exports = async () => {
    const hashedPassword = await passwordService.hash(DEFAULT_PASSWORD);

    await User.create({
        name: 'Anna',
        surname: 'Koolya',
        age: 25,
        role: ADMIN,
        email: 'Anna.admin@gmail.com',
        password: hashedPassword,
    });
};
