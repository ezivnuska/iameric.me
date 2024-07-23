const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const getUserFromImageId = async imageId => {
    
    const image = await UserImage.findOne({ _id: imageId })
    
    if (!image) {
        console.log('Could not find image to remove.')
        return null
    }
    
    const user = await User.findOne({ _id: image.user })
    
    if (!user) {
        console.log('could not find user referenced in image model.')
        return null
    }

    return user
}

module.exports = getUserFromImageId