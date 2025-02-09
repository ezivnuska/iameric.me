const Post = require('../../models/Post')
const User = require('../../models/User')
const handleFileUpload = require('../upload/handleFileUpload')
const saveUserImage = require('../upload/saveUserImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const createPost = async (req, res) => {
    
    // pull values from request body
    
    const { author, image, text, threadId } = req.body
    
    const { imageData, thumbData } = image
    
    const { height, width } = imageData
    const user = await User
        .findOne({ _id: author })
    
    const filename = `${user._id}-${Date.now()}.png`
    const userDir = path.join(uploadDir, user.username)
    
    const uploadedImage = await handleFileUpload({ imageData, thumbData }, userDir, filename)

    if (!uploadedImage) {
        console.log('Error uploading post image/thumb.')
        return res.status(200).json(null)
    }
    
    const savedImage = await saveUserImage(user._id, filename, height, width)
    
    if (!savedImage.image) {
        console.log('Error saving user image/thumb.')
        return res.status(200).json(null)
    }

    // create a new mongo Post doc
    const newPost = await Post.create({ author, text, image: [savedImage.image._id] })

    // if error, notify console
    if (newPost) {
        if (threadId) {
            newPost.threadId = threadId
            await newPost.save()
        }
        // fetch new (populated) Entry
        const post = await Post
            .findOne({ _id: newPost._id })
            .populate({
                path: 'author',
                select: 'username profileImage',
                populate: { path: 'profileImage' },
            })
            .populate({ path: 'image' })

        // return updated Entry document
        return res.json({ post })
    }

    console.log('Problem creating Post.')

    // upon failure, return null
    return res.status(200).json(null)
    
}

module.exports = createPost