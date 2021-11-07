const path = require('path');
const { nanoid } = require('nanoid');

module.exports = {
    uploadImage: (file = {}, itemType, itemId) => {
        const { name } = file;

        _fileNameBuilder(name, itemType, itemId);
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExtension = path.extname(fileName);
    return path.join(itemId, itemId, `${nanoid()}${fileExtension}`);
}
