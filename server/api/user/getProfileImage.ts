const UserImage = require('../../models/UserImage')

const getProfileImage = async (req, res) => {
    const { id } = req.params
    const image = await UserImage.findOne({ _id: id })
    if (!image) console.log('could not get profile image with id')
    else return res.status(200).json(image)
    return res.status(200).json(null)
}

module.exports = getProfileImage