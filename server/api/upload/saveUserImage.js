const UserImage = require('../../models/UserImage')

const saveUserImage = async (userId, filename, height, width, location = null) => {

    const userImage = {
        user: userId,
        filename,
        height,
        width,
    }

    if (location) userImage.location = location
    
    const image = new UserImage(userImage)

    await image.save()
    
    const savedImage = await UserImage
        .findOne({ _id: image._id })
        .populate('user', 'username')
    
    return {
        image: savedImage,
    }
}

module.exports = saveUserImage