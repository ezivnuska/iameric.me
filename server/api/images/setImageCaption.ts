const UserImage = require('../../models/UserImage')

const setImageCaption = async (req, res) => {
    const { id, text } = req.body
    let image = await UserImage.findOne({ _id: id })
    if (!image) console.log('Error adding image caption')
    else {
        image.caption = text
        image = await UserImage
            .findOneAndUpdate({ _id: id }, { $set: { caption: text } }, { new: true })
            .populate('user', 'username')
            return res.status(200).json({ image })
    }
    return res.status(200).json(null)
}

module.exports = setImageCaption