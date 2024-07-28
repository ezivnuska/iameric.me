const findAndRemoveImageFromProduct = require('./findAndRemoveImageFromProduct')
const clearUserProfileImage = require('./clearUserProfileImage')
const removeImage = require('./removeImage')
const Product = require('../../models/Product')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const path = require('path')

const uploadDir = '/var/www/iameric.me/html/assets'

const deleteImageById = async (req, res) => {
    const { imageId, isProductImage, isProfileImage } = req.body
    console.log(`deleteImageById: ${imageId}`)
    
    // check to see if it is a product image
    if (isProductImage) {
        const productImage = await findAndRemoveImageFromProduct(imageId)
        console.log('image is product image.', productImage)
        if (!productImage) {
            console.log('error removing product image.')
            // stop here.
            return null
        }
        console.log('image removed from user product.')
    }

    // remove profile image reference to image

    if (isProfileImage) {
        const profileImage = await clearUserProfileImage(imageId)
        console.log('image is profile image.', profileImage)
        if (!profileImage) {
            console.log('error clearing profile image reference to image.')
            return null
        }
        console.log('profile image reference removed from user.')
    }
    
    const deletedImage = await UserImage.findOneAndRemove({ _id: imageId })

    if (!deletedImage) console.log('Could not find image to delete')
    else {
        const user = await User.findOne({ _id: deletedImage.user })

        if (!user) {
            console.log('could not find user to update after image deletion.')
        } else {
            const userDir = path.join(uploadDir, user.username)
            const filenameToDelete = deletedImage.filename
    
            const pathToThumb = `${userDir}/thumb/${filenameToDelete}`
            const pathToAvatar = `${userDir}/${filenameToDelete}`
            
            if (isProfileImage) {
                user.profileImage = null
                await user.save()
            }
    
            // const product = 
            await Product.findOneAndUpdate({ image: imageId }, { $set: { image: null }})
            
            // if (product) {
            //     product.image = null
            //     await product.save()
            // }
    
            removeImage(pathToAvatar)
            removeImage(pathToThumb)
    
            return res.status(200).json({ deletedImage })
        }

    }
    return res.status(200).json(null)
}

module.exports = deleteImageById