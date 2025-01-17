const Post = require('../../models/Post')

const getPost = async (req, res) => {

    const post = await Post
        .findById(req.params.postId)
        .populate({
            path: 'author',
            select: 'username profileImage',
        })
    
    if (!post) console.log('error fetching post.')
    else return res.status(200).json({ post })

    return res.status(200).json(null)
}

module.exports = getPost