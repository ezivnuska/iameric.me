const UserImage = require('../../models/UserImage')

const loadImage = async (req, res) => {
    let image = await UserImage
        .findById(req.params.id)
        .populate({
            path: 'user',
            populate: {
                path: 'profileImage',
                select: '_id filename',
            }
        })
    
    if (image) {
        return res.status(200).json({ image })
    }
    
    console.log('Error loading image')
    
    return res.status(200).json(null)
}

module.exports = loadImage