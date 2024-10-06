const removeImageAndThumb = require('./removeImageAndThumb')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const deletePreview = async (req, res) => {
    const { username, filename } = req.body
    const userDir = path.join(uploadDir, username)
    const imagesDeleted = await removeImageAndThumb(userDir, filename)
    if (!imagesDeleted) console.log('Error removing image/thumb pair')
    else return res.status(200).json({ filename })
    return res.status(200).json(null)
}

module.exports = deletePreview