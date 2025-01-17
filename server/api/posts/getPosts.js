const Post = require('../../models/Post')

const getPosts = async (req, res) => {
    
    const posts = await Post
        .find({})
        .select('_id')
        .sort({ createdAt: -1 })
        // .populate({
        //     path: 'author',
        //     select: 'username profileImage',
        //     populate: { path: 'profileImage' },
        // })
    
    if (!posts) console.log('error fetching Posts.')
    else return res.status(200).json({ posts })
    return res.status(200).json(null)
}

module.exports = getPosts