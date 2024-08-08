const { remove } = require('fs-extra')

const removeImage = async path => await remove(path, () => console.log('removed file at path', path))

module.exports = removeImage