const UserImage = require('../../models/UserImage')

const loadImage = async (req, res) => {
    const { id } = req.params
    let image = await UserImage
        .findOne({ _id: id })
        .populate({
            path: 'user',
            select: '_id username',
            // populate: { path: 'profileImage' },
        })
    
    if (!image) console.log('Error loading image')
    
    return res.status(200).json(image ? { image } : null)
}

module.exports = loadImage