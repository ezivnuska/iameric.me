const clearUserProfileImage = require('./clearUserProfileImage')
const deleteImage = require('./deleteImage')
const deleteImageById = require('./deleteImageById')
const deletePreview = require('./deletePreview')
const findAndRemoveImageFromProduct = require('./findAndRemoveImageFromProduct')
const getBipImages = require('./getBipImages')
const getImageIdFromFilename = require('./getImageIdFromFilename')
const getImagesByUserId = require('./getImagesByUserId')
const getProfileImageByUserId = require('./getProfileImageByUserId')
const getUserFromImageId = require('./getUserFromImageId')
const loadImage = require('./loadImage')
const removeAllBipImagesById = require('./removeAllBipImagesById')
const removeUserAssetsByUsername = require('./removeUserAssetsByUsername')
const removeImageAndThumb = require('./removeImageAndThumb')
const scrubImage = require('./scrubImage')
const setImageCaption = require('./setImageCaption')
const updateProfileImage = require('./updateProfileImage')

module.exports = {
    clearUserProfileImage,
    deleteImage,
    deleteImageById,
    deletePreview,
    findAndRemoveImageFromProduct,
    getBipImages,
    getImageIdFromFilename,
    getImagesByUserId,
    getProfileImageByUserId,
    getUserFromImageId,
    loadImage,
    removeAllBipImagesById,
    removeUserAssetsByUsername,
    removeImageAndThumb,
    scrubImage,
    setImageCaption,
    updateProfileImage,
}