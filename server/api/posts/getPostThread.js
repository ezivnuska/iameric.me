const Post = require('../../models/Post')

const getPostThread = async (req, res) => {
    
    const posts = await Post
        .find({})
        .populate({
            path: 'author',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .sort({ createdAt: -1 })
    
    if (!posts) console.log('error fetching posts.')
    else return res.status(200).json({ posts })
    return res.status(200).json(null)
}

module.exports = getPostThread