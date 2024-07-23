const { rm } = require('fs')

const removeImage = path => rm(path, () => console.log('removed file at path', path))

module.exports = removeImage