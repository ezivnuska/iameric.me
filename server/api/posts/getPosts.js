const Post = require('../../models/Post')

const getPosts = async (req, res) => {
    
    const posts = await Post
        .find({ threadId: { $eq: null } })
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'image',
            select: 'filename width height',
        })
        .sort({ createdAt: -1 })
    
    if (posts) return res.status(200).json({ posts })
    
    console.log('error fetching Posts.')

    return res.status(200).json(null)
}

module.exports = getPosts