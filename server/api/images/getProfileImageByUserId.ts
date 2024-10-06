const User = require('../../models/User')

const getProfileImageByUserId = async (req, res) => {
    
    const user = await User
        .findOne({ _id: req.params.id })
        .populate({ path: 'profileImage', select: 'filename width height' })

    return res.status(200).json(user)
}

module.exports = getProfileImageByUserId