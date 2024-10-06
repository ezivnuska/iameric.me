const Bip = require('../../models/Bip')
const BipImage = require('../../models/BipImage')
const removeImageAndThumb = require('./removeImageAndThumb')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const removeAllBipImagesById = async id => {

    const bip = await Bip.findOne({ _id: id })
        .populate('user', 'username')

    if (!bip || !bip.user) return null
    
    const { username } = bip.user
    console.log('uploadDir', uploadDir)
    const userDir = path.join(uploadDir, username)
    console.log('userDir', userDir)
    const bipDir = path.join(userDir, 'bips')
    console.log('bipDir', bipDir)
    console.log('removing bip images at', bipDir)
    const bipImages = await BipImage.find({ bipId: id })
    let deletedImages = 0
    while (deletedImages < bipImages.length) {
        const currentImage = bipImages[deletedImages]
        const imageDeleted = await removeImageAndThumb(currentImage.filename, bipDir)
        if (imageDeleted) deletedImages++
    }
    
    return deletedImages
}

module.exports = removeAllBipImagesById