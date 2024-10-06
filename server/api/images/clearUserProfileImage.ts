const getUserFromImageId = require('./getUserFromImageId')

const clearUserProfileImage = async imageId => {
    const user = await getUserFromImageId(imageId)
    if (user.profileImage === imageId) {
        user.profileImage = null
        await user.save()
    }
    return imageId
}

module.exports = clearUserProfileImage