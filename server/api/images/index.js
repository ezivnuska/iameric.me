const clearUserProfileImage = require('./clearUserProfileImage')
const deleteImageById = require('./deleteImageById')
const deletePreview = require('./deletePreview')
const ensureUploadDirExists = require('./ensureUploadDirExists')
const findAndRemoveImageFromProduct = require('./findAndRemoveImageFromProduct')
const getImageIdFromFilename = require('./getImageIdFromFilename')
const getImagesByUserId = require('./getImagesByUserId')
const getProfileImageByUserId = require('./getProfileImageByUserId')
const getUserFromImageId = require('./getUserFromImageId')
const handleFileUpload = require('./handleFileUpload')
const loadImage = require('./loadImage')
const removeImage = require('./removeImage')
const removeImageAndThumb = require('./removeImageAndThumb')
const saveUserImage = require('./saveUserImage')
const setImageCaption = require('./setImageCaption')
const updateProfileImage = require('./updateProfileImage')
const uploadAvatar = require('./uploadAvatar')
const uploadImage = require('./uploadImage')
const uploadProductImage = require('./uploadProductImage')

module.exports = {
    clearUserProfileImage,
    deleteImageById,
    deletePreview,
    ensureUploadDirExists,
    findAndRemoveImageFromProduct,
    getImageIdFromFilename,
    getImagesByUserId,
    getProfileImageByUserId,
    getUserFromImageId,
    handleFileUpload,
    loadImage,
    removeImage,
    removeImageAndThumb,
    saveUserImage,
    setImageCaption,
    updateProfileImage,
    uploadAvatar,
    uploadImage,
    uploadProductImage,
}