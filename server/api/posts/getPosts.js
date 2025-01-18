const Post = require('../../models/Post')

const getPosts = async (req, res) => {
    
    const posts = await Post
        .find({})
        .select('_id')
        .sort({ createdAt: -1 })
    
    if (posts) return res.status(200).json({ posts })
    
    console.log('error fetching Posts.')

    return res.status(200).json(null)
}

module.exports = getPosts