const UserImage = require('../../models/UserImage')

const getImagesByUserId = async (req, res) => {
    
    const images = await UserImage
        .find({ user: req.params.id })
        .select('_id filename width height user')
        .populate({ path: 'user', select: '_id username' })

    return res.status(200).json({ images })
}

module.exports = getImagesByUserId