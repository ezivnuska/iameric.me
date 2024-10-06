const User = require('../../models/User')

const updateProfileImage = async (req, res) => {
    const { userId, imageId } = req.body
    
    let user = null
    let error = null
    if (imageId) {
        user = await User
            .findOneAndUpdate({ _id: userId }, { $set: { profileImage: imageId } }, { new: true })
            .populate({ path: 'profileImage', select: 'filename width height' })
        if (!user) error = 'Error updating profile image'
    } else {
        user = await User
            .findOneAndUpdate({ _id: userId }, { $set: { profileImage: null } }, { new: true })
        if (!user) error = 'Error clearing profile image'
    }

    if (error) console.log(error)

    if (!user) console.log('Error updating profile image')
    else return res.status(200).json({ user })
    return res.status(200).json(null)
}

module.exports = updateProfileImage