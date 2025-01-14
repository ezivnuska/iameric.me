const clearUserProfileImage = require('./clearUserProfileImage')
const deleteImageById = require('./deleteImageById')
const deletePreview = require('./deletePreview')
const ensureUploadDirExists = require('./ensureUploadDirExists')
const findAndRemoveImageFromProduct = require('./findAndRemoveImageFromProduct')
const getBipImages = require('./getBipImages')
const getImageIdFromFilename = require('./getImageIdFromFilename')
const getImagesByUserId = require('./getImagesByUserId')
const getProfileImageByUserId = require('./getProfileImageByUserId')
const getUserFromImageId = require('./getUserFromImageId')
const handleFileUpload = require('./handleFileUpload')
const loadImage = require('./loadImage')
const removeAllBipImagesById = require('./removeAllBipImagesById')
const removeUserAssetsByUsername = require('./removeUserAssetsByUsername')
const removeImageAndThumb = require('./removeImageAndThumb')
const saveBipImage = require('./saveBipImage')
const saveUserImage = require('./saveUserImage')
const setImageCaption = require('./setImageCaption')
const updateProfileImage = require('./updateProfileImage')
const uploadAvatar = require('./uploadAvatar')
const uploadImage = require('./uploadImage')
const uploadBipImage = require('./uploadBipImage')
const uploadProductImage = require('./uploadProductImage')

module.exports = {
    clearUserProfileImage,
    deleteImageById,
    deletePreview,
    ensureUploadDirExists,
    findAndRemoveImageFromProduct,
    getBipImages,
    getImageIdFromFilename,
    getImagesByUserId,
    getProfileImageByUserId,
    getUserFromImageId,
    handleFileUpload,
    loadImage,
    removeAllBipImagesById,
    removeUserAssetsByUsername,
    removeImageAndThumb,
    saveBipImage,
    saveUserImage,
    setImageCaption,
    updateProfileImage,
    uploadAvatar,
    uploadImage,
    uploadBipImage,
    uploadProductImage,
}