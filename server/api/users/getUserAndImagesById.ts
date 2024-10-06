const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const getUserAndImagesById = async (req, res) => {
    
    const user = await User
        .findOne({ _id: req.params.id })
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })

    if (!user) console.log('could not get user by id.')
    else {
        const images = await UserImage
            .find({ user: req.params.id })
            .populate({
                path: 'user',
                select: 'username',
            })

        return res.status(200).json({
            user,
            images,
        })
    }
    return res.status(406).json(null)
}

module.exports = getUserAndImagesById