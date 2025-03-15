const Post = require('../../models/Post')

const removePostImage = async (req, res) => {
    
    const { postId } = req.body

    let post = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { image: null } },
        { new: true }
    )
    
    post = await Post
        .findOne({ _id: postId })
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'image',
            select: 'filename width height',
        })
    
    if (post) return res.status(200).json({ post })
    else return res.status(200).json(null)
    
}

module.exports = removePostImage