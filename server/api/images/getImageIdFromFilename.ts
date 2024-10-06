const UserImage = require('../../models/UserImage')

const getImageIdFromFilename = async (req, res) => {
    const { name } = req.params
    const image = await UserImage.find({ filename: name })
    return res.status(200).json({ image })
}

module.exports = getImageIdFromFilename