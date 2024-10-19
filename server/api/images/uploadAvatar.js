const handleFileUpload = require('./handleFileUpload')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const uploadAvatar = async (req, res) => {
    const { _id, avatar, timestamp } = req.body
    const user = await User.findOne({ _id })

    const userDir = path.join(uploadDir, user.username)

    console.log('\nwriting avatar to path', userDir)
    const avatarname = await handleFileUpload(avatar, userDir, timestamp)
    console.log(`avatar written: ${userDir}/${avatarname}`)
    console.log('avatarname', avatarname)

    if (!avatarname) {
        console.log('\nError: Cannot write avatar to path.')
        return res.status(400).json({ error: 'Error writing avatar to path.' })
    }

    const newImage = new UserImage({
        user: user._id,
        filename: avatarname,
    })


    await newImage.save()

    user.profileImage = newImage._id
    await user.save()

    const { profileImage } = user
    
    return res.status(200).json({ profileImage, imageId: newImage._id })
}

module.exports = uploadAvatar