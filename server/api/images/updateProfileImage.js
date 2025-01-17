const User = require('../../models/User')

const updateProfileImage = async (req, res) => {
    
    const { userId, imageId } = req.body

    let { profileImage } = await User
        .findOneAndUpdate({ _id: userId }, { $set: { profileImage: imageId } }, { new: true })
        .populate({
            path: 'profileImage',
            select: '_id filename',
        })
    
    return res.status(200).json({ profileImage })
}

module.exports = updateProfileImage