const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const O_auth = require('../dataBase/O_Auth');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'month');

    const deleteInfo = await O_auth.deleteMany({
        createAt: {$lt: previousMonth}
    });
    console.log(deleteInfo);
};

