// const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const loadImage = async (req, res) => {
    let image = await UserImage
        .findById(req.params.id)
        .populate({
            path: 'user',
            select: '_id username profileImage',
            populate: {
                path: 'profileImage',
                select: '_id filename',
            }
        })
    
    if (image) {
        return res.status(200).json({ image })
    }
    else console.log('Error loading image')

    return nulll
}

module.exports = loadImage