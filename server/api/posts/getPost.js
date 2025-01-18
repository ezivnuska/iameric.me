const Post = require('../../models/Post')

const getPost = async (req, res) => {

    const post = await Post
        .findById(req.params.postId)
        .populate({
            path: 'author',
            select: 'username profileImage',
            populate: {
                path: 'profileImage',
                select: 'filename',
            }
        })
    
    if (post) return res.status(200).json({ post })
    
    console.log('error fetching post.')

    return res.status(200).json(null)
}

module.exports = getPost