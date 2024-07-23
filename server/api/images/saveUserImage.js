const UserImage = require('../../models/UserImage')

const saveUserImage = async (userId, filename, height, width) => {
    
    const image = new UserImage({ user: userId, filename, height, width })
    
    await image.save()

    const savedImage = await UserImage
        .findOne({ _id: image._id })
        .populate('user', 'username')
    
    return {
        image: savedImage,
    }
}

module.exports = saveUserImage