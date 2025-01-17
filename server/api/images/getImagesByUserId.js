const UserImage = require('../../models/UserImage')

const getImagesByUserId = async (req, res) => {
    
    const images = await UserImage
        .find({ user: req.params.id })
        .select('_id')

    return res.status(200).json({ images })
}

module.exports = getImagesByUserId