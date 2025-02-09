const ensureUploadDirExists = require('./ensureUploadDirExists')
const handleFileUpload = require('./handleFileUpload')
const saveBipImage = require('./saveBipImage')
const saveUserImage = require('./saveUserImage')
const uploadAvatar = require('./uploadAvatar')
const uploadBipImage = require('./uploadBipImage')
const uploadImage = require('./uploadImage')
const uploadProductImage = require('./uploadProductImage')

module.exports = {
    ensureUploadDirExists,
    handleFileUpload,
    saveBipImage,
    saveUserImage,
    uploadAvatar,
    uploadBipImage,
    uploadImage,
    uploadProductImage,
}