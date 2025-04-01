const Post = require('../../models/Post')

const getPosts = async (req, res) => {
    
    const posts = await Post
        .find({ threadId: { $eq: null } })
        .populate({
            path: 'author',
            select: '_id email username role profileImage',
            populate: {
                path: 'profileImage',
                select: '_id filename width height',
            },
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