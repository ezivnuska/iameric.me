const Post = require('../../models/Post')

const addPostImage = async (req, res) => {
    
    const { postId, imageId } = req.body

    let post = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { image: imageId } },
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

module.exports = addPostImage